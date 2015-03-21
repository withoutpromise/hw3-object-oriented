window.onload = function()
{
	var tables = getAllTables();
	makeAllTablesSortable(makeAllTablesFiltable(tables));
}

function getAllTables()
{
	return document.getElementsByTagName("table");
}
//---------------------------------------- sorter -----------------------------------
function makeAllTablesSortable(tables)
{
	for (var i=0; i<tables.length; i++)
	{
		sortable(tables[i]);
	}
	return tables;
}

function sortable(table)
{
	var tHead = table.getElementsByTagName("thead");
	var hTr = tHead[0].getElementsByTagName("tr");
	var hTh = hTr[0].getElementsByTagName("th");
	
	for (var j=0; j<hTh.length; j++)
	{
		//console.log(hTh[j]);
		//var img = "<img />";
		var bool;
		hTh[j].onclick = function()
		{
			//获取点击的表格
			var tBody = this.parentNode.parentNode.nextSibling.nextSibling;
			var bTr = tBody.rows;
			var arr = new Array();
			for (var k=0; k<bTr.length; k++)
				arr.push(bTr[k]);
			
			//获得点击的列号
			var tmpHeads = this.parentNode.getElementsByTagName("th");
			var col;
			for (var k=0; k<tmpHeads.length; k++)
			{
				if (tmpHeads[k] == this)
					col = k;
			}
			
			//是否已被选中，添加排序符号
			if (this.className == "")
			{
                bool = 1;
                var bro = this.parentNode.getElementsByTagName("th");
                for (var k=0; k<bro.length; k++)
				{
					bro[k].className = "";
				}
				this.className = "clicked";
				arr.sort(cmp(col));
              }
			else
			{
				arr.reverse();
				if (bool == 1)
					bool = 0;
				else
					bool = 1;
			}
			var str = this.innerHTML;
			var count = 0;
			for (var k=0; k<str.length; k++)
			{
				if(str[k] != '<')
					count++;
			}
			this.innerHTML = str.substring(0, count);
			if (bool == 1)
				this.innerHTML = this.innerHTML + "<img src = 'ascend.png' />";
			else
				this.innerHTML = this.innerHTML + "<img src = 'descend.png' />";
			
			//调整alternate
			var cc = 0;
			for(var k=0; k<arr.length; k++)
			{
				if (arr[k].className != "hide")
				{
					cc++;
					if (cc%2)
						arr[k].className = "";
					else
						arr[k].className = "alternate";
					console.log(cc);
				}
			}
			
			//更新排序后的tbody
			var oFragment = document.createDocumentFragment();
			for (var k=0; k < arr.length; k++)
			{
				oFragment.appendChild(arr[k]);
			}
			tBody.appendChild(oFragment);
		}
	}
}

function cmp(col)
{
	return function (obj1, obj2)
	{
		var fst = obj1.cells[col];
		var snd = obj2.cells[col];
		if (fst.innerText > snd.innerText)
			return 1;
		else if (fst.innerText < snd.innerText)
			return -1;
		else
			return 0;
	};
}
//-----------------------------------------------------------------------------------
//---------------------------------------- filter -----------------------------------
function makeAllTablesFiltable(tables)
{
	for (var i=0; i<tables.length; i++)
	{
		var textfield = document.createElement("input");
		tables[i].parentNode.insertBefore(textfield, tables[i]);
		textfield.addEventListener("input", filterable);
	}
	return tables;
}

function filterable()
{
	var bTr = this.nextSibling.tBodies[0].rows;
	clearFormat(bTr);
	var count = 0;
	if(this.value != '')
	{
		for(var i=0; i<bTr.length; i++)
		{
			var found = false;
			var bTd = bTr[i].cells;
			for(var j=0; j<bTd.length; j++)
			{
				if (bTd[j].innerText.search(this.value) != -1)
				{
					var matched = new RegExp(this.value, 'g');
					bTd[j].innerHTML = bTd[j].innerHTML.replace(matched, "<span>" + this.value + "</span>");
					found = true;
				}
			}
			if (found)
			{
				count++;
				console.log(count);
				if (count%2)
					bTr[i].className = "";
				else
					bTr[i].className = "alternate";
			}
			else
				bTr[i].className = "hide";
		}
	}
	return this.nextSibling;
}

function clearFormat(bTr)
{
	for(var i=0; i<bTr.length; i++)
	{
		bTr[i].className = "";
		if (i%2)
			bTr[i].className = "alternate";
		var sp = new RegExp("<span>", 'g');
		var _sp = new RegExp("</span>", 'g');
		bTr[i].innerHTML = bTr[i].innerHTML.replace(sp, "");
		bTr[i].innerHTML = bTr[i].innerHTML.replace(_sp, "");
	}
}
//-----------------------------------------------------------------------------------