const routeService = require('../services/route.service');

exports.calculateRoute = async (req, res) => {
  try {
    const { coordinates } = req.body;
    
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'En az 2 koordinat noktası gereklidir'
      });
    }

    const route = await routeService.getRoute(coordinates);
    
    res.json({
      success: true,
      data: route
    });
  } catch (error) {
    console.error('Route calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Rota hesaplanırken bir hata oluştu'
    });
  }
}; 