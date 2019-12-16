var fileon = false;
var closeModal = function(obj) {
    $(obj).parent().remove();
}
function swapArray(arr, index1, index2) {
	   arr[index1] = arr.splice(index2, 1, arr[index1])[0];
	    return arr;
}
function setLeftCharacter(oldhtml) {

    var description = oldhtml.replace(/<.*?>/ig, "");
    var maxlength = $('#limit').data("limit");
    var len = getByteLen(description);
    var slen = maxlength - len;
    $("#limit").attr("data-limit", slen).text(slen);
}

// 自动关闭窗口标识
var ctime;
var countC;
var cInterval;


function Modal(options) {
    if($("body").children(".zeromodal-container.alert").length){
        $(".zeromodal-container.alert").remove()
    }
    if (ctime) clearTimeout(ctime); // 每个弹框在 设置本次自动关闭之前先删除上一个 自动关闭程序
    if (cInterval)  // 每个弹框在 设置本次自动关闭之前先删除上一个 自动关闭程序
    {   $(".zeromodal-container.alert ").remove();
    	clearInterval(cInterval);
    }
    	//debugger;

    countC = 3;
    wlxtlang_zidongguanbidaojishi = wlxtlang_zidongguanbidaojishi.replace("{0}","<i>"+countC+"</i>");
    var type = options.type;
    var message1 = options.content;
    var message2 = options.contentDetail;
    var okfn = options.okfn;
    var cancelfn = options.cancelfn;
    var css = options.css || '';
    switch (type) {
        case "notice":
            message = message1 || '导入文件失败';
            if ($(".alert").length >= 1) {
                return;
            }
            // debugger;
            if (css != '') {
                zeroModal.notice({
                    width: '450px',
                    height: "230px",
                    content: message,
                    okTitle: wlxtlang_guanbi,
                    css: css,
                    overlay: false
                });
            } else {
                zeroModal.notice({
                    width: '450px',
                    height: "250px",
                    content: message,
                    contentDetail: message2 || '请选择导入课程及导入栏目',
                    okTitle: wlxtlang_guanbi,
                    css: "",
                    overlay: false
                });
            }
            $(".zeromodal-container.alert   .btn-primary").after('<span class="overtime">'+wlxtlang_zidongguanbidaojishi+'</span>')

            cInterval = window.setInterval(function() {
                countC--;
                $(".overtime i").html(countC);
            }, 1000)

            ctime = setTimeout(function() {
                if ($(".zeromodal-container.alert").length >= 1) {
                    $(".zeromodal-container.alert").remove();
                    window.clearInterval(cInterval);

                }

            }, 3000)
            break;
        case "regest":
            message = message1 || '导入文件失败';
            if ($(".alert").length >= 1) {
                return;
            }
            // debugger;
            if (css != '') {
                zeroModal.error({
                    width: '450px',
                    height: "230px",
                    content: message,
                    okTitle: wlxtlang_guanbi,//关闭,
                    css: css,
                    okFn: okfn,
                    overlay: false
                });

            } else {
                zeroModal.error({
                    width: '450px',
                    height: "250px",
                    content: message,
                    contentDetail: message2 || '请选择导入课程及导入栏目',
                    okTitle: wlxtlang_guanbi,//关闭,
                    css: "",
                    okFn: okfn,
                    overlay: false
                });
            }
            $(".zeromodal-container.alert   .btn-primary").after('<span class="overtime">'+wlxtlang_zidongguanbidaojishi+'</span>')

            cInterval = window.setInterval(function() {
                countC--;
                $(".overtime i").html(countC);
            }, 1000)
            ctime = setTimeout(function() {
                if ($(".zeromodal-container.alert").length >= 1) {
                    $(".zeromodal-container.alert   .btn-primary").trigger('click');
                    window.clearInterval(cInterval);
                }

            }, 3000)
            break;
        case "success":
            message = message1 || '操作成功';
            if ($(".alert").length >= 1) {
                return;
            }

            if (css != '') {
                zeroModal.success({
                    height: "230px",
                    width: '450px',
                    content: message,
                    okTitle: wlxtlang_guanbi,//关闭,
                    okFn: okfn,
                    overlay: false,
                    css: css,
                });
            } else {
                zeroModal.success({
                    height: "250px",
                    width: '450px',
                    content: message,
                    okTitle: wlxtlang_guanbi,//关闭,
                    okFn: okfn,
                    overlay: false,
                    css: "",
                    contentDetail: message2,

                });
            }

            $(".zeromodal-container.alert   .btn-primary").after('<span class="overtime">'+wlxtlang_zidongguanbidaojishi+'</span>')//自动关闭倒计时<i>' + countC + '</i>秒

            cInterval = window.setInterval(function() {
                countC--;
                $(".overtime i").html(countC);
            }, 1000)
            ctime = setTimeout(function() {
                if ($(".zeromodal-container.alert").length >= 1) {
                    $(".zeromodal-container.alert   .btn-primary").trigger('click');
                    window.clearInterval(cInterval)
                }

            }, 3000)
            break;
        case "confirm":
            if (css != '') {
                zeroModal.confirm({
                    height: "230px",
                    width: '450px',
                    content: '',
                    content: message1 || '删除分组方案将清除本方案及所有数据',
                    okFn: okfn,
                    overlay: false,
                    css: css,
                    cancelFn: cancelfn
                });
            } else {
                zeroModal.confirm({
                    height: "250px",
                    width: '450px',
                    content: '',
                    content: message1 || '删除分组方案将清除本方案及所有数据',
                    contentDetail: message2 || '确定删除吗？',
                    okFn: okfn,
                    overlay: false,
                    css: '',
                    cancelFn: cancelfn
                });
            }

        default:
            // statements_def
            break;
    }
}

function confirmEX(okfn) { // 没用
    Modal({
        type: "confirm",
        message: "请选择数据进行操作!",
        okfn: function() {
            okfn();
        },
        cancelfn: function() {

        }
    })
}
var toqtip = function(dom) {
    $(dom).qtip({ // Grab some elements to apply the tooltip to
        content: {
            text: true,
            attr: 'title'

        },
        style: {
            tip: false, // 换样式 阴影 圆角叠加
            classes: 'qtip-light qtip-shadow qtip-rounded'
        },
        position: {
            target: 'mouse',
            my: 'left top',
            adjust: {
                y: 25
            }
        }
    });

}
var changeTab = function(i, dom) { // 全球公开课切换并ajax刷新数据
    // debugger;
    $("#type").val(i)
    if ($(dom).hasClass('active')) {
        return;
    }
    preTabChange(dom);
    $(dom).addClass('active').siblings('').removeClass('active');

}
var preTabChange = function(dom) {
    var pretab = $(dom).siblings('');
    $(pretab).each(function(index, el) {
        if ($(el).children('.controldiv').hasClass('active')) {
            $(el).children('.controldiv').removeClass('active')
        }
    });
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
// 具体使用方法找李倩伟
var tosubstr = function(object) { // 传入文字内容，截断长度，是否为重要文件

    var objectDefault = {
        bt: '您忘了传参',
        len: 30,
        sfqd: false,
        detailUrl: '',
        hyperlink: true
    };
    /* object 合并到 objectDefault 中 */

    $.extend(objectDefault, object);
    var bt = objectDefault.bt;
    var len = objectDefault.len;
    var title = "";
    var type = 'type="td_title"';
    var qd = '';
    if ("" != bt && bt.length > len) {
        bt = bt.substring(0, len) + "...";
        title = 'title="' + objectDefault.bt + '"';
    }
    if (objectDefault.sfqd) {
        qd = '<img src="/res/app/wlxt/img/important.png" alt="">';
    }
    if (objectDefault.hyperlink) {
        return "<a style='cursor:pointer' class='hover'" + type + " " + title + " href=" + objectDefault.detailUrl + " >" + bt + "</a>" + qd;
    } else {
        return "<span  " + type + " " + title + " >" + bt + "</span>";
    }

}
var tosubstr2 = function(object) { // 传入文字内容，截断长度，是否为重要文件
    var objectDefault = {
        bt: '您忘了传参',
        len: 30,
        detailUrl: ''

    };
    /* object 合并到 objectDefault 中 */
    $.extend(objectDefault, object);
    var bt = objectDefault.bt;
    var len = objectDefault.len;
    var title = "";
    var type = 'type="td_title"';
    var qd = '';
    if ("" != bt && bt.length > len) {
        bt = bt.substring(0, len) + "...";
        title = 'title="' + objectDefault.bt + '"';
    }
    if (objectDefault.sfqd) {
        qd = '<img src="/res/app/wlxt/img/important.png" alt="">';
    }

    return "<a style='cursor:pointer' class='hover'" + type + " " + title + " href=" + objectDefault.detailUrl + " >" + bt + "</a>";

}

// 本函数是单纯的文本截断函数，可处理全角、半角混合文本
// len以英文为准，中文字符宽度为2，英文字符和数字宽度为1。
// 调用方式：substr_width({"str":"张a1b2","len":4})
// 马尔东
var substr_width = function(object) {
    var objectDefault = {
        str: '您忘了传参',
        len: 40
    };
    /* object 合并到 objectDefault 中 */
    $.extend(objectDefault, object);
    var str = MyApp.unescapeHtmlChars(objectDefault.str);
    var len = objectDefault.len;
    if (!isString(str)) {
        return "";
    }
    var width = 0;
    var shortStr = "";
    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (isFullWidth(char)) {
            width = width + 2;
        } else if (isHalfWidth(char)) {
            width = width + 1;
        } else {
            width = width + 1;
        }
        if (width <= len) {
            shortStr = shortStr + char
        } else {
            break;
        }
    }
    var tail = "";
    if (shortStr.length < str.length) {
        tail = "...";
    }
    return MyApp.escapeHtmlChars(shortStr) + tail;

}

// 测试是否是正常字符
function isString(input) {
    var isStr = typeof input === 'string' || input instanceof String;

    if (!isStr) {
        return false;
    }

    return true;
}

// 全角字符
var fullWidthRegExp = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

function isFullWidth(str) {
    if (!isString(str)) {
        return false;
    }
    return fullWidthRegExp.test(str);
}
// 半角字符
var halfWidthRegExp = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

function isHalfWidth(str) {
    if (!isString(str)) {
        return false;
    }
    return halfWidthRegExp.test(str);
}



var showDiv = function(i, dom) {
    // debugger;
    var dom = $(dom).children('.controldiv');
    $(dom).addClass('active');
}


/*var hideDiv=function(i,dom){
     var dom = $(dom).siblings('.controldiv');
    $(dom).removeClass('active');
}*/
var hideDiv = function(i, dom) {
    var dom = $(dom).children('.controldiv');
    if ($(dom).hasClass('active')) {
        $(dom).removeClass('active');
    }

}

/*
 * $(document).click(function(){ $(".controldiv.active").removeClass('active');
 * });
 */
