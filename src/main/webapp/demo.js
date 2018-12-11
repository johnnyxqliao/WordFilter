function add(node) {
    if (($(node).attr('id') + 'Ul') === "includeUl") {
        $('#includeUl').append(
             '<li>\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<label\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tfor="input_s_1"></label><input id="input_s_1"\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   class="sipoc_content">\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button onclick="remove(this)"\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass="btn btn-danger btn-xs" id="includeLi">\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  <i class="ace-icon fa fa-reply icon-only"><i\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  class="icon-trash icon-white">\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  </i>\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  </i>\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  </li>'
        );
    } else {
        $('#exceptionUl').append(
             '<li><label\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  for="input_s_2"></label><input id="input_s_2"\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t class="sipoc_content">\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button onclick="remove(this)" id="exceptionLi"\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tclass="btn btn-danger btn-xs">\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  <i class="ace-icon fa fa-reply icon-only"><i\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  class="icon-trash icon-white" ></i></i>\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n' +
             '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  </li>'
        );
    }
}

function remove(node) {
    $(node).parent().remove();
}




function WordFilter() {
    var include='' ;
    var exception ='';
    var includeUl = $('#includeUl').children();
    var exceptionUl = $('#exceptionUl').children();
    for (var i = 0; i < includeUl.length; i++) {
        include+="-"+($(includeUl[i]).children('input').val());
    }
    for (var i = 0; i < exceptionUl.length; i++) {
        if($(exceptionUl[i]).children('input').val()===""){
            alert("不要调皮，请填写完整数据哟");
        }else {
            exception+="-"+($(exceptionUl[i]).children('input').val());
        }
    }
    if(include.length!==0&&exception.length!==0){
        calFilter(include,exception);
    }
}

function calFilter(include,exception) {
    var inputPath = $('#inputPath').val().replace(/\\/g,'\\\\');
    var outPath = $('#outPath').val().replace(/\\/g,'\\\\');
    var data = {
        'include':include,
        'exception':exception,
        'inputPath':inputPath,
        'outPath':outPath
    };
    if(inputPath===""||outPath===""){
        alert("请填写输入和输出文件路径");
        return;
    }
    if(include.length===0||exception.length===0){
        alert("我虽然很强大，但还是要先添加数据");
    }else {
        console.log(data);
        $.ajax({
            type: "post",
            url: "sariLeisiyu",
            data: data,
            success: function () {
                alert("数据编辑成功");
            }
        });
    }

}