//define an function for table object
function getAllTables(){
	this.originalTable = document.getElementsByTagName('table');
	this.originalThead = document.getElementsByTagName('th');
	this.originalTbody = document.getElementsByTagName('td');
	this.continue = true;
	try{
		//if isn't exist a table,throw an error
		if (!this.originalTable[0]) throw new Error("It is not exist a table!");
		//if isn't exist a 'th',throw an error
		if (!this.originalThead[0]) {
			throw new Error("It is not exist a th tag!");
		}
		//if isn't exist a 'td',throw an error
		if (!this.originalTbody[0]) {
			throw new Error("It is not exist a td tag!");
		}
	}
	//error catch
	catch(err){
		var errorTxt = "";
		errorTxt="There was an error on this page.\n\n";
	  	errorTxt+="Error description: " + err.message + "\n\n";
	  	errorTxt+="Click OK to continue.\n\n";
	  	this.continue = false;
		alert(errorTxt)
	}
	return this.originalTable;
}

function makeAllTablesSortable(allTables,flag){
	if (this.continue) {
		var i, j;
		if (flag)
			var tbLength = allTables.length;
		else var tbLength = 1;
		for (i = 0; i < tbLength; i++) {
			if(flag) {
				var tb = allTables[i];
			}
			else {
				var tb = allTables;
			}
			with(tb){
				var th = getElementsByTagName('th');
				var thLength = th.length;
				for (var j = 0; j < thLength; j++) {
					var targetTh = th[j];
					targetTh.setAttribute('data-sort','descend');
					//Attach click to 'th'
					targetTh.onclick = function(tb,j){
						return function(){
							addListener(tb, j);
						}
					}(tb,j)
				}
			}
		}
	}	
}

function addListener(table,offset){
	var target = table.getElementsByTagName('th')[offset];
	//descend
	if (target.getAttribute('data-sort') == 'descend') {
		target.setAttribute('data-sort', 'ascend');
		target.style.backgroundImage = 'url(ascend.png)';
		selectSort(table, offset, true);
	}
	//ascend
	else {
		target.setAttribute('data-sort', 'descend');
		target.style.backgroundImage = 'url(descend.png)';
		selectSort(table, offset, false);
	}
}

//selectSort method
function selectSort(table, offset, way){
	var tBody = table.getElementsByTagName('tbody')[0];
	//select sort
	var tr = tBody.getElementsByTagName('tr');
	//if tbody contain th, we need to reduce it
	var thCount = 0;
	for (var i = 0; i < tr.length; i++) {
		if (tr[i].getElementsByTagName('th')[0]){
			thCount++;
		}
		else break;
	}
	
	for (var i = thCount; i < tr.length - 1; i++){
		var index = i;
		for (var j = i + 1; j < tr.length; j++) {
			var current = tr[index].getElementsByTagName('td')[offset].innerHTML;
			var temp = tr[j].getElementsByTagName('td')[offset].innerHTML;
			//descend or ascend
			if (current > temp && way) {
				index = j;
			}
			else if (current < temp && !way) {
				index = j;
			}
		}
		if (index != i) {
			var node = tr[i];
			var node_ = tr[index];
			tBody.insertBefore(tr[i],tr[index]);
			tBody.insertBefore(tr[index],tr[i]);
		}
	}
}

function makeAllTablesFilterable(allTables,flag){
	if (this.continue) {
		if (flag)
			var length = allTables.length;
		else var length = 1;
		for (var i = 0; i < length; i++) {
			if(flag) {
				var tb = allTables[i];
				var tbParent = tb.parentNode;
			}
			else {
				var tb = allTables;
				var tbParent = allTables.parentNode;
			}
			var node = document.createElement('input');
			node.setAttribute('class','filter');
			//Attach onchange to 'input'
			node.onchange = function(table,node){
				return function(){
					var filterVal = eval(node).value;
					filter(table,filterVal);
				}
			}(tb,node)
			//create an input before table
			tbParent.insertBefore(node,tb);
		}
	}
}

function filter(table,val){
	var tr = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	//if tbody contain th, we need to reduce it
	var thCount = 0;
	for (var i = 0; i < tr.length; i++) {
		if (tr[i].getElementsByTagName('th')[0]){
			thCount++;
		}
		else break;
	}
	var trLength = tr.length;
	for (var i = thCount; i < trLength; i++){
		var txt = "";
		var flag = false;
		var td = tr[i].getElementsByTagName('td');
		var tdLength = td.length;
		for (var j = 0; j < tdLength; j++) {
			td[j].innerHTML = td[j].innerHTML.replace(/<[^>].*?>/g,"");
			txt = td[j].innerHTML;
			var begin = txt.indexOf(val)*1;
			var end = val.length*1;
			if (begin == -1) continue;
			else {
				flag = true;
				var first = td[j].innerHTML.slice(0, begin);
				var second = '<span class="tag">'+ td[j].innerHTML.slice(begin, begin+end) + '</span>';
				var third = td[j].innerHTML.slice(begin + end, td[j].innerHTML.length);
				td[j].innerHTML = first + second + third;
			}
		}
		if (!flag) tr[i].style.display='none';
		else tr[i].style.display='table-row';
	}
	
}

function makeSortable(table){
	makeAllTablesSortable(table,false);
	return table;
}

function makeFilterable(table){
	makeAllTablesFilterable(table,false);
	return table;
}
/*
  The final load
*/
window.onload=function(){
	var table = getAllTables();
	
	//part2
	// makeAllTablesSortable(table,true);
	// makeAllTablesFilterable(table,true);

	//part 3
	for (var i = 0; i < table.length; i++){
		makeSortable(makeFilterable(table[i]));
	}

}

