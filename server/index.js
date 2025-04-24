const express = require("express");
const app = express();
const port = 4051;

const bodyParser=require("body-parser")
const cors=require("cors")
const db=require("./DBConnection")
const jwt=require("jsonwebtoken")

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use( express.static(`${__dirname}/upload`));

const route=require('./routes')
app.use('/bank_app_api',route)

app.listen(port,()=>{
    console.log(
    `${port} port is created`
    );
})