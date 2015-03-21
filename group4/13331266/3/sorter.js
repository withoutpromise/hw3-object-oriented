window.onload = function(){

	//task3
	//t1 = document.getElementById("todo");
	//makeSortable(t1);
	t2 = document.getElementById("staff");
	makeFilterable(makeSortable(t2));
	t1 = document.getElementById("todo");
	makeSortable(makeFilterable(t1));
};

function makeSortable (table){
	heads = table.tHead.getElementsByTagName("th");
	for (j = 0; j < heads.length; j++) {
			heads[j].addEventListener("click", sortIt);	     
	}
    return table;
}

function makeFilterable (table){
	test = document.createElement("div");
	test.innerHTML="<form  name='input'  onsubmit='return Filter(this)' method='post'>"+
						"<input type='text' name='key' id='key' />"+
						"<input type='button' value='Filter' onclick='this.form.onsubmit()'/>"+
						"</form>";
	table.appendChild(test);
	return table;
}

function sortIt(){
	var col = this.cellIndex;
	var tb = this.parentNode.parentNode.parentNode;
	var bodyl = tb.tBodies[0].children.length;
	var rows = [];
	for (var i=0; i<bodyl; i++ ) {
			rows.push(tb.tBodies[0].children[0]);
			tb.tBodies[0].removeChild(tb.tBodies[0].children[0]);
	} //copy tbody to array, and delete the rows of table
	if(this.children.length==0){ // if this column has never been sorted, ascend it.
        for(var i=0; i<this.parentNode.children.length; i++){
        this.parentNode.children[i].style.backgroundColor="blue";
        if( this.parentNode.children[i].children.length>0){
        	this.parentNode.children[i].removeChild(this.parentNode.children[i].children[0]);
        }      
		}
		this.style.backgroundColor = "lightblue";
		this.innerHTML=this.innerHTML+'<img src="ascend.png" alt="ascend"/>';
        this.children[0].style.float="right";
    	for (var i=0; i<rows.length; i++ ) {  //
        	var temp;
        	for (var j=i+1; j<rows.length; j++ ){
        		if(rows[i].children[col].innerHTML > rows[j].children[col].innerHTML) {
        			temp = rows[i];
        			rows[i]=rows[j];
        			rows[j]=temp;
        		}
        	}
        	tb.tBodies[0].appendChild(rows[i]);             
    	}  //sort by string
	} else { // this column has been sorted, reverse it.
		rows.reverse();
		for (var i=0; i<rows.length; i++){
			tb.tBodies[0].appendChild(rows[i]);
		}
		if(this.children[0].alt=="ascend"){
			this.children[0].src="descend.png";
			this.children[0].alt="descend";
		} else {
			this.children[0].src="ascend.png";
			this.children[0].alt="ascend";
		}
	}
	//return tb;
};

function Filter(me){
    with(me){
    	with(key){
    		//alert(value); //learn a new method!
    		keyword = value;
    	}
    }
    var table = me.parentElement.parentElement;
    var rows = [];
    var rowsl = table.rows.length;
    for (var i=0; i<rowsl; i++ ) {
			rows.push(table.rows[0]);
			table.deleteRow(0);
	}
	table.removeChild(table.children[2]);
    newRows = [];
    for (var i = 0; i < rowsl; i++) {
    	for (var j = 0; j < rows[i].children.length; j++) {
    		var flag = 0; // avoid repeatly appending rows.
    		if(rows[i].children[j].innerHTML.indexOf(keyword) != -1){
    			var str = rows[i].children[j].innerHTML;
    			str=str.split(keyword);
    			rows[i].children[j].innerHTML = str[0];
    			for(var n = 1; n < str.length; n++){
    				rows[i].children[j].innerHTML = rows[i].children[j].innerHTML+
    				"<span style='color:red'>"+keyword+"</span>"+str[n]; // highlight keywords.
    			}
    			if(flag == 0){
    				table.appendChild(rows[i]);
    				flag = 1;
    			}
            	
    		}
    	}
    }
		test = document.createElement("div");
		test.innerHTML="<form  name='input'  onsubmit='return Filter(this)' method='post'>"+
						"<input type='text' name='key' id='key' />"+
						"<input type='button' value='Filter' onclick='this.form.onsubmit()'/>"+
						"</form>";
	    table.appendChild(test); // adapt filter input position.
};
