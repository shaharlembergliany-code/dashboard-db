const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.url === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', message: 'Backend API is running' }));
  } else if (req.url === '/api/data') {
    res.writeHead(200);
    res.end(JSON.stringify({
      kpis: { revenue: 125000, customers: 450, orders: 45, satisfaction: 4.7 }
    }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend API running on port ${PORT}`);
});
