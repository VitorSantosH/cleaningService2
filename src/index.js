const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


// instancia express
const app = express();
const port = 433;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/', express.static("build") );




app.listen(port, () => {
    console.log("servidor funcionando na porta: " + port)
})