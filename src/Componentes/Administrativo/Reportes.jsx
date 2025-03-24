import { useState, useEffect } from "react";
import {
    Button,
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";

// Tema personalizado para administración
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#1976D2" }, // Azul para admin
        secondary: { main: "#B0BEC5" },
        background: { default: "#121212", paper: "#1E1E1E" },
        text: { primary: "#FFFFFF", secondary: "#B0BEC5" },
    },
    components: {
        MuiButton: { styleOverrides: { containedPrimary: { fontWeight: "bold" } } },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    border: "1px solid #333",
                    padding: "20px",
                },
            },
        },
    },
});

const ReporteProductosAdmin = () => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const obtenerCategorias = async () => {
        try {
            const response = await fetch("https://backendiot-h632.onrender.com/api/productos");
            const data = await response.json();
            const categoriasUnicas = [...new Set(data.map((p) => p.categoria).filter(Boolean))];
            setCategorias(categoriasUnicas);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            setSnackbarMessage("Error al cargar las categorías.");
            setOpenSnackbar(true);
        }
    };

    const generarReporte = async () => {
        try {
            const url = categoriaSeleccionada
                ? `https://backendiot-h632.onrender.com/api/reportes/reporte-productos/${categoriaSeleccionada}`
                : "https://backendiot-h632.onrender.com/api/reportes/reporte-productos";
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Error al generar el reporte.");
            }

            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `reporte-productos-${categoriaSeleccionada || "todos"}-${Date.now()}.pdf`;
            link.click();
            window.URL.revokeObjectURL(link.href);

            setSnackbarMessage("Reporte generado exitosamente.");
            setOpenSnackbar(true);
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
            setSnackbarMessage("Error al generar el reporte.");
            setOpenSnackbar(true);
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
                <Container maxWidth="md">
                    <Paper elevation={3}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
                                Reporte de Productos - Administración
                            </Typography>
                            <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
                                Selecciona una categoría para generar un reporte en PDF o elige "Todas las categorías".
                            </Typography>
                            <Box sx={{ mt: 4 }}>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel id="categoria-label">Categoría</InputLabel>
                                    <Select
                                        labelId="categoria-label"
                                        value={categoriaSeleccionada}
                                        label="Categoría"
                                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                                    >
                                        <MenuItem value="">Todas las categorías</MenuItem>
                                        {categorias.map((categoria) => (
                                            <MenuItem key={categoria} value={categoria}>
                                                {categoria}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<DownloadIcon />}
                                    onClick={generarReporte}
                                    fullWidth
                                    size="large"
                                >
                                    Generar Reporte
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarMessage.includes("Error") ? "error" : "success"} sx={{ width: "100%" }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </ThemeProvider>
    );
};

export default ReporteProductosAdmin;