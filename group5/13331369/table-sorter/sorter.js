window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}

function getAllTables() {
    var table = document.getElementsByTagName("table");
    return table;
}

var isClick = 0,
    isClick1 = 0; //to confirm output the input textarea
var textArea = 0; // to get the text from the user

function makeAllTablesSortable(table) {

    var inputId; // the id is used to filter

    th = document.getElementsByTagName("th");

    th[0].onclick = function() {
        sortTable(0);
        var newInput;
        isClick++;
        if (isClick == 1) {
            var newInput = document.createElement("input");
            newInput.id = "input1";
            document.getElementById("todo").appendChild(newInput);
        }

        document.getElementById("input1").onchange = function() {
            filter(1);
        }
    }
    th[1].onclick = function() {
        sortTable(1);
        var newInput;
        isClick++;
        if (isClick == 1) {
            var newInput = document.createElement("input");
            newInput.id = "input1";
            document.getElementById("todo").appendChild(newInput);
        }
        document.getElementById("input1").onchange = function() {
            filter(1);
        }
    }
    th[2].onclick = function() {
        sortTable(2);
        var newInput;
        isClick++;
        if (isClick == 1) {
            var newInput = document.createElement("input");
            newInput.id = "input1";
            document.getElementById("todo").appendChild(newInput);
        }
        document.getElementById("input1").onchange = function() {
            filter(1);
        }
    }
    th[3].onclick = function() {
        sortTable(3);
        var newInput;
        isClick1++;
        if (isClick1 == 1) {
            var newInput = document.createElement("input");
            newInput.id = "input2";
            document.getElementById("staff").appendChild(newInput);
        }
        document.getElementById("input2").onchange = function() {
            filter(2);
        }
    }
    th[4].onclick = function() {
        sortTable(4);
        var newInput;
        isClick1++;
        if (isClick1 == 1) {
            var newInput = document.createElement("input");
            newInput.id = "input2";
            document.getElementById("staff").appendChild(newInput);
        }
        document.getElementById("input2").onchange = function() {
            filter(2);
        }
    }
    th[5].onclick = function() {
        sortTable(5);
        var newInput;
        isClick1++;
        if (isClick1 == 1) {
            var newInput = document.createElement("input");
            newInput.id = "input2";
            document.getElementById("staff").appendChild(newInput);
        }
        document.getElementById("input2").onchange = function() {
            filter(2);
        }
    }
}

//filter function whichNUm represent which table is active
function filter(whichNum) {

    if (whichNum === 1) {

        var tdContent = document.getElementById("todo").getElementsByTagName("td");
        var trLength = document.getElementById("todo").getElementsByTagName("tr"); //
        var str, inputValue = document.getElementById("input1").value;

        for (var whichRow = trLength.length - 1; whichRow >= 1; whichRow--) {

            str = tdContent[3 * whichRow - 3].innerHTML + tdContent[3 * whichRow - 2].innerHTML + tdContent[3 * whichRow - 1].innerHTML;

            if (str.search(inputValue) < 0) {
                var child = document.getElementById("todo").getElementsByTagName("tr")[whichRow];
                document.getElementsByTagName("tbody")[0].removeChild(child);
            } else {
                  for (var i = 3 * whichRow - 3; i < 3 * whichRow; i++) {
                     var str1 = tdContent[i].innerHTML;
                     var re = "/";
                     re += inputValue
                     re += "/g";
                     tdContent[i].innerHTML = str1.replace(re, "<span>dsfdsd</span>");
                }
            }
    }
} else {
    var tdContent = document.getElementById("staff").getElementsByTagName("td");
    var str, inputValue = document.getElementById("input2").value;
    var trLength = document.getElementById("staff").getElementsByTagName("tr");

    for (var whichRow = trLength.length - 1; whichRow >= 1; whichRow--) {
        str = tdContent[3 * whichRow - 3].innerHTML + tdContent[3 * whichRow - 2].innerHTML + tdContent[3 * whichRow - 1].innerHTML;
        if (str.search(inputValue) < 0) {
            var child = document.getElementById("staff").getElementsByTagName("tr")[whichRow];
            document.getElementsByTagName("tbody")[1].removeChild(child);
        }
    }
}
}

//get which order i can do
var count = [1, 1, 1, 1, 1, 1],
    mem = -1;

function sortTable(col) {

    var thead = [],
        tbody = [],
        temp1, temp3, temp4, va, temp5;
    var v, g, temp, str = [],
        str2 = [],
        td = [],
        td1 = [],
        tr = [],
        th = [],
        th1 = [],
        tr1 = [],
        t, t1;

    temp1 = col; //which  colume in which table is active

    if (temp1 < 3) {
        td1 = document.getElementById("todo").getElementsByTagName("td");
        th1 = document.getElementById("todo").getElementsByTagName("th");
    } else {
        td1 = document.getElementById("staff").getElementsByTagName("td");
        th1 = document.getElementById("staff").getElementsByTagName("th");
    }

    for (va = 0; va < 3; va++) {
        if (temp1 < 3)
            t = temp1;
        else
            t = temp1 - 3;
        str[va] = td1[t + 3 * va].innerHTML;
    }

    if (count[temp1] == 1) {
        if (temp1 < 3)
            th1[temp1].style.background = "no-repeat right url('ascend.png')";
        else
            th1[temp1 - 3].style.background = "no-repeat right url('ascend.png')";
        count[temp1] = 0;
        str.sort();
    } else {
        if (temp1 < 3)
            th1[temp1].style.background = "no-repeat right url('descend.png')";
        else
            th1[temp1 - 3].style.background = "no-repeat right url('descend.png')";
        count[temp1] = 1;
        str.reverse();
    }

    if (temp1 < 3) {
        th1[temp1].style.backgroundPosition = "bottom right";
        th1[temp1].style.backgroundColor = "#6699FF";
    } else {
        th1[temp1 - 3].style.backgroundPosition = "bottom right";
        th1[temp1 - 3].style.backgroundColor = "#6699FF";
    }
    if (mem != -1) {
        if (temp1 < 3) {
            if (mem != temp1)
                th1[mem].style.background = "blue";
        } else {
            if (mem != temp1 - 3)
                th1[mem].style.background = "blue";
        }
    }

    if (temp1 < 3)
        mem = temp1;
    else
        mem = temp1 - 3;

    for (temp3 = 0; temp3 < str.length; temp3++) {
        for (temp4 = 0; temp4 < str.length; temp4++) {
            if (temp1 < 3)
                t1 = temp1;
            else
                t1 = temp1 - 3;
            if (str[temp3] == td1[3 * temp4 + t1].innerHTML) {
                var temp7 = 3 * temp3 + t1 - t1 % 3;
                var temp8 = 3 * temp4 + t1 - t1 % 3;

                var str1 = td1[temp8].innerHTML;
                td1[temp8].innerHTML = td1[temp7].innerHTML;
                td1[temp7].innerHTML = str1;

                str1 = td1[temp8 + 1].innerHTML;
                td1[temp8 + 1].innerHTML = td1[temp7 + 1].innerHTML;
                td1[temp7 + 1].innerHTML = str1;

                str1 = td1[temp8 + 2].innerHTML;
                td1[temp8 + 2].innerHTML = td1[temp7 + 2].innerHTML;
                td1[temp7 + 2].innerHTML = str1;
            }
        }
    }
}