const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const INSTANCE = process.env.INSTANCE || 'unknown';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [INSTANCE-${INSTANCE}] ${req.method} ${req.path} - User Agent: ${req.get('user-agent')}`);
  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    instance: INSTANCE,
    port: PORT,
    environment: NODE_ENV,
    hostname: os.hostname(),
    timestamp: new Date().toISOString()
  });
});

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  const timestamp = new Date().toISOString();
  console.log('\n' + '='.repeat(70));
  console.log(`[${timestamp}] 🚀 SERVER STARTED`);
  console.log('='.repeat(70));
  console.log(`📦 Container Instance: INSTANCE-${INSTANCE}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🏠 Hostname: ${os.hostname()}`);
  console.log(`⚙️  Environment: ${NODE_ENV}`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/health`);
  console.log('='.repeat(70) + '\n');
});
