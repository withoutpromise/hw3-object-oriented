function makeSortable (table) {
    var headings = table.getElementsByTagName("th");
    for (var i = 0; i < headings.length; ++i) {
        headings[i].onclick = sortByThisColumn;
    }
    return table;
}

function sortByThisColumn () {
    var 
        list = this.classList
      , siblings = this.parentNode.getElementsByTagName("th")
    ;
    /*set class attribute*/
    if (list.contains("ascend") || list.contains("descend")) {
        /*already sorting this column*/
        list.toggle("ascend");
        list.toggle("descend");
    } else {
        /*remove siblings' class*/
        for (var i = 0; i < siblings.length; ++i)
            siblings[i].className = "";
        this.className = "ascend";
    }
    doSort(this);
    setEvenRowGray(targetTbody);
}

function doSort(column) {
    var targetTable = column.parentNode;
    while (targetTable.tagName.toLowerCase() != "table")
        targetTable = targetTable.parentNode;
    var
        siblings = targetTable.getElementsByTagName("th")
      , targetTbody = targetTable.getElementsByTagName("tbody")[0]
      , rows = targetTbody.rows
      , lowerBound = 0
      , compare = getCompareFunction(column)
    ;
    /*sometimes the table doesn't have <thead> and the first row is its head*/
    if (targetTable.getElementsByTagName("thead").length == 0)
        lowerBound = 1;

    /*insertion sort*/
    for (var i = lowerBound + 1, j, temp; i < rows.length; ++i) {
        temp = rows[i];
        j = i;
        targetTbody.removeChild(rows[i]);
        while (j > lowerBound && compare(temp, rows[j - 1]))
            --j;
        if (j == rows.length)
            targetTbody.appendChild(temp);
        else
            targetTbody.insertBefore(temp, rows[j]);
    }
}

function getCompareFunction (column) {
    if (column.classList.contains("ascend"))
        return function (a, b) {
            return a.getElementsByTagName("td")[column.cellIndex].textContent
                    < b.getElementsByTagName("td")[column.cellIndex].textContent;
        };
    else
        return function (a, b) {
            return a.getElementsByTagName("td")[column.cellIndex].textContent
                    > b.getElementsByTagName("td")[column.cellIndex].textContent;
        }
}

function makeFilterable (table) {
    if (table.lastChild.className != "filterInput") {
        var
            prompt = document.createTextNode("Filter:")
          , input = document.createElement("input")
        ;
        input.setAttribute("type", "text");
        input.oninput = doFilter_Getter(table);
        table.appendChild(prompt);
        table.appendChild(input);
        return table;
    }
}

function doFilter_Getter(table) {
    var 
        backup = []
      , rows = table.getElementsByTagName("tbody")[0].rows;
    ;
    for (var i = 0; i < rows.length; ++i)
        backup.push(rows[i]);
    return function () {
        for (var i = 0; i < backup.length; ++i) {
            clearHighlight(backup[i]);
            if (searchRow(backup[i], this.value) == backup[i].classList.contains("hidden"))
                backup[i].classList.toggle("hidden");
        }
        setEvenRowGray(table.getElementsByTagName("tbody")[0]);
    };
}

function clearHighlight (row) {
    var cells = row.cells;
    for (var i = 0; i < cells.length; ++i) {
        var spans = cells[i].getElementsByTagName("span");
        while (spans.length > 0) {
            cells[i].insertBefore(spans[0].firstChild, spans[0]);
            cells[i].removeChild(spans[0]);
        }
        cells[i].normalize();
    }
}

function searchRow (row, pattern) {
    if (pattern == "")
        return true;
    else
        return searchAndHighlight(row, pattern);
}

function searchAndHighlight (row, pattern) {
    var
        cells = row.cells
      , match = false
      , patternLength = pattern.length
      , newSpan
      , text
      , start
    ;
    for (var i = 0; i < cells.length; ++i) {
        text = cells[i].textContent;
        start = 0;
        /*clear childnodes*/
        while (cells[i].hasChildNodes())
            cells[i].removeChild(cells[i].lastChild);
        /*search and set highlight*/
        while(true) {
            index = text.indexOf(pattern, start);
            if (index != -1) {
                if (index > 0)
                    cells[i].appendChild(document.createTextNode(
                        text.slice(start, index)
                    ));
                newSpan = document.createElement("span");
                newSpan.appendChild(document.createTextNode(
                    text.slice(index, index + patternLength)
                ));
                newSpan.className = "highlight";
                cells[i].appendChild(newSpan);
                start = index + patternLength;
                match = true;
            } else {
                break;
            }
        }
        if (start < text.length)
            cells[i].appendChild(document.createTextNode(text.slice(start)));
    }
    return match;
}

function setEvenRowGray(targetTbody) {
    var 
        index = 1
      , rows = targetTbody.rows
    ;
    for (var i = 0; i < rows.length; ++i) {
        if (!rows[i].classList.contains("hidden")) {
            if ((index % 2 == 0) != rows[i].classList.contains("alternate"))
                rows[i].classList.toggle("alternate");
            ++index;
        }
    }
}
