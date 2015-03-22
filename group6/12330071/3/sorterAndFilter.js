/*
 * Author: Yuheng Deng
 * Date: 2015-03-12
 * Update: 2015-03-20
 * E-mail: dengyh071@gmail.com
 * Description: The javascript to make the table sortable
 */

var hasPicture = true;

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortableAndFilterable(tables);
}

function getAllTables() {
    var tables;
    tables = document.getElementsByTagName('table');
    return tables;
}

function makeAllTablesSortableAndFilterable(tables) {
    dealAllTablesByGivenFunction(tables, makeSortable, makeFilterable);
}

function dealAllTablesByGivenFunction(tables, func1, func2) {
    for (var i = 0; i < tables.length; i++) {
        func1(func2(tables[i]));
    }
}

function makeSortable(table) {
    var tableHeads = table.getElementsByTagName('th');
    for (var i = 0; i < tableHeads.length; i++) {
        (function() {
            addSortEventToTableHead(i, tableHeads, table);
        })();
    }
    return table;
}

function addSortEventToTableHead(column, tableHeads, table) {
    var columnCount = tableHeads.length;
    tableHeads[column].addEventListener('click', function() {
        if (tableHeads[column].id === '' || tableHeads[column].id === 'descend') {
            tableHeads[column].id = 'ascend';
        } else {
            tableHeads[column].id = 'descend';
        }
        var sortType = tableHeads[column].id;
        sortTableByColumn(column, columnCount, table, sortType);
        if (typeof(hasPicture) !== 'undefined' && hasPicture) {
            changeTableHeadStyle(column, tableHeads, sortType);
        }
    });
    tableHeads[column].style.cursor = 'pointer';
}

function sortTableByColumn(column, columnCount, table, sortType) {
    var tableDataList = getDataFromTable(columnCount, table);
    sortTable(column, columnCount, tableDataList, sortType);
}

function getDataFromTable(columnCount, table) {
    var dataCells = table.getElementsByTagName('td');
    var dataList = [];
    var rowData;
    for (var i = 0; i < dataCells.length; i++) {
        rowData = [];
        for (var j = 0; j < columnCount; j++) {
            rowData.push(dataCells[i + j]);
        }
        i += columnCount - 1;
        dataList.push(rowData);
    }
    return dataList;
}

function sortTable(column, columnCount, tableDataList, sortType) {
    for (var i = 0; i < tableDataList.length - 1; i++) {
        for (var j = i + 1; j < tableDataList.length; j++) {
            var swapFlag = tableDataList[i][column].innerHTML > tableDataList[j][column].innerHTML;
            if (sortType === 'descend') {
                swapFlag = !swapFlag;
            }
            if (swapFlag) {
                swapRow(tableDataList[i], tableDataList[j], columnCount);
            }
        }
    }
}

function swapRow(row1, row2, columnCount) {
    for (var i = 0; i < columnCount; i++) {
        var temp = row1[i].innerHTML;
        row1[i].innerHTML = row2[i].innerHTML;
        row2[i].innerHTML = temp;
        var display = row1[i].style.display;
        row1[i].style.display = row2[i].style.display;
        row2[i].style.display = display;
    }
}

function changeTableHeadStyle(column, tableHeads, sortType) {
    initializeTableHeadStyle(tableHeads, column);
    tableHeads[column].style.backgroundColor = 'rgba(165,175,255,1)';
    tableHeads[column].style.paddingRight = '0';
    var image = document.createElement('img');
    image.style.float = 'right';
    image.style.marginRight = '4px';
    image.style.marginLeft = '4px';
    image.src = sortType + '.png';
    image.id = 'sort-type';
    tableHeads[column].appendChild(image);
}

function initializeTableHeadStyle(tableHeads, column) {
    for (var i = 0; i < tableHeads.length; i++) {
        var images = tableHeads[i].getElementsByTagName('img');
        for (var j = 0; j < images.length; j++) {
            tableHeads[i].removeChild(images[j]);
        }
        tableHeads[i].style.paddingRight = '24px';
        tableHeads[i].style.backgroundColor = 'rgba(3,3,128,1)';
        // Clear the status of the last click event of another column
        if (column !== i) {
          tableHeads[i].id = '';
        }
    }
}

// 3.22 update
// Add a function to make table filterable

function makeFilterable(table) {
    var inputFilter = createFilterInputBox(table);
    addEventToFilter(inputFilter, table);
    return table;
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
    var regex = /<span class="hight-light">(.+?)<\/span>/g;
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
    setBackgroundGrey(tableRows);
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
        for (var i = 0; i < tableCells.length; i++) {
            tableCells[i].style.display = 'none';
        }
    } else {
        for (var i = 0; i < tableCells.length; i++) {
            tableCells[i].style.display = 'table-cell';
        }
    }
}

function hightLightTheWord(word, tableCell) {
    var regex = new RegExp(word, 'g');
    tableCell.innerHTML = tableCell.innerHTML.replace(regex, '<span class="hight-light">' + word + '</span>');
}

function setBackgroundGrey(tableRows) {
    var displayCount = 0;
    for (var i = 0; i < tableRows.length; i++) {
        var tableCell = tableRows[i].getElementsByTagName('td')[0];
        if (tableCell.style.display === 'none') {
            continue;
        }
        displayCount++;
        if (displayCount % 2 === 0) {
            tableRows[i].style.backgroundColor = 'rgba(222,222,222,1)'
        } else {
            tableRows[i].style.backgroundColor = 'white';
        }
    }
}