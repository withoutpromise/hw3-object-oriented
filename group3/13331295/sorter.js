window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
    makeAllTableFilterable(tables);
}

// 获取网页中的所有table
function getAllTables() {
    var _tables = document.getElementsByTagName("table");
    return _tables;
}

//使table中的每一列加上一个unsort标签并添加一个click的监听器
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var each_head = tables[i].getElementsByTagName("tr")[0].children;

        for (var j = 0; j < each_head.length; j++) {
            each_head[j].classList.add("unsort");
            each_head[j].addEventListener("click", sortTables);
        }
    }
}

function sortTables() {
    var Table_heads = this.parentNode.children;

    //判断当前点击的列是否是按照升序排列。
    var isAscend = false;
    if (this.className == "ascend") isAscend = true;

    //在进行排序前将其他列表头设置为无序
    for (var i = 0; i < Table_heads.length; i++) {
        Table_heads[i].classList.remove("ascend", "descend");
        Table_heads[i].classList.add("unsort");
    }

    if (isAscend) {
        this.className = "descend";
    } else {
        this.className = "ascend";
    }

    //向上寻找到找到table标签
    var target_table = this.parentNode;
    while (target_table.tagName !== "TABLE") {
        target_table = target_table.parentNode;
    }

    var rows = target_table.getElementsByTagName("tr");
    var index = this.cellIndex;

    //使用冒泡排序对表格进行排序。因为表中含有一行thead，所以排序时需要减一
    for (var i = 0; i < rows.length-1; i++) {
        for (var j = 1; j < rows.length-1-i; j++) {
            //localeCompare() stringObject小于target,则localeCompare()返回小于0的数。
            //如果stringObject大于 target,则该方法返回大于0的数.如果两个字符串相等，或根据本地排序规则没有区别，该方法返回0。
            var ans = rows[j].children[index].innerHTML.localeCompare(rows[j+1].children[index].innerHTML);

            //当是降序时。反向比较
            if (this.className === "descend") {
                ans = 0 - ans;
            }
            if (ans > 0) {
                var tmp1 = rows[j+1].cloneNode(true);
                var tmp2 = rows[j].cloneNode(true);
                rows[j].parentNode.replaceChild(tmp1, rows[j]);
                rows[j].parentNode.replaceChild(tmp2, rows[j+1]);
            }
        }
    }

    //设置栏目奇偶行的背景色保持奇数白色、偶数浅灰色
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

//在每一个table前面加上一个filter words的输入框
function makeFilterable(table) {
    var form = document.createElement("FORM");
    var input = document.createElement("INPUT");
    input.placeholder = "Input filter words here";
    input.addEventListener("keyup", Filter);
    form.appendChild(input);
    table.parentNode.insertBefore(form, table);
}

//重置这一个table
function resetInput(table) {
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].classList.remove("hidden");
        for (var j = 0; j < table.rows[i].children.length; j++) {
            if (table.rows[i].children[j].innerHTML.indexOf('<span class="filter_words">') !== -1) {
                var otherStrings = table.rows[i].children[j].innerHTML.split('<span class="filter_words">');
                table.rows[i].children[j].innerHTML = otherStrings.join('');
            }
            if (table.rows[i].children[j].innerHTML.indexOf('</span>') !== -1) {
                var otherStrings = table.rows[i].children[j].innerHTML.split('</span>');
                table.rows[i].children[j].innerHTML = otherStrings.join('');
            }
        }
    }
}

//通过对每一行的每一个子元素进行filter words的判断。从而屏蔽不存在filter words的那一行
function Filter() {
    var filter_words = this.value.toString();
    var table = this.parentNode.nextElementSibling;
    resetInput(table);
    if (filter_words === "") {
        return;
    }
    for (var i = 1; i < table.rows.length; i++) {
        isexist = false;
        for (var j = 0; j < table.rows[i].children.length; j++) {
            var string = table.rows[i].children[j].innerHTML;
            if (string.indexOf(filter_words) !== -1) {
                var otherStrings = string.split(filter_words);
                table.rows[i].children[j].innerHTML = otherStrings.join('<span class="filter_words">'+filter_words+'</span>');
                isexist = true;
            }
        }
        if (isexist) {
            table.rows[i].classList.remove("hidden");
        } else {
            table.rows[i].classList.add("hidden");
        }
    }
}