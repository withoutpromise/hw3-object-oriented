window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}
function makeAllTablesSortable(tables) {
    // add icon
    addIcon();
	// add event
	for (var i = 0; i < tables.length; i++) {
		var th = tables[i].getElementsByTagName("th")
		for (var k = 0; k < th.length; k++) {
			th[k].setAttribute("onclick", "mySort(" + i + ", " + k + ");");
		}
	}
}
function addIcon() {
    var ths = document.getElementsByTagName("th");
    for (var i = 0; i < ths.length; i++) {
        var img = document.createElement("img");
        img.setAttribute("class", "flag_img");
        img.setAttribute("src", "ascend.png");
        img.style.cssText = "width : 16px";
        ths[i].appendChild(img);
    }
}
function changeIcon(flag) {
    var imgs = document.getElementsByClassName("flag_img");
    for (var i = 0; i < imgs.length; i++) {
        if (flag == "up") {
            imgs[i].src = "ascend.png";
        } else {
            imgs[i].src = "descend.png";
        }
    }
}
function mySort(tableNumber, column) {
	var tables = document.getElementsByTagName("table");
	var trs = tables[tableNumber].getElementsByTagName("tr");
	// new array to store tr
	var arr = [];
	for (var i = 1; i < trs.length; i++) {
		arr.push(trs[i]);
	}
    // sort & reverse
	arr.sort(function(a, b){  
        var v1 = a.cells[column].innerHTML;  
        var v2 = b.cells[column].innerHTML;  
        return v1.localeCompare(v2);  
    });
    var head = trs[0].cells[column];
    
    if (head.className == "sort") {
        arr.reverse();
    }
    // add sorted array to dom
    var tbody = tables[tableNumber].getElementsByTagName("tbody")[0];
    for (var i = 0; i < arr.length; i++) {  
        tbody.appendChild(arr[i]);  
    }

    // change the outlook of table head
    for (var l = 0; l < tables.length; l++) {
    	var ths = document.getElementsByTagName("th");
    	for (var k = 0; k < ths.length; k++) {
    		ths[k].style.cssText = "background-color: rgb(2,27,127)";
    	}
    }
    //alert(head.className);
    if (head.className == "sort") {
        head.className = "reverse";
        changeIcon("down");
    }
    else {
        head.className = "sort";
        changeIcon("up");
    }
    head.style.cssText = "background-color: rgb(163,177,252)";

}
