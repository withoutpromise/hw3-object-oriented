window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(makeAllTablesFilterable(tables));
}
	
function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
		count = new Array();   //为每个表头注册计数器并初始化为0，用于判断ascend或descend函数的执行
		for (var a = 0; a < 6; a++)
		count[a] = 0;
		
		for (var i = 0; i < 2; i++)
			for (var j = 0; j < 3; j++) {
				tables[i].getElementsByTagName("th")[j].onclick = sort;
		}
		return tables;
}

function sort() {
	text = this.childNodes[0].nodeValue;  //text用于ascend和descend的第一步，通过匹配text获取两个函数内的a和b
		
	for (var i = 0; i < 2; i++)
		for (var j = 0; j < 3; j++)
			if (this == document.getElementsByTagName("table")[i].getElementsByTagName("th")[j]) {
				for (var k = 0; k < 3; k++)
					if (document.getElementsByTagName("table")[i].getElementsByTagName("th")[k].className != '' && k != j) {
						document.getElementsByTagName("table")[i].getElementsByTagName("th")[k].className = '';
						count[i * 3 + k] = 0;
					}

				if (checkCount(i, j) % 2 == 0)	{
					this.className = "changeToAscend";
					ascend();
				} else {
					this.className = "changeToDescend";
					descend();
				}
			}
}

function descend() {
	//获取鼠标点击处所在table值a以及所在th值b
	for (var i = 0; i < 2; i++)
		for (var j = 0; j < 3; j++)
			if (text == document.getElementsByTagName("table")[i].getElementsByTagName("th")[j].childNodes[0].nodeValue) {
				var a = i;
				var b = j;
				break;
			}
	var values = getALLValues(a, b);   //获取在a，b位置的列的td，用其文本在compare中比较
	var valuesParent = getParent(values);  //values父节点，供compare交换
	compare(values, valuesParent); //compare降序
}   

function ascend() {
	//获取鼠标点击处所在table值a以及所在th值b
	for (var i = 0; i < 2; i++)
		for (var j = 0; j < 3; j++)
			if (document.getElementsByTagName("table")[i].getElementsByTagName("th")[j].childNodes[0].nodeValue == text) {
				var a = i;
				var b = j;
				break;
			}
	var values = getALLValues(a, b);   //获取在a，b位置的列的td，用其文本在compare中比较
	var valuesParent = getParent(values);  //values父节点，供compare交换
	compare(values, valuesParent); //compare降序
	//首末转换
	var temp = valuesParent[1].innerHTML;
	valuesParent[1].innerHTML = valuesParent[3].innerHTML;
	valuesParent[3].innerHTML = temp;
	var t = values[1];
	values[1] = values[3];
	values[3] = t;
}

function checkCount(i, j) {
	if (i == 0 && j == 0) return count[0]++;
	if (i == 0 && j == 1) return count[1]++;
	if (i == 0 && j == 2) return count[2]++;
	if (i == 1 && j == 0) return count[3]++;
	if (i == 1 && j == 1) return count[4]++;
	if (i == 1 && j == 2) return count[5]++;
}
function getALLValues(a, b) {
	var TRvalues = document.getElementsByTagName("table")[a].getElementsByTagName("tr");
	var values = new Array;
	for (var i = 1; i <= 3; i++) {
	values[i] = TRvalues[i].getElementsByTagName("td")[b];
	}
	return values;
}
function getParent(values) {
	var valuesParent = new Array;
	for (var i = 1; i <= 3; i++) {
	valuesParent[i] = values[i].parentNode;
	}
	return valuesParent;
}
function compare(values, valuesParent) {
	for (var i = 1; i <= 3; i++)
		for (var j = i + 1; j <= 3; j++)
			if (values[i].childNodes[0].nodeValue < values[j].childNodes[0].nodeValue) {
				var temp = valuesParent[i].innerHTML;
				valuesParent[i].innerHTML = valuesParent[j].innerHTML;
				valuesParent[j].innerHTML = temp;
				var t = values[i];
				values[i] = values[j];
				values[j] = t;
			}
}