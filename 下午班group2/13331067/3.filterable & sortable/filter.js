// window.onload = function() {
//     makeAllTablesFilterable();
// }

function oricolor() {  // 为最初的表格调整样式
    var elements = document.getElementsByTagName("table");
    for (var i = 0; i < elements.length; i++) {
        var rows = elements[i].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (j % 2 == 1) rows[j].className = "evencolor";
        }
    }
    for (var i = 0; i < elements.length; i++) {
        var thset = elements[i].getElementsByTagName("th");
        for (var k = 0; k < thset.length; k++) {
            thset[k].className = "thunclicked";
        }
    } 
}

function makeAllTablesFilterable() {
    oricolor();
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {  // 设置每一个表格都可过滤
        makeTableFilterable(tables[i]);
    }
    return tables;
}

function makeTableFilterable(table) {
    var inputbox = document.createElement("input");
    document.body.insertBefore(inputbox, table);
    inputbox.oninput = function () {
        var text = this.value;
        var trset = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        var status; // 存放bool值，记录某一行是否有匹配的单词，不匹配则隐藏
        var reg = new RegExp(text, 'ig'); // 用正则表达式匹配
        var reg2 = /<span style=\"background-color: yellow\">|<\/span>/g;  // 把<span>标签去掉 // 超级大坑！style后面不能有空格！要不会造成转义方面出现问题！！
        var tmpreg = reg;
        for (var i = 0; i < trset.length; i++) {
            var tdset = trset[i].getElementsByTagName('td');
            status = false;
            for (var j = 0; j < tdset.length; j++) {
                tdset[j].innerHTML = tdset[j].innerHTML.replace(reg2, "");
                if (text == "") status = true;
                if (text != "" && reg.test(tdset[j].innerHTML)) {
                    status = true;
                    var str = tdset[j].innerHTML;
                    var patt = new RegExp(text, "ig");
                    var ori_text;
                    var tmp = str;
                    var count = 0;
                    while ((ori_text = patt.exec(str)) != null)  {
                        var str1 = tmp.substring(0, patt.lastIndex - text.length + 46*count);
                        var str2 = tmp.substring(patt.lastIndex + 46*count);
                        var to_change = "<span style='background-color: yellow'>" + ori_text[0] + "</span>";
                        var tmp = str1 + to_change + str2;
                        count++;
                    }
                    tdset[j].innerHTML = tmp;
                    // console.log(tdset[j].innerHTML);
                    // var str = tdset[j].innerHTML;
                    // console.log(tmpreg.exec(str));
                    // var ori_text;
                    // while (reg.exec(tdset[j].innerHTML) != null) {
                    //     ori_text = reg.exec(tdset[j].innerHTML)[0];
                    //     // var tmpreg = new RegExp(ori_text[0], 'g');
                    //     // var to_change = "<span style='background-color: yellow'>" + ori_text[0] + "</span>";
                    //     // tdset[j].innerHTML = tdset[j].innerHTML.replace(tmpreg, to_change);

                    // }
                    //var to_change = "<span style='background-color: yellow'>" + text + "</span>";
                    //tdset[j].innerHTML = tdset[j].innerHTML.replace(reg, to_change);
                }
            }
            if (status === false)  trset[i].className = 'hidden';
            else  trset[i].className = 'nohidden';
        }
    }
}
