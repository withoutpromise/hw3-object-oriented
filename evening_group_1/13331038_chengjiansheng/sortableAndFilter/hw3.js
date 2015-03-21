var ascend= 'arrowUp',
    descend= 'arrowDown';

var hasClass = function(ele, name) {
    return (ele.className.indexOf(name));
}

var addClass = function(ele, name) {
    if (hasClass(ele, name) == -1) {
        ele.className += ' ';
        ele.className += name;
    }
}

var delClass = function(ele, name) {
    if (hasClass(ele, name) != -1) {
        ele.className = ele.className.replace(name, '');        
    }
}

var allReset = function(thArr) {
    for (var i = 0; i < thArr.length; i++) {
        delClass(thArr[i],  'hidden');
    }
}

var filterableObj = function(dict) {
    this.dict = dict;
    this.ths = dict.table.getElementsByTagName('th');
    this.thead = dict.table.getElementsByTagName('thead')[0];
    this.tr = dict.table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    this.listen();
}

filterableObj.prototype = {

    hide: function() {
        for (var i = 0, len = this.tr.length; i < len; i++) {
            addClass(this.tr[i], 'hidden');
        }
    },

    filter: function() {
        var that = this;
        return function(eve) {
            
            for (var i = 0, len = that.tr.length; i < len; i++) {
                addClass(that.tr[i], 'hidden');
            }

            var key = eve.target.value;
            var tRows = that.dict.table.tBodies[0].rows;

            for (var i = 0, rowL = tRows.length; i < rowL; i++) {
                for (var j = 0, colL = tRows[i].cells.length; j < colL; j++) {
                    var text = tRows[i].cells[j].textContent;
                    tRows[i].cells[j].innerHTML = text.replace('<strong>', '').replace('</strong>', '');
                }
            }

            for (var i = 0, rowL = tRows.length; i < rowL; i++) {
                for (var j = 0, colL = tRows[i].cells.length; j < colL; j++) {
                    var text = tRows[i].cells[j].textContent;
                    if (text.indexOf(key) != -1) {
                        delClass(that.tr[i], 'hidden');
                        tRows[i].cells[j].innerHTML = text.replace(key, '<strong>' + key +'</strong>');
                        break;
                    }
                }
            }
            if (!key) {
                for (var i = 0, len = that.tr.length; i < len; i++) {
                    delClass(that.tr[i], 'hidden');
                }
            }
        }
    },

    listen: function() {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "text");
        x.addEventListener('keyup', this.filter(), false);
        this.dict.table.parentNode.insertBefore(x, this.dict.table);
    }
    
};


var getAllTables = function() {
    return document.getElementsByTagName('table');
};
var makeFilterable = function(table) {
    var tmpTable = new filterableObj({
        table: table,
    });
    return table;
};
var makeAllTableFilterable = function(tables) {
    for (var i = 0, len = tables.length; i < len; i++) {
        makeFilterable(tables[i]);
    }
};

var allReset = function(thArr) {
    for (var i = 0; i < thArr.length; i++) {
        //thArr[i].className = "";
        delClass(thArr[i],  ascend);
        delClass(thArr[i],  descend);
    }
}

var swap = function(a, b) {
    var t1 = a.className;
    a.className = b.className;
    b.className = t1;
    var t = a.innerHTML;
    a.innerHTML = b.innerHTML;
    b.innerHTML = t;
}

var sortableObj = function(dict) {
    this.dict = dict;
    this.ths = dict.table.getElementsByTagName('th');
    this.tr = dict.table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    this.sortListen();
}

sortableObj.prototype = {

    sort: function(chosen, modle) {
        var rowCount = this.dict.table.rows.length,
            table = this.dict.table;

        for (var i = 1; i < rowCount; i++) {
            for (var k = 1; k < rowCount - i; k++) {
                var a = table.rows[k].cells[chosen],
                    b = table.rows[k+1].cells[chosen];
                if (hasClass(a, 'hidden') == -1 && hasClass(b, 'hidden') == -1) {
                    if (modle == 'up' && a.innerHTML > b.innerHTML) {
                        swap(table.rows[k], table.rows[k+1]);
                    } 
                    if (modle == 'down' && a.innerHTML < b.innerHTML) {
                        swap(table.rows[k], table.rows[k+1]);
                    }
                }
            }
        }
    },

    sortListen: function() {
       var heads = this.ths;
       var gta = this;
       for (var i = 0, len =  heads.length; i < len; i++) {
           (function(j) {
                heads[i].addEventListener('click', function() {
                    if (hasClass(heads[j],  ascend) == -1) {
                        allReset(heads);
                        addClass(heads[j],  ascend);
                        gta.sort(j, 'up');
                    } else if (hasClass(heads[j],  ascend) != -1) {
                        allReset(heads);
                        addClass(heads[j],  descend);
                        gta.sort(j, 'down');
                    }
                }, false);
           })(i);
       }
    }
    
};

var makeAllTablesSortable = function(tables) {
    for (var i = 0; i < tables.length; i++) {
        makeSortable(tables[i]);    
    }
}
var makeSortable = function(table){
    var tmpTable = new sortableObj({
        table: table,
    });
    return table;
} 

var getAllTables = function() {
    return document.getElementsByTagName('table');
};

window.onload = function() {
    var tables = getAllTables();
    makeSortable(makeFilterable(tables[0]));
    makeFilterable(makeSortable(tables[1]));
};
