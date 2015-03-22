/*
 * Project: hw3
 *
 * File: sorter_filter.js
 *
 * Author: Junhong Chen
 *
 * Created: 15/03/21
 *
 */

window.onload = function() {
  makeAllTablesSortableAndFilterable(getAllTables());
};

/* Name: getAllTables
 * Pre: None
 * Post: Return all table DOM in the page */
function getAllTables() {
  return document.getElementsByTagName('table');
}

/* Name: makeAllTablesSortableAndFilterable
 * Pre: All table DOM 'tables' in the page
 * Post: All table DOM is sortable and filterable
 * Uses: makeFilterable, makeSortable */
function makeAllTablesSortableAndFilterable(tables) {
  for (var i = 0; i < tables.length; i++) {
    tables[i] = makeSortable(makeFilterable(tables[i]));
    markEvenRow(tables[i]);
  }
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

 /* Name: makeAllTablesSortable
 * Pre: All DOM Table 'tables'
 * Post: All table in 'tables' has been made sortable
 * Uses: makeSortable, markEvenRow */
function makeAllTablesSortable(tables) {
  for (var i = 0; i < tables.length; i++) {  // For each table in the page
    tables[i] = makeSortable(tables[i]);
    markEvenRow(tables[i]);
  }
}

/* Name makeSortable
 * Pre: A table DOM 'table'
 * Post: The table DOM is sortable
 * Uses: markEvenRow */
function makeSortable(table) {
  // loop index
  var i, j;

  // find head row
  var head_row = 0, head;
  if (table.rows[0].cells[0].innerHTML === 'Filter: ') head_row++;
  head = table.rows[head_row];

  // copy the data into an array to sort
  var contents = [];
  for (i = head_row + 1, j = 0; i < table.rows.length; i++) {
    contents[j++] = table.rows[i];
  }

  // clear the style of column cell
  var clearColumnStyle = function() {
    for (i = 0; i < head.cells.length; i++) {
      head.cells[i].className = head.cells[i].className.replace(p_ascend, '');
      head.cells[i].className = head.cells[i].className.replace(p_descend, '');
    }
  }

  // match pattern of order class
  var p_ascend = new RegExp('(^|\\s)*ascend(\\s|$)*');
  var p_descend = new RegExp('(^|\\s)*descend(\\s|$)*');

  // make table sort
  for (i = 0; i < head.cells.length; i++) {
    var setClick = function(i) {
      head.cells[i].onclick = function() {
        if (p_ascend.test(head.cells[i].className)) { // Already ascend
          clearColumnStyle();
          head.cells[i].className += ' descend';
          contents.sort(function(a, b) {
            if (isNaN(a.cells[i].innerHTML) || isNaN(b.cells[i].innerHTML)) {
              return b.cells[i].innerHTML.localeCompare(a.cells[i].innerHTML);
            } else {  // Sort for numbers
              return parseInt(b.cells[i].innerHTML, 10) - parseInt(a.cells[i].innerHTML, 10);
            }
          });
        } else {  // Already descend or has no order
          clearColumnStyle();
          head.cells[i].className += ' ascend';
          contents.sort(function(a, b) {
            if (isNaN(a.cells[i].innerHTML) || isNaN(b.cells[i].innerHTML)) {
              return a.cells[i].innerHTML.localeCompare(b.cells[i].innerHTML);
            } else {  // Sort for numbers
              return parseInt(a.cells[i].innerHTML, 10) - parseInt(b.cells[i].innerHTML, 10);
            }
          });
        }
        // Update the contents of the table
        for (j = 0; j < contents.length; j++) {
          table.appendChild(contents[j]);
        }
        markEvenRow(table);
      };
    }(i);
  }
  return table;
}

 /* Name: markEvenRow
  * Pre: DOM Object 'table'
  * Post: Even rows of visible part of 'table' has been marked */
function markEvenRow(table) {
  var pattern = new RegExp('(^|\\s)*alternate(\\s|$)*');
  var i = 0, visibleRow = 1;
  if (table.rows[0].cells[0].innerHTML === "Filter: ") i++;
  for (i = i + 1; i < table.rows.length; i++) {
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