var changecheck = function(i) {
    if ($('#mypattern').length == 0) {
        return;
    }
    // debugger;
    if (i == 0) {
        $("#mypattern").find('.mycheck').eq(1).addClass('disabled');
        $('#r2').attr('disabled', true);
        $('#r1').prop('checked', true);
        return;
    }
    if ($("#mypattern").find('.disabled').length == 1 && i != 0) {
        $("#mypattern").find('.mycheck').eq(1).removeClass('disabled');
        $('#r2').attr('disabled', false);
    }

}
var changeTabdiv = function(i, dom, event) { // 新增文件切换tab
    // debugger;
    if ($(dom).children('').eq(0).hasClass('disabled')) {
        return;
    }
    e = event || window.event;
    if (e.preventDefault) {
        e.preventDefault();
        // e.stopPropagation();
    } else {
        e.returnValue = false;
        // e.cancelBubble = true;
    }
    var divheight = $('#div' + i).find("input").length / 6;

    if ($(dom).hasClass('active')) {
        return;
    }
    var dom = $(dom).parent();
    // debugger;
    $(dom).addClass('active').siblings('').removeClass('active');

    $(dom).find('.mytabhd  input').prop('checked', 'checked');
    // $('#div' + i).addClass('active').siblings('').removeClass('active');
    // debugger;
    if (i == 0) {
        /*
         * if ($(dom).hasClass('select')) { return; }
         */
        $(dom).addClass('select').siblings('').removeClass('select');
        $(dom).find('input').prop('checked', 'checked');
        var siblingI = $(dom).siblings().find("input"); // 其他标签的input
        $(siblingI).each(function(index, el) {
            if ($(el).prop("checked") == true) {
                $(el).prop("checked", "");
            }
        });

    }
    var siblingI = $(dom).siblings().find("input"); // 其他标签的input

    $(siblingI).each(function(index, el) {
        if ($(el).prop("checked") == true) {
            var parentS = $(el).parents("li");
            $(el).prop("checked", "")
            /*
             * if ($(parentS).hasClass('select')) {
             * $(parentS).removeClass('select') }
             */
        }
    });
    // debugger;
    if (i == 0) {
        $("#tabbox").height("auto");
        changecheck(i);
    } else {
        $("#tabbox").height($(".active .divbox").height() + 62);
        changecheck(i);
    }
}
var dosendmail = function(dom, val) {
    // debugger;
    var text = $(dom).parent().text().replace(/^\s+|\s+$/g, "").trim();
    var scheme_text = $(dom).parents("div[class='liststu']").find("p > span[class='label']").text().trim();
    var tag_text = scheme_text + "-" + text;
    if ($(dom).prop("checked")) {
        $("#myTags").tagit("createTag", tag_text, "checkable", $(dom).attr("id"));
        add_to_hidden_input("mxdx", val);
    } else {
        $("#myTags").tagit("removeTagByLabel", tag_text);
        remove_from_hidden_input("mxdx", val);
    }

    /*
     * var control = []; var checkval = $(dom).prop('checked'); // var n =
     * val.match(/\d/g)[0]; var n = val; var oldval =
     * $(dom).parent().text().trim(); var parentval =
     * $(dom).parent().parent().find("span[class='label']").text().trim(); //
     * var parentval = $('#l' + n).text(); if (checkval) { // 添加界面控件
     * $("#text").prepend('<div class="receriver check' + val + '"><span
     * class="name">' + parentval + '-' + oldval + '</span><i class="fa
     * fa-close" onclick="closetab(r' + val + ')"></i></div'); //
     * 在hidden标签中添加分组id add_to_mxdx_input(val); return; } else { // 删除界面控件
     * $("#text").find('.receriver.check' + val).remove(); // 删除hidden标签中的分组id
     * remove_from_mxdx_input(val); }
     */
}
var closetab = function(dom) {
    // debugger;
    var procheck = $(dom).prop("checked");
    $(dom).prop("checked", !procheck)
}




/*
 * var changeTabdivyj = function(i, dom) { debugger;
 * 
 * if ($(dom).hasClass('active')) { return; } var divheight = $('#div' +
 * i).find("input").length / 6;
 * 
 * $("#tabbox").height(72 + 36 * parseInt(divheight));
 * 
 * var dom = $(dom).parent(); var input = $(dom).find('input').eq(0);
 * $(input).prop('checked', !$(input).prop('checked')); //debugger;
 * $(dom).addClass('active').siblings('').removeClass('active'); }; var
 * receiveTab = function(dom, parent) { //debugger; var control = []; var
 * checkval = $(dom).prop('checked'); var val = $(dom).data('n'); var oldval =
 * $(dom).parent().text(); var n = val.match(/\d/g)[0];
 * $(parent).parents(".onetab").addClass('select');
 * 
 * $("#div" + n).find("input").each(function(index, el) { if
 * ($(el).prop('checked') == true) { control.push(index); }
 * 
 * }); if (control.length == 0) { $(".onetab.select").removeClass('select'); }
 * var parentval = $(parent).parent().text(); if (checkval) {
 * $("#text").prepend('<div class="receriver check' + val + '"><span
 * class="name">' + parentval + '-' + oldval + '</span><i class="fa fa-close"
 * onclick="closetab(' + val + ')"></i></div'); return; } else {
 * $("#text").find('.receriver.check' + val).remove(); } }
 */
/*
 * 
 * 公告列表查询 function ggall() { // var dataTable; var ggurl =
 * '/b/wlxt/kcgg/v_wlkc_ggb/pageList'; ggallmdt = MyApp.createServerTable({
 * 
 * "table": $("#ggalltable"), "head": { "columnMap": { "ggbt": "公告标题", "fbz":
 * "发布者", "fbsj": "发布时间", "llcs": "浏览次数" } },
 * 
 * "body": { "control": function(data) { if (data != null) {
 * $("#ggdiv").removeClass("hidden") } return '<a
 * href="/f/wlxt/kcgg/wlkc_ggb/teacher/beforeEdit?wlkcid=' + data.wlkcid +
 * '&id=' + data.id + '" class="btn" style="margin-right: 3px;"><i
 * class="webicon-edit" style="padding-right: 5px;"></i>编辑</a>' + ' <a
 * href="javascript:void(0);" onclick="del(\'' + data.id + '\');" class="btn"><i
 * class="webicon-delete" style="padding-right: 5px;"></i>删除</a>'; },
 * "columnsDIY": {
 * 
 * "ggbt": { "mDataProp": function(data, type, full, meta) { var emp = ""; var
 * newIcon = ""; if (data.sfqd == 1) { emp = '<img
 * src="/res/app/wlxt/img/important.png" alt="" />' } return '<a
 * type="td_title" href="/f/wlxt/kcgg/wlkc_ggb/teacher/beforeViewJs?wlkcid=' +
 * data.wlkcid + '&id=' + data.id + '"> <img src="/res/app/wlxt/img/circle.png"
 * alt="" />' + data.bt + '</a>' + emp; }, "sWidth": "260" }, "fbz": {
 * "mDataProp": "fbrxm", "sWidth": "125" },
 * 
 * "fbsj": { "mDataProp": "fbsjStr", "sWidth": "125" },
 * 
 * 
 * "llcs": { "mDataProp": function(data, type, full, meta) { return '<a
 * type="td_title" target="view_window"
 * href="/f/wlxt/kcgg/wlkc_ggydb/teacher/beforePageList?id=' + data.id +
 * '&llcs=' + data.llcs + '" class="btn" style="margin-right: 3px;">' +
 * data.llcs + '</a>' }, "sWidth": "100" }, } }, "url": ggurl, "getId":
 * function(row) { return row.wlkcid; }, "sortAble": "kcm,xnxq,jsmc,", //
 * 此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义 "settings": { "iDisplayLength": 3,
 * "oLanguage": { "sProcessing": "正在获取数据，请稍候...", "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容", "sInfo": "共 _TOTAL_ 条数据", "sInfoEmpty": "0",
 * "sInfoFiltered": "(全部记录数 _MAX_ 条)", "sInfoPostFix": "", "sSearch": "搜索",
 * "sUrl": "", "oPaginate": { // "sFirst" : "第一页", // "sPrevious" : "上一页", //
 * "sNext" : "下一页", // "sLast" : "最后一页" }, }, }, "defaultSearchCondition": [{
 * "name": "wlkcid", "value": wlkcid }]
 * 
 * }); } // 编辑 function kjbeforeEdit(kjid, kjflid) { window.location.href =
 * "/f/wlxt/kj/wlkc_kjxxb/teacher/beforeEdit?id=" + kjid + "&current=" + kjflid; } //
 * 课件删除 function kjbeforeDelete(id) { Modal({ type: "confirm", content:
 * "删除文件，是否确认？", contentDetail: " ", // 默认 '请选择导入课程及导入栏目' okfn: function() {
 * MyApp.post("/b/wlxt/kj/wlkc_kjxxb/teacher/delete", { "id": id },
 * function(data) { MyApp.showResult(data, function() { kjallmdt.reDraw();
 * kjmdt.reDraw(); });
 * 
 * }); }, cancelfn: function() {}, // width:'800' })
 *  } 课件搜索 var kjallmdt;
 * 
 * function kjall() { // 数据url var KjUrl =
 * "/b/wlxt/kc/v_kjxxb_wjwjb_search/pageList"; var dataTable; // 初始化表格 kjallmdt =
 * MyApp.createServerTable({
 * 
 * "table": $("#kjalltable"), "head": { "columnMap": { "wz": "序号", "bt": "标题",
 * "wjlx": "文件类型", "wjdx": "附件大小", "scsj": "发布时间", "xsllcs": "学生下载播放次数" } },
 * "body": {
 * 
 * "checkBox":'<input type="checkbox" class="checkboxes" name="username"
 * value="_ID_" />',
 * 
 * "control": function(data) { if (data != null) {
 * $("#kjdiv").removeClass("hidden") } return '<a
 * href="/b/wlxt/kj/wlkc_kjxxb/teacher/downloadFileForTeacher?wjid=' + data.wjid + '"
 * class="download btn" wjid=' + data.wjid + ' kjxxid=' + data.kjxxid + '
 * class="btn " style="margin-right: 6px;"><i class="webicon-download"
 * style="padding-right: 5px;"></i>下载</a>' + '<a href="javascript:void(0)"
 * onclick="_playFile(\'' + data.wjid + '\',\'teacher\',\'wlkc_kj\')" class="btn
 * play" style="margin-right: 6px;"><i class="webicon-display"
 * style="padding-right: 5px;"></i>预览</a>' + '<a href="javascript:void(0)"
 * onclick="kjbeforeEdit(\'' + data.kjxxid + '\',\'' + data.kjflid + '\')"
 * data="' + data.kjxxid + '" class="btn editBtn" style="margin-right: 6px;"><i
 * class="webicon-edit" style="padding-right: 5px;"></i>编辑</a> ' + '<a
 * href="javascript:void(0)" onclick="kjbeforeDelete(\'' + data.kjxxid + '\')"
 * data="' + data.kjxxid + '" class="btn deleteBtn"><i class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; }, "columnsDIY": {
 * 
 * "bt": { "mDataProp": function(row, type, full, meta) { kjnum = meta.row + 1;
 * var sfqd = false; if (row.sfqd == '0') { sfqd = false; } else { sfqd = true; }
 * 
 * return tosubstr({ bt: row.bt, sfqd: sfqd, detailUrl:
 * '/f/wlxt/kj/wlkc_kjxxb/teacher/beforeView?id=' + row.kjxxid }); }, "sWidth":
 * "200", "bSortable": true, "oldName": "bt" // 如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。 },
 * 
 * 
 * "wz": { "sWidth": "40", "mDataProp": function(row) { return row.wz; },
 * "bSortable": true, "oldName": "wz" // 真正的排序字段 }, "xsllcs": { "sWidth": "120",
 * "mDataProp": function(row) { return '<div data="' + row.kjxxid + '"
 * class="gotoCount" >' + row.xsllcs + '</div>'; }, "bSortable": true,
 * "oldName": "xsllcs" // 真正的排序字段 }, "wjlx": { "sWidth": "80", "mDataProp":
 * function(row) { return row.wjlx; }, "bSortable": true, "oldName": "wjlx" //
 * 真正的排序字段 }, "wjdx": { "sWidth": "80", "mDataProp": function(row) { File_size =
 * row.wjdx; if (File_size < 1024) { return File_size = File_size + 'B'; } else
 * if (File_size >= 1024 && File_size < 1024 * 1024) { return File_size =
 * (File_size / 1024).toFixed(2) + 'KB'; } else { return File_size = (File_size /
 * 1024 / 1024).toFixed(2) + 'MB'; } }, "bSortable": true, "oldName": "wjdx" //
 * 真正的排序字段 }, "scsj": { "sWidth": "110", "mDataProp": function(row) { return
 * row.scsj; }, "bSortable": true, "oldName": "scsj" // 真正的排序字段 } } }, "url":
 * KjUrl, "getId": function(row) { return row.wjid; }, "defaultSort": { "asc":
 * "wjid" }, // function 的列不能排序 roleId "sortAble": "", //
 * 此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义 "settings": { "iDisplayLength": 3,
 * "oLanguage": { "sProcessing": "正在获取数据，请稍候...", "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容", "sInfo": "共 _TOTAL_ 条数据", "sInfoEmpty": "0",
 * "sInfoFiltered": "(全部记录数 _MAX_ 条)", "sInfoPostFix": "", "sSearch": "搜索",
 * "sUrl": "", "oPaginate": { // "sFirst" : "第一页", // "sPrevious" : "上一页", //
 * "sNext" : "下一页", // "sLast" : "最后一页" }, }, }, "defaultSearchCondition": [{
 * "name": "wlkcid", "value": wlkcid }]
 * 
 * }); }
 */
