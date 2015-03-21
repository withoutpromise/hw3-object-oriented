// 获得table元素列表
function getAllTables() {
    var tables = document.getElementsByTagName("table");
    return tables;
}
// 加入图标并且设置表头的order属性
function createImgAndOrder(tables) {
    for (var i = 0; i < tables.length; i++) {
      var ths = tables[i].getElementsByTagName("th");
      for (var j = 0; j < ths.length; j++) {  // 设置图标和order属性
        var backgroundImg = document.createElement("img");
        backgroundImg.setAttribute("src", "ascend.png");
        backgroundImg.setAttribute("alt", "ascend");
        backgroundImg.setAttribute("align", "right");
        backgroundImg.setAttribute("opacity", "0")
        ths[j].appendChild(backgroundImg);
        ths[j].setAttribute("order", "descend");
      }
    }
}
// 设置行的颜色，偶数行为灰色，单数行为白色
function setTableColor(tables) {
   for (var i = 0; i < tables.length; i++) {
     var allTrs = tables[i].getElementsByTagName("tr");
     for (var j = 0; j < allTrs.length; j++) {
       if (j % 2 != 1 && j != 0) {
         allTrs[j].style.backgroundColor = "#cccccc";
       } else {
           if (j != 0) allTrs[j].style.backgroundColor = "white";
         }
     }
   }
}
// 进行排序
function makeAllTablesSortable(tables) {
    createImgAndOrder(tables); // 加入图标并且设置表头的order属性
    setTableColor(tables);  // 偶数行变为灰色，单数行为白色
    for (var i = 0; i < tables.length; i++) {
      var heads = tables[i].getElementsByTagName("thead");
      heads[0].onmousedown = function() {columnClick(event)};
    }
    return tables;
}
// 获得被点击的th元素对象
function columnClick(e) {
  var targ
  if (!e) var e = window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) // defeat Safari bug
    targ = targ.parentNode;
  changeAndSort(targ);
}
// 改变背景颜色并进行排序
function changeAndSort(targ) {
  if (targ.tagName == "IMG") targ = targ.parentNode;
  var tables = getAllTables();
  for (var i = 0; i < tables.length; i++) { // 对所有th背景色设为蓝色
    var ths = tables[i].getElementsByTagName("th");
    for (var j = 0; j < ths.length; j++) {
      ths[j].style.backgroundColor = "#00008b";
    }
  }
  targ.style.backgroundColor = "#b0c4de";  // 再单独设置为淡蓝色
  var targImg = targ.getElementsByTagName("img")[0];
  var order = targ.getAttribute("order");
  if (order == "ascend") {
    targImg.setAttribute("src", "descend.png");
    targ.setAttribute("order", "descend");
  } else {
    targImg.setAttribute("src", "ascend.png");
    targ.setAttribute("order", "ascend");
  }
  var selectTable = targ.parentNode;
  while (selectTable.tagName != "TABLE") {selectTable = selectTable.parentNode;}
  var col = getIndex(targ);
  sortFunction(selectTable, col, targ);
}
// 获得被点击的th元素的下标，即第几列
function getIndex(targ) {
  var father = targ.parentNode;
  var tdNum = father.getElementsByTagName("th");
  for (var i = 0; i < tdNum.length; i++) {
    if (tdNum[i] == targ) return i;
  }
}
// 产生比较函数，用于sort排序
function generateCompareTrs1(col) {
  return function compareTrs(obj1, obj2) {
    var value1 = obj1.cells[col].firstChild.nodeValue;
    var value2 = obj2.cells[col].firstChild.nodeValue;
    if (value1 < value2) {
      return -1;
    } else if(value1 > value2) {
        return 1;
      } else {
          return 0;
        }
  };
}
function generateCompareTrs2(col) {
  return function compareTrs(obj1, obj2) {
    var value1 = obj1.cells[col].firstChild.nodeValue;
    var value2 = obj2.cells[col].firstChild.nodeValue;
    if (value1 > value2) {
      return -1;
    } else if(value1 < value2) {
        return 1;
      } else {
          return 0;
        }
  };
}
// 只进行排序的函数
function sortFunction(table, col, targ) {
  var tbodys = table.getElementsByTagName("tbody");
  var tbody = tbodys[0];
  var colDataRows = tbody.rows;
  var aTrs = new Array();
  var order = targ.getAttribute("order");
  for (var i = 0; i < colDataRows.length; i++) {
    aTrs.push(colDataRows[i]);
  }
  if (order == "ascend") {
    aTrs.sort(generateCompareTrs1(col));
  } else {
      aTrs.sort(generateCompareTrs2(col));
    }
  var oFragment=document.createDocumentFragment();
  for(var i=0;i<aTrs.length;i++){
    oFragment.appendChild(aTrs[i]);
  }
  tbody.appendChild(oFragment);
  setTableColor(getAllTables());
}
function creatText(tables) {
  for (var i = 0; i < tables.length; i++) {
        var text = document.createElement("input");
        text.setAttribute("type", "text");
        tables[i].appendChild(text);
  }
}
function filterable(tables) {
  creatText(tables);
  texts = document.getElementsByTagName("input");
  texts[1].oninput = function() {
    filt(texts[1].value, tables[1]);
    setTableColor(tables);
  };
  texts[0].oninput = function() {
    filt(texts[0].value, tables[0]);
    setTableColor(tables);
  };
}
function filt(str, table) {
    var tbodys = table.getElementsByTagName("tbody");
    var tbody = tbodys[0];
    var colDataRows = tbody.rows;
    var aTrs = new Array();
    for (var i = 0; i < colDataRows.length; i++) {
      var tag = false;
      for (var j = 0; j < 3; j++) {
        if (colDataRows[i].cells[j].firstChild.nodeValue.indexOf(str) >= 0) {
          var a = colDataRows[i].cells[j].firstChild.nodeValue;
          tag = true;
        }
      }
      if (tag == true){
        aTrs.push(i);
      }
    }
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
      rows[i].style.visibility = "hidden";
    }
    for (var i = 0; i < aTrs.length; i++) {
      var row = table.getElementsByTagName("tr")[aTrs[i] + 1];
      row.style.visibility = "visible";
    }
}
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);  // 排序函数入口
    filterable(tables);
}