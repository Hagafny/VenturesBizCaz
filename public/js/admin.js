import HTMlTableBuilder from "./htmlTableBuilderService";

getData();
attachEvents();

function getData() {
    var urlInfo = getInfoFromUrl();
    var baseUrl = "/api/getMonthData/";
    var month = urlInfo.month;
    var year = urlInfo.year;
    var path = month + "/" + year;

    var ajaxPath = baseUrl + path;

    $.get(ajaxPath, function (res) {
        HTMlTableBuilder(res, month, year);
    });
}

function attachEvents() {
    $(document).on("change", "input[type=radio]", onRadioButtonChange);
    $("#prevMonth").click(prevMonth);
    $("#nextMonth").click(nextMonth);
}

function prevMonth(e) {
    let urlInfo = getInfoFromUrl();
    var month = urlInfo.month;
    var year = urlInfo.year;

    if (month == 1) {
        month = 12;
        year -= 1;
    }
    else
        month--;

    redirectToAnotherMonth(month, year);
}

function nextMonth(e) {
    var urlInfo = getInfoFromUrl();
    var month = urlInfo.month;
    var year = urlInfo.year;
    if (month == 12) {
        month = 1;
        year += 1;
    }
    else
        month++;

    redirectToAnotherMonth(month, year);
}

function redirectToAnotherMonth(month, year) {
    window.location.href = "/admin/" + month + "/" + year;
}

function getInfoFromUrl() {
    var pathName = location.pathname.substr(7); //remove the /admin/ part
    var indexOfSlash = pathName.indexOf('/');
    var month = pathName.substring(0, indexOfSlash);
    var year = pathName.substring(indexOfSlash + 1);

    return {
        month: parseInt(month, 10),
        year: parseInt(year, 10)
    };
}

function onRadioButtonChange(e) {
    var date = e.currentTarget.dataset.date;
    var bizcaz = e.currentTarget.dataset.bizcaz;
    var notes = $("textarea[data-date='" + date + "']").val();
    
    updateBizCazValue(date, bizcaz, notes);
}

function updateBizCazValue(date, value, notes) {
    var url = "/api/upateBizCazValue/";
    var data = {
        date: date,
        value: value,
        notes: notes
    };
    data = JSON.stringify(data);

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        },
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}