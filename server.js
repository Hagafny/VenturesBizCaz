'use strict';

const express = require('express');
const app = express();
const path = require('path');
const dateService = require('./dateService.js');
const logicService = require('./logicService.js');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.get('/', (req, res) => {

    var currentMonth = new Date().getUTCMonth() + 1;
    var currentDay1 = new Date().toUTCString();
    var currentDay2 = new Date(currentDay1);

    currentDay2.setMinutes(currentDay1.getMinutes() + 180);

    res.redirect(`/${currentMonth}/${currentDay2}`);
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

