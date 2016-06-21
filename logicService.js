'use strict';

function getData(isBizCaz) {
    let BizCazData = {};
    if (isBizCaz === null) {
        BizCazData.message = "Not available yet";
        BizCazData.image = "../img/unknown.jpg";
    }
    else if (isBizCaz) {
        BizCazData.message = "Yes! Suit Up!";
        BizCazData.image = "../img/suitup.jpg";
    }
    else {
        BizCazData.message = "No!";
        BizCazData.image = "../img/pajamas.jpg";
    }

    return BizCazData;
}

module.exports = {
    getData: getData
};