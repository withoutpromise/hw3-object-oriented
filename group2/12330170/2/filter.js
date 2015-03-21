window.onload = function()
{
	var tables = getAllTables();
	makeAllTablesFiltable(tables);
}

function getAllTables()
{
	return document.getElementsByTagName("table");
}

function makeAllTablesFiltable(tables)
{
	for (var i=0; i<tables.length; i++)
	{
		var textfield = document.createElement("input");
		tables[i].parentNode.insertBefore(textfield, tables[i]);
		textfield.addEventListener("input", filterable);
	}
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