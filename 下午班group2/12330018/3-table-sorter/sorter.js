// 12330018-chenjiyun

window.onload = function(){
	var tables = getAllTables();
	// makeAllTablesSortable(tables);
	// makeAllTabelsFliterable();
	makeSortable(tables);
	makeFilterable(tables);
}
function getAllTables(){
	// arr存放th元素
	var arr = new Array();
	arr = document.getElementsByTagName("th");
	return arr;
}

//flag defines ascend(0) or descend(1) 
var flag = [1,1,1,1,1,1];
function makeAllTablesSortable(tables){

    // 鼠标悬浮事件
	for(var i=0; i<tables.length;i++){
		// mouseover
		(function(i) {
			tables[i].addEventListener("mouseenter",function(){
				this.style.backgroundColor="rgb(166,175,252)";
				triangle(this,i);
			})

			// mouseout
			tables[i].addEventListener("mouseleave",function(){
				this.style.backgroundColor="rgb(2,28,125)";
				if(this.getElementsByTagName("img")[0])
					this.removeChild(this.getElementsByTagName("img")[0]);
			})

			// 鼠标点击事件
			tables[i].addEventListener("click",function(){
				if(flag[i] == 1){
					Descend(tables[i],i);
					flag[i] = 0;
				}
				else{
					Ascend(tables[i],i);
					flag[i] = 1;
				}
				triangle(this,i);
			},true)
		})(i)
	}
}
// 小三角
function triangle(ob,i){
	var descend = document.createElement("img");
	descend.className = "triangle";
	descend.src = "descend.png";
	var ascend = document.createElement("img");
	ascend.className = "triangle";
	ascend.src = "ascend.png";

	// 删除原有的三角
	if(ob.getElementsByTagName("img")[0])
		ob.removeChild(ob.getElementsByTagName("img")[0]);

	if(flag[i] == 1){
		ob.appendChild(descend);
    }else{
    	ob.appendChild(ascend);
    }
}
// 降序
function Descend(tg,i){
	var myarr = getCols(tg);
	for(var i=0;i<myarr.length;i++){
		for( var j=i+1;j<myarr.length;j++){
			var temp;
			if(myarr[i][0]>myarr[j][0]){
				temp = myarr[i];
				myarr[i] = myarr[j];
				myarr[j] = temp;
			}
		}
	}
	backCol(tg,myarr);
}
// 升序
function Ascend(tg,i){
	var myarr = getCols(tg);
	for(var i=0;i<myarr.length;i++){
		for( var j=i+1;j<myarr.length;j++){
			var temp;
			if(myarr[i][0]<myarr[j][0]){
				temp = myarr[i];
				myarr[i] = myarr[j];
				myarr[j] = temp;
			}
		}
	}
	backCol(tg,myarr);
}

// 获取需要排序的列
function getCols(tg){
	var table = tg.parentNode.parentNode.parentNode;
	var table_cols = table.getElementsByTagName("td");
	var table_width = table.getElementsByTagName("th").length;
	var tr_leght = table.getElementsByTagName("tr").length;
	var myarr = new Array();

	for(var i = 0; i < tr_leght-1 ; i++){
		myarr[i] = new Array();
		for(var j=0;j<table_width;j++){
			myarr[i].push(table_cols[i*table_width+j].innerHTML);
		}
	}
	return myarr;
}

// 把排好序的字段放回table
function backCol(tg,myarr){
	var table = tg.parentNode.parentNode.parentNode;
	var table_cols = table.getElementsByTagName("td");

	for(var i = 0; i < myarr.length; i++){
		for(var j=0;j<myarr[i].length;j++){
			table_cols[i*myarr[i].length + j].innerHTML = myarr[i][j];
		}
	}
}

// --------------------lab 3  makeAllTabelsFliterable------------------------------------

function makeAllTabelsFliterable(){
	AddInput();
	addInputEvent();
}

//添加输入框
function AddInput(){
	tables = document.getElementsByTagName("table");
	for(var i=0;i<tables.length;i++){
		// 输入域
		var myinput = document.createElement("input");
		myinput.setAttribute("type", "text");
		tables[i].appendChild(myinput);
	}
}
//添加输入框的事件
function addInputEvent(){
	if(document.getElementsByTagName("input")){
		var myInputs = document.getElementsByTagName("input"); 
		for(var i=0;i<myInputs.length;i++){
			(function(i){
				myInputs[i].onkeyup = function(e){
					if(e.keyCode == 13){
						seach(myInputs[i].value,myInputs[i]);
					}
				}
			})(i)
		}
	}
}
//查找关键字，删除不存在的行，并高亮显示
function seach(key,currInput){
	var currTable = currInput.parentNode;
	var rows = currTable.rows;
	for(var i=1;i<rows.length;i++){
		var flag = false;
		for(var j=0;j<rows[i].cells.length;j++){
			var str = rows[i].cells[j].innerHTML;
			if(str.indexOf(key)>=0){
				var myReg = new RegExp(key,"g");
				rows[i].cells[j].innerHTML = str.replace(myReg,'<span class = "hightlight">'+key+'</span>');
				flag = true;
			}
		}
		if(flag == false){
			currTable.deleteRow(i);
			i--;
		}
	}
}

function makeSortable(tables){
	makeAllTablesSortable(tables);
	return getAllTables();
}
function makeFilterable(tables){
	makeAllTabelsFliterable();
	return getAllTables;
}




