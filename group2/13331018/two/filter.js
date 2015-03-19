/*
*    Filename: filter.js
*    Description: None.
*    Last modified: 2014-03-19 10:27
*
*    陈炜健 － 13331018
*    Email: eleveneat@gmail.com
*/

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}
function getAllTables() { //从document对象中得到所有的table
	return document.getElementsByTagName('table');
}

function makeAllTablesFilterable(tables) { //变成filterable
	for (var i = tables.length - 1; i >= 0; i--) {
		var input = document.createElement("input");
		tables[i].parentNode.insertBefore(input, tables[i]); //添加输入框在table之前
		input.addEventListener('input', filter);
	}
}

function filter(event) {
	var filter_table = this.nextSibling; //得到所在的table
	var trs = filter_table.tBodies[0].rows; //得到tbody里面所有的tr
	for (var i = 0; i < trs.length; i++) {
		trs[i].className = trs[i].className.replace(/ invisibility/g, ""); // 恢复表格原始状态
		trs[i].innerHTML = trs[i].innerHTML.replace(/<span class=\"keyword\">|<\/span>/g, "");

		var tds = trs[i].cells; //得到一个tr中的所有td
		var is_Exist_Keyword = false;
		for (var j = 0; j < tds.length; j++) {
			if (tds[j].innerText.search(this.value) != -1) {
				tds[j].innerHTML = tds[j].innerHTML.replace(new RegExp(this.value,"g"), "<span class=\"keyword\">" + this.value + "</span>");// keyword背景高亮为黄色，且为粗体
				is_Exist_Keyword = true;
			}
		}
		if (!is_Exist_Keyword)
			trs[i].className += " invisibility"; // 隐藏tr
	}
}