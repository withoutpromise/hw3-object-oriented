(function() {

    var getAllTables = function() {
        return document.getElementsByTagName('table');
    };

    var makeAllTablesFilterable = function(tables) {
        for (var tableIndex in tables) {
            if (!isNaN(tableIndex)) {
                var input = document.createElement('input');
                tables[tableIndex].parentNode.insertBefore(input, tables[tableIndex]);
                addEventHandler(tables[tableIndex], input);
            }
        }
    };

    var addEventHandler = function(table, input) {
        input.oninput = function() {
            var inputValue = input.value;
            matchAndHideAlongWithHighlightTheMatchedText(table, inputValue);
        };
    };

    var matchAndHideAlongWithHighlightTheMatchedText = function(table, inputValue) {
        var trs = table.getElementsByTagName('tr');
        for (var trIndex in trs) {
            if (!isNaN(trIndex) && trIndex !== "0") {
                var tds = trs[trIndex].getElementsByTagName('td');
                var matched = false;
                for (var tdIndex in tds) {
                    if (!isNaN(tdIndex)) {
                        clearHightlight(tds[tdIndex]);
                        if (tds[tdIndex].innerHTML.indexOf(inputValue) >= 0) {
                            matched = true;
                            highlightText(tds[tdIndex], inputValue);
                        }
                    }
                }
                trs[trIndex].style.display = matched ? 'table-row' : 'none';
            }
        }
    };

    var clearHightlight = function(td) {
        var clearString = td.innerHTML.replace(/<[^>]+>/g, "");
        td.innerHTML = clearString;
    };

    var highlightText = function(td, inputValue) {
        var innerHTML = td.innerHTML;
        var index = innerHTML.indexOf(inputValue);
        td.innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + inputValue.length) + "</span>" + innerHTML.substring(index + inputValue.length, innerHTML.length);
    };

    var tables = getAllTables();
    makeAllTablesFilterable(tables);

})();
