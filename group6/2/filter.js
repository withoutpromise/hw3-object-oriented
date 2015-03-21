"use strict"

var getAllTables = function() {
	return document.getElementsByTagName('table');
};

var makeAllTablesFilterable = function(tables) {
	for(var i = 0; i < tables.length; i++) { //遍历整个页面的table
		var table = tables[i];
		var thead = table.firstChild.nextSibling;
		var tbody = table.lastChild.previousSibling;
		var trs = [];
		for(var j = 1; j< tbody.childNodes.length; j += 2) {  //这里将表的tbody中每个tr放到一个数组中，方便以后使用
			trs.push(tbody.childNodes[j]);
		}
		var input = document.createElement('input');
		var button = document.createElement('button');
		var text = document.createTextNode('确定');
		button.appendChild(text);
		table.appendChild(input);
		table.appendChild(button);
		button.onclick = function(input,trs,tbody) {
			return function() {
				var text = input.value;
				if(text === "")
					return;
				tbody.innerHTML = "";
				for(var i = 0; i < trs.length; i++) {
					var find = 0;
					for(var j = 1; j < trs[i].childNodes.length; j += 2) {
						var html = trs[i].childNodes[j].innerHTML;
						var data = html.replace(/<\/?span>/g,"");
						var textNode = "";
						eval("textNode = data.replace(/" + text + "/g,'<span>' + text + '</span>')");
						trs[i].childNodes[j].innerHTML = textNode;
						var index = data.search(text);
						if(index !== -1) {
							find++;
						}
					}
					if(find !== 0) {
						tbody.appendChild(trs[i]);
					}
				}
			}
		}(input,trs,tbody);
	}
};
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
};