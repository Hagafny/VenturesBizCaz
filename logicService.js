'use strict';

function getData(isBizCaz) {
    let BizCazData = {};
    if (isBizCaz === null) {
        BizCazData.message = "N/A";   
        BizCazData.image = "../img/unknown.jpg";
    }
    else if (isBizCaz) {
        BizCazData.message = "YES";
        BizCazData.image = "../img/suitup.jpg";
    }
    else {
        BizCazData.message = "NO";
        BizCazData.image = "../img/pajamas.jpg";
    }

    return BizCazData;
}

module.exports = {
    getData: getData
};