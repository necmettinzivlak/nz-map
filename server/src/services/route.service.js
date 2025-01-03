const axios = require('axios');
const polyline = require('@googlemaps/polyline-codec');

class RouteService {
  async getRoute(coordinates) {
    try {
      // Koordinatları OSRM formatına çevir
      const points = coordinates.map(coord => `${coord[1]},${coord[0]}`).join(';');
      
      // OSRM API'sini kullan
      const response = await axios.get(
        `http://router.project-osrm.org/route/v1/driving/${points}?overview=full&geometries=polyline`
      );

      if (!response.data.routes || !response.data.routes[0]) {
        throw new Error('Rota bulunamadı');
      }

      const route = response.data.routes[0];
      
      // Polyline'ı decode et
      const decodedPolyline = polyline.decode(route.geometry);

      return {
        distance: route.distance,
        duration: route.duration,
        coordinates: decodedPolyline.map(point => [point[0], point[1]])
      };
    } catch (error) {
      console.error('OSRM API error:', error);
      throw new Error('Rota hesaplanamadı');
    }
  }
}

module.exports = new RouteService(); 