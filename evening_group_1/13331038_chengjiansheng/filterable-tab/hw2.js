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
window.onload = function() {
    var tables = getAllTables();
    makeAllTableFilterable(tables);
};
