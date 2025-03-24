"use client";

import { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    Card,
    CardContent,
    Typography,
    Container,
    Box,
    CardMedia,
    Snackbar,
    Alert,
    Paper,
    Chip,
    AppBar,
    Toolbar,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icono para "Ver Detalles"
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Tema personalizado
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#4CAF50" }, // Verde
        secondary: { main: "#B0BEC5" },
        background: { default: "#121212", paper: "#1E1E1E" },
        text: { primary: "#FFFFFF", secondary: "#B0BEC5" },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    border: "1px solid #333",
                    transition: "all 0.3s ease",
                    "&:hover": { borderColor: "#4CAF50", boxShadow: "0 4px 20px rgba(76, 175, 80, 0.2)" },
                },
            },
        },
        MuiButton: { styleOverrides: { containedPrimary: { fontWeight: "bold" } } },
        MuiDialog: { styleOverrides: { paper: { borderRadius: 12, border: "1px solid #333" } } },
    },
});

const ProductosC = () => {
    const [productos, setProductos] = useState([]);
    const [todasCategorias, setTodasCategorias] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [carrito, setCarrito] = useState([]); // Estado para el carrito
    const [openCarrito, setOpenCarrito] = useState(false); // Modal del carrito
    const [formData, setFormData] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        telefono: "",
        correo: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        obtenerProductos();
    }, [categoriaSeleccionada]);

    const obtenerProductos = async () => {
        try {
            const url = categoriaSeleccionada
                ? `https://backendiot-h632.onrender.com/api/productos/categoria/${categoriaSeleccionada}`
                : "https://backendiot-h632.onrender.com/api/productos";
            const response = await fetch(url);
            const data = await response.json();
            setProductos(data);
            if (!categoriaSeleccionada) {
                const categoriasUnicas = [...new Set(data.map((p) => p.categoria).filter(Boolean))];
                setTodasCategorias(categoriasUnicas);
            }
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    // Funciones del carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const existente = prevCarrito.find((item) => item._id === producto._id);
            const nuevaCantidad = existente ? existente.cantidad + 1 : 1;
            if (nuevaCantidad > producto.stock) {
                setSnackbarMessage(`No hay suficiente stock para ${producto.nombre}. Disponibles: ${producto.stock}`);
                setOpenSnackbar(true);
                return prevCarrito;
            }
            if (existente) {
                return prevCarrito.map((item) =>
                    item._id === producto._id ? { ...item, cantidad: nuevaCantidad } : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter((item) => item._id !== id));
    };

    const ajustarCantidad = (id, cantidad) => {
        setCarrito((prevCarrito) => {
            const item = prevCarrito.find((i) => i._id === id);
            if (!item || cantidad <= 0) return prevCarrito;
            if (cantidad > item.stock) {
                setSnackbarMessage(`No hay suficiente stock para ${item.nombre}. Disponibles: ${item.stock}`);
                setOpenSnackbar(true);
                return prevCarrito;
            }
            return prevCarrito.map((i) => (i._id === id ? { ...i, cantidad } : i));
        });
    };

    const calcularTotal = () => {
        return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
    };

    const validateField = (name, value) => {
        let error = "";
        switch (name) {
            case "nombre":
            case "apellidoPaterno":
            case "apellidoMaterno":
                if (!/^[A-Za-z\s]+$/.test(value)) error = "Solo se permiten letras y espacios.";
                break;
            case "correo":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Correo electrónico no válido.";
                break;
            case "password":
                if (!/^\d{4,10}$/.test(value)) error = "La contraseña debe tener entre 4 y 10 dígitos.";
                break;
            default:
                break;
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const verificarNombre = async () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSnackbarMessage("Por favor, corrige los errores en el formulario.");
            setOpenSnackbar(true);
            return;
        }

        try {
            const response = await fetch("https://backendiot-h632.onrender.com/api/comprasiot/verificar-usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: formData.nombre }),
            });

            const data = await response.json();

            if (response.ok && data.existe) {
                await registrarCompra(data.usuarioId);
            } else {
                const result = await new Promise((resolve) =>
                    setTimeout(() => resolve(window.confirm("Usuario no encontrado. ¿Ir al login?")), 0)
                );
                if (result) navigate("/login");
            }
        } catch (error) {
            console.error("Error verificando el nombre:", error);
            setSnackbarMessage("Error al verificar el usuario.");
            setOpenSnackbar(true);
        }
    };

    const registrarCompra = async (usuarioId) => {
        try {
            const response = await fetch("https://backendiot-h632.onrender.com/api/comprasiot/registrar-compra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, productos: carrito, usuarioId }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("usuario", JSON.stringify(formData));
                setFormData({ nombre: "", apellidoPaterno: "", apellidoMaterno: "", telefono: "", correo: "", password: "" });
                setCarrito([]);
                setSnackbarMessage("Compra registrada con éxito. Redirigiendo...");
                setOpenSnackbar(true);
                obtenerProductos(); // Actualizar lista de productos
                setTimeout(() => {
                    setOpenForm(false);
                    navigate("/cliente/MQTT");
                }, 2000);
            } else {
                setSnackbarMessage(data.message || "Error al registrar la compra.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error registrando la compra:", error);
            setSnackbarMessage("Error al conectar con el servidor.");
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const verDetalles = (producto) => {
        setSelectedProduct(producto);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
                <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: "1px solid #333" }}>
                    <Toolbar>
                        <SecurityIcon sx={{ mr: 2, color: "primary.main" }} />
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                            Productos Disponibles
                        </Typography>
                        <IconButton color="primary" onClick={() => setOpenCarrito(true)}>
                            <ShoppingCartIcon />
                            {carrito.length > 0 && (
                                <Typography variant="caption" sx={{ ml: 1 }}>
                                    {carrito.length}
                                </Typography>
                            )}
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Container maxWidth={false} sx={{ padding: 3 }}>
                    <Box sx={{ textAlign: "center", mb: 4 }}>
                        <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                            <Button
                                variant={categoriaSeleccionada === "" ? "contained" : "outlined"}
                                onClick={() => setCategoriaSeleccionada("")}
                                sx={{ mr: 1, borderRadius: "20px", px: 2 }}
                            >
                                Todos
                            </Button>
                            {todasCategorias.map((categoria) => (
                                <Button
                                    key={categoria}
                                    variant={categoriaSeleccionada === categoria ? "contained" : "outlined"}
                                    onClick={() => setCategoriaSeleccionada(categoria)}
                                    sx={{ mr: 1, borderRadius: "20px", px: 2 }}
                                >
                                    {categoria}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Grid container spacing={2}>
                        {productos.map((producto) => (
                            <Grid item xs={12} sm={6} md={4} lg={2.4} key={producto._id}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    {producto.imagen && (
                                        <CardMedia
                                            component="img"
                                            sx={{ width: "100%", height: "200px", objectFit: "cover" }}
                                            image={producto.imagen}
                                            alt={producto.nombre}
                                        />
                                    )}
                                    {producto.categoria && (
                                        <Chip
                                            label={producto.categoria}
                                            color="primary"
                                            size="small"
                                            sx={{ position: "absolute", top: 10, right: 10, fontWeight: "bold" }}
                                        />
                                    )}
                                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {producto.nombre}
                                        </Typography>
                                        <Typography variant="h6" color="primary" fontWeight="bold" mt={1}>
                                            ${producto.precio}
                                        </Typography>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Disponibles: {producto.stock}
                                            </Typography>
                                            <LockIcon fontSize="small" color="primary" />
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => agregarAlCarrito(producto)}
                                                sx={{ flex: 1 }}
                                            >
                                                Agregar al Carrito
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => verDetalles(producto)}
                                                startIcon={<VisibilityIcon />}
                                                sx={{ flex: 1 }}
                                            >
                                                Ver Detalles
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Modal del carrito */}
                    <Dialog open={openCarrito} onClose={() => setOpenCarrito(false)} maxWidth="sm" fullWidth>
                        <DialogTitle>Carrito de Compras</DialogTitle>
                        <DialogContent>
                            {carrito.length === 0 ? (
                                <Typography>El carrito está vacío.</Typography>
                            ) : (
                                <>
                                    <Table>
                                        <TableBody>
                                            {carrito.map((item) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>{item.nombre}</TableCell>
                                                    <TableCell>${item.precio}</TableCell>
                                                    <TableCell>
                                                        <IconButton onClick={() => ajustarCantidad(item._id, item.cantidad - 1)}>
                                                            <RemoveIcon />
                                                        </IconButton>
                                                        {item.cantidad}
                                                        <IconButton onClick={() => ajustarCantidad(item._id, item.cantidad + 1)}>
                                                            <AddIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell>
                                                        <IconButton color="error" onClick={() => eliminarDelCarrito(item._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Total: ${calcularTotal()}
                                    </Typography>
                                </>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenCarrito(false)}>Cerrar</Button>
                            {carrito.length > 0 && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setOpenCarrito(false);
                                        setOpenForm(true);
                                    }}
                                >
                                    Proceder a la Compra
                                </Button>
                            )}
                        </DialogActions>
                    </Dialog>

                    {/* Modal de detalles del producto */}
                    {selectedProduct && (
                        <Dialog
                            open={!!selectedProduct}
                            onClose={() => setSelectedProduct(null)}
                            maxWidth="md"
                            fullWidth
                            PaperProps={{ sx: { bgcolor: "background.paper" } }}
                        >
                            <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <LockIcon color="primary" />
                                <Typography variant="h6" component="span">
                                    {selectedProduct.nombre}
                                </Typography>
                            </DialogTitle>
                            <DialogContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        {selectedProduct.imagen && (
                                            <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: "100%", height: "auto" }}
                                                    image={selectedProduct.imagen}
                                                    alt={selectedProduct.nombre}
                                                />
                                            </Paper>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body1" color="text.secondary" textAlign="justify">
                                            {selectedProduct.descripcion}
                                        </Typography>
                                        <Paper
                                            elevation={0}
                                            sx={{ p: 2, mt: 2, bgcolor: "background.default", border: "1px solid #333", borderRadius: 2 }}
                                        >
                                            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
                                                Precio: ${selectedProduct.precio}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Disponibles: {selectedProduct.stock}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Categoría: {selectedProduct.categoria || "Sin categoría"}
                                            </Typography>
                                        </Paper>
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "20px" }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    agregarAlCarrito(selectedProduct);
                                                    setSelectedProduct(null);
                                                }}
                                                startIcon={<ShoppingCartIcon />}
                                                fullWidth
                                            >
                                                Agregar al Carrito
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => setSelectedProduct(null)}
                                                startIcon={<ArrowBackIcon />}
                                                fullWidth
                                            >
                                                Volver
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </DialogContent>
                        </Dialog>
                    )}

                    {/* Formulario de compra */}
                    <Dialog open={openForm} onClose={() => setOpenForm(false)} PaperProps={{ sx: { bgcolor: "background.paper" } }}>
                        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LockIcon color="primary" />
                            <Typography variant="h6" component="span">
                                Finalizar Compra
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2} sx={{ mt: 0.5 }}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                        error={!!errors.nombre}
                                        helperText={errors.nombre}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Apellido Paterno"
                                        name="apellidoPaterno"
                                        value={formData.apellidoPaterno}
                                        onChange={handleInputChange}
                                        required
                                        error={!!errors.apellidoPaterno}
                                        helperText={errors.apellidoPaterno}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Apellido Materno"
                                        name="apellidoMaterno"
                                        value={formData.apellidoMaterno}
                                        onChange={handleInputChange}
                                        required
                                        error={!!errors.apellidoMaterno}
                                        helperText={errors.apellidoMaterno}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Teléfono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        required
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Correo"
                                        name="correo"
                                        type="email"
                                        value={formData.correo}
                                        onChange={handleInputChange}
                                        required
                                        error={!!errors.correo}
                                        helperText={errors.correo}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Contraseña"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        error={!!errors.password}
                                        helperText={errors.password}
                                        variant="outlined"
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ px: 3, pb: 3 }}>
                            <Button
                                onClick={verificarNombre}
                                color="primary"
                                variant="contained"
                                startIcon={<ShoppingCartIcon />}
                                fullWidth
                                size="large"
                            >
                                Finalizar Compra
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleSnackbarClose} severity={Object.keys(errors).length > 0 ? "error" : "success"} sx={{ width: "100%" }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ProductosC;