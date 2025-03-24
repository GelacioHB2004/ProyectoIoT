import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    List, 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    CardActions, 
    AppBar, 
    Toolbar, 
    Snackbar,
    IconButton,
    Modal,
    Backdrop,
    Fade
} from '@mui/material';
import { Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Vision = () => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [visiones, setVisiones] = useState([]);
    const [editando, setEditando] = useState(false);
    const [idVision, setIdVision] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal de edición
    const [mostrarFormulario, setMostrarFormulario] = useState(false); // Estado para controlar el formulario de registro

    // Cargar todas las visiones al iniciar
    useEffect(() => {
        fetchVisiones();
    }, []);

    // Función para obtener todas las visiones
    const fetchVisiones = async () => {
        try {
            const response = await fetch('https://backendiot-h632.onrender.com/api/vision');
            if (!response.ok) {
                throw new Error('Error al obtener visiones');
            }
            const data = await response.json();
            setVisiones(data);
        } catch (error) {
            console.error('Error al obtener visiones:', error);
        }
    };

    // Función para crear o actualizar visión
    const handleSubmit = async (e) => {
        e.preventDefault();

        const visionData = { titulo, contenido };

        if (editando) {
            // Actualizar visión
            try {
                const response = await fetch(`https://backendiot-h632.onrender.com/api/vision/${idVision}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(visionData),
                });
                if (!response.ok) {
                    throw new Error('Error al actualizar visión');
                }
                setSnackbarMessage('Visión actualizada exitosamente');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                fetchVisiones();
                resetForm();
                setModalOpen(false); // Cerrar el modal después de actualizar
            } catch (error) {
                console.error('Error al actualizar visión:', error);
                setSnackbarMessage('Error al actualizar visión');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            // Crear nueva visión
            try {
                const response = await fetch('https://backendiot-h632.onrender.com/api/vision', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(visionData),
                });
                if (!response.ok) {
                    throw new Error('Error al crear visión');
                }
                setSnackbarMessage('Visión creada exitosamente');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                fetchVisiones();
                resetForm();
                setMostrarFormulario(false); // Ocultar el formulario después de crear
            } catch (error) {
                console.error('Error al crear visión:', error);
                setSnackbarMessage('Error al crear visión');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    // Función para eliminar visión
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro de eliminar esta visión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://backendiot-h632.onrender.com/api/vision/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar visión');
                }
                setSnackbarMessage('Visión eliminada exitosamente');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
                fetchVisiones();
            } catch (error) {
                console.error('Error al eliminar visión:', error);
                setSnackbarMessage('Error al eliminar visión');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    // Función para cargar datos de la visión para edición
    const handleEdit = (vision) => {
        setTitulo(vision.titulo);
        setContenido(vision.contenido);
        setIdVision(vision._id);
        setEditando(true);
        setModalOpen(true); // Abrir el modal al editar
    };

    // Función para resetear el formulario
    const resetForm = () => {
        setTitulo('');
        setContenido('');
        setIdVision('');
        setEditando(false);
        setModalOpen(false); // Cerrar el modal al resetear
    };

    // Función para cerrar el Snackbar
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Gestión de Visiones
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 4 }}>
                {/* Botón para mostrar el formulario de registro */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setMostrarFormulario(!mostrarFormulario)}
                    sx={{ mb: 4 }}
                >
                    {mostrarFormulario ? 'Ocultar Formulario' : 'Agregar Nueva Visión'}
                </Button>

                {/* Formulario de registro (solo se muestra si mostrarFormulario es true) */}
                {mostrarFormulario && (
                    <Card sx={{ mb: 4, boxShadow: 3 }}>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Título" 
                                            variant="outlined" 
                                            fullWidth 
                                            value={titulo} 
                                            onChange={(e) => setTitulo(e.target.value)} 
                                            required 
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            label="Contenido" 
                                            variant="outlined" 
                                            fullWidth 
                                            multiline 
                                            rows={4} 
                                            value={contenido} 
                                            onChange={(e) => setContenido(e.target.value)} 
                                            required 
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit" 
                                            fullWidth
                                            sx={{ mt: 2 }}
                                        >
                                            Crear Visión
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                )}

                <Typography variant="h5" gutterBottom>
                    Visiones Existentes
                </Typography>

                <List>
                    {visiones.map(vision => (
                        <Card key={vision._id} sx={{ mb: 2, boxShadow: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {vision.titulo}
                                </Typography>
                                <Typography variant="body1">
                                    {vision.contenido}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <IconButton 
                                    color="primary" 
                                    onClick={() => handleEdit(vision)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton 
                                    color="error" 
                                    onClick={() => handleDelete(vision._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                </List>
            </Container>

            {/* Modal para editar visión */}
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
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Editar Visión
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField 
                                        label="Título" 
                                        variant="outlined" 
                                        fullWidth 
                                        value={titulo} 
                                        onChange={(e) => setTitulo(e.target.value)} 
                                        required 
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                        label="Contenido" 
                                        variant="outlined" 
                                        fullWidth 
                                        multiline 
                                        rows={4} 
                                        value={contenido} 
                                        onChange={(e) => setContenido(e.target.value)} 
                                        required 
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        type="submit" 
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Actualizar Visión
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button 
                                        variant="outlined" 
                                        color="secondary" 
                                        onClick={resetForm} 
                                        fullWidth
                                    >
                                        Cancelar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>

            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={6000} 
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Vision;