/** 笔记列表刷新 */
/*
 * var bjallmdt;
 * 
 * function bjall() { var bjurl =
 * "/b/wlxt/kc/v_wlkc_jxbjb_search/pageList"; var baseFrontUrl =
 * "/f/wlxt/jxbj/wlkc_jxbjb/teacher"; var baseBackUrl =
 * "/b/wlxt/jxbj/wlkc_jxbjb/teacher"; bjallmdt =
 * MyApp.createServerTable({
 * 
 * "table": $("#bjalltable"), "head": { "columnMap": { "xuh":
 * "序号", "bt": "标题", "bqxx": "标签", "czsjStr": "记录时间" }
 *  }, "body": {
 * 
 * "checkBox":'<input type="checkbox" class="checkboxes"
 * name="username" value="_ID_" />',
 * 
 * "control": function(data) { if (data != null) {
 * $("#bjdiv").removeClass("hidden") } return '<a
 * href="javascript:void(0)" onclick="bjbeforeEdit(\'' +
 * data.bjid + '\')"data="' + data.bjid + '" class="btn editBtn"
 * style="margin-right: 6px;"><i class="webicon-edit"
 * style="padding-right: 5px;"></i>编辑</a> ' + ' <a
 * href="javascript:void(0)" onclick="bjbeforeDelete(\'' +
 * data.bjid + '\')"data="' + data.bjid + '" class="btn
 * deleteBtn"><i class="webicon-delete" style="padding-right:
 * 5px;"></i>删除</a>'; }, "columnsDIY": { "xuh": { "mDataProp":
 * function(row, type, full, meta) { bjnum = meta.row + 1;
 * return meta.row + 1; }, "sWidth": "50" }, "bt": {
 * "mDataProp": function(row) { return "<font ><a
 * style='border:none;' href=" + baseFrontUrl +
 * "/beforeView?bjid=" + row.bjid + ">" + row.bt + "</a></font>" },
 * "sWidth": "450", "bSortable": true, "oldName": "bt" //
 * 如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。 }, "bqxx": { "sWidth": "200" },
 * 
 * "czsjStr": { "sWidth": "100", "mDataProp": function(row) {
 * return fmtDate(row.czsj); }, "bSortable": true, "oldName":
 * "czsj" // 真正的排序字段 } } }, "url": bjurl, "getId": function(row) {
 * return row.bjid; }, "defaultSort": { "asc": "userid" }, //
 * function 的列不能排序 roleId "sortAble": "bt,czsj", //
 * 此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义 "settings": {
 * "iDisplayLength": 3, "oLanguage": { "sProcessing":
 * "正在获取数据，请稍候...", "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容", "sInfo": "共 _TOTAL_ 条数据",
 * "sInfoEmpty": "0", "sInfoFiltered": "(全部记录数 _MAX_ 条)",
 * "sInfoPostFix": "", "sSearch": "搜索", "sUrl": "", "oPaginate": { //
 * "sFirst" : "第一页", // "sPrevious" : "上一页", // "sNext" : "下一页", //
 * "sLast" : "最后一页" }, },
 * 
 * "fixedColumns": { //固定列的配置项 leftColumns: 2 //固定左边第一列 },
 * "sScrollX": "100%", "sScrollXInner": "110%",
 * "bScrollCollapse": false, "scrollX": true,//x方向滚动 },
 * "defaultSearchCondition": [{ "name": "wlkcid", "value":
 * wlkcid }]
 * 
 * }); }; // 绑定事件 // 笔记编辑 function bjbeforeEdit(bjid) {
 * window.location.href =
 * "/f/wlxt/jxbj/wlkc_jxbjb/teacher/beforeEdit?bjid=" + bjid; } //
 * 笔记删除 function bjbeforeDelete(bjid) {
 * MyApp.showConfirm("删除教学笔记后将无法恢复", function() {
 * MyApp.post("/b/wlxt/jxbj/wlkc_jxbjb/teacher/delete", { "id":
 * bjid }, function(data) { MyApp.showResult(data, function() {
 * bjallmdt.reDraw(); }); }) } ); } 置顶讨论区 function addZd(id) {
 * $.post('/b/wlxt/bbs/bbs_tltb/teacher/addZd', { id: id },
 * function(data) { if (data.result == 'success') { Modal({
 * type: data.result, content: data.msg, okfn: function() {
 * bbsallmdt.reDraw(); bbsmdt.reDraw(); } }); } else { Modal({
 * type: "regest", content: data.msg, contentDetail: " " }) }
 * }); } 加入讨论区精华 function addWtjj(id) {
 * $.post('/b/wlxt/bbs/bbs_tltb/teacher/addWtjj', { id: id },
 * function(data) { if (data.result == 'success') { Modal({
 * type: data.result, content: data.msg, okfn: function() {
 * bbsallmdt.reDraw(); bbsmdt.reDraw(); } }); } else { Modal({
 * type: "regest", content: data.msg, contentDetail: " " }) }
 * }); }
 */
/**
 * 取消讨论区精华
 */
/*
 * function removeWjtt(id) { var delDataUrl =
 * "/b/wlxt/bbs/bbs_tltb/teacher/removeWjtt"; $.post(delDataUrl, { id:
 * id }, function(data) { if (data.result == 'success') { Modal({ type:
 * data.result, content: data.msg, okfn: function() {
 * bbsallmdt.reDraw(); bbsmdt.reDraw(); } }); } else { Modal({ type:
 * "regest", content: data.msg, contentDetail: " " }) } }); }
 * 
 * function delById(id) { Modal({ type: "confirm", content:
 * "删除后讨论贴及所有回复信息也将删除", contentDetail: "确定要删除吗？", okfn: function() { var
 * delDataUrl = "/b/wlxt/bbs/bbs_tltb/teacher/delById";
 * $.post(delDataUrl, { id: id }, function(data) { if (data.result ==
 * 'success') { Modal({ type: data.result, content: data.msg, okfn:
 * function() { bbsallmdt.reDraw(); bbsmdt.reDraw(); } }); } else {
 * Modal({ type: "regest", content: data.msg, contentDetail: " " }) }
 * }); }, cancelfn: function() { } }) }
 */
/** 作业列表刷新 */
/*
 * function zyall() { var zyurl =
 * "/b/wlxt/kc/v_kczyxxb_search/pageList"; zyallmdt =
 * MyApp.createServerTable({ "table": $("#zyalltable"),
 * "head": { "columnMap": { "wz": "序号", "bt": "作业题目", "zt":
 * "状态(已交/未交)", "mxdxmc": "发布对象", "zywcfs": "完成方式", "kssj":
 * "生效日期", "jzsj": "截止日期" } }, "body": { "control":
 * function(data) { if (data != null) {
 * $("#zydiv").removeClass("hidden") } return '<a
 * href="javascript:void(0)" onclick="zybeforeReview(\'' +
 * data.zyid + '\')" data="' + data.zyid + '" class="btn
 * reviewBtn" style="margin-right: 6px;"><i
 * class="webicon-edit" style="padding-right: 5px;"></i>去批阅</a> ' + '<a
 * href="javascript:void(0)" onclick="zybeforeEdit(\'' +
 * data.zyid + '\')"data="' + data.zyid + '" class="btn
 * editBtn" style="margin-right: 6px;"><i
 * class="webicon-edit" style="padding-right: 5px;"></i>编辑</a> ' + '
 * <a href="javascript:void(0)" onclick="zybeforeDelete(\'' +
 * data.zyid + '\')""data="' + data.zyid + '" class="btn
 * deleteBtn"><i class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; },
 * "columnsDIY": { "bt": { "mDataProp": function(row) {
 * return ' <a
 * href="/f/wlxt/kczy/xszy/teacher/beforePageList?zyid=' +
 * row.zyid + '" class="reviewBtn" style="margin-right:
 * 6px;">' + row.bt + '</a> '; }, "sWidth": "180",
 * "bSortable": true }, "mxdxmc": { "sWidth": "90",
 * "bSortable": true }, "wz": { "sWidth": "40" }, "zt": {
 * "sWidth": "100", "mDataProp": function(row) { return "
 * <span style='color:#e27b01'>" + row.wjs + "</span><span
 * style='color:#555555'>/</span><span
 * style='color:#1392f1'>" + row.yjs + "(已批阅" + row.ypys + ")</span>" },
 * "bSortable": true }, "zywcfs": { "mDataProp":
 * function(row) { if (row.zywcfs == 2) { return "组"; } else {
 * return "个人"; } }, "sWidth": "60", "bSortable": true },
 * "kssj": { "sWidth": "80", "mDataProp": function(row) {
 * return "<span title='" + fmtDate(row.kssj) + "' >" +
 * fmtDate(row.kssj) + "</span>"; }, "bSortable": true },
 * "jzsj": { "sWidth": "80", "mDataProp": function(row) {
 * return "<span title='" + fmtDate(row.jzsj) + "' >" +
 * fmtDate(row.jzsj) + "</span>"; }, "bSortable": true } } },
 * "url": zyurl, "getId": function(row) { return row.id; },
 * "defaultSort": { "desc": "wz" }, // function 的列不能排序
 * roleId "settings": { "iDisplayLength": 3, "oLanguage": {
 * "sProcessing": "正在获取数据，请稍候...", "sLengthMenu": "每页显示
 * _MENU_ ", "sZeroRecords": "没有您要搜索的内容", "sInfo": "共
 * _TOTAL_ 条数据", "sInfoEmpty": "0", "sInfoFiltered": "(全部记录数
 * _MAX_ 条)", "sInfoPostFix": "", "sSearch": "搜索", "sUrl":
 * "", "oPaginate": { // "sFirst" : "第一页", // "sPrevious" :
 * "上一页", // "sNext" : "下一页", // "sLast" : "最后一页" }, }, },
 * "defaultSearchCondition": [{ "name": "wlkcid", "value":
 * wlkcid }] }); }
 */
