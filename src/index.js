const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');
const https = require('https');
//const privateKey = fs.readFileSync('/etc/letsencrypt/live/cleaningservicesperfect.com/privkey.pem', 'utf8');
//const certificate = fs.readFileSync("/etc/letsencrypt/live/cleaningservicesperfect.com/fullchain.pem", 'utf8');

const credentials = {
    key: fs.readFileSync('/etc/letsencrypt/live/cleaningservicesperfect.com/privkey.pem', 'utf8'),
    cert: fs.readFileSync("/etc/letsencrypt/live/cleaningservicesperfect.com/fullchain.pem", 'utf8')
}

const certif2 = {
    key: fs.readFileSync("/etc/letsencrypt/live/vitorwebdev.com.br/privkey.pem", 'utf8'),
    cert: fs.readFileSync("/etc/letsencrypt/live/vitorwebdev.com.br/fullchain.pem", 'utf8')
};
//var credentials = { key: privateKey, cert: certificate };


// instancia express
const app = express();
const portHttp = 80;
const portHttpS = 443


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
//app.use('/', express.static("build"));
app.use("/", (req, res, next) => {
    console.log(req.headers.host)
    if (req.headers.host.includes('cleaningservicesperfect.com')) {
        // Servir o primeiro site a partir da pasta 'build'
        express.static('build')(req, res, next);


    } else if (req.headers.host.includes('vitorwebdev.com.br')) {
        // Servir o segundo site a partir da pasta 'dist'
        if (!req.secure) {
            const redirectTo = 'https://' + req.headers.host.replace(/:\d+$/, ':8443') + req.url;
            return res.redirect(redirectTo);
        }
        express.static('dist')(req, res,);
    } else {
        // Se o host não for correspondente a nenhum dos sites, retorne um erro ou redirecione conforme necessário.
        res.status(404).send('Site não encontrado');
    }
});


const httpServer = http.createServer(app);
const httpsServer2 = https.createServer(certif2, app);
const httpsServer1 = https.createServer(credentials, app);


httpServer.listen(portHttp, function () {
    console.log("JSON Server is running on " + portHttp);
});
httpsServer1.listen(portHttpS, function () {
    console.log("JSON Server is running on :" + portHttpS);
})
httpsServer2.listen(8443, function () {
    console.log('Second site is running on port 8443');
});



/*app.listen(port, () => {
    console.log("servidor funcionando na porta: " + port)
})
*/


/** ecosystem.config.js
 * module.exports = {
          apps: [
                      {
                              name: 'cleaningService2',
                                    script: 'src/index.js',
                                    env: {
                                                    NODE_ENV: 'production',
                                                    HTTPS: true,
                                                    SSL_KEY: '/etc/letsencrypt/live/cleaningservicesperfect.com/privkey.pem',
                                                    SSL_CERT: '/etc/letsencrypt/live/cleaningservicesperfect.com/fullchain.pem'
                                                  }
                                  }
                    ]
};
 */