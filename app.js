const express = require('express');
const bodyParser = require('body-parser');
const turf = require('turf');
const {generateLine} = require('./generateLine.js');
const fs =  require('fs');

const app = express();

// Middleware
app.use(bodyParser.json());

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
  
    // Check if the Authorization header exists and has a valid value
    if (!authHeader || authHeader !== 'YOUR_AUTH_TOKEN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    // Authorization successful
    next();
  };
  

  
  app.post('/intersections', authMiddleware, (req, res) => {
    const linestring = req.body.linestring;
  
    // Check if the linestring is provided and is valid GeoJSON
    if (!linestring || !turf.lineString(linestring)) {
      return res.status(400).json({ error: 'Invalid linestring' });
    }
  
    // Creating a new linestring from the provided string
    const feature = turf.lineString(linestring);
    console.log(feature);
  
    // Generating an array of intersecting line IDs and points of intersection
    const intersectingLines = [];
    let id = 'id'
    const lines = generateLine();
    console.log(JSON.stringify(lines[0].geometry.coordinates));
    fs.writeFileSync('line.json', JSON.stringify(lines));
  
    for (let i = 0; i < lines.length; i += 2) {
        const poly1 = lines[i];
        const poly2 = lines[i + 1];
      const intersect = turf.intersect(poly1, poly2);
        console.log(intersect);
      if (intersect?.type==='Feature') {
        const intersectionPoint = intersect?.geometry?.coordinates;
        const lineId = `${poly1.properties.id}-${poly2.properties.id}`;
  
        intersectingLines.push({ lineId, intersectionPoint });
      }
    }
  
    // Return the result
    if (intersectingLines.length === 0) {
      return res.json([]);
    } else {
      return res.json(intersectingLines);
    }
  });
  
  const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
