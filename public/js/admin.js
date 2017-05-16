var buttonValues = ["N/A", "No", "Yes"];
(function () {
    "use strict";

    getData();
    attachEvents();

    function attachEvents() {
        $(document).on("change", "input[type=radio]", function (e) {
            var date = e.currentTarget.dataset.date;
            var bizcaz = e.currentTarget.dataset.bizcaz;
            updateBizCazValue(date, bizcaz);
        });

        // $("#prevMonth").on("click", function () {
        //     var urlInfo = getInfoFromUrl();
        //     var month = urlInfo.month;
        //     var year = urlInfo.year;

        //     if (month == 1) {
        //         month == 12;
        //         year == 1;
        //     }
        //     else
        //         month--;

        //     var newAdminUrl = location.host + "/admin/" + month + "/" + year;

        //     window.location = newAdminUrl
        // })
    }


    function getData() {
        var urlInfo = getInfoFromUrl();

        var baseUrl = "/api/getMonthData/";
        var month = urlInfo.month;
        var year = urlInfo.year;
        var path = month + "/" + year;

        var ajaxPath = baseUrl + path;

        $.get(ajaxPath, function (res) {
            buildDateTable(res, month, year);
        })
    }

    function getInfoFromUrl() {
        var pathName = location.pathname;

        var month = pathName.substring(7, 8);
        var year = pathName.substr(9, 12);

        return {
            month: month,
            year: year
        }
    }


    function buildDateTable(dateData, month, year) {
        var tableHtml = "";
        for (var i = 0; i < dateData.length; i++) {
            var day = i + 1;
            var date = month + "/" + day + "/" + year;
            var rowHtml = buildRowHTML(date, dateData[i]);
            tableHtml += rowHtml;
        }
        $("#datesBody").html(tableHtml);
    }

    function buildRowHTML(date, isBizCaz) {
        var html = "<tr>";
        html += "<td>" + date + "</td>";
        html += "<td>" + getMenu(isBizCaz, date) + "</td>";
        html += "</tr>";
        return html;
    }
    function getMenu(isBizCaz, date) {
        var menuHTML = "<div class=\"btn-group\" data-toggle=\"buttons\">";

        for (var i = 2; i >= 0; i--) {
            var bizcazValue = i - 1;
            var isActiveButton = bizcazValue == isBizCaz;
            var buttonValue = buttonValues[i];
            menuHTML += createButtonMenu(isActiveButton, buttonValue, date, bizcazValue);
        }

        menuHTML += "</div>";
        return menuHTML;
    }

    function createButtonMenu(isActiveButton, buttonValue, date, bizcazValue) {
        var buttonMenu = "";

        buttonMenu += "<label class=\"btn btn-primary ";
        if (isActiveButton)
            buttonMenu += "active";
        buttonMenu += "\">";


        buttonMenu += "<input type=\"radio\" name=\"options\"";
        buttonMenu += " data-date=\"" + date + "\" data-bizcaz=\"" + bizcazValue + "\" ";
        if (isActiveButton)
            buttonMenu += "checked";
        buttonMenu += " > ";

        buttonMenu += buttonValue;

        buttonMenu += "</label>";

        return buttonMenu;

    }

    function updateBizCazValue(date, value) {
        var url = "/api/upateBizCazValue/";
        var data = {
            date: date,
            value: value
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
})()