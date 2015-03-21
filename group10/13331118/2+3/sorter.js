//*********************************************
// In file sort.js
// Creat by Junjie Li, 2014-10-26
// Last modified by Junjie Li, 2015-3-21
// Email: 287150625@qq.com
//*********************************************


window.onload = function(){
    var tables = getAllTables();
    makeAllTableSortable(tables);
    makeAllTableFilterable(tables);
}

function getAllTables(){
    var tables = document.getElementsByTagName("table");
    return tables;
}

function makeAllTableSortable(tables){
    for (var i = 0; i < tables.length; i++) {
        makeSortable(tables[i]);
    }

}

function makeSortable(table){
    // get the first row of each table which is the head
    var heads = table.getElementsByTagName("tr")[0].children;
    for (var j = 0; j < heads.length; j++) {
        heads[j].classList.add("unsort");

        // add mySort event to all heads in the table head
        heads[j].addEventListener("click", mySort);
    }
    return table;
}

function mySort() {

    // store the class name of the head before sort
    var oldClassName;
    if (this.classList.contains("unsort")) {
        oldClassName = "unsort";
    }
    if (this.classList.contains("ascend")) {
        oldClassName = "ascend";
    }
    if (this.classList.contains("descend")) {
        oldClassName = "descend";
    }

    // change the class name to change style of all heads
    var heads = this.parentNode.children;
    for (var i = 0; i < heads.length; i++) {
        heads[i].classList.remove("ascend", "descend");
        heads[i].classList.add("unsort");
    }

    if (oldClassName === "unsort") {
        this.classList.add("ascend");
    }
    if (oldClassName === "ascend") {
        this.classList.add("descend");

    }
    if (oldClassName === "descend") {
        this.classList.add("ascend");
    }

    // sotre which colum the head is
    var current = this.parentNode;
    while (current.tagName !== "TABLE") {
        current = current.parentNode;
    }
    var rows = current.getElementsByTagName("tr");
    var index = this.cellIndex;

    // sort all the rows except the head, ascend by default
    for (var i = 0; i < rows.length-1; i++) {

        // j begin from 1 to ignore the head
        for (var j = 1; j < rows.length-1-i; j++) {
            var patt = /\d+/;
            var result;
            var content1 = rows[j].children[index].innerHTML;
            var content2 = rows[j+1].children[index].innerHTML;
            if (patt.test(content1) && patt.test(content2)) {
                result = parseInt(content1)-parseInt(content2);
            } else {
                result = content1.localeCompare(content2);
            }

            // inverse the result in case of descend
            if (this.classList.contains("descend")) result = 0 - result;
            if (result > 0) {

                // switch two rows
                var tmp1 = rows[j+1].cloneNode(true);
                var tmp2 = rows[j].cloneNode(true);
                rows[j].parentNode.replaceChild(tmp1, rows[j]);
                rows[j].parentNode.replaceChild(tmp2, rows[j+1]);
            }
        }
    }

    // change the class name to change the style afeter sort
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
    input.value = "please input keywords to filter...";
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
