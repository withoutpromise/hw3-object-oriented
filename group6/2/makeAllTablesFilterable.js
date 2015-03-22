function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var tb = document.getElementById(tables[i].id);

        var input_Field = document.createElement('form');
        input_Field.name = 'input';

        var ip = document.createElement('input');
        ip.type = 'text';
        ip.name = 'contend';
        input_Field.appendChild(ip);

        var sb = document.createElement('input');
        sb.type = 'button';
        sb.value = 'submit';
        sb.onclick = function() {
            var str = this.parentNode.contend.value;
            var str_length = str.length;
            //alert(str_length);
            var tb_id = this.parentNode.parentNode.id;
            var thisTable = document.getElementById(tb_id);
            var tds = thisTable.getElementsByTagName('td');
            for (var m = 0; m < tds.length; m++) {
                tds[m].style.color = 'black';
            }
            var indexs = [];
            for (var j = 0; j < tds.length; j += 3) {
                if (tds[j].innerHTML.indexOf(str) < 0 && tds[j + 1].innerHTML.indexOf(str) < 0 && tds[j + 2].innerHTML.indexOf(str) < 0) {
                    indexs.push(j / 3);
                } else {
                    if (tds[j].innerHTML.indexOf(str) >= 0) {
                        tds[j].style.color = 'red';
                    }
                    if (tds[j + 1].innerHTML.indexOf(str) >= 0) {
                        tds[j + 1].style.color = 'red';
                    }
                    if (tds[j + 2].innerHTML.indexOf(str) >= 0) {
                        tds[j + 2].style.color = 'red';
                    }
                }
            }
            for (var p = 0; p < indexs.length; p++) {
                thisTable.deleteRow(indexs[p] + 1 - p);
            }
            
        }
        input_Field.appendChild(sb);

        tb.appendChild(input_Field);
    }
}