/** bbsurl 讨论列表刷新 */
/*
 * var dataTable;
 * 
 * function bbsall() { var bbsurl =
 * "/b/wlxt/bbs/v_bbs_tltb_all/bbspageListSearch";
 * bbsallmdt = MyApp.createServerTable({
 * "table": $("#bbsalltable"), "head": {
 * "columnMap": { "xh": "序号", "bt":
 * "主题", "ftsj": "发帖时间", "fbr": "发表人",
 * "hfs": "回复数", "zhhfrxm": "最新回复人" } },
 * "body": { "control": function(data) {
 * if (data != null) {
 * $("#tldiv").removeClass("hidden") }
 * var _editBtn = ''; if (data.fbr ==
 * userid) { _editBtn = '<a
 * href="/f/wlxt/bbs/bbs_tltb/teacher/beforeEditTl?wlkcid=' +
 * data.wlkcid + '&id=' + data.id +
 * '&bqid=' + data.bqid + '" class="btn" ><i
 * class="webicon-edit"
 * style="padding-right: 5px;"></i>编辑</a>'; }
 * else { _editBtn = '<a
 * href="javascript:void(0);" class="btn
 * disabled" ><i class="webicon-edit"
 * style="padding-right: 5px;"></i>编辑</a>'; }
 * var _delBtn = ''; if (data.sfjh !=
 * null && data.sfjh == "是") { _delBtn = '<a
 * href="javascript:void(0);" class="btn
 * disabled" ><i class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; }
 * else { _delBtn = '<a
 * href="javascript:delById(\'' +
 * data.id + '\');" class="btn" ><i
 * class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; }
 * if (data.sfjh != null && data.sfjh ==
 * "是") { return _editBtn + _delBtn + '<a
 * href="javascript:addZd(\'' + data.id +
 * '\');" class="btn" ><i
 * class="webicon-top"
 * style="padding-right: 5px;"></i>置顶</a>' + '<a
 * href="javascript:removeWtjj(\'' +
 * data.id + '\');" class="btn"><i
 * class="webicon-outgoing"
 * style="padding-right: 5px;"></i>取消精华</a>'; }
 * else { return _editBtn + _delBtn + '<a
 * href="javascript:addZd(\'' + data.id +
 * '\');" class="btn" ><i
 * class="webicon-top"
 * style="padding-right: 5px;"></i>置顶</a>' + '
 * <a href="javascript:addWtjj(\'' +
 * data.id + '\');" class="btn"><i
 * class="webicon-outgoing"
 * style="padding-right: 5px;"></i>设为精华</a>'; } },
 * "columnsDIY": { "xh": { "mDataProp":
 * function(row, type, full, meta) {
 * bbsnum = meta.row + 1; return
 * meta.row + 1; }, "sClass": "order",
 * "sWidth": "40" }, "bt": {
 * "mDataProp": function(data, type,
 * full, meta) { var jh = ''; if
 * (data.sfjh != null && data.sfjh ==
 * "是") { jh = '<span class="jing">精</span>'; }
 * if (data.sfzd == '是') { return '<a
 * href="/f/wlxt/bbs/bbs_tltb/teacher/viewTlById?wlkcid=' +
 * data.wlkcid + '&id=' + data.id +
 * '&bqid=' + data.bqid + '"
 * type="td_title_red">' + data.bt + '</a>' +
 * jh; } return '<a
 * href="/f/wlxt/bbs/bbs_tltb/teacher/viewTlById?wlkcid=' +
 * data.wlkcid + '&id=' + data.id +
 * '&bqid=' + data.bqid + '"
 * type="td_title">' + data.bt + '</a>' +
 * jh; }, "sWidth": "250", "oldName":
 * "bt" //
 * 如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。 },
 * "ftsj": { "mDataProp": "fbsj",
 * "sWidth": "110" }, "fbr": {
 * "mDataProp": "fbrxm", "sWidth": "50" },
 * "hfs": { "mDataProp": "hfcs",
 * "sWidth": "50" }, "zhhfrxm": {
 * "mDataProp": "zhhfrxm", "sWidth":
 * "80" }, } }, "url": bbsurl, "getId":
 * function(row) { return row.id; },
 * "defaultSort": { "desc": "wz" }, //
 * function 的列不能排序 roleId "settings": {
 * "iDisplayLength": 3, "oLanguage": {
 * "sProcessing": "正在获取数据，请稍候...",
 * "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容", "sInfo":
 * "共 _TOTAL_ 条数据", "sInfoEmpty": "0",
 * "sInfoFiltered": "(全部记录数 _MAX_ 条)",
 * "sInfoPostFix": "", "sSearch": "搜索",
 * "sUrl": "", "oPaginate": { //
 * "sFirst" : "第一页", // "sPrevious" :
 * "上一页", // "sNext" : "下一页", // "sLast" :
 * "最后一页" }, }, },
 * "defaultSearchCondition": [{ "name":
 * "wlkcid", "value": wlkcid }] }); }
 */
/** dyall 答疑刷新列表 */
/*
 * var dataTable;
 * 
 * function dyall() { var dyurl =
 * '/b/wlxt/bbs/v_bbs_tltb_all/dypageList';
 * dyallmdt =
 * MyApp.createServerTable({
 * "table": $("#dyalltable"),
 * "head": { "columnMap": {
 * "xh": "序号", "bt": "问题标题",
 * "twtx": "提问同学", "twsj":
 * "提问时间", "hdls": "回答老师",
 * "hdsj": "回答时间" } }, "body": {
 * "control": function(data) {
 * if (data != null) {
 * $("#dydiv").removeClass("hidden") }
 * if (data.sfjh != null &&
 * data.sfjh == "是") { return '<a
 * href="javascript:removeWjtt(\'' +
 * data.id + '\')" class="btn"
 * style="margin-right: 3px;"><i
 * class="webicon-edit"
 * style="padding-right: 5px;"></i>取消集锦</a>'; }
 * else { var str; if
 * (data.zhhfr == null ||
 * data.zhhfr == '' || data.fbr ==
 * data.zhhfr) { str = '<a
 * href="/f/wlxt/bbs/bbs_kcdy/teacher/beforeEditDy?wlkcid=' +
 * data.wlkcid + '&id=' +
 * data.id + '&tabid=1"
 * class="btn"
 * style="margin-right: 3px;"><i
 * class="webicon-edit"
 * style="padding-right: 5px;"></i>回答</a>'; }
 * else { str = '<a
 * href="/f/wlxt/bbs/bbs_kcdy/teacher/beforeEditDy?wlkcid=' +
 * data.wlkcid + '&id=' +
 * data.id + '&tabid=2"
 * class="btn"
 * style="margin-right: 3px;"><i
 * class="webicon-edit"
 * style="padding-right: 5px;"></i>修改</a>'; }
 * return str + ' <a
 * href="javascript:void(0);"
 * onclick="del(\'' + data.id +
 * '\');" class="btn"><i
 * class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; } },
 * "columnsDIY": { "xh": {
 * "mDataProp": function(row,
 * type, full, meta) { return
 * meta.row + 1; }, "sClass":
 * "order", "sWidth": "50" },
 * "bt": { "mDataProp":
 * function(data, type, full,
 * meta) { var jj = ''; if
 * (data.sfjh != null &&
 * data.sfjh == "是") { jj = '<span
 * class="jing">集锦</span>'; }
 * return '<a
 * href="/f/wlxt/bbs/bbs_kcdy/teacher/viewDyById?wlkcid=' +
 * data.wlkcid + '&id=' +
 * data.id + '&tabid=1"
 * type="td_title">' + data.bt + '</a>' +
 * jj; }, "sWidth": "250", },
 * "twtx": { "mDataProp":
 * "fbrxm", "sWidth": "80" },
 * "twsj": { "mDataProp":
 * "fbsj", "sWidth": "80" },
 * "hdls": { "mDataProp":
 * "zhhfrxm", "sWidth": "80" },
 * "hdsj": { "mDataProp":
 * "zhhfsj", "sWidth": "80" }, } },
 * "url": dyurl, "getId":
 * function(row) { return
 * row.id; }, "defaultSort": {
 * "desc": "wz" }, // function
 * 的列不能排序 roleId "settings": {
 * "iDisplayLength": 3,
 * "oLanguage": { "sProcessing":
 * "正在获取数据，请稍候...",
 * "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容",
 * "sInfo": "共 _TOTAL_ 条数据",
 * "sInfoEmpty": "0",
 * "sInfoFiltered": "(全部记录数
 * _MAX_ 条)", "sInfoPostFix":
 * "", "sSearch": "搜索", "sUrl":
 * "", "oPaginate": { //
 * "sFirst" : "第一页", //
 * "sPrevious" : "上一页", //
 * "sNext" : "下一页", // "sLast" :
 * "最后一页" }, }, },
 * "defaultSearchCondition": [{
 * "name": "wlkcid", "value":
 * wlkcid }] }); } // 格式化时间戳
 * function fmtDate(obj) { var
 * date = new Date(obj); var y =
 * 1900 + date.getYear(); var m =
 * "0" + (date.getMonth() + 1);
 * var d = "0" + date.getDate();
 * return y + "-" +
 * m.substring(m.length - 2,
 * m.length) + "-" +
 * d.substring(d.length - 2,
 * d.length); }
 * 
 * 公告列表查询 function
 * ggsearchlist() { var
 * dataTable; var ggurl =
 * '/b/wlxt/kcgg/v_wlkc_ggb/pageList';
 * ggmdt =
 * MyApp.createServerTable({
 * 
 * "table": $("#examplesearch"),
 * "head": { "columnMap": {
 * "ggbt": "公告标题", "fbz": "发布者",
 * "fbsj": "发布时间", "llcs":
 * "浏览次数" } },
 * 
 * "body": { "control":
 * function(data) { return '<a
 * href="/f/wlxt/kcgg/wlkc_ggb/teacher/beforeEdit?wlkcid=' +
 * data.wlkcid + '&id=' +
 * data.id + '" class="btn"
 * style="margin-right: 3px;"><i
 * class="webicon-edit"
 * style="padding-right: 5px;"></i>编辑</a>' + '
 * <a href="javascript:void(0);"
 * onclick="del(\'' + data.id +
 * '\');" class="btn"><i
 * class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; },
 * "columnsDIY": { "ggbt": {
 * "mDataProp": function(data,
 * type, full, meta) { var emp =
 * ""; var newIcon = ""; if
 * (data.sfqd == 1) { emp = '<img
 * src="/res/app/wlxt/img/important.png"
 * alt="" />' } return '<a
 * type="td_title"
 * href="/f/wlxt/kcgg/wlkc_ggb/teacher/beforeViewJs?wlkcid=' +
 * data.wlkcid + '&id=' +
 * data.id + '"> <img
 * src="/res/app/wlxt/img/circle.png"
 * alt="" />' + data.bt + '</a>' +
 * emp; }, "sWidth": "300" },
 * "fbz": { "mDataProp":
 * "fbrxm", "sWidth": "121" },
 * 
 * "fbsj": { "mDataProp":
 * "fbsjStr", "sWidth": "121" },
 * 
 * 
 * "llcs": { "mDataProp":
 * function(data, type, full,
 * meta) { return '<a
 * type="td_title"
 * target="view_window"
 * href="/f/wlxt/kcgg/wlkc_ggydb/teacher/beforePageList?id=' +
 * data.id + '&llcs=' +
 * data.llcs + '" class="btn"
 * style="margin-right: 3px;">' +
 * data.llcs + '</a>' },
 * "sWidth": "100" }, } },
 * "url": ggurl, "getId":
 * function(row) { return
 * row.wlkcid; }, "defaultSort": {
 * "asc": "fbsj" }, // function
 * 的列不能排序 roleId "sortAble": "", //
 * 此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
 * "settings": {
 * "iDisplayLength": 20,
 * "oLanguage": { "sProcessing":
 * "正在获取数据，请稍候...",
 * "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容",
 * "sInfo": "共 _TOTAL_ 条数据",
 * "sInfoEmpty": "暂无数据",
 * "sInfoFiltered": "(全部记录数
 * _MAX_ 条)", "sInfoPostFix":
 * "", "sSearch": "搜索", "sUrl":
 * "", "oPaginate": {}, }, },
 * "defaultSearchCondition": [{
 * "name": "wlkcid", "value":
 * wlkcid }]
 * 
 * }); }
 * 
 * function kjsearchlist() { //
 * 数据url var KjUrl =
 * "/b/wlxt/kc/v_kjxxb_wjwjb_search/pageList";
 * var dataTable; // 初始化表格 kjmdt =
 * MyApp.createServerTable({
 * 
 * "table": $("#examplesearch"),
 * "head": { "columnMap": {
 * "wz": "序号", "bt": "标题",
 * "wjlx": "文件类型", "wjdx":
 * "附件大小", "scsj": "发布时间",
 * "xsllcs": "学生下载播放次数" } },
 * "body": { "control":
 * function(data) { return '<a
 * href="/b/wlxt/kj/wlkc_kjxxb/teacher/downloadFileForTeacher?wjid=' +
 * data.wjid + '"
 * class="download btn " wjid=' +
 * data.wjid + ' kjxxid=' +
 * data.kjxxid + '
 * style="margin-right: 6px;"><i
 * class="webicon-download "
 * style="padding-right: 5px;"></i>下载</a>' + '<a
 * href="javascript:void(0)"
 * onclick="_playFile(\'' +
 * data.wjid +
 * '\',\'teacher\',\'wlkc_kj\')"
 * class="btn play"
 * style="margin-right: 6px;"><i
 * class="webicon-display"
 * style="padding-right: 5px;"></i>预览</a>' + '<a
 * href="javascript:void(0)"
 * onclick="kjbeforeEdit(\'' +
 * data.kjxxid + '\',\'' +
 * data.kjflid + '\')" data="' +
 * data.kjxxid + '" class="btn
 * editBtn" style="margin-right:
 * 6px;"><i
 * class="webicon-edit"
 * style="padding-right: 5px;"></i>编辑</a> ' + '<a
 * href="javascript:void(0)"
 * onclick="kjbeforeDelete(\'' +
 * data.kjxxid + '\')" data="' +
 * data.kjxxid + '" class="btn
 * deleteBtn"><i
 * class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; },
 * "columnsDIY": { "bt": {
 * "mDataProp": function(row) {
 * var sfqd = false; if
 * (row.sfqd == '0') { sfqd =
 * false; } else { sfqd = true; }
 * 
 * return tosubstr({ bt: row.bt,
 * sfqd: sfqd, detailUrl:
 * '/f/wlxt/kj/wlkc_kjxxb/beforeView?id=' +
 * row.kjxxid }); }, "sWidth":
 * "50", "bSortable": true,
 * "oldName": "bt" //
 * 如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。 },
 * 
 * 
 * "wz": { "sWidth": "40",
 * "mDataProp": function(row) {
 * return row.wz; },
 * "bSortable": true, "oldName":
 * "wz" // 真正的排序字段 }, "xsllcs": {
 * "sWidth": "120", "mDataProp":
 * function(row) { return '<div
 * data="' + row.kjxxid + '"
 * class="gotoCount" >' +
 * row.xsllcs + '</div>'; },
 * "bSortable": true, "oldName":
 * "xsllcs" // 真正的排序字段 },
 * "wjlx": { "sWidth": "80",
 * "mDataProp": function(row) {
 * return row.wjlx; },
 * "bSortable": true, "oldName":
 * "wjlx" // 真正的排序字段 }, "wjdx": {
 * "sWidth": "80", "mDataProp":
 * function(row) { File_size =
 * row.wjdx; if (File_size <
 * 1024) { return File_size =
 * File_size + 'B'; } else if
 * (File_size >= 1024 &&
 * File_size < 1024 * 1024) {
 * return File_size = (File_size /
 * 1024).toFixed(2) + 'KB'; }
 * else { return File_size =
 * (File_size / 1024 /
 * 1024).toFixed(2) + 'MB'; } },
 * "bSortable": true, "oldName":
 * "wjdx" // 真正的排序字段 }, "scsj": {
 * "sWidth": "100", "mDataProp":
 * function(row) { return
 * row.scsj; }, "bSortable":
 * true, "oldName": "scsj" //
 * 真正的排序字段 } } }, "url": KjUrl,
 * "getId": function(row) {
 * return row.wjid; },
 * "defaultSort": { "asc":
 * "wjid" }, // function 的列不能排序
 * roleId "sortAble": "", //
 * 此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
 * "settings": {
 * "iDisplayLength": 20,
 * "oLanguage": { "sProcessing":
 * "正在获取数据，请稍候...",
 * "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容",
 * "sInfo": "共 _TOTAL_ 条数据",
 * "sInfoEmpty": "暂无数据",
 * "sInfoFiltered": "(全部记录数
 * _MAX_ 条)", "sInfoPostFix":
 * "", "sSearch": "搜索", "sUrl":
 * "", "oPaginate": { //
 * "sFirst" : "第一页", //
 * "sPrevious" : "上一页", //
 * "sNext" : "下一页", // "sLast" :
 * "最后一页" }, }, },
 * "defaultSearchCondition": [{
 * "name": "wlkcid", "value":
 * wlkcid }]
 * 
 * }); }
 */
