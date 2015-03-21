
function getAllTables() {
  return document.getElementsByTagName('table');
}

function makeAllTablesFilterable(table) {
  for (var i = 0; i < table.length; i++) {
      addInputAndFilterable(table[i]);
	}
}


function addInputAndFilterable(table) {
   var input = document.createElement("input");
   input.onchange = function() {
      Filterable(table,input.value);
   }
   table.appendChild(input);
   
  
}


function Filterable(table,value) {
    var length_ = table.rows[0].cells.length - 1;
   for (var colindex = length_ ; colindex >= 0 ; colindex--) {
       var flag = true;
       for(var rowindex = 0;rowindex < table.rows.length;rowindex++) {
         if (table.rows[rowindex].cells[colindex].innerHTML == value) {
		    table.rows[rowindex].cells[colindex].className = "Focus";
			flag = false;
		 }
       }
	   if (flag) {
	      for(var rowindex = 0;rowindex < table.rows.length;rowindex++) {
		     table.rows[rowindex].deleteCell(colindex);
		  }
	   }
        flag = true;
  }
  
}