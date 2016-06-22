'use strict';

const express = require('express');
const app = express();
const path = require('path');
const dateService = require('./dateService.js');
const logicService = require('./logicService.js');

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect(`/${dateService.getCurrentDate()}`);
});

app.get('/:month/:day', (req, res) => {
    dateService.isBizCaz(req.params.month, req.params.day, (isBizCaz) => {
        let data = logicService.getData(isBizCaz);
        res.render('index', data);
    });
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});