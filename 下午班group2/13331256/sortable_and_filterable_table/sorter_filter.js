/*
* @Author: ValenW
* @Date:   2014-10-28 14:21:40
* @Last Modified by:   ValenW
* @Last Modified time: 2015-03-21 14:07:49
*/
window.onload = function() {
    var tables = getAllTables();
    doWithAllTables(tables);
}

function getAllTables() {
    return document.getElementsByTagName('table');
}

function doWithAllTables(tables) {
    for (var i = 0; i < tables.length; i++)
        tables[i] = makeSortable(makeFilterable(tables[i]));
}

function makeSortable(table) {
    table.shortedth = new Array();

    // oThead表示所有的thead
    var oThead = table.getElementsByTagName('thead');

    // 有thead则根据thead排序，没有则根据tbody进行排序
    if (oThead.length == 0) oThead = table.getElementsByTagName("tbody");
    for (var j = 0; j < oThead.length; j++) {  // 则对thead进行遍历
        table.shortedth[j] = 0;

        // 对thead下的所有th或者td进行事件绑定,默认thead或者tbody之下不是th就是td
        var oTh = oThead[j].getElementsByTagName('th');
        if (oTh.length == 0) oTh = oThead[j].getElementsByTagName('td');
        for (var k = 0; k < oTh.length; k++) {
            oTh[k].addEventListener('click', toShort);
            oTh[k].j = j; oTh[k].k = k;
        }
    }
    return table;
}

function toShort(event) {
    /* 适用以下结构
     * thead->tr->th  tbody->tr->td
     * tbody->tr->th  tbody->tr->td
     * tbody->tr->td  tbody->tr->td  // 比如王老师的eden..
     *
     */
    var theTable = this.parentNode.parentNode.parentNode;
    var theTbody = theTable.tBodies[this.j];
    var oTr = theTbody.rows;
    var nothead = false;

    var theThead;
    if (theTable.getElementsByTagName('thead').length == 0) {
        theThead = theTable.getElementsByTagName('tbody')[this.j];
        nothead = true;
    } else {
        theThead = theTable.getElementsByTagName('thead')[this.j]
    }

    // 排序代码
    var tempTr = new Array();
    for(var i = 0; i + nothead < oTr.length; i++) // 没有thead则从第二行开始排序
        tempTr[i] = oTr[i + nothead];
    if (Math.abs(theTable.shortedth[this.j]) == Math.abs(this.k) + 1)
        tempTr.reverse();       // 如果是已排序的则只要翻转一次就好
    else
        tempTr.sort(getcmp(this.k)); // 如果不是则调用sort函数并传入比较函数进行排序

    // 对tbody进行更新
    var newTr = document.createDocumentFragment();
    if (nothead) newTr.appendChild(oTr[0]);
    for(var i = 0; i < tempTr.length; i++)
        newTr.appendChild(tempTr[i]);
    theTbody.appendChild(newTr);

    // 更新tr背景色和th
    var firsttr = nothead ? 1 : 0; // tr背景色变化
    for (var j = firsttr; j < oTr.length; j++) {
        if ((j+firsttr) % 2) oTr[j].style.backgroundColor = "#FFE4E1";
        else oTr[j].style.backgroundColor = "white";
    }

    var oTh = theThead.getElementsByTagName('th');
    if (oTh.length == 0)
        oTh = theThead.getElementsByTagName('tr')[0].getElementsByTagName('td');

    if (theTable.shortedth[this.j] != 0) // 对本列中进行过排序的th进行初始化
        oTh[Math.abs(theTable.shortedth[this.j])-1].className = "";

    if (theTable.shortedth[this.j] == this.k + 1) {
        this.className = "down";
        theTable.shortedth[this.j] = -this.k - 1;
    } else {
        this.className = "up";
        theTable.shortedth[this.j] = this.k + 1;
    }
}

function getcmp(k) { // 比较函数
    return function cmp(tr1, tr2) {
        var val1, val2;
        val1 = tr1.cells[k].textContent; // 取元素的文本内容
        val2 = tr2.cells[k].textContent;
        if (!isNaN(Number(val1))) { // 对数字进行排序，从而不会出现10出现在2前面的问题
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if (val1 < val2) return -1;
        else if (val1 > val2) return 1;
        else return 0;
    }
}

function makeFilterable(table) {
    var filterRow = document.createElement("input");
    filterRow.addEventListener('keyup', toFilter)
    filterRow.placeholder = "to filter";
    table.appendChild(filterRow);
    return table;
}

function toFilter(event) {
    var key = this.value;
    var theTable = this.parentNode;
    var theTbody = theTable.tBodies[0];
    var oTr = theTbody.rows;
    var nothead = theTable.getElementsByTagName('thead').length == 0 ? true : false;

    for (var i = 0; i + nothead < oTr.length; i++) {
        var oTd = oTr[i].getElementsByTagName('td');

        if (oTr[i].innerHTML.search(/<span class=\"highlight\">(.*)<\/span>/) != -1)
            oTr[i].innerHTML = oTr[i].innerHTML.replace(/<span class=\"highlight\">(.*)<\/span>/g, "$1");
        var found = false;
        for (var j = 0; j < oTd.length; j++) {
            if (oTd[j].innerHTML.search(key) != -1) {
                oTd[j].innerHTML = oTd[j].innerHTML.replace(key, "<span class=\"highlight\">" + key + "</span>");
                found = true;
            }
        }
        if (found) oTr[i].className = oTr[i].className.replace(/hide/gm, "");
        else oTr[i].className += " hide";
    }
}

/*var tables = getAllTables();
doWithAllTables(tables);*/