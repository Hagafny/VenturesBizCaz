'use strict';

const express = require('express');
const app = express();
const path = require('path');
const dateService = require('./dateService.js');
const logicService = require('./logicService.js');
const port = 8000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    var currentMonth = new Date().getMonth() + 1;
    var currentDay = new Date().getDate();
    res.redirect(`/${currentMonth}/${currentDay}`);
});

app.get('/:month/:day', (req, res) => {
    dateService.isBizCaz(req.params.month, req.params.day, (isBizCaz) => {
        let data = logicService.getData(isBizCaz);
        res.render('index', data);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

