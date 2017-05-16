var tableBuilderService;
var buttonValues = ["N/A", "No", "Yes"];
(function () {
    "use strict";
    var tableBuilder = function () {
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

        function buildRowHTML(date, data) {
            var bizCazValueLength = 1;
            var isBizCazVal = data[0];
            if (isBizCazVal == "-") {
                isBizCazVal += data[1];
                bizCazValueLength++;
            }

            var notes = data.substring(bizCazValueLength);

            var html = "<tr class=\"adminRow\">";
            html += "<td>" + date + "</td>";
            html += "<td>" + getMenu(date, isBizCazVal) + "</td>";
            html += "<td>" + getTextBox(date, notes) + "</td>";
            html += "</tr>";
            return html;
        }

        function getTextBox(date, notes) {
            var textAreaHtml = "<textarea rows=\"3\" cols=\"25\" data-date=\"" + date + "\">";
            textAreaHtml += notes;
            textAreaHtml += "</textarea>";
            return textAreaHtml;
        }

        function getMenu(date, isBizCazVal) {
            var menuHTML = "<div class=\"btn-group\" data-toggle=\"buttons\">";

            for (var i = 2; i >= 0; i--) {
                var bizcazValue = i - 1;
                var isActiveButton = bizcazValue == isBizCazVal;
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

        var service = {
            buildDateTable: buildDateTable
        }
        return service;
    }
    tableBuilderService = tableBuilder;
})()