export default function () {
    let buttonValues = ["N/A", "No", "Yes"];
    let buildDateTable = (dateData, month, year) => {
        let tableHtml = "";
        for (let i = 0; i < dateData.length; i++) {
            let day = i + 1;
            let date = month + "/" + day + "/" + year;
            let rowHtml = buildRowHTML(date, dateData[i]);
            tableHtml += rowHtml;
        }
        $("#datesBody").html(tableHtml);
    };

    let buildRowHTML = (date, data) => {
        let bizCazValueLength = 1;
        let isBizCazVal = data[0];
        if (isBizCazVal == "-") {
            isBizCazVal += data[1];
            bizCazValueLength++;
        }

        let notes = data.substring(bizCazValueLength);

        let html = "<tr class=\"adminRow\">";
        html += "<td>" + date + "</td>";
        html += "<td>" + getMenu(date, isBizCazVal) + "</td>";
        html += "<td>" + getTextBox(date, notes) + "</td>";
        html += "</tr>";
        return html;
    };

    let getTextBox = (date, notes) => {
        let textAreaHtml = "<textarea rows=\"3\" cols=\"25\" data-date=\"" + date + "\">";
        textAreaHtml += notes;
        textAreaHtml += "</textarea>";
        return textAreaHtml;
    };

    let getMenu = (date, isBizCazVal) => {
        let menuHTML = "<div class=\"btn-group\" data-toggle=\"buttons\">";

        for (let i = 2; i >= 0; i--) {
            let bizcazValue = i - 1;
            let isActiveButton = bizcazValue == isBizCazVal;
            let buttonValue = buttonValues[i];
            menuHTML += createButtonMenu(isActiveButton, buttonValue, date, bizcazValue);
        }

        menuHTML += "</div>";
        return menuHTML;
    };

    let createButtonMenu = (isActiveButton, buttonValue, date, bizcazValue) => {
        let buttonMenu = "";

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
    };

    let service = {
        buildDateTable: buildDateTable
    };

    return service;
}
