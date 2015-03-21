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
                if (trs[i].innerHTML.search(subText) == -1) {
                    trs[i].style.display = "none";
                } else {
                    trs[i].style.display = "";
                    trs[i].className = "match";
                }
            }
        }

        function changeCss(table, subText) {
            var tbody = table.getElementsByTagName("tbody")[0];
            var trs = tbody.getElementsByClassName("match");
            for (var i = 0; i < trs.length; i++) {
                // alert(trs[i].innerHTML);
                if (i % 2 == 1) {
                    highLight(trs[i], subText);
                }
            }
        }

        function highLight(tr, subText) {
            
        }
    }
}