/** 笔记列表刷新 */
/*
 * var bjmdt;
 * 
 * function bjsearchlist() { var bjurl =
 * "/b/wlxt/kc/v_wlkc_jxbjb_search/pageList";
 * var baseFrontUrl =
 * "/f/wlxt/jxbj/wlkc_jxbjb/teacher";
 * var baseBackUrl =
 * "/b/wlxt/jxbj/wlkc_jxbjb/teacher";
 * bjmdt = MyApp.createServerTable({
 * 
 * "table": $("#examplesearch"), "head": {
 * "columnMap": { "xuh": "序号", "bt":
 * "标题", "bqxx": "标签", "czsjStr": "记录时间" }
 *  }, "body": {
 * 
 * "checkBox":'<input type="checkbox"
 * class="checkboxes" name="username"
 * value="_ID_" />',
 * 
 * "control": function(data) { return '<a
 * href="javascript:void(0)"
 * onclick="bjbeforeEdit(\'' + data.bjid +
 * '\')"data="' + data.bjid + '"
 * class="btn editBtn"
 * style="margin-right: 6px;"><i
 * class="webicon-edit"
 * style="padding-right: 5px;"></i>编辑</a> ' + '
 * <a href="javascript:void(0)"
 * onclick="bjbeforeDelete(\'' +
 * data.bjid + '\')"data="' + data.bjid + '"
 * class="btn deleteBtn"><i
 * class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; },
 * "columnsDIY": { "xuh": { "mDataProp":
 * function(row, type, full, meta) {
 * return meta.row + 1; }, "sWidth":
 * "35" }, "bt": { "mDataProp":
 * function(row) { return "<font ><a
 * style='border:none;' href=" +
 * baseFrontUrl + "/beforeView?bjid=" +
 * row.bjid + ">" + row.bt + "</a></font>" },
 * "sWidth": "450", "bSortable": true,
 * "oldName": "bt" //
 * 如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。 },
 * "bqxx": { "sWidth": "200" },
 * 
 * "czsjStr": { "sWidth": "100",
 * "mDataProp": function(row) { return
 * fmtDate(row.czsj); }, "bSortable":
 * true, "oldName": "czsj" // 真正的排序字段 } } },
 * "url": bjurl, "getId": function(row) {
 * return row.bjid; }, "defaultSort": {
 * "asc": "userid" }, // function 的列不能排序
 * roleId "sortAble": "bt,czsj", //
 * 此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
 * "settings": { "iDisplayLength": 20,
 * "oLanguage": { "sProcessing":
 * "正在获取数据，请稍候...", "sLengthMenu": "每页显示
 * _MENU_ ", "sZeroRecords":
 * "没有您要搜索的内容", "sInfo": "共 _TOTAL_
 * 条数据", "sInfoEmpty": "暂无数据",
 * "sInfoFiltered": "(全部记录数 _MAX_ 条)",
 * "sInfoPostFix": "", "sSearch": "搜索",
 * "sUrl": "", "oPaginate": { //
 * "sFirst" : "第一页", // "sPrevious" :
 * "上一页", // "sNext" : "下一页", // "sLast" :
 * "最后一页" }, },
 * 
 * "fixedColumns": { //固定列的配置项
 * leftColumns: 2 //固定左边第一列 },
 * "sScrollX": "100%", "sScrollXInner":
 * "110%", "bScrollCollapse": false,
 * "scrollX": true,//x方向滚动 },
 * "defaultSearchCondition": [{ "name":
 * "wlkcid", "value": wlkcid }]
 * 
 * }); }; // 去批阅 function
 * zybeforeReview(zyid) {
 * window.location.href = baseUrl +
 * "/f/wlxt/kczy/xszy/teacher/beforePageList?zyid=" +
 * zyid; } // 编辑 function
 * zybeforeEdit(id) {
 * window.location.href =
 * "/f/wlxt/kczy/zy/teacher/beforeEdit?zyid=" +
 * id; } // 作业删除 function
 * zybeforeDelete(id) {
 * MyApp.post("/b/wlxt/kczy/zy/teacher/delete", {
 * "id": id }, function(data) {
 * MyApp.showResult(data, function() {
 * zyallmdt.reDraw(); zymdt.reDraw();
 * });
 * 
 * }); }
 * 
 */
/** 作业列表刷新 */
/*
 * var zyallmdt;
 * 
 * function zysearchlist() { var zyurl =
 * "/b/wlxt/kc/v_kczyxxb_search/pageList"; zymdt =
 * MyApp.createServerTable({ "table":
 * $("#examplesearch"), "head": { "columnMap": {
 * "wz": "序号", "bt": "作业题目", "zt": "状态(已交/未交)",
 * "mxdxmc": "发布对象", "zywcfs": "完成方式", "kssj":
 * "生效日期", "jzsj": "截止日期" } }, "body": {
 * "control": function(data) { return '<a
 * href="javascript:void(0)"
 * onclick="zybeforeReview(\'' + data.zyid +
 * '\')" data="' + data.zyid + '" class="btn
 * reviewBtn" style="margin-right: 6px;"><i
 * class="webicon-edit" style="padding-right:
 * 5px;"></i>去批阅</a> ' + '<a
 * href="javascript:void(0)"
 * onclick="zybeforeEdit(\'' + data.zyid +
 * '\')"data="' + data.zyid + '" class="btn
 * editBtn" style="margin-right: 6px;"><i
 * class="webicon-edit" style="padding-right:
 * 5px;"></i>编辑</a> ' + ' <a
 * href="javascript:void(0)"
 * onclick="zybeforeDelete(\'' + data.zyid +
 * '\')""data="' + data.zyid + '" class="btn
 * deleteBtn"><i class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; },
 * "columnsDIY": { "bt": { "mDataProp":
 * function(row) { return ' <a
 * href="/f/wlxt/kczy/xszy/teacher/beforePageList?zyid=' +
 * row.zyid + '" class="reviewBtn"
 * style="margin-right: 6px;">' + row.bt + '</a> '; },
 * "sWidth": "150", "bSortable": true },
 * "mxdxmc": { "sWidth": "90", "bSortable": true },
 * "wz": { "sWidth": "30" }, "zt": { "sWidth":
 * "100", "mDataProp": function(row) { return "
 * <span style='color:#e27b01'>" + row.wjs + "</span><span
 * style='color:#555555'>/</span><span
 * style='color:#1392f1'>" + row.yjs + "(已批阅" +
 * row.ypys + ")</span>" }, "bSortable": true },
 * "zywcfs": { "mDataProp": function(row) { if
 * (row.zywcfs == 2) { return "组"; } else {
 * return "个人"; } }, "sWidth": "60",
 * "bSortable": true }, "kssj": { "sWidth":
 * "80", "mDataProp": function(row) { return "<span
 * title='" + fmtDate(row.kssj) + "' >" +
 * fmtDate(row.kssj) + "</span>"; },
 * "bSortable": true }, "jzsj": { "sWidth":
 * "80", "mDataProp": function(row) { return "<span
 * title='" + fmtDate(row.jzsj) + "' >" +
 * fmtDate(row.jzsj) + "</span>"; },
 * "bSortable": true } } }, "url": zyurl,
 * "getId": function(row) { return row.id; },
 * "defaultSort": { "desc": "wz" }, // function
 * 的列不能排序 roleId "settings": { "iDisplayLength":
 * 20, "oLanguage": {
 * 
 * "sProcessing": "正在获取数据，请稍候...",
 * "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容", "sInfo": "共
 * _TOTAL_ 条数据", "sInfoEmpty": "暂无数据",
 * "sInfoFiltered": "(全部记录数 _MAX_ 条)",
 * "sInfoPostFix": "", "sSearch": "搜索", "sUrl":
 * "", "oPaginate": { // "sFirst" : "第一页", //
 * "sPrevious" : "上一页", // "sNext" : "下一页", //
 * "sLast" : "最后一页" }, }, },
 * "defaultSearchCondition": [{ "name":
 * "wlkcid", "value": wlkcid }] }); }
 */
