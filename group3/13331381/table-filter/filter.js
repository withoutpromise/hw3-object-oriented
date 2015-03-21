// call function
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

// get table elements from the web
function getAllTables() {
    return document.getElementsByTagName("table");
}

// make the table filterable
function makeAllTablesFilterable(tables) {
    var length = tables.length;
    for (var i = 0; i < length; i++) {
        makeATableFilterable(tables[i], i);
    }

    function makeATableFilterable(table, index) {
        var input = addInputElement(table);

        input.onchange = function(input, table) {
            return function () {
                var subText = input.value;
                if (subText != "") {
                    filterTable(table, subText);
                    changeCss(table, subText);
                }
            };
        }(input, table);

        function addInputElement(table) {
            var input = document.createElement("input");
            input.className = "subText";
            table.parentNode.insertBefore(input, table);
            return input;
        }

        function filterTable(table, subText) {
            var tbody = table.getElementsByTagName("tbody")[0];
            var trs = tbody.getElementsByTagName("tr");
            for (var i = 0; i < trs.length; i++) {
                // alert(trs[i].innerHTML);
            }
        }

        function changeCss(table, subText) {
            var tbody = table.getElementsByTagName("tbody")[0];
            var trs = tbody.getElementsByTagName("tr");
            for (var i = 0; i < trs.length; i++) {
                trs[i].className = "";
                if ((i+1) % 2 == 0) {       // set css style
                    trs[i],className = "alternate";
                }
                highLight(trs[i], subText);
            }
        }

        function highLight(tr, subText) {}
    }
}