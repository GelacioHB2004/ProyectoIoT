import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    Modal,
    Backdrop,
    Fade,
    Snackbar,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { Alert } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2185d0",
        },
    },
});

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState(null);
    const [editando, setEditando] = useState(false);
    const [productoId, setProductoId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [errores, setErrores] = useState({});

    // Estados para filtrado y paginación
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);
    const [productosPorPagina] = useState(5);

    useEffect(() => {
        obtenerProductos();
    }, []);

    // Funciones de validación
    const soloLetras = (valor) => /^[A-Za-z\s]*$/.test(valor);
    const numeroPositivo = (valor) => /^\d*\.?\d*$/.test(valor) && (valor === "" || parseFloat(valor) >= 0);

    const validarFormulario = () => {
        const nuevosErrores = {};
        
        if (!soloLetras(nombre)) nuevosErrores.nombre = "Solo se permiten letras";
        if (!nombre) nuevosErrores.nombre = "El nombre es requerido";
        
        if (!soloLetras(descripcion)) nuevosErrores.descripcion = "Solo se permiten letras";
        if (!descripcion) nuevosErrores.descripcion = "La descripción es requerida";
        
        if (!soloLetras(categoria)) nuevosErrores.categoria = "Solo se permiten letras";
        if (!categoria) nuevosErrores.categoria = "La categoría es requerida";
        
        if (!numeroPositivo(precio)) nuevosErrores.precio = "Debe ser un número positivo";
        if (!precio) nuevosErrores.precio = "El precio es requerido";
        
        if (!numeroPositivo(stock)) nuevosErrores.stock = "Debe ser un número positivo";
        if (!stock) nuevosErrores.stock = "El stock es requerido";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const obtenerProductos = async () => {
        try {
            const response = await fetch("https://backendiot-h632.onrender.com/api/productos");
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    const productosFiltrados = productos.filter((producto) => {
        const coincideNombre = producto.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
        const coincideCategoria = filtroCategoria
            ? producto.categoria?.toLowerCase().includes(filtroCategoria.toLowerCase())
            : true;
        return coincideNombre && coincideCategoria;
    });

    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosPaginaActual = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

    const manejarCambioPagina = (evento, valor) => {
        setPaginaActual(valor);
    };

    const manejarImagen = (e) => {
        setImagen(e.target.files[0]);
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) {
            setSnackbarMessage("Por favor, corrige los errores en el formulario");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("precio", precio);
        formData.append("stock", stock);
        formData.append("categoria", categoria);
        if (imagen) {
            formData.append("imagen", imagen);
        }

        try {
            const url = editando
                ? `https://backendiot-h632.onrender.com/api/productos/${productoId}`
                : "https://backendiot-h632.onrender.com/api/productos";

            const response = await fetch(url, {
                method: editando ? "PUT" : "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Error en la solicitud");

            obtenerProductos();
            limpiarFormulario();
            setSnackbarMessage(editando ? "Producto actualizado" : "Producto agregado");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            setModalOpen(false);
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            setSnackbarMessage("Error al guardar el producto");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };

    const manejarEditar = (producto) => {
        setEditando(true);
        setProductoId(producto._id);
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(producto.precio.toString());
        setStock(producto.stock.toString());
        setCategoria(producto.categoria || "");
        setImagen(null);
        setModalOpen(true);
    };

    const manejarEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                const response = await fetch(`https://backendiot-h632.onrender.com/api/productos/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) throw new Error("Error al eliminar producto");

                obtenerProductos();
                setSnackbarMessage("Producto eliminado");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                setSnackbarMessage("Error al eliminar producto");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        }
    };

    const limpiarFormulario = () => {
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setStock("");
        setCategoria("");
        setImagen(null);
        setEditando(false);
        setProductoId(null);
        setModalOpen(false);
        setErrores({});
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ 
                backgroundColor: "#E5E7EB", 
                minHeight: "100vh", 
                py: 4
            }}>
                <Container maxWidth="lg">
                    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                            <Typography variant="h4" gutterBottom>
                                Productos
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => setModalOpen(true)}
                                sx={{
                                    backgroundColor: "#2185d0",
                                    '&:hover': {
                                        backgroundColor: "#1a69a4",
                                    }
                                }}
                            >
                                Agregar Producto
                            </Button>
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Buscar producto por nombre"
                                    variant="outlined"
                                    value={filtroNombre}
                                    onChange={(e) => setFiltroNombre(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2185d0',
                                        },
                                        '& .MuiInputLabel-outlined.Mui-focused': {
                                            color: '#2185d0',
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Buscar producto por categoría"
                                    variant="outlined"
                                    value={filtroCategoria}
                                    onChange={(e) => setFiltroCategoria(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#2185d0',
                                        },
                                        '& .MuiInputLabel-outlined.Mui-focused': {
                                            color: '#2185d0',
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Paper>

                    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>Categoría</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productosPaginaActual.map((producto) => (
                                    <TableRow key={producto._id} hover>
                                        <TableCell>{producto.nombre}</TableCell>
                                        <TableCell>{producto.descripcion}</TableCell>
                                        <TableCell>${producto.precio}</TableCell>
                                        <TableCell>{producto.stock}</TableCell>
                                        <TableCell>{producto.categoria || "Sin categoría"}</TableCell>
                                        <TableCell>
                                            <IconButton 
                                                color="primary" 
                                                onClick={() => manejarEditar(producto)}
                                                sx={{ color: "#2185d0" }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => manejarEliminar(producto._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Paper elevation={2} sx={{ px: 2, py: 1, borderRadius: 2 }}>
                            <Pagination
                                count={Math.ceil(productosFiltrados.length / productosPorPagina)}
                                page={paginaActual}
                                onChange={manejarCambioPagina}
                                color="primary"
                            />
                        </Paper>
                    </Box>

                    <Modal
                        open={modalOpen}
                        onClose={limpiarFormulario}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{ timeout: 500 }}
                    >
                        <Fade in={modalOpen}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 400,
                                    bgcolor: "background.paper",
                                    boxShadow: 24,
                                    p: 4,
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    {editando ? "Editar Producto" : "Agregar Producto"}
                                </Typography>
                                <form onSubmit={manejarSubmit}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Nombre"
                                                value={nombre}
                                                onChange={(e) => {
                                                    if (soloLetras(e.target.value)) {
                                                        setNombre(e.target.value);
                                                    }
                                                }}
                                                required
                                                error={!!errores.nombre}
                                                helperText={errores.nombre}
                                                sx={{
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#2185d0',
                                                    },
                                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                                        color: '#2185d0',
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Descripción"
                                                multiline
                                                rows={4}
                                                value={descripcion}
                                                onChange={(e) => {
                                                    if (soloLetras(e.target.value)) {
                                                        setDescripcion(e.target.value);
                                                    }
                                                }}
                                                required
                                                error={!!errores.descripcion}
                                                helperText={errores.descripcion}
                                                sx={{
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#2185d0',
                                                    },
                                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                                        color: '#2185d0',
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Precio"
                                                value={precio}
                                                onChange={(e) => {
                                                    if (numeroPositivo(e.target.value)) {
                                                        setPrecio(e.target.value);
                                                    }
                                                }}
                                                required
                                                error={!!errores.precio}
                                                helperText={errores.precio}
                                                inputProps={{ step: "0.01" }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#2185d0',
                                                    },
                                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                                        color: '#2185d0',
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Stock"
                                                value={stock}
                                                onChange={(e) => {
                                                    if (numeroPositivo(e.target.value)) {
                                                        setStock(e.target.value);
                                                    }
                                                }}
                                                required
                                                error={!!errores.stock}
                                                helperText={errores.stock}
                                                inputProps={{ step: "0.01" }}
                                                sx={{
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#2185d0',
                                                    },
                                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                                        color: '#2185d0',
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Categoría"
                                                value={categoria}
                                                onChange={(e) => {
                                                    if (soloLetras(e.target.value)) {
                                                        setCategoria(e.target.value);
                                                    }
                                                }}
                                                required
                                                error={!!errores.categoria}
                                                helperText={errores.categoria}
                                                sx={{
                                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                        borderColor: '#2185d0',
                                                    },
                                                    '& .MuiInputLabel-outlined.Mui-focused': {
                                                        color: '#2185d0',
                                                    }
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={manejarImagen}
                                                style={{ marginTop: "10px" }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button 
                                                type="submit" 
                                                variant="contained" 
                                                color="primary" 
                                                fullWidth
                                                sx={{
                                                    backgroundColor: "#2185d0",
                                                    '&:hover': {
                                                        backgroundColor: "#1a69a4",
                                                    }
                                                }}
                                            >
                                                {editando ? "Actualizar" : "Agregar"}
                                            </Button>
                                        </Grid>
                                        {editando && (
                                            <Grid item xs={12}>
                                                <Button 
                                                    variant="outlined" 
                                                    color="secondary" 
                                                    onClick={limpiarFormulario} 
                                                    fullWidth
                                                    sx={{
                                                        borderColor: "#2185d0",
                                                        color: "#2185d0",
                                                        '&:hover': {
                                                            borderColor: "#1a69a4",
                                                        }
                                                    }}
                                                >
                                                    Cancelar
                                                </Button>
                                            </Grid>
                                        )}
                                    </Grid>
                                </form>
                            </Box>
                        </Fade>
                    </Modal>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                    >
                        <Alert 
                            onClose={handleSnackbarClose} 
                            severity={snackbarSeverity}
                            sx={{
                                ...(snackbarSeverity === "success" && {
                                    backgroundColor: "#2185d0",
                                    color: "white"
                                })
                            }}
                        >
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Productos;