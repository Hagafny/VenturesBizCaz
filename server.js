'use strict';

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dateService = require('./dateService.js');
const logicService = require('./logicService.js');
const favicon = require('serve-favicon');

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.get('/', (req, res) => {
    res.redirect(`/day/${dateService.getCurrentDate()}`);
});

app.get('/day/:month/:day/:year', (req, res) => {
    dateService.getBizCazData(req.params.month, req.params.day, req.params.year, (isBizCaz) => {

        let data = logicService.getData(req.params.month, req.params.day, req.params.year, isBizCaz);
        res.render('index', data);
    });
});

app.get('/admin', (req, res) => {
    res.redirect(`/admin/${dateService.getCurrentAdminDate()}`);
});

app.get('/admin/:month/:year', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
});

app.get('/api/getMonthData/:month/:year', (req, res) => {
    dateService.getMonthData(req.params.month, req.params.year, (monthData) => {
        res.json(monthData);
    });

});

app.post('/api/upateBizCazValue/', (req, res) => {
    dateService.upateBizCazValue(req.body.date, req.body.value, req.body.notes, (status) => {
        res.json({ status: status });
    });
});

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`);
});