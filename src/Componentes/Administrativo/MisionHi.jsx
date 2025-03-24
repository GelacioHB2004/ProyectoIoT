import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Avatar,
    ListItemAvatar,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Snackbar,
    Slide,
} from "@mui/material";
import { Edit, Delete, CheckCircle, Error, Warning } from "@mui/icons-material";
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

const MisionHi = () => {
    const [misiones, setMisiones] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
                    Misiones - Información
                </Typography>

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
                                            <IconButton color="primary">
                                                <Edit />
                                            </IconButton>
                                            <IconButton color="error">
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
            </Container>
        </ThemeProvider>
    );
};

export default MisionHi;
