/**
 * Created by Lijianhua on 3/13/15.
 */

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFiltable(makeAllTablesSortable(tables));
}

function getAllTables()
{
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables)
{
    for (var i = 0; i < tables.length; i++) {
        var head = tables[i].getElementsByTagName("thead");
        var htr = head[0].getElementsByTagName("tr");
        var hth = htr[0].getElementsByTagName("th");
        for (var j = 0; j < hth.length; j++) {
            var arr;
            var config;
            hth[j].onclick = function() {
                arr = new Array();
                var body = this.parentNode.parentNode.nextSibling.nextSibling;
                var btr = body.getElementsByTagName("tr");
                for (var k = 0; k < btr.length; k++) {
                    arr.push(btr[k]);
                    btr[k].className = "";
                }
                if (this.className == "") {
                    config = 1;
                    var brother = this.parentNode.getElementsByTagName("th");
                    for (var k = 0; k < brother.length; k++) {
                        brother[k].className = "";
                        if (brother[k].getElementsByTagName("img").length != 0) {
                            brother[k].removeChild(brother[k].getElementsByTagName("img")[0]);
                        }
                    }
                    this.className = "selected";
                    var img = "<img src='ascend.png'>";
                    this.innerHTML = this.innerHTML + img;
                } else {
                    if (config == 1) {
                        this.getElementsByTagName("img")[0].src = "descend.png";
                        config = -1;
                    } else {
                        config = 1;
                        this.getElementsByTagName("img")[0].src = "ascend.png";
                    }
                }
                sorting(arr, getIndex(this), config);
                var str = "";
                for (var k = 0; k < arr.length; k++) {
                    str += arr[k].outerHTML;
                }
                body.innerHTML = str;
                btr = body.getElementsByTagName("tr");
                for (var k = 1; k < btr.length; k+=2) {
                    btr[k].className = "alternate";
                }
            }
        }
    }
    return tables;
}

var sorting = function(array, index, config) {
    for (var i = 0; i < array.length-1; i++) {
        var k = i;
        for (var j = i+1; j < array.length; j++) {
            if (cmp(array[k], array[j], index) == config) {
                k = j;
            }
        }
        var temp;
        if (k != i) {
            temp = array[i];
            array[i] = array[k];
            array[k] = temp;
        }
    }
}

var getIndex = function(obj) {
    var parent = obj.parentNode;
    parent = parent.getElementsByTagName("th");
    for (var k = 0; k < parent.length; k++) {
        if (parent[k] == obj)
        {
            return k;
        }
    }
}

var cmp = function(obj1, obj2, index)
{
    var btd1 = obj1.getElementsByTagName("td");
    var btd2 = obj2.getElementsByTagName("td");
    if (btd1[index].innerText > btd2[index].innerText) return 1;
    else if (btd1[index].innerText == btd2[index].innerText) return 0;
    else return -1;
}

