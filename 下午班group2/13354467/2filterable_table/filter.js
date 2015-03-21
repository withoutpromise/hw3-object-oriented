function getAllTables(){
	return document.getElementsByTagName("table");
}
function makeAllTablesFilterable(tables){
	for(var i = 0; i < tables.length; i++){
		var input = document.createElement('input');
		tables[i].parentNode.insertBefore(input,tables[i]);           //添加input元素，在相应的table前
		input.addEventListener("input", filterByInput);               //设置监听器
	};
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
window.onload = function(){
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}