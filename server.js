'use strict';

const express = require('express');
const app = express();
const path = require('path');
const dateService = require('./dateService.js');
const logicService = require('./logicService.js');
const favicon = require('serve-favicon');

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', (req, res) => {
    res.redirect(`/${dateService.getCurrentDate()}`);
});

app.get('/:month/:day', (req, res) => {
    getData(req.params.month, req.params.day, (data) => {
        res.render('index', data);
    });
});

function getData(month, day, cb) {
    dateService.isBizCaz(month, day, (isBizCaz) => {
        let data = logicService.getData(month, day, isBizCaz);
        cb(data);
    });
}

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});