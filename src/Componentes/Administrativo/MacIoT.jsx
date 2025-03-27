import { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Container,
    Typography,
    Box,
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Tema personalizado (consistente con tu proyecto)
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#4CAF50" },
        secondary: { main: "#B0BEC5" },
        background: { default: "#121212", paper: "#1E1E1E" },
        text: { primary: "#FFFFFF", secondary: "#B0BEC5" },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#333",
                        },
                        "&:hover fieldset": {
                            borderColor: "#4CAF50",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#4CAF50",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#B0BEC5",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#4CAF50",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    fontWeight: "bold",
                    backgroundColor: "#4CAF50",
                    "&:hover": {
                        backgroundColor: "#45a049",
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid #333",
                },
                head: {
                    backgroundColor: "#1A3C34",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                },
            },
        },
    },
});

const GestionarMacs = () => {
    const [macs, setMacs] = useState([]); // Lista de MACs
    const [formData, setFormData] = useState({ mac: "" }); // Formulario para agregar/editar
    const [errors, setErrors] = useState({}); // Errores de validación
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false); // Diálogo para agregar/editar
    const [editMode, setEditMode] = useState(false); // Modo edición
    const [editId, setEditId] = useState(null); // ID de la MAC en edición

    // Cargar las MACs al montar el componente
    useEffect(() => {
        fetchMacs();
    }, []);

    const fetchMacs = async () => {
        try {
            const response = await fetch("https://backendiot-h632.onrender.com/api/maciots");
            const data = await response.json();
            if (response.ok) {
                setMacs(data);
            } else {
                setSnackbarMessage("Error al cargar las MACs.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error al obtener las MACs:", error);
            setSnackbarMessage("Error al conectar con el servidor.");
            setOpenSnackbar(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.mac) {
            newErrors.mac = "La MAC es obligatoria.";
        } else if (!/^[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}$/.test(formData.mac)) {
            newErrors.mac = "La MAC debe tener el formato XX:XX:XX:XX:XX:XX (ejemplo: 24:0A:C4:00:11:22).";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setSnackbarMessage("Por favor, corrige los errores en el formulario.");
            setOpenSnackbar(true);
            return;
        }

        try {
            const url = editMode
                ? `http://localhost:5000/api/maciots/${editId}`
                : "http://localhost:5000/api/maciots";
            const method = editMode ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mac: formData.mac }),
            });

            const data = await response.json();
            if (response.ok) {
                setSnackbarMessage(editMode ? "MAC actualizada con éxito." : "MAC agregada con éxito.");
                setOpenSnackbar(true);
                setFormData({ mac: "" });
                setErrors({});
                setOpenDialog(false);
                fetchMacs(); // Actualizar la lista
            } else {
                setSnackbarMessage(data.message || "Error al procesar la solicitud.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error al procesar la solicitud:", error);
            setSnackbarMessage("Error al conectar con el servidor.");
            setOpenSnackbar(true);
        }
    };

    const handleEdit = (mac) => {
        setEditMode(true);
        setEditId(mac._id);
        setFormData({ mac: mac.mac });
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta MAC?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/maciots/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setSnackbarMessage("MAC eliminada con éxito.");
                setOpenSnackbar(true);
                fetchMacs(); // Actualizar la lista
            } else {
                const data = await response.json();
                setSnackbarMessage(data.message || "Error al eliminar la MAC.");
                setOpenSnackbar(true);
            }
        } catch (error) {
            console.error("Error al eliminar la MAC:", error);
            setSnackbarMessage("Error al conectar con el servidor.");
            setOpenSnackbar(true);
        }
    };

    const handleOpenDialog = () => {
        setEditMode(false);
        setFormData({ mac: "" });
        setErrors({});
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({ mac: "" });
        setErrors({});
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Gestionar MACs de Cajas Fuertes IoT
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleOpenDialog}
                    >
                        Agregar MAC
                    </Button>
                </Box>

                {/* Tabla de MACs */}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>MAC</TableCell>
                                <TableCell align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {macs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} align="center">
                                        No hay MACs registradas.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                macs.map((mac) => (
                                    <TableRow key={mac._id}>
                                        <TableCell>{mac.mac}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(mac)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(mac._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Diálogo para agregar/editar MAC */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{editMode ? "Editar MAC" : "Agregar MAC"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="MAC del ESP32"
                            name="mac"
                            value={formData.mac}
                            onChange={handleInputChange}
                            required
                            error={!!errors.mac}
                            helperText={errors.mac || "Formato: XX:XX:XX:XX:XX:XX"}
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} color="primary" variant="contained">
                            {editMode ? "Actualizar" : "Agregar"}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar para notificaciones */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity={Object.keys(errors).length > 0 ? "error" : "success"}
                        sx={{ width: "100%" }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default GestionarMacs;