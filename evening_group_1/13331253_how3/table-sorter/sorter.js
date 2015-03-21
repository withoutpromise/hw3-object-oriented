/*
13331253
group 6
王水
*/
window.onload = function  () { //当窗口打开时，将网页中的表格转化为sortable
	var tables = getAllTables();
	makeAllTablesSortable(tables);
    makeAllTableFilterable(tables);
}
function getAllTables () {
	var tables = document.getElementsByTagName('table');//获取所有包含table的表格
	return tables;
}
var table_num;
function makeAllTablesSortable (tables) {
	for ( table_num = 0;table_num < tables.length;table_num++){//得到符合要求的表格数
		var thead = tables[table_num].getElementsByTagName('tr')[0].children;//得到每个表格的标题栏
		for(var th_num = 0;th_num < thead.length;th_num++) {//为每个标题栏添加click事件监听器，并加上unsort属性
			thead[th_num].className = "unsort";
			thead[th_num].addEventListener('click',makesort);
		}
	}
}
function makesort () {
	var thRows  = this.parentNode;  //this现在是标题栏，thRows用于之后向上遍历找到table
	var isAsc = false;                        
			if (this.className == "ascend") {	
				isAsc = true;
			}
		var heads = this.parentNode.children;
    	for (var i = 0; i < heads.length; i++) {	//点击其他标题时移除之前的升序降序属性
        heads[i].classList.remove("ascend", "descend");
        heads[i].classList.add("unsort");
    }

			if (isAsc) {
				this.className = "descend";               //如果之前是升序，则添加降序属性，高亮降序图标
			} 
			else {
				this.className = "ascend";					//如果之前是降序，则添加升序属性，高亮升序图标
			}


    while (thRows.tagName !== "TABLE") {		//向上遍历之道找到table
        thRows = thRows.parentNode;
    }
    var rows = thRows.getElementsByTagName("tr"); 
    var index = this.cellIndex;
    for (var i = 0; i < rows.length-1; i++) {//由于thead包含tr，所以tbody包含的行数等于总行数减1
        for (var j = 1; j < rows.length-1-i; j++) {//使用冒泡排序法
            var isbig = rows[j].children[index].innerHTML.localeCompare(rows[j+1].children[index].innerHTML);//用localeCompare比较字符串
            if (this.classList.contains("descend"))
            isbig = 0 - isbig;//如果是降序属性，就把比较的结果反向
            if (isbig > 0) {
                var tmp1 = rows[j+1].cloneNode(true);
                var tmp2 = rows[j].cloneNode(true);
                rows[j].parentNode.replaceChild(tmp1, rows[j]);
                rows[j].parentNode.replaceChild(tmp2, rows[j+1]);
            }
        }
    }
    	//使栏目奇偶行的背景色保持奇数白色、偶数浅灰色
    for (var i = 0; i < rows.length; i++) {
        if (i % 2 !== 0) {
            rows[i].classList.remove("alternate");
        }
        if (i % 2 === 0 && i !== 0) {
            rows[i].classList.add("alternate");
        }
    }
}
function makeAllTableFilterable(tables){
    for (var i = 0; i < tables.length; i++) {
        makeFilterable(tables[i]);
    }
}

function makeFilterable(table) {
    var form = document.createElement("FORM");
    var input = document.createElement("INPUT");
    input.value = "关键字";
    input.classList.add("filter");
    input.addEventListener('focus', function() {
        this.value = "";
    })
    input.addEventListener("keyup", myFilter);
    form.appendChild(input);
    table.parentNode.insertBefore(form, table);
    return table;
}

function resetInput(table) {
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        rows[i].classList.remove("hidden");
        for (var j = 0; j < rows[i].children.length; j++) {
            if (rows[i].children[j].innerHTML.indexOf('<span class="substring">') !== -1) {
                var otherStrings = rows[i].children[j].innerHTML.split('<span class="substring">');
                rows[i].children[j].innerHTML = otherStrings.join('');
            }
            if (rows[i].children[j].innerHTML.indexOf('</span>') !== -1) {
                var otherStrings = rows[i].children[j].innerHTML.split('</span>');
                rows[i].children[j].innerHTML = otherStrings.join('');
            }
        }
    }
}

function myFilter() {
    var substring = this.value.toString();
    var table = this.parentNode.nextElementSibling;
    var rows = table.getElementsByTagName("tr");
    var hasString = false;
    resetInput(table);
    if (substring === "") {
        return;
    }
    for (var i = 1; i < rows.length; i++) {
        hasString = false;
        for (var j = 0; j < rows[i].children.length; j++) {
            var string = rows[i].children[j].innerHTML;
            if (string.indexOf(substring) !== -1) {
                var otherStrings = string.split(substring);
                rows[i].children[j].innerHTML = otherStrings.join('<span class="substring">'+substring+'</span>');
                hasString = true;
            }
        }
        if (hasString === false) {
            rows[i].classList.add("hidden");
        } else {
            rows[i].classList.remove("hidden");
        }
    }
}