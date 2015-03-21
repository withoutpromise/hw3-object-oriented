function makeFilterable (sTableid)
{
	var oTable = document.getElementById(sTableid);
	
	if (oTable.id == "todo")
	{
		var s = document.getElementById("search1").value;
		if (s.length != 0)
		{
			for (var i = 1; i < oTable.rows.length; i++) {
				if (oTable.rows[i].innerHTML.match(s))
					oTable.rows[i].style.display = '';
				else
					oTable.rows[i].style.display = "none";
			};
			HighLight(s, "todo");
		}

		if (s.length == 0)
		{
			for (var i = 1; i < oTable.rows.length; i++)
				oTable.rows[i].style.display= ''; 
		}
	}	
	else 
	{
		var s = document.getElementById("search2").value;
		if (s.length != 0)
		{
			for (var i = 1; i < oTable.rows.length; i++) {
				if (oTable.rows[i].innerHTML.match(s))
				{
					oTable.rows[i].style.display = '';
				}
				else
					oTable.rows[i].style.display = "none";
			};
			HighLight(s, "staff");
		}

		if (s.length == 0)

		{
			for (var i = 1; i < oTable.rows.length; i++)
				oTable.rows[i].style.display= ''; 
		}
	}		
	return oTable;
}
function HighLight(str, type)
{
	var rex = new RegExp(str, 'g');
	var rep = document.getElementById(type);
	for (var i = 1; i < rep.rows.length; i++)
	{
		if(rep.rows[i].innerHTML.match(str))
			rep.rows[i].innerHTML = rep.rows[i].innerHTML.replace(rex, '<font color=red>' + str + '</font>')
	};
}
function Reset(typeId)
{
	var res = document.getElementById(typeId);
	for (var i = 1; i < res.rows.length; i++)
			res.rows[i].style.display= '';

	for (var i = 1; i < res.rows.length; i++)
	{
		for (var j = 0; j < res.rows[i].cells.length; j++)
		{
			var temp = res.rows[i].cells[j].innerHTML.replace(/<.+?>/gim, '');
			res.rows[i].cells[j].innerHTML = temp;
		}
			
	};
}