/** 讨论列表刷新 */
/*
 * function bbssearchlist() { var dataTable; var
 * bbsurl =
 * "/b/wlxt/bbs/v_bbs_tltb_all/bbspageListSearch";
 * bbsmdt = MyApp.createServerTable({ "table":
 * $("#examplesearch"), "head": { "columnMap": {
 * "xh": "序号", "bt": "主题", "ftsj": "发帖时间",
 * "fbr": "发表人", "hfs": "回复数", "zhhfrxm":
 * "最新回复人" } }, "body": { "control":
 * function(data) { var _editBtn = ''; if
 * (data.fbr == userid) { _editBtn = '<a
 * href="/f/wlxt/bbs/bbs_tltb/teacher/beforeEditTl?wlkcid=' +
 * data.wlkcid + '&id=' + data.id + '&bqid=' +
 * data.bqid + '" class="btn" ><i
 * class="webicon-edit" style="padding-right:
 * 5px;"></i>编辑</a>'; } else { _editBtn = '<a
 * href="javascript:void(0);" class="btn
 * disabled" ><i class="webicon-edit"
 * style="padding-right: 5px;"></i>编辑</a>'; }
 * var _delBtn = ''; if (data.sfjh != null &&
 * data.sfjh == "是") { _delBtn = '<a
 * href="javascript:void(0);" class="btn
 * disabled" ><i class="webicon-delete"
 * style="padding-right: 5px;"></i>删除</a>'; }
 * else { _delBtn = '<a
 * href="javascript:delById(\'' + data.id +
 * '\');" class="btn" ><i
 * class="webicon-delete" style="padding-right:
 * 5px;"></i>删除</a>'; } if (data.sfjh != null &&
 * data.sfjh == "是") { return _editBtn + _delBtn + '<a
 * href="javascript:addZd(\'' + data.id + '\');"
 * class="btn" ><i class="webicon-top"
 * style="padding-right: 5px;"></i>置顶</a>' + '<a
 * href="javascript:removeWtjj(\'' + data.id +
 * '\');" class="btn"><i
 * class="webicon-outgoing"
 * style="padding-right: 5px;"></i>取消精华</a>'; }
 * else { return _editBtn + _delBtn + '<a
 * href="javascript:addZd(\'' + data.id + '\');"
 * class="btn" ><i class="webicon-top"
 * style="padding-right: 5px;"></i>置顶</a>' + '
 * <a href="javascript:addWtjj(\'' + data.id +
 * '\');" class="btn"><i
 * class="webicon-outgoing"
 * style="padding-right: 5px;"></i>设为精华</a>'; } },
 * "columnsDIY": { "xh": { "mDataProp":
 * function(row, type, full, meta) { return
 * meta.row + 1; }, "sClass": "order",
 * "bSortable": true, "sWidth": "50" }, "bt": {
 * "mDataProp": function(data, type, full, meta) {
 * var jh = ''; if (data.sfjh != null &&
 * data.sfjh == "是") { jh = '<span
 * class="jing">精</span>'; } if (data.sfzd ==
 * '是') { return '<a
 * href="/f/wlxt/bbs/bbs_tltb/teacher/viewTlById?wlkcid=' +
 * data.wlkcid + '&id=' + data.id + '&bqid=' +
 * data.bqid + '" type="td_title_red">' +
 * data.bt + '</a>' + jh; } return '<a
 * href="/f/wlxt/bbs/bbs_tltb/teacher/viewTlById?wlkcid=' +
 * data.wlkcid + '&id=' + data.id + '&bqid=' +
 * data.bqid + '" type="td_title">' + data.bt + '</a>' +
 * jh; }, "sWidth": "200", "bSortable": true,
 * "oldName": "bt" //
 * 如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。 }, "ftsj": {
 * "mDataProp": "fbsj", "sWidth": "80",
 * "bSortable": true }, "fbr": { "mDataProp":
 * "fbrxm", "sWidth": "80", "bSortable": true },
 * "hfs": { "mDataProp": "hfcs", "sWidth": "80",
 * "bSortable": true }, "zhhfrxm": {
 * "mDataProp": "zhhfrxm", "sWidth": "80",
 * "bSortable": true }, } }, "url": bbsurl,
 * "getId": function(row) { return row.id; },
 * "defaultSort": { "desc": "xh" }, // function
 * 的列不能排序 roleId "settings": { "iDisplayLength":
 * 20, "oLanguage": { "sProcessing":
 * "正在获取数据，请稍候...", "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容", "sInfo": "共
 * _TOTAL_ 条数据", "sInfoEmpty": "暂无数据",
 * "sInfoFiltered": "(全部记录数 _MAX_ 条)",
 * "sInfoPostFix": "", "sSearch": "搜索", "sUrl":
 * "", "oPaginate": { // "sFirst" : "第一页", //
 * "sPrevious" : "上一页", // "sNext" : "下一页", //
 * "sLast" : "最后一页" }, }, },
 * "defaultSearchCondition": [{ "name":
 * "wlkcid", "value": wlkcid }] }); } 取消集锦
 * function removeWtjj(id) {
 * $.post('/b/wlxt/bbs/bbs_tltb/teacher/removeWjtt', {
 * id: id }, function(data) { if (data.result ==
 * 'success') { Modal({ type: data.result,
 * content: data.msg, okfn: function() {
 * dataTable.fnDraw(); } }); } else { Modal({
 * type: "regest", content: data.msg,
 * contentDetail: " " }) } }); }
 */
/** 答疑刷新列表 */
/*
 * function dysearchlist() { var dyurl =
 * '/b/wlxt/bbs/v_bbs_tltb_all/dypageList';
 * dymdt = MyApp.createServerTable({ "table":
 * $("#examplesearch"), "head": { "columnMap": {
 * "xh": "序号", "bt": "问题标题", "twtx": "提问同学",
 * "twsj": "提问时间", "hdls": "回答老师", "hdsj":
 * "回答时间" } }, "body": { "control":
 * function(data) { if (data.sfjh != null &&
 * data.sfjh == "是") { return '<a
 * href="javascript:removeWjtt(\'' + data.id +
 * '\')" class="btn" style="margin-right: 3px;"><i
 * class="webicon-edit" style="padding-right:
 * 5px;"></i>取消集锦</a>'; } else { var str; if
 * (data.zhhfr == null || data.zhhfr == '' ||
 * data.fbr == data.zhhfr) { str = '<a
 * href="/f/wlxt/bbs/bbs_kcdy/teacher/beforeEditDy?wlkcid=' +
 * data.wlkcid + '&id=' + data.id + '&tabid=1"
 * class="btn" style="margin-right: 3px;"><i
 * class="webicon-edit" style="padding-right:
 * 5px;"></i>回答</a>'; } else { str = '<a
 * href="/f/wlxt/bbs/bbs_kcdy/teacher/beforeEditDy?wlkcid=' +
 * data.wlkcid + '&id=' + data.id + '&tabid=2"
 * class="btn" style="margin-right: 3px;"><i
 * class="webicon-edit" style="padding-right:
 * 5px;"></i>修改</a>'; } return str + ' <a
 * href="javascript:void(0);" onclick="del(\'' +
 * data.id + '\');" class="btn"><i
 * class="webicon-delete" style="padding-right:
 * 5px;"></i>删除</a>'; } }, "columnsDIY": {
 * "xh": { "mDataProp": function(row, type,
 * full, meta) { return meta.row + 1; },
 * "sClass": "order", "sWidth": "50" }, "bt": {
 * "mDataProp": function(data, type, full, meta) {
 * var jj = ''; if (data.sfjh != null &&
 * data.sfjh == "是") { jj = '<span
 * class="jing">集锦</span>'; } return '<a
 * href="/f/wlxt/bbs/bbs_kcdy/teacher/viewDyById?wlkcid=' +
 * data.wlkcid + '&id=' + data.id + '&tabid=1"
 * type="td_title">' + data.bt + '</a>' + jj; },
 * "bSortable": true, "oldName": "bt", "sWidth":
 * "250", }, "twtx": { "bSortable": true,
 * "oldName": "twtx", "mDataProp": "fbrxm",
 * "sWidth": "80" }, "twsj": { "bSortable":
 * true, "oldName": "twsj", "mDataProp": "fbsj",
 * "sWidth": "80" }, "hdls": { "bSortable":
 * true, "oldName": "hdls", "mDataProp":
 * "zhhfrxm", "sWidth": "80" }, "hdsj": {
 * "bSortable": true, "oldName": "hdsj",
 * "mDataProp": "zhhfsj", "sWidth": "80" }, } },
 * "url": dyurl, "getId": function(row) { return
 * row.id; }, "defaultSort": { "desc": "wz" }, //
 * function 的列不能排序 roleId "settings": {
 * "iDisplayLength": 20, "oLanguage": {
 * "sProcessing": "正在获取数据，请稍候...",
 * "sLengthMenu": "每页显示 _MENU_ ",
 * "sZeroRecords": "没有您要搜索的内容", "sInfo": "共
 * _TOTAL_ 条数据", "sInfoEmpty": "暂无数据",
 * "sInfoFiltered": "(全部记录数 _MAX_ 条)",
 * "sInfoPostFix": "", "sSearch": "搜索", "sUrl":
 * "", "oPaginate": { // "sFirst" : "第一页", //
 * "sPrevious" : "上一页", // "sNext" : "下一页", //
 * "sLast" : "最后一页" }, }, },
 * "defaultSearchCondition": [{ "name":
 * "wlkcid", "value": wlkcid }] }); }
 * 
 * var tabchange = function(i) { // 模拟数据返回 课内搜索
 * var data = { "tablist": [{ list: [{ title:
 * "全部", count: allnum }, { title: "公告", count:
 * ggnum }, { title: "文件", count: kjnum }, {
 * title: "作业", count: zynum }, { title: "讨论",
 * count: bbsnum }, { title: "答疑", count: dynum }, {
 * title: "笔记", count: bjnum }, ] }], "tab": i,
 * "con": searchvalue }; var selfhtml =
 * template('searchconspt', data);
 * $("#searchcon").html(selfhtml); flushnum();
 * if (i == 0) { $("#alltab").show();
 * $("#other").hide(); // computeHeight();
 * initall(); allsearch();
 * $(".dataTables_info").hide();
 * $(".dataTables_length").hide();
 * $(".dataTables_paginate").hide(); return; }
 * $("#alltab").hide(); $("#other").show(); if
 * (i == 1) { ggsearchlist(); ggmdt.search(); }
 * if (i == 2) { kjsearchlist(); kjmdt.search(); }
 * if (i == 3) { zysearchlist(); zymdt.search(); }
 * if (i == 4) { bbssearchlist();
 * bbsmdt.search(); } if (i == 5) {
 * dysearchlist(); dymdt.search(); } if (i == 6) {
 * bjsearchlist(); bjmdt.search(); } } var
 * seemore = function(dom, child) { // 查看更多
 * $(dom).on('click', '', function(event) { //
 * debugger; var parentdom = $(this).parent() if
 * ($(parentdom).hasClass('up')) {
 * $(parentdom).removeClass('up');
 * $(".zeromodal-container").css("height",
 * '370px'); isModal(".zeromodal-container",
 * $(this)); return; }
 * $(parentdom).addClass('up');
 * $(".zeromodal-container").css("height",
 * '470px');
 * 
 * isModal(".zeromodal-container", $(this));
 * event.preventDefault(); Act on the event }); }
 * 
 * var isModal = function(dom, thisdom) { if
 * ($(thisdom).parents(dom)) {
 * _resizeBodyHeight($(thisdom).parents(".zeromodal-container").height()); } }
 * 
 * function del(id) { var delDataUrl =
 * "/b/wlxt/kcgg/wlkc_ggb/teacher/delete";
 * $.post(delDataUrl, { id: id }, function(data) {
 * Modal({ type: "success", content: data.msg
 * }); if (data.result == 'success') {
 * dataTable.fnDraw(); } }); }
 */
