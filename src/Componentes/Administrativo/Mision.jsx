import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Grid,
    Snackbar,
    Slide,
    useTheme,
    useMediaQuery,
    IconButton,
    Avatar,
    ListItemAvatar,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Modal,
    Backdrop,
    Fade,
} from "@mui/material";
import { Edit, Delete, Add, CheckCircle, Error, Warning } from "@mui/icons-material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

// Tema personalizado
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2", // Azul moderno
        },
        secondary: {
            main: "#4caf50", // Verde
        },
        background: {
            default: "#f5f5f5", // Fondo claro
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h4: {
            fontWeight: 600,
            color: "#1976d2",
        },
    },
});

// Componente personalizado para las tarjetas de misión
const MisionCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
        transform: "scale(1.02)",
        boxShadow: theme.shadows[6],
    },
}));

const Misiones = () => {
    const [misiones, setMisiones] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [editando, setEditando] = useState(false);
    const [misionId, setMisionId] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [modalOpen, setModalOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Función para mostrar mensajes en el Snackbar
    const mostrarSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    // Función para obtener las misiones desde el backend
    const obtenerMisiones = async () => {
        try {
            const response = await axios.get("https://backendiot-h632.onrender.com/api/mision");
            setMisiones(response.data);
        } catch (error) {
            mostrarSnackbar("No se pudieron obtener las misiones", "error");
            console.error("Error al obtener las misiones:", error);
        }
    };

    useEffect(() => {
        obtenerMisiones();
    }, []);

    // Función para agregar una nueva misión
    const agregarMision = async () => {
        try {
            if (!titulo || !contenido) {
                mostrarSnackbar("Por favor, complete todos los campos", "warning");
                return;
            }

            await axios.post("http://localhost:5000/api/mision", { titulo, contenido });
            setTitulo("");
            setContenido("");
            obtenerMisiones();
            mostrarSnackbar("Misión agregada exitosamente", "success");
            setMostrarFormulario(false);
        } catch (error) {
            mostrarSnackbar("Hubo un problema al agregar la misión", "error");
            console.error("Error al agregar misión:", error);
        }
    };

    // Función para editar una misión
    const editarMision = async () => {
        try {
            if (!titulo || !contenido) {
                mostrarSnackbar("Por favor, complete todos los campos", "warning");
                return;
            }

            setModalOpen(true); // Abre el modal antes de actualizar
        } catch (error) {
            mostrarSnackbar("Hubo un problema al actualizar la misión", "error");
            console.error("Error al editar misión:", error);
        }
    };

    // Función para eliminar una misión
    const eliminarMision = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/mision/${id}`);
            obtenerMisiones();
            mostrarSnackbar("Misión eliminada exitosamente", "success");
        } catch (error) {
            mostrarSnackbar("Hubo un problema al eliminar la misión", "error");
            console.error("Error al eliminar misión:", error);
        }
    };

    // Función para activar el modo de edición
    const activarEdicion = (mision) => {
        setTitulo(mision.titulo);
        setContenido(mision.contenido);
        setMisionId(mision._id);
        setEditando(true);
        setMostrarFormulario(true);
    };

    // Función para cancelar la edición o el formulario
    const cancelarFormulario = () => {
        setTitulo("");
        setContenido("");
        setEditando(false);
        setMisionId(null);
        setMostrarFormulario(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="md"
                sx={{
                    mt: 4,
                    mb: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Misiones
                </Typography>

                {/* Botón para mostrar el formulario de agregar */}
                {!mostrarFormulario && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setMostrarFormulario(true)}
                        sx={{ mb: 4 }}
                    >
                        Agregar Nueva Misión
                    </Button>
                )}

                {/* Formulario de Misión (solo se muestra si mostrarFormulario es true) */}
                {mostrarFormulario && (
                    <Slide direction="down" in={mostrarFormulario} mountOnEnter unmountOnExit>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 4,
                                width: "100%",
                                borderRadius: 2,
                                bgcolor: "background.paper",
                                mb: 4,
                            }}
                        >
                            <Typography variant="h5" align="center" gutterBottom>
                                {editando ? "Editar Misión" : "Agregar Nueva Misión"}
                            </Typography>
                            <Box
                                component="form"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    fullWidth
                                    label="Título"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    placeholder="Título"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Contenido"
                                    value={contenido}
                                    onChange={(e) => setContenido(e.target.value)}
                                    placeholder="Contenido"
                                    multiline
                                    rows={4}
                                    required
                                />
                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={editando ? editarMision : agregarMision}
                                        sx={{ py: 1.5, flex: 1 }}
                                    >
                                        {editando ? "Actualizar Misión" : "Agregar Misión"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={cancelarFormulario}
                                        sx={{ py: 1.5, flex: 1 }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Slide>
                )}

                {/* Lista de Misiones */}
                <Grid container spacing={3}>
                    {misiones.length > 0 ? (
                        misiones.map((mision) => (
                            <Grid item xs={12} key={mision._id}>
                                <MisionCard elevation={3}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <CheckCircle />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={mision.titulo}
                                            secondary={mision.contenido}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                color="primary"
                                                onClick={() => activarEdicion(mision)}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => eliminarMision(mision._id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </MisionCard>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
                            No hay misiones disponibles.
                        </Typography>
                    )}
                </Grid>

                {/* Snackbar para mostrar mensajes */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: snackbarSeverity === "success" ? "#4caf50" : snackbarSeverity === "error" ? "#f44336" : "#ff9800",
                            color: "#fff",
                            p: 2,
                            borderRadius: 1,
                        }}
                    >
                        {snackbarSeverity === "success" && <CheckCircle sx={{ mr: 1 }} />}
                        {snackbarSeverity === "error" && <Error sx={{ mr: 1 }} />}
                        {snackbarSeverity === "warning" && <Warning sx={{ mr: 1 }} />}
                        <Typography variant="body1">{snackbarMessage}</Typography>
                    </Box>
                </Snackbar>

                {/* Modal de confirmación para actualizar misión */}
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
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
                            <Typography variant="h6" align="center" gutterBottom>
                                ¿Estás seguro de que deseas actualizar esta misión?
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={async () => {
                                        await axios.put(`http://localhost:5000/api/mision/${misionId}`, { titulo, contenido });
                                        setTitulo("");
                                        setContenido("");
                                        setEditando(false);
                                        setMisionId(null);
                                        obtenerMisiones();
                                        mostrarSnackbar("Misión actualizada exitosamente", "success");
                                        setMostrarFormulario(false);
                                        setModalOpen(false);
                                    }}
                                >
                                    Sí, Actualizar
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </Container>
        </ThemeProvider>
    );
};

export default Misiones;