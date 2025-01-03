import {
  MapContainer,
  TileLayer,
  useMap,
  Polyline,
  Marker,
  ZoomControl,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CloseIcon from "@mui/icons-material/Close";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import StraightIcon from '@mui/icons-material/Straight';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PlaceIcon from '@mui/icons-material/Place';

// Theme oluşturalım
const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    button: {
      textTransform: "none", // butonlardaki otomatik büyük harfi kapatalım
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
        },
      },
    },
  },
});

// Koordinatları formatlayan yardımcı fonksiyon (dosyanın üst kısmına ekleyin)
const formatCoordinate = (coord) => {
  return Number(coord).toFixed(4);
};

const generateQuantitiyMarker = (vehicle, color) => {
  const svg = `<svg width="38" height="38" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_18_234)">
                    <g filter="url(#filter0_f_18_234)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M168.928 140.654C206.363 155.927 230.576 183.343 223.009 201.891C210.653 232.176 129.782 236.603 129.782 236.603C129.782 236.603 74.9792 177.136 87.4452 146.582C95.0124 128.035 131.493 125.381 168.928 140.654Z" fill="black" fill-opacity="0.3"/>
                    </g>
                    <mask id="path-2-inside-1_18_234" fill="white">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M228.444 89.6C228.444 40.1138 183.673 0 128.444 0C73.2159 0 28.4445 40.1138 28.4445 89.6C28.4445 171.122 128.444 256 128.444 256C128.444 256 228.444 170.404 228.444 89.6ZM177.778 99.5555C177.778 127.047 155.492 149.333 128 149.333C100.508 149.333 78.2222 127.047 78.2222 99.5555C78.2222 72.064 100.508 49.7778 128 49.7778C155.492 49.7778 177.778 72.064 177.778 99.5555Z"/>
                    </mask>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M228.444 89.6C228.444 40.1138 183.673 0 128.444 0C73.2159 0 28.4445 40.1138 28.4445 89.6C28.4445 171.122 128.444 256 128.444 256C128.444 256 228.444 170.404 228.444 89.6ZM177.778 99.5555C177.778 127.047 155.492 149.333 128 149.333C100.508 149.333 78.2222 127.047 78.2222 99.5555C78.2222 72.064 100.508 49.7778 128 49.7778C155.492 49.7778 177.778 72.064 177.778 99.5555Z" fill="${color}"/>
                    <path d="M128.444 256L121.973 263.624L128.472 269.14L134.947 263.597L128.444 256ZM128.444 10C179.211 10 218.444 46.6412 218.444 89.6H238.444C238.444 33.5864 188.135 -10 128.444 -10V10ZM38.4445 89.6C38.4445 46.6412 77.6776 10 128.444 10V-10C68.7542 -10 18.4445 33.5864 18.4445 89.6H38.4445ZM128.444 256C134.916 248.376 134.917 248.377 134.918 248.378C134.918 248.378 134.918 248.378 134.918 248.378C134.917 248.378 134.915 248.376 134.912 248.373C134.904 248.366 134.891 248.355 134.872 248.339C134.833 248.306 134.771 248.252 134.686 248.179C134.517 248.033 134.256 247.807 133.911 247.505C133.219 246.899 132.188 245.986 130.866 244.787C128.221 242.387 124.415 238.847 119.836 234.338C110.665 225.309 98.4545 212.453 86.2687 197.143C61.5182 166.047 38.4445 126.758 38.4445 89.6H18.4445C18.4445 133.964 45.3708 177.875 70.6203 209.598C83.4344 225.698 96.2238 239.157 105.803 248.59C110.599 253.312 114.606 257.04 117.429 259.601C118.841 260.882 119.959 261.872 120.732 262.549C121.119 262.888 121.42 263.149 121.629 263.329C121.733 263.419 121.815 263.488 121.872 263.538C121.901 263.562 121.924 263.582 121.941 263.596C121.949 263.604 121.956 263.609 121.962 263.614C121.964 263.616 121.967 263.619 121.969 263.62C121.971 263.622 121.973 263.624 128.444 256ZM218.444 89.6C218.444 126.392 195.382 165.675 170.612 196.885C158.421 212.244 146.206 225.17 137.032 234.259C132.451 238.797 128.643 242.363 125.996 244.782C124.673 245.991 123.641 246.912 122.949 247.523C122.603 247.828 122.342 248.056 122.172 248.204C122.087 248.278 122.025 248.331 121.986 248.365C121.967 248.381 121.953 248.393 121.946 248.399C121.942 248.403 121.94 248.404 121.939 248.405C121.939 248.405 121.94 248.405 121.939 248.405C121.94 248.404 121.942 248.403 128.444 256C134.947 263.597 134.949 263.595 134.952 263.593C134.953 263.592 134.956 263.589 134.959 263.587C134.964 263.583 134.971 263.577 134.979 263.569C134.996 263.555 135.019 263.535 135.048 263.511C135.105 263.461 135.186 263.391 135.291 263.3C135.499 263.119 135.8 262.856 136.186 262.515C136.959 261.833 138.075 260.836 139.487 259.547C142.309 256.968 146.313 253.216 151.107 248.467C160.683 238.981 173.468 225.458 186.277 209.318C211.507 177.529 238.444 133.612 238.444 89.6H218.444ZM128 159.333C161.014 159.333 187.778 132.57 187.778 99.5555H167.778C167.778 121.524 149.969 139.333 128 139.333V159.333ZM68.2222 99.5555C68.2222 132.57 94.9856 159.333 128 159.333V139.333C106.031 139.333 88.2222 121.524 88.2222 99.5555H68.2222ZM128 39.7778C94.9856 39.7778 68.2222 66.5412 68.2222 99.5555H88.2222C88.2222 77.5869 106.031 59.7778 128 59.7778V39.7778ZM187.778 99.5555C187.778 66.5412 161.014 39.7778 128 39.7778V59.7778C149.969 59.7778 167.778 77.5869 167.778 99.5555H187.778Z" fill="black" mask="url(#path-2-inside-1_18_234)"/>
                    <circle cx="128" cy="99" r="50" fill="white"/>
                        ${
                          vehicle
                            ? `<text x="128" y="99" text-anchor="middle" dy=".3em" font-family="Inter" font-weight="bold" font-size="68" fill="black">${vehicle}</text>`
                            : ""
                        }
                      </g>
                    <defs>
                    <filter id="filter0_f_18_234" x="65.6006" y="110.732" width="178.793" height="145.871" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="10" result="effect1_foregroundBlur_18_234"/>
                    </filter>
                    </defs>
                    </svg>`;

  return L.divIcon({
    className: "custom-icon",
    html: svg,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });
};

