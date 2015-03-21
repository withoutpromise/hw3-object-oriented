# HW3 Object Oriented

- extend部分
    
    直接在浏览器Console或用其他js runtime(比如Node)执行extend.js即可

- table部分

    - 交互说明
    
        - sort: 点击表头项按升序排序, 再次点击则降序排序
        
        - filter: 在表格上方的filter输入栏中输入关键字, 过滤不含关键字的行(大小写不敏感), 同时关键字高亮(\<strong>)
    
    - 兼容性说明
    
        - 兼容第一行包含\<th>的表格(无论是否含有\<thead>和\<tbody>)
    
        - 能识别表格中的<a>等坑爹标签, 只按文本部分排序, 过滤和高亮
    
        - 识别全数字的列(兼容格式形如'0', '0.', '.0', '0.0'), 此时按数字大小而不是字典序排序
    
    - 用HW2的页面测试
    
        直接用浏览器打开index.html
    
    - 在其他网页中测试(只需要table.js, 不带任何样式)
    
        复制table.js在Console中执行即可
    
        参考URL(s):
    
            - http://www.w3school.com.cn/jsref/dom_obj_table.asp
    
            - http://data.stats.gov.cn/workspace/index?m=hgyd
