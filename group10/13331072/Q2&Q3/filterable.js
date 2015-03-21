/*var todo = document.getElementById('todo');
var staff = document.getElementById('staff');


function filterable(TableId) {
	var Table;
	if (TableId == 'todo')
		Table = todo;
	else
		Table = staff;
	var Tbody = Table.tBodies[0];
	var Rows = Tbody.rows;
	var checked = document.getElementById('in').value;

	for (var i = 0; i < rows.length; i++) {
		var flag = true;
		for (var j = 0; j < cells.length; j++)
			if (cells[j].innerHTML == checked) {
				cells[j].id = 'had';
				flag = false;
			}
		if (flag)
			Table.deleteRow(i);
	var frag = document.createDocumentFragment();
	for (var i = 0; i < rows.length; i++) {
		frag.appendChild(rows[i]);
	}
	Tbody.appendChild(frag);
	}
}
function click() {
	filterable('todo');
}*/