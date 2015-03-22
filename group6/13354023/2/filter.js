/*
 * Project: hw3
 *
 * File: filter.js
 *
 * Author: Junhong Chen
 *
 * Created: 15/03/21
 *
 */

 window.onload = function() {
  makeAllTablesFilterable(getAllTables());
};

/* Name: getAllTables
 * Pre: None
 * Post: Return all table DOM in the page */
function getAllTables() {
  return document.getElementsByTagName('table');
}

/* Name: makeAllTablesFilterable
 * Pre: All table DOM 'tables' in the page
 * Post: All table DOM is filterable
 * Uses: makeFilterable, markEvenRow */
function makeAllTablesFilterable(tables) {
  for (var i = 0; i < tables.length; i++) {
    tables[i] = makeFilterable(tables[i]);
    markEvenRow(tables[i]);
  }
}

/* Name makeFilterable
 * Pre: A table DOM 'table'
 * Post: The table DOM is filterable
 * Uses: markEvenRow*/
function makeFilterable(table) {
  // Set filter text block
  var filterRow = table.insertRow(0);
  var filterCellLabel = filterRow.insertCell(0);
  var filterCellContent = filterRow.insertCell(1);
  var filterTextBlock = document.createElement('input');
  filterCellLabel.innerHTML = "Filter: ";
  filterTextBlock.setAttribute('type', 'text');
  filterCellContent.appendChild(filterTextBlock);
  // Filter the table
  filterTextBlock.onblur = function() {
    var filterText = filterTextBlock.value, rawText = '';
    var row = table.rows;
    var index = 0, rowVisible = false;
    for (var i = 2; i < row.length; i++) {  // Scan row
      rowVisible = filterText === '' ? true: false;
      for (var j = 0; j < row[i].cells.length; j++) {  // Scan cells in row
        var pattern = new RegExp('(<(\/)?span>)');
        row[i].cells[j].innerHTML = row[i].cells[j].innerHTML.replace(pattern, '');
        rawText = row[i].cells[j].innerHTML;
        var check = function(i, j) {
          if (rawText.search(filterText) >= 0) {
            index = rawText.search(filterText);
            row[i].cells[j].innerHTML = rawText.substring(0, index) + '<span>' + rawText.substring(index, index + filterText.length) + '</span>' + rawText.substring(index + filterText.length, rawText.length);
            return rowVisible = true;
          }
        }(i, j);
      }
      row[i].style.display = rowVisible? '' : 'none';
    }
    markEvenRow(table);
  };
  return table;
 }

 /* Name: markEvenRow
  * Pre: DOM Object 'table'
  * Post: Even rows of visible part of 'table' has been marked */
function markEvenRow(table) {
  var pattern = new RegExp('(^|\\s)*alternate(\\s|$)*');
  for (var i = 2, visibleRow = 1; i < table.rows.length; i++) {
    if (table.rows[i].style.display !== 'none') {
      if (visibleRow % 2) {  // Odd Row
        table.rows[i].className = table.rows[i].className.replace(pattern, '');
      } else if(!pattern.test(table.rows[i].className)) {  // Even Row
        table.rows[i].className += ' alternate';
      }
      visibleRow++;
    }
  }
}