function _resizeBodyHeight(height) {
    var headerHeight = 50;
    var buttonHeight = 60;
    var height = height - headerHeight - buttonHeight;
    $('.zeromodal-body').css('height', height);
}
var computeHeight = function() {
    /* debugger; */
    var heighto = $("#searchpanel").outerHeight(true); // search_height

    var toph = $("#searchcon").css("top");
    // nav_height
    $(".rtcon").height(heighto + 86);
    /*
     * if ($("#rtcon").length && $("#rtcon").height() > nh) { return; }
     */



}
var getByteLen = function(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
            len += 1;
        } else {
            len += 1;
        }
    }
    return len;
}
var changeTabDiv = function(i, dom) {
    if ($(dom).hasClass('active')) {
        return;
    }
    if ($(".operate").length > 0) {
        $("#operate" + i).addClass('active').siblings('').removeClass('active');
    }
    preTabChange(dom);
    $(dom).addClass('active').siblings('').removeClass('active');
    $("#tabdiv" + i).addClass('active').siblings('').removeClass('active');
}
var judgeSize = function(size) {
    // debugger;
    if (size > 1024 && size < 1048576) {
        return (size / 1024).toFixed(2) + 'K';
    }
    if (size < 1024) {
        return size + 'B';
    }
    if (size > 1048576 && size < 1048576 * 1024) {
        return (size / 1048576).toFixed(2) + 'M';
    }
    if (size > 1048576 * 1024) {
        return (size / 1048576 / 1024).toFixed(2) + 'G';
    }
}


function delCookie(name){
//删除cookie并重新演示
// 该函数检查下cookie是否设置，如果设置了则将过期时间调到过去的时间;
//剩下就交给操作系统适当时间清理cookie啦
    if (getCookie(name)!="")
    {
       setCookie(name,"",-1);
    }
}


function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + "; path=/" + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}

function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        } else return ""
    }
}

var outTipMessage;

function tipfile(msg) {
    $(".myinput").addClass('error2');
    $(".myinput .tip").remove();
    if (outTipMessage == undefined) {
        outTipMessage = $(".myinput .outtip").text();
    }

    $(".myinput .outtip").remove();
    $(".myinput span").after('<div class="outtip">' + msg + '</div>');
}
/*
 * function filterName(name){ if (name.match(/[\\\/\*\?\:\"\<\>\|\~\!]/g)) {
 * 
 * name=name.replace(/[\\\/\*\?\:\"\<\>\|\~\!]/g, "");
 * 
 * console.log(name); filterName(name); }else{ return filtername2=name; } }
 */
function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, " ", expdate);
}

// 左侧 nav 显示与隐藏
$(function() {
    if ($("select").length != 0 && !$("select").hasClass('none')) {
        //debugger;
        $("select").each(function(index, el) {
            if ($(el).parents(".dataTables_length") && $(el).parents(".dataTables_length").attr('class') == "dataTables_length") {
                return;
            }
            $(el).select2({ minimumResultsForSearch: -1 });
        });


    }
    $("#searchicon").on('click', '', function(event) {
        var parentdom = $(this).parent();
        if ($(parentdom).hasClass('up')) {
            $(parentdom).removeClass('up');
        } else {
            $(parentdom).addClass('up');
        }
        $(document).delegate('body', 'click', function(event) {
            // debugger;
            if ($(event.target).attr('class') == "search up") {
                return;
            }
            if ($(event.target).attr('class') == "webicon-search") {
                return;
            }
            if ($(event.target).attr('id') == "searchcourse") {
                return;
            }
            $(".search").removeClass('up');
        });
        event.preventDefault();
        /* Act on the event */
    });
    /*$("#shrinkbtn").on('click', '', function(event) {
        if ($(this).attr('class') == "") {
            $(this).addClass("cover");
            $(".navlef").addClass("mini");
            $(".rtcon").addClass("mini");
            setCookie("wlxt|nav_cover", "cover", 15)
        } else {
            $(this).removeClass("cover");
            $(".navlef").removeClass("mini");
            $(".rtcon").removeClass("mini");
            deleteCookie("wlxt|nav_cover");
        }


        event.preventDefault();
         Act on the event 
    });*/

    /*$("#morebtn ").on('click', 'i', function(event) {debugger;
        var parentClass = $(this).parent().attr('class');
        if ($(event.target).hasClass('webicon-up')) {
            $(this).parent().removeClass('in');

            deleteCookie("wlxt|nav_left");
        } else {
            $(this).parent().addClass('in');

            setCookie("wlxt|nav_left", "up", 15)
        }

        event.preventDefault();
         Act on the event 
    });*/


});

