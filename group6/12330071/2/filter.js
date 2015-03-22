/*
 * Author: Yuheng Deng
 * Date: 2015-03-12
 * Update: 2015-03-20
 * E-mail: dengyh071@gmail.com
 * Description: The javascript to make the table sortable
 */


// These four functions are from last homework
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

function getAllTables() {
    var tables;
    tables = document.getElementsByTagName('table');
    return tables;
}

function makeAllTablesSortable(tables) {
    dealAllTablesByGivenFunction(tables, addSortEventToTable);
    return tables;
}

function dealAllTablesByGivenFunction(tables, func) {
    for (var i = 0; i < tables.length; i++) {
        func(tables[i]);
    }
}

// 3.20 update
// Add a function to make table filterable
function makeAllTablesFilterable(tables) {
    dealAllTablesByGivenFunction(tables, addFilterToTable);
}

function addFilterToTable(table) {
    var inputFilter = createFilterInputBox(table);
    addEventToFilter(inputFilter, table);
}

function createFilterInputBox(table) {
    var inputFilter = document.createElement('input');
    inputFilter.type = 'text';
    table.insertBefore(inputFilter);
    return inputFilter;
}

function addEventToFilter(inputFilter, table) {
    inputFilter.addEventListener('change', function() {
        clearHightLightWord(table);
        var word = inputFilter.value;
        screenWordInTable(word, table);
    });
}

function clearHightLightWord(table) {
    var tableCells = table.getElementsByTagName('td');
    var regex = /<span class="hight-light">(.+)<\/span>/g;
    for (var i = 0; i < tableCells.length; i++) {
        tableCells[i].innerHTML = tableCells[i].innerHTML.replace(regex, '$1');
    }
}

function screenWordInTable(word, table) {
    var tableBody = table.getElementsByTagName('tbody')[0];
    var tableRows = tableBody.getElementsByTagName('tr');
    for (var i = 0; i < tableRows.length; i++) {
        dealTableRowByWord(word, tableRows[i]);
    }
}

function dealTableRowByWord(word, tableRow) {
    var tableCells = tableRow.getElementsByTagName('td');
    var matchFlag = false;
    for (var i = 0; i < tableCells.length; i++) {
        if (tableCells[i].innerHTML.search(word) !== -1) {
            matchFlag = true;
            if (word !== '') {
                hightLightTheWord(word, tableCells[i]);
            }
        }
    }
    if (matchFlag === false) {
        tableRow.style.display = 'none';
    } else {
        tableRow.style.display = 'table-row';
    }
}

function hightLightTheWord(word, tableCell) {
    var regex = new RegExp(word, 'g');
    tableCell.innerHTML = tableCell.innerHTML.replace(regex, '<span class="hight-light">' + word + '</span>');
}