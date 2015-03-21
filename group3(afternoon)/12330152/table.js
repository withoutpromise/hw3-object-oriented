// the main module, defining 'getAllTables', 'makeFilterable' and 'makeSortable'
(function() {
    // get all DOM tables in the document
    window.getAllTables = function() {
        return document.getElementsByTagName('table');
    }

    // make a <table> filterable
    window.makeFilterable = function(table) {
        // create the filter input field
        var filterInput = document.createElement('input');
        filterInput.setAttribute('type', 'text');
        // provides some init text
        filterInput.value = 'filter';
        // filter when input
        filterInput.oninput = function() {
            var keyword = filterInput.value;
            filter(table, keyword);
        }
        // insert before the table
        table.parentNode.insertBefore(filterInput, table);
        table.lastKeyword = '';
        return table;
    }

    // make a <table> sortable
    window.makeSortable = function (table) {
        var header = table.rows[0];
        var ths = header.cells;
        // init the sorter
        each(ths,function(th) {
            th.setAttribute('asc', 'null');
        });
        // handle click event
        header.onclick = function(e) {
            var table = this.parentNode;
            // get the true <table> when it contains a <tbody>
            if (table.tagName != 'TABLE') {
                table = table.parentNode;
            }
            var ths = this.cells;
            // the clicked <th>
            var target = e.target;
            // the index of the clicked header cell
            var index = target.cellIndex;
            // keep the sorting order in <th>s (in attributes)
            each(ths,function(th, i) {
                if (i == index) {
                    // set asc if not sorted before
                    if (th.getAttribute('asc') == 'null') {
                        th.setAttribute('asc', 'true');
                    // toggle if sorted before
                    } else {
                        var asc = th.getAttribute('asc') == 'true';
                        asc = !asc;
                        th.setAttribute('asc', asc.toString());
                    }
                } else {
                    th.setAttribute('asc', 'null');
                }
            });

            sortTable(table, index, target.getAttribute('asc') == 'true');
        }
    }

    // traverse an Object(DOM elements collection) and do something(cb)
    var each = function(collection, cb) {
        // cache for length
        var length = collection.length;
        for (var i = 0; i < length; i++) {
            cb(collection[i], i);
        }
    }

    // traverse a DOM element's text nodes and do something (cb)
    var eachTextNodes = function(element, cb) {
        var childNodes = element.childNodes;
        each(childNodes, function(childNode) {
            // is text node
            if (childNode.nodeType == 3) {
                cb(childNode);
            // is element node
            } else if (childNode.nodeType == 1) {
                eachTextNodes(childNode, cb);
            }
        });
    }

    // set the style of the even <tr>s(just for style, removable)
    var setEven = function(trs) {
        var even = false;
        each(trs, function(tr) {
            tr.removeAttribute('even');
            if (tr.style.display != 'none') {
                if (even) {
                    tr.setAttribute('even', '');
                }
                even = !even;
            }
        });
    }

    // get the body of a <table> returning an array of <tr>s
    var getBody = function(table) {
        var _trs = table.rows;
        var trs = [];
        // skip the header
        for (var i = 1; i < _trs.length; i++) {
            trs.push(_trs[i])
        }
        return trs;
    }

    // create a DocumentFragment from html
    var createFragmentFromHTML = function(html) {
        var tmp = document.createElement('template');
        tmp.innerHTML = html;
        return tmp.content;
    }

    // highlight keywords in <td>
    var highlight = function(td, keyword) {
        if (keyword == '') {
            return;
        }
        var regex = new RegExp(keyword, 'ig');
        var replacement = '<strong>$&</strong>';
        eachTextNodes(td, function(textNode) {
            // create a DocumentFragment with the keywords highlighted
            var text = textNode.nodeValue;
            var html = text.replace(regex, replacement);
            var frag = createFragmentFromHTML(html);
            // replace the text node with the new fragment
            textNode.parentNode.insertBefore(frag, textNode);
            textNode.parentNode.removeChild(textNode);
        });
    }

    // unhighlight keywords in <td>
    var unhighlight = function(td, keyword) {
        if (keyword == '') {
            return;
        }
        var regex = new RegExp('<strong>(' + keyword + ')</strong>', 'ig');
        var replacement = '$1';
        return td.innerHTML = td.innerHTML.replace(regex, replacement);
    }

    // check if <tr> matched regex
    var matched = function(tr, regex) {
        var tds = tr.cells;
        for (var i = 0; i < tds.length; i++) {
            if (regex.test(tds[i].innerText)) {
                return true;
            }
        }
        return false;
    }

    // filter a table with keyword
    var filter = function(table, keyword) {
        var trs = getBody(table);
        var regex = new RegExp(keyword, 'i');
        each(trs, function(tr, i) {
            var tds = tr.cells;
            each(tds,function(td) {
                unhighlight(td, table.lastKeyword);
            });
            // hide the unmatched <tr>s
            if (!matched(tr, regex)) {
                tr.style.display = 'none';
            // show the matched <tr>s and highlight the keywords
            } else {
                tr.style.display = 'table-row';
                each(tds,function(td) {
                    highlight(td, keyword);
                });
            }
        });
        // set the style of the even <tr>s(just for style, removable)
        setEven(trs);
        table.lastKeyword = keyword;
    }

    // get the text of <tr>[index] (without HTML tags)
    var getValue = function(tr, index) {
        var tds = tr.cells;
        return tds[index].innerText;
    }

    // reset the order of <trs>s
    var resetRows = function(trs) {
        // set the style of the even <tr>s(just for style, removable)
        setEven(trs);
        var length = trs.length;
        var parentNode = trs[0].parentNode;
        for (var i = length - 2; i >= 0; i--) {
            parentNode.insertBefore(trs[i], trs[i + 1]);
        }
    }

    // check if str is number
    var isNum = function(str) {
        var regex = /^([0-9]+(\.[0-9]*)?|\.[0-9]+)$/g;
        return regex.test(str);
    }

    // check if <tr>[index] are numbers
    var areNum = function(trs, index) {
        for (var i = 0; i < trs.length; i++) {
            var tds = trs[i].cells;
            if (!isNum(tds[index].innerHTML)) {
                return false;
            }
        }
        return true;
    }

    // sort <tr>s with index
    var sortRows = function(trs, index, asc, sortAsNum) {
        trs.sort(function(a, b) {
            var valA = getValue(a, index);
            var valB = getValue(b, index);
            // compare as number
            if (sortAsNum) {
                // parse as number
                var numA = parseFloat(valA);
                var numB = parseFloat(valB);
                if (asc) {
                    return numA <= numB;
                } else {
                    return numB <= numA;
                }
            // compare as string
            } else {
                if (asc) {
                    return valA.localeCompare(valB);
                } else {
                    return valB.localeCompare(valA);
                }
            }
        });
    }

    // sort <table> with index
    var sortTable = function(table, index, asc) {
        var trs = getBody(table);
        sortRows(trs, index, asc, areNum(trs, index));
        resetRows(trs);
    }
}());

window.onload = function() {
    var tables = getAllTables();
    var tablesLength = tables.length
    for (var i = 0; i < tablesLength; i++) {
        var table = tables[i];
        // init style of the even rows (just for style, removable)
        var trs = table.rows;
        var trsLength = trs.length;
        for (var j = 0; j < trsLength; j += 2) {
            trs[j].setAttribute('even', '');
        }
        // process!
        makeSortable(makeFilterable(table));
    }
}

// window.onload();
