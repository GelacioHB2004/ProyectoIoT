import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import {
  Container,
  Typography,
  Paper,
  CircularProgress,
  Box,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Iconos para mejorar el diseño

const VisionF = () => {
  const [vision, setVision] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Para diseño responsive

  useEffect(() => {
    const fetchVision = async () => {
      try {
        const response = await fetch('https://backendiot-h632.onrender.com/api/vision');
        if (!response.ok) {
          throw new Error('Error al cargar las misiones');
        }
        const data = await response.json();
        setVision(data);
      } catch (err) {
        setError(err.message);
        message.error('Error al cargar las misiones');
      } finally {
        setLoading(false);
      }
    };

    fetchVision();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Fade in={loading} timeout={500}>
          <CircularProgress color="primary" size={60} />
        </Fade>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: isMobile ? 2 : 4,
          borderRadius: 3,
          background: theme.palette.background.paper,
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 4,
            fontSize: isMobile ? '2rem' : '2.5rem',
          }}
        >
          Visión
        </Typography>
        {vision.length > 0 ? (
          vision.map((vision, index) => (
            <Grow in={true} timeout={index * 500} key={index}>
              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: 2,
                  background: theme.palette.grey[100],
                  '&:hover': {
                    background: theme.palette.grey[200],
                    transform: 'scale(1.02)',
                    transition: 'transform 0.3s ease-in-out',
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Visibility color="primary" />
                  <Typography
                    variant="h4"
                    component="h2"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                  >
                    {vision.titulo}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, mb: 2, color: theme.palette.text.secondary }}
                >
                  {vision.contenido}
                </Typography>
                {vision.secciones && vision.secciones.length > 0 ? (
                  vision.secciones.map((section, idx) => (
                    <Box key={idx} sx={{ mt: 3 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <VisibilityOff color="secondary" />
                        <Typography
                          variant="h5"
                          component="h3"
                          color="secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {section.titulo}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{ mt: 1, mb: 1, color: theme.palette.text.secondary }}
                      >
                        {section.contenido}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    align="center"
                    color="textSecondary"
                    sx={{ mt: 2 }}
                  >
                    No hay secciones disponibles.
                  </Typography>
                )}
              </Box>
            </Grow>
          ))
        ) : (
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            sx={{ mt: 2 }}
          >
            No hay misiones disponibles.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default VisionF;