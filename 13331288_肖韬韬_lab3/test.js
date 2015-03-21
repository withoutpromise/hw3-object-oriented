window_onload = false;
function sort_by_col(table_ID, col_num) {
    var table_element = document.getElementById(table_ID).tBodies[0].rows[0].cells[col_num];
    //alert(getType(table_element.firstChild.nodeValue));
    return function comp (data1, data2) {
        value1 = convert(data1.cells[col_num].innerText, getType(data1.cells[col_num].innerText));
        value2 = convert(data2.cells[col_num].innerText, getType(data2.cells[col_num].innerText));
        if (value1 < value2) {
            return  -1;
        } else if  (value1 > value2) {
            return  1;
        } else {
            return  0;
        }
    }
}
function sorter (tableID, col_num) {

    if (!window_onload) {
        onload();
    }

    var new_table = new Array;
    var table = document.getElementById(tableID);
    var table_col = table.tBodies[0].rows;          //  取得当前表格所有列
    var table_title = table.tHead.rows[0].cells;          //  取得表头

    for (var i = 0; i < table_col.length; i++)          //  用一个新数组装载当前列
        new_table[i] = table_col[i];

    if (old_table && (old_table == tableID&&col_num == old_col)) {          //  判断之前是不是已经倒过序
        new_table.reverse();
        if (table_title[col_num].className == "descend")          //  如果已经倒过就变为升序
            table_title[col_num].className = "ascend";
        else table_title[col_num].className = "descend";
    }
    else {
        new_table.sort(sort_by_col(tableID, col_num));          //  反之就是降序
        table_title[col_num].className = "ascend";
    }

    for (var i = 0; i < table_title.length; i++) {          //  取消高亮
        if (i == col_num) continue;
        table_title[i].className = "";
    }

    var frag = document.createDocumentFragment();
    for (var i = 0; i < new_table.length; i++) {          //  重新设置颜色
        if (i%2) new_table[i].style.backgroundColor = '#ccc';
        else new_table[i].style.backgroundColor = '#fff';
        frag.appendChild(new_table[i]);
    }
    table.tBodies[0].appendChild(frag);
    old_table = tableID;
    old_col = col_num;
}

function makeAllTableSortable(tables) {          //  获取被点击的表格ID与列数
        document.onclick = function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.tagName.toLowerCase() === "th") {
                var colIdx = target.cellIndex;
                var tableID = target.parentNode.parentNode.parentNode.id;
                sorter(tableID, colIdx);
            } else if (target.tagName.toLowerCase() === "input" && target.type == "submit") {
                var fil_id = target.previousElementSibling.id;
                filter(fil_id);
            }
        }
}

function getAllTables() {
    var tables = document.getElementsByTagName("table");
    old_table = null;          //  记录之前排序的tableID
    old_col = null;          //  记录之前排序的table的column
    color_reset(tables);          //  调整颜色，一行白一行灰
    window_onload = true;
    old_text = "";
}
window.onload = function onload() {
    window_onload = true;
    var tables = getAllTables();
    makeAllTablefiltable(tables);
    makeAllTableSortable(tables);
}

function color_reset(tables) {
    for (var i = 0; i < tables.length; i++) {
        var r = tables[i].tBodies[0].rows;
        for (var j = 0; j < r.length; j++)
            if (j%2) r[j].style.backgroundColor = '#ccc';
            else r[j].style.backgroundColor = '#fff';
    }
}

function getType(v) {
    var t;
    //return ((t = typeof(v)) == "object"? v == null && "null" || Object.prototype.toString.call(v).slice(8, -1):t).toLowerCase();
    if (v.indexOf("/") == -1 && parseInt(v)) return "int";
    t = new Date(Date.parse(v));
    if (t == "Invalid Date") return "string";
    else return "date";
}

function convert(value, dataType) {
    switch (dataType) {
        case "int":
            return parseInt(value);
        case "date":
            return new Date(Date.parse(value));
        default:
            return value.toString();
    }
}

function filter(fil_id) {
    var str = document.getElementById(fil_id).value;
    if (str == undefined || str == "")return;          //  如果没有输入的话就不执行
        var table = document.getElementsByTagName("table");
    var i = 0;
    var inputs = document.getElementsByTagName('input');
    for (; i < inputs.length; i++) {
        if (inputs[i].id == fil_id)break;          //  遍历所有输入框找出有输入的那个
    }
        var col = table[i/2].tBodies[0].rows;
        var frag = document.createDocumentFragment();
        for (var j = 0, n = col.length, count = 0; j < n; j++) {
            if (col[0].innerText.indexOf(str) != -1) {
                col[0].className = "highlight";          //  改变类名获得高亮效果
                if ((count++)%2)col[0].style.backgroundColor = '#ccc';
                else col[0].style.backgroundColor = '#fff';
                if (str != old_text) {
                    for (var k = 0; k < col[0].children.length; k++)
                        col[0].children[k].innerHTML = col[0].children[k].innerText;          //  重置标签。取消之前的高亮
                }
                frag.appendChild(col[0]);
            }
            else table[i/2].tBodies[0].removeChild(col[0]);
        }
        table[i/2].tBodies[0].appendChild(frag);
        SearchHighlight("highlight", str);
        old_text = str;
}

function makeAllTablefiltable(tables) {          //  获取被点击的表格ID与列数
        document.onclick = function(e) {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.tagName.toLowerCase() === "input" && target.type == "submit") {
                var fil_id = target.previousElementSibling.id;
                filter(fil_id);
            } else if(target.tagName.toLowerCase() === "th") {
                var colIdx = target.cellIndex;
                var tableID = target.parentNode.parentNode.parentNode.id;
                sorter(tableID, colIdx);
            }
        }
}

function check() {return false;}

function SearchHighlight(classname,keyword) {          //  对被标记为highlight的类实行正则表达式替换
    var pucl = document.getElementsByClassName(classname);          //  把要高亮的文本两端加上span标签
    if("" == keyword) return; 
    for (var j = 0; j < pucl.length; j++) {
        var temp=pucl[j].innerHTML; 
        var htmlReg = new RegExp("\<.*?\>","i"); 
        var arrA = new Array(); 
        //替换HTML标签 
        for(var i=0;true;i++) { 
            var m=htmlReg.exec(temp); 
            if(m) { 
                arrA[i]=m; 
            } else { 
                break; 
            } 
            temp=temp.replace(m,"{[("+i+")]}"); 
        } 
        words = unescape(keyword.replace(/\+/g,' ')).split(/\s+/); 
        //替换关键字 
        for (w=0;w<words.length;w++) { 
            var r = new RegExp("("+words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&")+")","ig"); 
            temp = temp.replace(r,"<span>$1</span>"); 
        } 
        //恢复HTML标签 
        for(var i=0;i<arrA.length;i++) { 
            temp=temp.replace("{[("+i+")]}",arrA[i]); 
        } 
            pucl[j].innerHTML=temp; 
        }
}
