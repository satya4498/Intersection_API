const turf = require('turf');

 module.exports.generateLine = () => {
    const lines = [];
  
    for (let i = 1; i <= 50; i++) {
      const start = generateRandomPoint();
      const end = generateRandomPoint();
  
      const line = turf.lineString([start, end]);
      line.properties = { id: `L${i.toString().padStart(2, '0')}` };
  
      lines.push(line);
    }
  
    return lines;
  }
  
  function generateRandomPoint() {
    const min = -180;
    const max = 180;
    const longitude = Math.random() * (max - min) + min;
    const latitude = Math.random() * (max - min) + min;
  
    return [longitude, latitude];
  }
  