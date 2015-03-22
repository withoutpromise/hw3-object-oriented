var x;
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);

    //下面为得到每一个在textbox里面出现字符的函数

    document.getElementsByName("what")[0].onkeypress = function() {
        x=0;makeAllTablesFilterable(tables);
    }
    document.getElementsByName("when")[0].onkeypress = function() {
        x=1;makeAllTablesFilterable(tables);
    }
    document.getElementsByName("location")[0].onkeypress = function() {
        x=2;makeAllTablesFilterable(tables);
    }

    document.getElementsByName("fname")[0].onkeypress = function() {
        x=3;makeAllTablesFilterable(tables);
    }
    document.getElementsByName("lname")[0].onkeypress = function() {
        x=4;makeAllTablesFilterable(tables);
    }        
    document.getElementsByName("lcheckin")[0].onkeypress = function() {
        x=5;makeAllTablesFilterable(tables);
    }
   
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {

    //点击与鼠标移开的时候都会进行排序
    
	var title01 = tables[0].rows[0].cells[0];
	title01.onclick = function() { sorting(0,0,this,tables); };
    title01.onmouseout = function() { this.style.backgroundColor = '#000066'};


    var title02 = tables[0].rows[0].cells[1];
	title02.onclick = function() { sorting(0,1,this,tables); };
    title02.onmouseout = function() { this.style.backgroundColor = '#000066'};

    var title03 = tables[0].rows[0].cells[2];   
	title03.onclick = function() { sorting(0,2,this,tables); };
    title03.onmouseout = function() { this.style.backgroundColor = '#000066'};


	var title11 = tables[1].rows[0].cells[0];   
	title11.onclick = function() { sorting(1,0,this,tables); };
    title11.onmouseout = function() { this.style.backgroundColor = '#000066'};

	var title12 = tables[1].rows[0].cells[1]; 
	title12.onclick = function() { sorting(1,1,this,tables); };
    title12.onmouseout = function() { this.style.backgroundColor = '#000066'};

	var title13 = tables[1].rows[0].cells[2];
	title13.onclick = function() { sorting(1,2,this,tables); };
    title13.onmouseout = function() { this.style.backgroundColor = '#000066'};

    return tables;
}


function makeAllTablesFilterable(tables){
    var e;
    if(window.event) // IE8 及更早IE版本
    {
        e=event.keyCode;
    }
    else if(event.which) // IE9/Firefox/Chrome/Opera/Safari
    {
        e=event.which;
    }

    keychar=String.fromCharCode(e);

    if (x<3) {//逐个字符进行比较
        for (var i = 2; i < tables[0].rows.length; i++) {
            var col = tables[0].rows[i].cells[x].innerHTML;
            var judge = 0;
            for (var j = 0; j < col.length ; j++) {
                if (col[j] == keychar){
                    col.replace(keychar,keychar.bold());
                    judge = 1;
                }   
            }
            if (judge == 0)
                tables[0].rows[i].innerHTML=" ";
        }
    }   
    
    else
    {
        x=x-3;
        for (var i = 2; i < tables[1].rows.length; i++) {
            var col = tables[1].rows[i].cells[x].innerHTML;
            var judge = 0;
            for (var j = 0; j < col.length ; j++) {
                if (col[j] == keychar){
                    col.replace(keychar,keychar.bold());
                    judge = 1;
                }
            }
            if (judge == 0)
                tables[1].rows[i].innerHTML=" ";
        }
    }
    
    return tables;
}

//排序函数
    
function sorting(t,l,title,tables) {

    if(title.className == "descend"){
        title.className = "ascend";
        for (var i = 2; i < tables[t].rows.length; i++) {
            for (var j = 2; j <= tables[t].rows.length-i ; j++) {
                if(tables[t].rows[j].cells[l].innerHTML < tables[t].rows[j+1].cells[l].innerHTML){
                    var v = tables[t].rows[j].innerHTML;
                    tables[t].rows[j].innerHTML = tables[t].rows[j+1].innerHTML;
                    tables[t].rows[j+1].innerHTML = v;
                }
            }
        }
    }

    else{
        title.className = "descend";
        for (var i = 2; i < tables[t].rows.length ; i++) {
            for (var j = 2; j <= tables[t].rows.length-i ; j++) {
                if(tables[t].rows[j].cells[l].innerHTML > tables[t].rows[j+1].cells[l].innerHTML){
                    var v = tables[t].rows[j].innerHTML;
                    tables[t].rows[j].innerHTML = tables[t].rows[j+1].innerHTML;
                    tables[t].rows[j+1].innerHTML = v;
                }
            }
        }
    }

}    

    
    	