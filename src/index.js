const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');

// Instancia express
const app = express();
const port = 443; // Porta padrão para HTTPS

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', express.static('build'));

// Configurações para HTTPS
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/cleaningservicesperfect.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/cleaningservicesperfect.com/fullchain.pem')
};

// Cria servidor HTTPS
const server = https.createServer(options, app);

console.log(options)
console.log(server)

server.listen(port, () => {
  console.log('Servidor funcionando na porta: ' + port);
});