// Haritayı konuma taşıyan ve sınırlara sığdıran bileşen
function ChangeView({ center, coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates && coordinates.length > 1) {
      // Tüm koordinatları içeren sınırları hesapla
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend([coord[0], coord[1]]);
      }, map.getBounds());

      // Haritayı bu sınırlara sığdır ve biraz padding ekle
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 16,
      });
    } else {
      // Tek nokta varsa o noktaya yakınlaş
      map.setView(center, 16);
    }
  }, [center, coordinates, map]);

  return null;
}

// Context Menu bileşeni
function ContextMenu({ position, onClose, onAddToRoute, onCopyCoords }) {
  if (!position) return null;

  return (
    <Paper
      sx={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1500,
        minWidth: 180,
        boxShadow: 3,
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <List sx={{ p: 0 }}>
        <ListItem
          button
          onClick={onAddToRoute}
          className="cursor-pointer"
          sx={{
            py: 0.75,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <AddLocationIcon
            sx={{
              fontSize: 18,
              mr: 1,
              color: "#1976d2",
            }}
          />
          <ListItemText
            primary="Güzergaha Ekle"
            primaryTypographyProps={{
              sx: {
                fontSize: "0.875rem",
                fontWeight: 500,
              },
            }}
          />
        </ListItem>
        <ListItem
          button
          className="cursor-pointer"
          onClick={onCopyCoords}
          sx={{
            py: 0.75,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <ContentCopyIcon
            sx={{
              fontSize: 18,
              mr: 1,
              color: "#666",
            }}
          />
          <ListItemText
            primary="Koordinatı Kopyala"
            primaryTypographyProps={{
              sx: {
                fontSize: "0.875rem",
                fontWeight: 500,
              },
            }}
          />
        </ListItem>
        <ListItem
          button
          className="cursor-pointer"
          onClick={onClose}
          sx={{
            py: 0.75,
            "&:hover": {
              bgcolor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          <CloseIcon
            sx={{
              fontSize: 18,
              mr: 1,
              color: "#666",
            }}
          />
          <ListItemText
            primary="İptal"
            primaryTypographyProps={{
              sx: {
                fontSize: "0.875rem",
                fontWeight: 500,
              },
            }}
          />
        </ListItem>
      </List>
    </Paper>
  );
}

// MapEvents bileşeni
function MapEvents({ onContextMenu }) {
  useMapEvents({
    contextmenu: (e) => {
      e.originalEvent.preventDefault();
      onContextMenu(e);
    },
    click: () => {
      onContextMenu(null);
    },
  });
  return null;
}

// API URL'ini dinamik hale getir
const API_URL = `http://${window.location.hostname}:5001/api`;

function Map() {
  const [position, setPosition] = useState([37.8719, 32.4983]);
  const [coordinates, setCoordinates] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState(null);
  const [tempLatLng, setTempLatLng] = useState(null);
  const [routePolyline, setRoutePolyline] = useState(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);

  // URL'den koordinatları al ve işle
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const coords = searchParams.get("coordinates");

    if (coords) {
      // Format: "lat1,lng1;lat2,lng2;lat3,lng3"
      const points = coords.split(";").map((point) => {
        const [lat, lng] = point.split(",").map(Number);
        return [lat, lng];
      });
      setCoordinates(points);

      // İlk noktayı merkez olarak al
      if (points.length > 0) {
        setPosition(points[0]);
      }
    }
  }, [location]);

  // Kullanıcı konumunu al
  useEffect(() => {
    if (!coordinates.length && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Konum alınamadı:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, [coordinates]);

  const updateURL = (newCoordinates) => {
    const coordString = newCoordinates
      .map((coord) => `${coord[0]},${coord[1]}`)
      .join(";");
    navigate(`/?coordinates=${coordString}`);
  };

  const handleRemoveCoordinate = (index) => {
    const newCoordinates = coordinates.filter((_, i) => i !== index);
    setCoordinates(newCoordinates);
    updateURL(newCoordinates);
  };

  const handleAddCoordinate = (e) => {
    e.preventDefault();
    const coordInput = e.target.coordinates.value.trim();
    const [lat, lng] = coordInput
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    if (!isNaN(lat) && !isNaN(lng)) {
      const formattedCoord = [formatCoordinate(lat), formatCoordinate(lng)];
      const newCoordinates = [...coordinates, formattedCoord];
      setCoordinates(newCoordinates);
      updateURL(newCoordinates);
      e.target.reset();
    }
  };

  const handleCopyCoordinates = () => {
    const coordString = coordinates
      .map((coord) => `${coord[0]}, ${coord[1]}`)
      .join("\n");
    navigator.clipboard.writeText(coordString);
  };

  // Context menu işleyicileri
  const handleContextMenu = (e) => {
    if (!e) {
      setContextMenu(null);
      setTempLatLng(null);
      return;
    }

    setContextMenu({
      x: e.originalEvent.pageX,
      y: e.originalEvent.pageY,
    });
    setTempLatLng([e.latlng.lat, e.latlng.lng]);    
  };

  const handleAddToRoute = () => {
    if (tempLatLng) {
      const formattedCoord = tempLatLng.map(coord => formatCoordinate(coord));
      const newCoordinates = [...coordinates, formattedCoord];
      setCoordinates(newCoordinates);
      updateURL(newCoordinates);
    }
    setContextMenu(null);
    setTempLatLng(null);
  };

  const handleCopyCoords = () => {
    if (tempLatLng) {
      navigator.clipboard.writeText(`${tempLatLng[0]}, ${tempLatLng[1]}`);
    }
    setContextMenu(null);
    setTempLatLng(null);
  };

  // Rota hesaplama fonksiyonu
  const calculateRoute = async () => {
    if (coordinates.length < 2) return;

    setIsLoadingRoute(true);
    try {
      const response = await fetch(`${API_URL}/route/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates }),
      });

      const data = await response.json();

      if (data.success) {
        setRoutePolyline(data.data.coordinates);
        setRouteInfo({
          distance: (data.data.distance / 1000).toFixed(2), // km cinsinden
          duration: Math.round(data.data.duration / 60) // dakika cinsinden
        });
      } else {
        console.error('Rota hesaplanamadı:', data.message);
      }
    } catch (error) {
      console.error('API hatası:', error);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  // Koordinatlar değiştiğinde rotayı otomatik hesapla
  useEffect(() => {
    if (coordinates.length >= 2) {
      calculateRoute();
    } else {
      setRoutePolyline(null);
    }
  }, [coordinates]);

  // handleDragEnd fonksiyonunu ekleyelim (Map bileşeni içinde)
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(coordinates);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCoordinates(items);
    updateURL(items);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Paper
          elevation={3}
          className={`md:w-[30vw] lg:w-[25vw] w-full flex flex-col ${
            isSidebarOpen ? "" : "hidden"
          }`}
          sx={{
            borderRadius: 0,
            overflow: "hidden",
          }}
        >
          {/* Başlık ve Kopyalama Butonu */}
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              mb: routeInfo ? 2 : 0
            }}>
              <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600 }}>
                Koordinatlar
              </Typography>
              <IconButton
                size="small"
                onClick={handleCopyCoordinates}
                sx={{ padding: 0.5 }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Rota Bilgileri */}
            {routeInfo && (
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                mt: 2,
                p: 2,
                bgcolor: '#f8fafc',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <Box sx={{ 
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#f1f5f9'
                  }
                }}>
                  <StraightIcon sx={{ color: '#1976d2', transform: 'rotate(90deg)' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Toplam Mesafe
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', fontSize: '1.1rem' }}>
                      {routeInfo.distance} km
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1,
                  borderRadius: 1,
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: '#f1f5f9'
                  }
                }}>
                  <TimelapseIcon sx={{ color: '#1976d2' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                      Tahmini Süre
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', fontSize: '1.1rem' }}>
                      {routeInfo.duration} dk
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>

          {/* Koordinat Ekleme Formu */}
          <Box
            component="form"
            onSubmit={handleAddCoordinate}
            sx={{
              p: 1.5,
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                name="coordinates"
                placeholder="37.8719, 32.4983"
                size="small"
                fullWidth
                required
                InputProps={{
                  sx: {
                    bgcolor: "white",
                    height: "32px",
                    "& .MuiOutlinedInput-input": {
                      padding: "6px 10px",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{
                  minWidth: "unset",
                  px: 3,
                  bgcolor: "#1976d2",
                  "&:hover": {
                    bgcolor: "#1565c0",
                  },
                }}
              >
                EKLE
              </Button>
            </Box>
          </Box>

          {/* Koordinat Listesi */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="coordinates">
              {(provided) => (
                <List
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    flex: 1,
                    overflow: "auto",
                    p: 0,
                  }}
                >
                  {coordinates.map((coord, index) => (
                    <Draggable 
                      key={`${coord[0]}-${coord[1]}`} 
                      draggableId={`${coord[0]}-${coord[1]}`} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          disablePadding
                          sx={{
                            bgcolor: index === 0
                              ? "rgba(34, 197, 94, 0.08)"
                              : index === coordinates.length - 1
                              ? "rgba(239, 68, 68, 0.08)"
                              : "#fff",
                            "&:hover": {
                              bgcolor: index === 0
                                ? "rgba(34, 197, 94, 0.15)"
                                : index === coordinates.length - 1
                                ? "rgba(239, 68, 68, 0.15)"
                                : "rgba(0, 0, 0, 0.04)",
                            },
                            ...(snapshot.isDragging && {
                              bgcolor: '#e3f2fd',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }),
                            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                            transition: 'all 0.2s',
                          }}
                        >
                          <Box sx={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            py: 1,
                            px: 2,
                          }}>
                            <div {...provided.dragHandleProps}>
                              <DragIndicatorIcon sx={{ 
                                color: 'text.secondary',
                                opacity: 0.5,
                                cursor: 'grab',
                                '&:hover': {
                                  opacity: 1
                                }
                              }} />
                            </div>
                            <PlaceIcon sx={{ 
                              color: index === 0
                                ? "#22C55E"
                                : index === coordinates.length - 1
                                ? "#EF4444"
                                : "#3B82F6",
                              fontSize: 20
                            }} />
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "0.875rem",
                                  color: index === 0
                                    ? "#22C55E"
                                    : index === coordinates.length - 1
                                    ? "#EF4444"
                                    : "#3B82F6",
                                }}
                              >
                                {index === 0
                                  ? "Başlangıç"
                                  : index === coordinates.length - 1
                                  ? "Bitiş"
                                  : `Durak ${index}`}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "text.secondary",
                                  fontSize: "0.8rem",
                                  fontFamily: "monospace"
                                }}
                              >
                                {`${coord[0]}, ${coord[1]}`}
                              </Typography>
                            </Box>
                            <Box sx={{ 
                              display: "flex", 
                              gap: 0.5,
                              opacity: 0.5,
                              transition: 'opacity 0.2s',
                              '&:hover': {
                                opacity: 1
                              }
                            }}>
                              <IconButton
                                size="small"
                                onClick={() => navigator.clipboard.writeText(`${coord[0]}, ${coord[1]}`)}
                                sx={{ 
                                  padding: 0.5,
                                  '&:hover': { 
                                    bgcolor: 'rgba(25, 118, 210, 0.08)',
                                    color: '#1976d2'
                                  }
                                }}
                              >
                                <ContentCopyIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                onClick={() => handleRemoveCoordinate(index)}
                                size="small"
                                sx={{ 
                                  padding: 0.5,
                                  '&:hover': { 
                                    bgcolor: 'rgba(239, 68, 68, 0.08)',
                                    color: '#ef4444'
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>

          {/* Rota Durumu */}
          {isLoadingRoute && (
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">
                Rota hesaplanıyor...
              </Typography>
            </Box>
          )}
        </Paper>

        {/* Toggle Sidebar Button */}
        <IconButton
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: isSidebarOpen
              ? {
                  xs: "100vw", // mobil
                  md: "30vw", // tablet
                  lg: "25vw", // desktop
                }
              : 10,
            transform: isSidebarOpen ? "translateX(-40px)" : "none",
            zIndex: 1000,
            bgcolor: "white",
            borderRadius: "4px",
            padding: "8px",
            boxShadow: 2,
            transition: "left 0.3s ease",
            "&:hover": {
              bgcolor: "grey.100",
            },  
          }}
        >
          {isSidebarOpen ? "←" : "→"}
        </IconButton>

        {/* Map */}
        <div className="flex-1">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            attributionControl={false}
            zoomControl={false}
            style={{ width: "100%", height: "100%" }}
          >
            <MapEvents onContextMenu={handleContextMenu} />
            <ZoomControl position="bottomright" />
            <ChangeView center={position} coordinates={coordinates} />
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
            />
            
            {/* Markerları ekleyelim */}
            {coordinates.map((coord, index) => {
              let markerColor = '#3B82F6'
              let showNumber = true
              let title = `${index}. Nokta`

              if (index === 0) {
                markerColor = '#22C55E'
                showNumber = false
                title = 'Başlangıç Noktası'
              } else if (index === coordinates.length - 1) {
                markerColor = '#EF4444'
                showNumber = false
                title = 'Bitiş Noktası'
              }

              return (
                <Marker
                  key={index}
                  position={coord}
                  icon={generateQuantitiyMarker(showNumber ? index : '', markerColor)}
                  draggable={true}
                  eventHandlers={{
                    dragend: (e) => {
                      const marker = e.target;
                      const position = marker.getLatLng();
                      const newCoordinates = [...coordinates];
                      newCoordinates[index] = [
                        formatCoordinate(position.lat),
                        formatCoordinate(position.lng)
                      ];
                      setCoordinates(newCoordinates);
                      updateURL(newCoordinates);
                    },
                  }}
                >
                  <Popup>
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{title}</span>
                        <IconButton
                          size="small"
                          onClick={() => navigator.clipboard.writeText(`${coord[0]},${coord[1]}`)}
                          sx={{ 
                            padding: 0.5,
                            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                          }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </div>
                      <div className="text-sm text-gray-600 font-mono">
                        {`${coord[0]},${coord[1]}`}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            })}

            {coordinates.length > 1 && routePolyline && (
              <Polyline
                positions={routePolyline}
                color="#3B82F6"
                weight={5}
                opacity={1}
              />
            )}
          </MapContainer>

          {/* Context Menu */}
          {contextMenu && (
            <ContextMenu
              position={contextMenu}
              onClose={() => setContextMenu(null)}
              onAddToRoute={handleAddToRoute}
              onCopyCoords={handleCopyCoords}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Map;
