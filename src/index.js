const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/cleaningservicesperfect.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync("/etc/letsencrypt/live/cleaningservicesperfect.com/fullchain.pem", 'utf8');
var credentials = { key: privateKey, cert: certificate };


// instancia express
const app = express();
const portHttp = 80;
const portHttpS = 443


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use('/', express.static("build"));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(portHttp, function () {
    console.log("JSON Server is running on " + portHttp);
});
httpsServer.listen(portHttpS, function () {
    console.log("JSON Server is running on :" + portHttpS);
})



/*app.listen(port, () => {
    console.log("servidor funcionando na porta: " + port)
})
*/