$(function() {
    if ($(".fileupload").length != 0) {
        $(".myinput").delegate('.fileupload', 'change', function(event) {
            debugger;
            var path = $(this).val();
            var zid = $(this).attr('id').match(/\d+/g);
            // $("#label").html(path);
            var asize;
            var path = $(this).val();
            if (IEVersion() != 9) {
                asize = $(this)[0].files[0].size;
                asize = judgeSize(asize);
            } else {
                asize = " "
            }


            var pIndex = path.lastIndexOf('\\');
            var fileExtension = path.substring(pIndex + 1);
            var zIndex = fileExtension.lastIndexOf('\.');
            var zExtension = fileExtension.substring(zIndex + 1);

            if (fileExtension.match(/[\\\/\*\?\:\"\<\>\|]/g)) {

                fileExtension = fileExtension.replace(/[\\\/\*\?\:\"\<\>\|]/g, "");

            }
            zExtension = getFileTypeForIcon(zExtension);
            /*
             * if (fileExtension.match(/[\/\*\?\:\<\>\”\|]/g)) {
             * $(".myinput").addClass('error'); return; }
             */
            var nhouzhui;
            if ($('#attachment' + zid + ' .ftitle').text()) {
                nhouzhui = $('#attachment' + zid + ' .ftitle').text().match(/\.(\w+)/)[1];
            }
            var adherehtml = template('adheretm', { title: fileExtension, size: asize, zid: zid });
            if ($("#attachment" + zid).attr("class") == "wdhere") {
                $("#attachment" + zid).addClass(zExtension);
            } else {
                if (zExtension != nhouzhui) {
                    $("#attachment" + zid).removeClass(nhouzhui).addClass(zExtension);
                }
            }
            if ($("#attachment" + zid).length) {
                $("#attachment" + zid).html(adherehtml).addClass('active'); // 所教课程
            } else {
                $("#attachm" + zid).html(adherehtml).addClass('active');
            }

            event.preventDefault();
            if ($(this).parents(".myinput").hasClass('error')) {
                $(this).parents(".myinput").removeClass('error')
            }
            if ($(this).data("limit")) {
                var lastzhui = asize.substring(asize.length - 1);
                if (lastzhui == "M" && $(this).data("limit") == "20M") {

                    if (parseFloat(asize) > 20) {
                        if ($(this).parents(".myinput").hasClass("error3")) {
                            $("#fileupload").val("");
                            return;
                        }
                        $(this).parents(".myinput").addClass('error3');

                        $("#fileupload").val("");
                        fileon = true;
                        return;
                    }
                }
            }
            if (lastzhui == "G") {
                if ($(this).data("limit") == "20M" && parseFloat(asize) > 0) {
                    if ($(this).parents(".myinput").hasClass("error3")) {
                        return;
                    }
                    $(this).parents(".myinput").addClass('error3');

                    $("#fileupload").val("");
                    fileon = true;
                    return;
                }
                if (parseFloat(asize) > 1) {
                    if ($(this).parents(".myinput").hasClass("error3")) {
                        return;
                    }
                    if ($(this).parents(".myinput").hasClass("error2")) {
                        $(this).parents(".myinput").removeClass("error2");
                    }
                    $(this).parents(".myinput").addClass('error3');

                    $("#fileupload").val("");
                    fileon = true;
                    return;
                }
            }


            if ($(this).parents(".myinput").hasClass("error3")) {
                $(this).parents(".myinput").removeClass('error3');
                /* $(".myinput .tip").remove(); */
                fileon = false;
            }




            event.preventDefault();

        });
        if ($('[id^="attachment"]').length != 0) {
            $('[id^="attachment"]').each(function(index, el) {
                $(el).delegate('a', 'click', function(event) { // 上传文件 end
                    debugger;
                    var dom = $(this).parents('.file').find(".fileupload");
                    $(dom).after($(dom).clone().val(""));
                    $(dom).remove();
                    $(el).html('').removeClass('active');
                    $(el).attr('class', 'wdhere');
                    $("#label").html('请上传文件');
                    var len = $(dom).attr('id').length;
                    var numberl = $(dom).attr('id').substring(len - 1);
                    $('#div' + numberl).html("");
                    fileon = false;
                });
            });
        }
    }
    if ($("#fileupload").length != 0 && $(".fileupload").length == 0) {
        $(".myinput").delegate('#fileupload', 'change', function(event) {
            // 兼容从后台传过来的错误
            var asize;
            var path = $(this).val();
            if (!path) {
                return;
            }
            if ($(".myinput").attr('class') != "myinput") {
                $(".myinput").attr('class', "myinput")
            }
            /*
             * if ($(".myinput").hasClass("error2")) {
             * 
             * $(".myinput").removeClass('error2'); $(".myinput .tip").remove();
             * $(".myinput .outtip").remove(); fileon=false; $(".myinput
             * span").after('<div class="outtip">' + outTipMessage + '</div>'); }
             */

            if (IEVersion() != 9) {
                asize = $(this)[0].files[0].size;
                asize = judgeSize(asize);
            } else {
                asize = " "
            }

            var pIndex = path.lastIndexOf('\\');
            var fileExtension = path.substring(pIndex + 1);
            var zIndex = fileExtension.lastIndexOf('\.');
            var zExtension = fileExtension.substring(zIndex + 1);
            zExtension = getFileTypeForIcon(zExtension);
            /* \ / : * ? " < > | */
            if (fileExtension.match(/[\\\/\*\?\:\"\<\>\|]/g)) {

                fileExtension = fileExtension.replace(/[\\\/\*\?\:\"\<\>\|]/g, "");

            }
            var nhouzhui;
            if ($('#attachment .ftitle').text()) {
                nhouzhui = $('#attachment .ftitle').text().match(/\.(\w+)/)[1];
            }
            var adherehtml = template('adheretm', { title: fileExtension, size: asize });
            if ($("#attachment").attr("class") == "wdhere") {
                $("#attachment").addClass(zExtension);
            } else {
                if (zExtension != nhouzhui) {
                    $("#attachment").attr("class", " wdhere ");
                    $("#attachment").removeClass(nhouzhui).addClass(zExtension);
                }
            }
            $("#attachment").html(adherehtml).addClass('active'); // 所教课程

            if ($(this).data("limit")) {
                var lastzhui = asize.substring(asize.length - 1);
                if (lastzhui == "M" && $(this).data("limit") == "20M") {

                    if (parseFloat(asize) > 20) {
                        if ($(".myinput").hasClass("error3")) {
                            $("#fileupload").val("");
                            return;
                        }
                        $(".myinput").addClass('error3');

                        $("#fileupload").val("");
                        fileon = true;
                        return;
                    }
                }
            }
            if (lastzhui == "G") {
                if ($(this).data("limit") == "20M" && parseFloat(asize) > 0) {
                    if ($(".myinput").hasClass("error3")) {
                        return;
                    }
                    $(".myinput").addClass('error3');

                    $("#fileupload").val("");
                    fileon = true;
                    return;
                }
                if (parseFloat(asize) > 1) {
                    if ($(".myinput").hasClass("error3")) {
                        return;
                    }
                    if ($(".myinput").hasClass("error2")) {
                        $(".myinput").removeClass("error2");
                    }
                    $(".myinput").addClass('error3');

                    $("#fileupload").val("");
                    fileon = true;
                    return;
                }
            }

            if ($(".myinput").hasClass("error2")) {
                $(".myinput").removeClass('error2');
                /* $(".myinput .tip").remove(); */

            }
            if ($(".myinput").hasClass("error3")) {
                $(".myinput").removeClass('error3');
                /* $(".myinput .tip").remove(); */
                fileon = false;
            }


            // $("#label").html(path);


            event.preventDefault();
            if ($(".myinput").hasClass('error')) {
                $(".myinput").removeClass('error')
            }
            if ($(".myinput").hasClass('error3')) {
                $(".myinput").removeClass('error3')
            }
        });


        $("#attachment").delegate('a', 'click', function(event) { // 上传文件 end
            $(".myinput").attr('class', 'myinput');
            /*$("#fileupload").after($("#fileupload").clone().val(""));
            $("#fileupload").remove(); // $("form")[0].reset();
         
            $("#attachment").html('').removeClass('active');
            $("#attachment").attr('class', 'adhere'); $("#label").html('请上传文件');*/
        });

        /*
         * $("#fileupload").on('change', function(event) { //上传文件 start var
         * asize; var path = $(this).val(); if (IEVersion() != 9) { asize =
         * $(this)[0].files[0].size; asize = judgeSize(asize); } else { asize = " " }
         * //$("#label").html(path);
         * 
         * var pIndex = path.lastIndexOf('\\'); var fileExtension =
         * path.substring(pIndex + 1); var zIndex =
         * fileExtension.lastIndexOf('\.'); var zExtension =
         * fileExtension.substring(zIndex + 1); if (zExtension == 'png') {
         * zExtension = 'jpg' } if (fileExtension.match(/[\/\*\?\:\<\>\”\|]/g)) {
         * $(".myinput").addClass('error'); return; } var nhouzhui; if
         * ($('#attachment span').text()) { nhouzhui = $('#attachment
         * span').text().match(/\.(\w+)/)[1]; } var adherehtml =
         * template('adheretm', { title: fileExtension, size: asize }); if
         * ($("#attachment").attr("class") == "adhere") {
         * $("#attachment").addClass(zExtension); } else { if (zExtension !=
         * nhouzhui) {
         * $("#attachment").removeClass(nhouzhui).addClass(zExtension); } }
         * $("#attachment").html(adherehtml).addClass('active'); //所教课程
         * event.preventDefault(); if ($(".myinput").hasClass('error')) {
         * $(".myinput").removeClass('error') } /* Act on the event });
         * $("#attachment").delegate('a', 'click', function(event) { //上传文件 end
         * debugger; $("#fileupload").after($("#fileupload").clone().val(""));
         * $("#fileupload").remove(); //$("form")[0].reset();
         * 
         * $("#attachment").html('').removeClass('active');
         * $("#label").html('请上传文件'); });
         */
    }

    if ($("#all_checked").length != 0 && $("#all_checked").length == 1) {
        $("#all_checked").click(function() {
            $('[name=test]:checkbox').prop('checked', this.checked); // checked为true时为默认显示的状态

        });
    }

    if ($("#textarea").length != 0) {
        $("#textarea").on('keyup', '', function(event) { // 控制文字域字数
            debugger;
            var val = $(this).find('#limit').data("limit");
            var tval = $(this).children('textarea').val();
            var len = getByteLen(tval)
            if (len <= val) {

                $(this).find('#limit').html(val - len);
            } else {
                $(this).find('#limit').html(0);
            }
            // event.preventDefault();
            /* Act on the event */
        });
    }
});
/*
 * function allsearch() { ggallmdt.search(); kjallmdt.search();
 * zyallmdt.search(); bbsallmdt.search(); dyallmdt.search(); bjallmdt.search(); }
 * 搜索全部 function initall() { ggall(); kjall(); zyall(); bbsall(); dyall();
 * bjall(); }
 * 
 * function flushnuminit() { var ggallnum = $("#ggalltable_info").text(); var
 * kjallnum = $("#kjalltable_info").text(); var zyallnum =
 * $("#zyalltable_info").text(); var bbsallnum = $("#bbsalltable_info").text();
 * var dyallnum = $("#dyalltable_info").text(); var bjallnum =
 * $("#bjalltable_info").text(); ggallnum = $("#ggallnum").val(ggallnum).val();
 * kjallnum = $("#kjallnum").val(kjallnum).val(); zyallnum =
 * $("#zyallnum").val(zyallnum).val(); bbsallnum =
 * $("#bbsallnum").val(bbsallnum).val(); dyallnum =
 * $("#dyallnum").val(dyallnum).val(); bjallnum =
 * $("#bjallnum").val(bjallnum).val(); ggnum = getNum(ggallnum); kjnum =
 * getNum(kjallnum); zynum = getNum(zyallnum); bbsnum = getNum(bbsallnum); dynum =
 * getNum(dyallnum); bjnum = getNum(bjallnum);
 * $(".count-0").text(parseInt(ggnum) + parseInt(kjnum) + parseInt(zynum) +
 * parseInt(bbsnum) + parseInt(dynum) + parseInt(bjnum));
 * $(".count-1").text(ggnum); $(".count-2").text(kjnum);
 * $(".count-3").text(zynum); $(".count-4").text(bbsnum);
 * $(".count-5").text(dynum); $(".count-6").text(bjnum); };
 * 
 * function getheadernum() { ggallnum = $("#ggallnum").val(); kjallnum =
 * $("#kjallnum").val(); zyallnum = $("#zyallnum").val(); bbsallnum =
 * $("#bbsallnum").val(); dyallnum = $("#dyallnum").val(); bjallnum =
 * $("#bjallnum").val(); ggnum = getNum(ggallnum); kjnum = getNum(kjallnum);
 * zynum = getNum(zyallnum); bbsnum = getNum(bbsallnum); dynum =
 * getNum(dyallnum); bjnum = getNum(bjallnum); }
 * 
 * function flushnum() { getheadernum(); $(".count-0").text(parseInt(ggnum) +
 * parseInt(kjnum) + parseInt(zynum) + parseInt(bbsnum) + parseInt(dynum) +
 * parseInt(bjnum)); $(".count-1").text(ggnum); $(".count-2").text(kjnum);
 * $(".count-3").text(zynum); $(".count-4").text(bbsnum);
 * $(".count-5").text(dynum); $(".count-6").text(bjnum); };
 * 
 * function flushalldivhidden() { getheadernum(); if (ggnum == 0) {
 * $("#ggdiv").addClass("hidden"); } if (kjnum == 0) {
 * $("#kjdiv").addClass("hidden"); } if (zynum == 0) {
 * $("#zydiv").addClass("hidden"); } if (bbsnum == 0) {
 * $("#tldiv").addClass("hidden"); } if (dynum == 0) {
 * $("#dydiv").addClass("hidden"); } if (bjnum == 0) {
 * $("#bjdiv").addClass("hidden"); } computeHeight();
 * 
 * if ($("#searchpanel").height() < $("#content .course-w").height()) {
 * $("#searchcon").height($("#content .course-w").height() + 20); } else {
 * $("#searchcon").height($("#searchpanel").height()); }
 * 
 * $("#searchcon").height($("#searchpanel").height()); } // 搜索 function
 * courseinsideSearch() { ggallmdt.search(); kjallmdt.search();
 * zyallmdt.search(); bbsallmdt.search(); dyallmdt.search(); bjallmdt.search(); }
 */
function getNum(text) {
    var value = text.replace(/[^0-9]/ig, "");
    return (value);
}
// 实现radio自定义border-color
$(function() {
    $('label.mycheck input[type="radio"]').on("click", function() {
        $(this).siblings().children('i').css({ 'border-color': '#999999' });

    });
    /*
     * wlkcid = $("#wlkcidbyleft").val(); userid = $("#userid").val(); if
     * ($("#searchcourse").length) { $("#searchtab .btn").on('click', '',
     * function(event) { // 课内搜索 var key = event.which; var con =
     * $("#searchcourse").val(); if (!con) { Modal({ type: "notice", content:
     * "请输入内容", css: "one", // 默认 '操作失败' okfn: function() {}, }); return; } if
     * (key == 1) {
     * 
     * $("#searchcon").removeClass('hide').show(); searchvalue = con;
     * setCookie("searchkey", con); tabchange(0); courseinsideSearch(); if
     * ($('.navlef.mini').length) { $(".search.up").removeClass('up'); }
     * computeHeight(); $(".dataTables_info").hide();
     * $(".dataTables_length").hide(); $(".dataTables_paginate").hide(); }
     * computeHeight(); setTimeout(function() { flushnuminit();
     * flushalldivhidden(); }, 500); setTimeout(function() { flushnuminit();
     * flushalldivhidden(); }, 1000); computeHeight();
     * $("#searchcon").siblings('.course-w').hide(); event.preventDefault(); });
     * $("#content").delegate('#searchclose', 'click', function(event) {
     * $("#searchcon").addClass('hide'); $("#searchtab").hide();
     * $("#searchcourse").val(""); // $("#searchkenei").val(""); //清空session
     * computeHeight(); }); if ($("#searchcourse").val()) {} } var dataTable; if
     * ($('.navlef').length != 0) {} allnum = 0; ggnum = 0; kjnum = 0; zynum =
     * 0; bbsnum = 0; dynum = 0; bjnum = 0; // initall(); // 初始化表格 var
     * searchdata = { "tablist": [{ list: [{ title: "全部", count: allnum }, {
     * title: "公告", count: ggnum }, { title: "文件", count: kjnum }, { title:
     * "作业", count: zynum }, { title: "讨论", count: bbsnum }, { title: "答疑",
     * count: dynum }, { title: "笔记", count: bjnum }, ] }], "tab": 0 }; if
     * ($("#searchconspt").length && $("#searchcon").length) { var selfhtml =
     * template('searchconspt', searchdata); $("#searchcon").html(selfhtml); //
     * 所教课程 initall(); // 初始化表格 }
     */
});

function globaCourse() {
    window.location.href = "/f/wlxt/common/globaCourse";
}

function courseSearch() {
    window.location.href = "/f/wlxt/common/courseSearch";
}

function addtempl(dom) {
    debugger;

}

function IEVersion() {
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; // IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; // edge
    } else if (isIE11) {
        return 11; // IE11
    } else {
        return -1; // 不是ie浏览器
    }
}

var disbtn = function(dom) {
    $(dom).attr("disabled", true);
}
var rebtn = function(dom) {
    $(dom).attr("disabled", false);
}

$("input:text").keypress(function(e) {
    if (e.which == 13) { // 判断所按是否回车键
        var inputs = $("form").find(":text"); // 获取表单中的所有输入框
        var idx = inputs.index(this); // 获取当前焦点输入框所处的位置
        if (idx == inputs.length - 1) { // 判断是否是最后一个输入框
            // if (confirm("最后一个输入框已经输入,是否提交?")) // 用户确认
            // $("form[name='contractForm']").submit(); // 提交表单
            return;
        } else {
            inputs[idx + 1].focus(); // 设置焦点
            inputs[idx + 1].select(); // 选中文字
        }
        return false; // 取消默认的提交行为
    }
});




// 获取文件分类
getFileTypeForIcon = function(fileTpye) {
    var newType = $.trim(fileTpye).toLowerCase();
    switch (newType) {
        case 'flv':
        case 'mp4':
        case 'wmv':
        case 'asf':
        case 'asx':
        case 'rm':
        case 'rmvb':
        case 'mpg':
        case 'mpeg':
        case 'mpe':
        case '3gp':
        case 'mov':
        case 'm4v':
        case 'avi':
        case 'dat':
        case 'mkv':
        case 'vob':
        case 'mp3':
            return 'av';
        case 'png':
            return 'jpg';
        case 'xls':
            return 'xlsx';
        case 'doc':
            return 'docx';
        case 'rar':
            return 'zip';

        default:
            return newType;
    }
};

