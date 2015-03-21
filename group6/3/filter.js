"use strict"

var getAllTables = function() {
	return document.getElementsByTagName('table');
};
var makeFilterable = function(table) {
	var thead = table.firstChild.nextSibling;
	var tbody = null;
	for(var i = 0; i < table.childNodes.length; i++) {
		if(table.childNodes[i].nodeName === "TBODY") {
			tbody = table.lastChild.previousSibling;
			break;
		}
	}
	if(tbody === null) {
		console.log("Error,can't find tbody!");
		return;
	}
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
	return table;
}
var makeSortable = function(table) {
	var thead = table.firstChild.nextSibling;
	var tbody = null;
	for(var i = 0; i < table.childNodes.length; i++) {
		if(table.childNodes[i].nodeName === "TBODY") {
			tbody = table.childNodes[i];
			break;
		}
	}
	if(tbody === null) {
		console.log("Error,can't find tbody!");
		return;
	}
	var ths = [];
	for(var j = 1; j< tbody.childNodes.length; j += 2) {  //这里将表的tbody中每个tr放到一个数组中，方便以后使用
		ths.push(tbody.childNodes[j]);
		if((j + 1) / 2 % 2 === 0)
			tbody.childNodes[j].style.backgroundColor = "rgb(221,221,221)";
	}
	for(var j = 1; j < thead.firstChild.nextSibling.childNodes.length; j += 2) { //遍历整个thead中的th，添加时间
		var th = thead.firstChild.nextSibling.childNodes[j];
		
		//这里使用了一个div来存储img元素
		var div = document.createElement('div');
		div.style.cssText = "width:15px;height:10px;float:right";
		th.appendChild(div);
		
		//添加鼠标移动到th上的事件，改变颜色并显示图片
		th.onmouseover = function(th,div) {
			return function(e) {
				this.style.backgroundColor = "rgb(163,176,255)";
				this.style.cursor = "pointer";
				var img = document.createElement('img');
				if(this.value === 1)
					img.src = "./ascend.png";
				else
					img.src = "./descend.png";
				div.appendChild(img);
			};
		}(th,div);
			
		//添加鼠标移出th上的事件，改变颜色并删除图片
		th.onmouseout = function(th,div) {
			return function(e) {
				this.style.backgroundColor = "rgb(3,25,136)";
				div.removeChild(div.lastChild);
			}
		}(th,div);
		
		//添加鼠标的点击事件
		th.onclick = function(j,tbody,ths,th,div) {
			return function(e) {
				
				//每点击一次，图片应该翻转
				var img = div.lastChild;
				if(this.value === 1)
					img.src = "./descend.png";
				else
					img.src = "./ascend.png";
					
				//通过这个值来判断当前图片的样式
				this.value = this.value !== 1 ? 1 : 0;
				
				//添加一个比较函数来对tr进行排序
				var compare = function(a,b) {
					if(a.childNodes[j].firstChild.data < b.childNodes[j].firstChild.data)
						return -1;
					else if(a.childNodes[j].firstChild.data > b.childNodes[j].firstChild.data)
						return 1;
					else 
						return 0;
				}
				ths.sort(compare);
				if(th.value === 0)
					ths.reverse();
				
				//先将之前的tr全部删除
				for(var k = 1; k < tbody.childNodes.length; k += 2) {
					tbody.removeChild(tbody.childNodes[k]);
				}
					
				//添加新的tr
				for(var k = 0; k < ths.length; k++) {
					tbody.appendChild(ths[k]);
					if(k % 2 === 1)
						ths[k].style.backgroundColor = "rgb(221,221,221)";
					else
						ths[k].style.backgroundColor = "white";
				}
			};
		}(j,tbody,ths,th,div);
	}
	return table;
}
var makeAllTables = function(tables) {
	for(var i = 0; i < tables.length; i++) { //遍历整个页面的table
		var table = tables[i];
		//makeSortable(makeFilterable(table));
		makeFilterable(makeSortable(table));
	}
};
window.onload = function() {
	var tables = getAllTables();
	makeAllTables(tables);
};