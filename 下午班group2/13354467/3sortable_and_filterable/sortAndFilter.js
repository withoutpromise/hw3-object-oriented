function getAllTables(){
	return document.getElementsByTagName("table");
}
function makeFilterable(tables){
	for(var i = 0; i < tables.length; i++){
		var input = document.createElement('input');
		tables[i].parentNode.insertBefore(input,tables[i]);           //添加input元素，在相应的table前
		input.addEventListener("input", filterByInput);               //设置监听器
	};
	return tables;
};
function filterByInput(){
	var rows = this.nextSibling.tBodies[0].rows;                      //input的下一个元素即table，得到table的每一行
	var str = this.value;                                             //得到input的内容
	for(var i = 0; i < rows.length; i++){
		var tds = rows[i].getElementsByTagName("td");
		var ok = false;
		for(var j = 0; j < tds.length; j++){
			if (tds[j].innerHTML.indexOf('</span>') != -1){            //清除上次筛选的突出显示
				tds[j].innerHTML = tds[j].innerHTML.replace(/<span style="color:red">/g,'').replace(/<\/span>/g,'');
			};
			if(tds[j].innerHTML.indexOf(str) != -1){                    //突出显示筛选内容
				var re = new RegExp(str,'g');
				tds[j].innerHTML = tds[j].innerHTML.replace(re,'<span style="color:red">' + str + "</span>");
				ok = true;
			}			
		}
		if(!ok){
			this.nextSibling.tBodies[0].rows[i].style.display = 'none';  //隐藏不符合行
		}
		else{
			this.nextSibling.tBodies[0].rows[i].style.display = 'table-row';
		}
	}
};

function makeSortable(tables){
	for(var i = 0; i < tables.length; i++){
		filter(tables[i]);                                       //过滤掉<table>的空文本子节点
		var rows = tables[i].tBodies[0].rows;
		for(var j = 1; j < rows.length; j += 2){                 //设置行的背景颜色
			rows[j].style.background = "#ddd";
		}
		filter(tables[i].firstChild);                            //过滤掉<thead>的空文本子节点
		filter(tables[i].firstChild.firstChild);                 //过滤掉<tr>的空文本子节点
		var header = tables[i].firstChild.firstChild.childNodes; //保存<thead>里的tr
		for(var j = 0; j < header.length; j++){
			var img = document.createElement("img");             //给tr添加三角图片
			img.src = "ascend.png";
			img.align = "right";
			header[j].appendChild(img);
			header[j].col = j;                                   //给header添加属性，以便触发事件时使用
			header[j].tb = tables[i];
			header[j].arrs = new Array();                        //声明一个数组 
			for(var k = 0; k < rows .length; k++) {
    			header[j].arrs[k] = rows[k];
    		}
    		header[j].statu = 0;
			header[j].onclick = function(){
				for(var q = 0; q < this.parentNode.childNodes.length; q++){
					if(q != this.col){                            //初始化其他列的状态
						this.parentNode.childNodes[q].style.background = "#021A7E";
						this.parentNode.childNodes[q].getElementsByTagName("img")[0].src = "ascend.png";
						this.parentNode.childNodes[q].statu = 0;
					}
				}
				if(!this.statu){                                   //this.statu为0表示未选择排序
					this.statu = 1;
					this.arrs.sort(getSortFunction(this.col));
					this.style.background = "#6699FF";
				}
				else if(this.statu == 1){                          //this.statu为1表示已经排序奇数次
					this.statu = 2;
					this.getElementsByTagName("img")[0].src = "descend.png";
					this.arrs.reverse();
				}
				else{                                               //this.statu为2表示已经排序偶数次
					this.statu = 1;
					this.getElementsByTagName("img")[0].src = "ascend.png";
					this.arrs.reverse();
				}
				var oFragement = document.createDocumentFragment();  //创建碎片
				for(var p = 0; p < this.arrs.length; p++){
					if(p % 2 ){                                      //让颜色相间
						this.arrs[p].style.background = "#ddd";
					}
					else{
						this.arrs[p].style.background = "white";
					}
					oFragement.appendChild(this.arrs[p]);              //将tr绑定到碎片上.
				}
				this.tb.tBodies[0].appendChild(oFragement);            //将碎片绑定在表格上 
			}
		}
	}
	return tables;
}
function getSortFunction(col) {
	return function compare(a, b){
		var v1 = a.getElementsByTagName("td")[col].innerHTML;
		var v2 = b.getElementsByTagName("td")[col].innerHTML;
		if(!isNaN(v1))                                                //如果为纯数字，则转化为nunber
		{
			var i1 = parseInt(v1);
			var i2 = parseInt(v2);
			if(i1 < i2){
				return -1;
			}
			else if(i1 > i2){
				return 1;
			}
			else{
				return 0;
			}
		}
		if(v1 < v2){
			return -1;
		}
		else if(v1 > v2){
			return 1;
		}
		else{
			return 0;
		}
	} 
} 
function filter(elem){
	var child = elem.childNodes;
	for(var i=0; i < child.length ;i++){
		if(child[i].nodeName == "#text" && !/\s/.test(child.nodeValue)){
			elem.removeChild(child[i]);
		}
	}
}

window.onload = function(){
	var tables = getAllTables();
	// makeSortable(makeFilterable(tables));
	makeFilterable(makeSortable(tables));
}