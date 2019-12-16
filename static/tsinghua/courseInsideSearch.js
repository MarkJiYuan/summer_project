/**
 * 
 */
var tosubstr2 = function(options) { // 传入文字内容，截断长度，是否为重要文件
	var objectDefault = {
	        bt: '您忘了传参',
	        len: 30,
	        sfqd: false,
	        detailUrl: '',
	        hyperlink: true,
			version:''
	    };
	    /* options 合并到 objectDefault 中 */

	    $.extend(objectDefault, options);
	    var bt = escapeChars(objectDefault.bt);
	    var len = objectDefault.len;
	    if (!objectDefault.sfqd) {
	    	len +=5;
	    }else{
	    	len +=-1;
	    }
	    var title = "";
	    var type = 'type="td_title"';
	    var qd = '';
	    if ("" != bt && getByteLen(bt) > len) {
	    	var btTmp = bt.substring(0, len);
	    	var btArray = btTmp.split("");
	    	
	    	bt = "";
	    	for(var i = 0;i<btArray.length;i++){
	    		if(i<(len/2)){
	    			bt +=btArray[i];
	    		}else{
	    			
	    			if(getByteLen(bt)<len){
	    				bt +=btArray[i];
	    			}
	    		}
	    	}
	    	bt = reverse(bt);
			bt +="...";
			
	        
	        title = 'title="' + objectDefault.bt + '"';
	    }
	    if (objectDefault.sfqd) {
	        qd = '<img style="width:14px;" src="/res/app/wlxt/img/important.png?v='+objectDefault.version+'" alt="">';
	    }
	    if (objectDefault.hyperlink) {
	        return "<a style='cursor:pointer' class='hover'" + type + " " + title + " href=" + objectDefault.detailUrl + " >" + bt + "</a>" + qd;
	    } else {
	        return "<span  " + type + " " + title + " >" + bt + "</span>";
	    }
}

//本函数是单纯的文本截断函数，可处理全角、半角混合文本
//len以英文为准，中文字符宽度为2，英文字符和数字宽度为1。
//调用方式：substr_width({"str":"张a1b2","len":4})
//马尔东
var substr_width = function(object) { 
    var objectDefault = {
        str: '您忘了传参',
        len: 40
    };
    /* object 合并到 objectDefault 中 */
    $.extend(objectDefault, object);
    var str = objectDefault.str;
    var len = objectDefault.len;
    if(!isString(str)){
    	return "";
    }
    var width = 0;
    var shortStr = "";
    for(var i = 0; i < str.length; i++){
    	var char = str.charAt(i);
    	if(isFullWidth(char)){
    		width = width + 2;
    	}else if(isHalfWidth(char)){
    		width = width + 1;
    	}else{
    		width = width + 1;
    	}
    	if(width <= len){
    		shortStr = shortStr + char
    	}else{
    		break;
    	}
    }
    var tail = "";
    if(shortStr.length < str.length){
    	tail = "...";
    }
    return shortStr+tail;
    
}

//测试是否是正常字符
function isString(input) {
	  var isStr = typeof input === 'string' || input instanceof String;

	  if (!isStr) {
	    return false;
	  }
	  
	  return true;
}

//全角字符
var fullWidthRegExp = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

function isFullWidth(str) {
  if(!isString(str)){
	  return false;
  }
  return fullWidthRegExp.test(str);
}
//半角字符
var halfWidthRegExp = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;

function isHalfWidth(str) {
  if(!isString(str)){
	  return false;
  }
  return halfWidthRegExp.test(str);
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
var changeTab = function(i, dom) { //全球公开课切换并ajax刷新数据
    //debugger;
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
//具体使用方法找李倩伟
var tosubstr = function(options) { // 传入文字内容，截断长度，是否为重要文件
    
	var objectDefault = {
	        bt: '您忘了传参',
	        len: 30,
	        sfqd: false,
	        detailUrl: '',
	        hyperlink: true,
			version:''
	    };
	    /* options 合并到 objectDefault 中 */

	    $.extend(objectDefault, options);
	    var bt = escapeChars(objectDefault.bt);
	    var len = objectDefault.len;
	    if (!objectDefault.sfqd) {
	    	len +=5;
	    }else{
	    	len +=-1;
	    }
	    var title = "";
	    var type = 'type="td_title"';
	    var qd = '';
	    if ("" != bt && getByteLen(bt) > len) {
	    	var btTmp = bt.substring(0, len);
	    	var btArray = btTmp.split("");
	    	
	    	bt = "";
	    	for(var i = 0;i<btArray.length;i++){
	    		if(i<(len/2)){
	    			bt +=btArray[i];
	    		}else{
	    			
	    			if(getByteLen(bt)<len){
	    				bt +=btArray[i];
	    			}
	    		}
	    	}
	    	bt = reverse(bt);
			bt +="...";
			
	        
	        title = 'title="' + objectDefault.bt + '"';
	    }
	    if (objectDefault.sfqd) {
	        qd = '<img style="width:14px;" src="/res/app/wlxt/img/important.png?v='+objectDefault.version+'" alt="">';
	    }
	    if (objectDefault.hyperlink) {
	        return "<a style='cursor:pointer' class='hover'" + type + " " + title + " href=" + objectDefault.detailUrl + " >" + bt + "</a>" + qd;
	    } else {
	        return "<span  " + type + " " + title + " >" + bt + "</span>";
	    }

}

/*公告列表查询*/
function ggall(){
	//var dataTable;
	var  ggurl = '/b/wlxt/kcgg/wlkc_ggb/student/pageListXsSearch?v=1';
	  ggallmdt= MyApp.createServerTable({

	        "table":$("#ggalltable"),
	        "head":{
	            "columnMap":{"ggbt":wlxtlang_gonggaobiaoti,"fbz":wlxtlang_fabuzhe,"fbsj":wlxtlang_fabushijian}//"ggbt":"公告标题","fbz":"发布者","fbsj":"发布时间"
	        },
	        "body":{
	        	   
	            "columnsDIY":{
	                  "ggbt": { "mDataProp":  function(data, type, full, meta) {
	                	  if(data!=null){
	             			 $("#ggdiv").removeClass("hidden")
	             		 }
	         	        
	                	  var emp="";var newIcon="";
	                  	if (data.sfqd == 1) {
	                  		emp='<img src="/res/app/wlxt/img/important.png" alt="" />'
	                  	 }
	                  	if(data.ydsj==""){
	                  		 newIcon='<img src="/res/app/wlxt/img/new.gif" alt="" />'
	                  	}
	                      return '<a type="td_title" href="/f/wlxt/kcgg/wlkc_ggb/student/beforeViewXs?wlkcid=' + data.wlkcid + '&id=' + data.ggid + '">'+data.bt+'</a>'+newIcon+emp ;
	            } ,"bSortable": true,
                "oldName": "bt"
                },
	                "fbz": 
	                     { "mDataProp": "fbr","bSortable": true,
	                    "oldName": "fbz","sWidth": "121" },
	                    
	                "fbsj": { "mDataProp": "fbsj" ,"bSortable": true,
	                    "oldName": "fbsj","sWidth": "121"},
	            }
	        },
	        "url":ggurl,
	        "getId":function(row){
	            return row.wlkcid;
	        },
	        "sortAble":"kcm,xnxq,jsmc,",//此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
	        "settings":{
	            "iDisplayLength":3,"oLanguage":{
	            	"sProcessing" : "正在获取数据，请稍候...",
                    "sLengthMenu" : "每页显示 _MENU_ ",
                    "sZeroRecords" : "没有您要搜索的内容",
                    "sInfo" : wlxtlang_gongyoushuju,//wlxtlang_gongyoushuju,
                    "sInfoEmpty" : "0",
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                    "sInfoPostFix" : "",
                    "sSearch" : "搜索",
                    "sUrl" : "",
                    "oPaginate": {
                        //"sFirst" : "第一页",
                        //"sPrevious" : "上一页",
                        //"sNext" : "下一页",
                        //"sLast" : "最后一页"
                
                    	},
	            },
	        },
	        "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}],
	       /* "callBackDIY":function(){
            	if($("#table tbody [role='row']").size()>0){
            		$("#tabbox ul >li.active > ul > .deleteAllKjfl").show();
            	}else{
            		$("#tabbox ul >li.active > ul > .deleteAllKjfl").hide();
            	}
            }*/

	    });
	  
}

//编辑
function kjbeforeEdit(kjid,kjflid){
    window.location.href = "/f/wlxt/kj/wlkc_kjxxb/teacher/beforeEdit?id="+kjid+"&current="+kjflid;

}
/*课件搜索*/
var kjallmdt;
function kjall(){
	 //数据url
    var KjUrl="/b/wlxt/kc/v_kjxxb_wjwjb_search/xspageList?v=1";
    var dataTable;
    //初始化表格
        kjallmdt= MyApp.createServerTable({
        	
            "table":$("#kjalltable"),
            "head":{
            	"columnMap":{"wz":wlxtlang_xuhao,"bt":wlxtlang_biaoti,"wjlx":wlxtlang_wenjianleixinghanzi,"wjdx":wlxtlang_fujiandaxiao,"scsj":wlxtlang_fabushijian}//{"wz":"序号","bt":"标题","wjlx":"文件类型","wjdx":"附件大小","scsj":"发布时间"}
            },
            "body":{
            	"control": function(data) {
            		  return    '<a  href="javascript:void(0)" onclick="download_kj(\'' + data.wjid + '\')"  class="download btn " wjid=' + data.wjid + ' kjxxid=' + data.kjxxid + '     style="margin-right: 6px;"><i class="webicon-download " style="padding-right: 5px;"></i>'+wlxtlang_xiazai+'</a>' +
                      '<a href="/f/wlxt/kj/wlkc_kjxxb/student/beforePageList?wlkcid='+data.wlkcid+'&kjxxid='+data.kjxxid+'&sfgk=0"  class="btn  play" style="margin-right: 6px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_bofangfujian+'</a>'
                },
                "columnsDIY":{
                    "bt":{
                            "mDataProp":function(row, type, full, meta){
                            	 if(row!=null){
            	        			 $("#kjdiv").removeClass("hidden")
            	        		 }
                            	kjnum = meta.row+1;
                            	var sfqd = false;
                            	if(row.sfqd=='0'){
                            		sfqd = false;
                            	}else{
                            		sfqd = true;
                            	}
                            	
                            	return tosubstr({
                            		bt:row.bt,
                            		sfqd:sfqd,
                            		version:1,
                            		detailUrl:'/f/wlxt/kj/wlkc_kjxxb/student/beforePageList?wlkcid='+row.wlkcid+'&kjxxid='+row.kjxxid+'&sfgk=0' 
                            	});
                                
                            },
                             "sWidth" : "400",
                             "bSortable" : true,
                            "oldName":"bt" //如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。
                        },
                        

                    "wz":{
                        "sWidth" : "50",
                        "mDataProp":function (row) {
                            return row.wz;
                        },
                        "bSortable":true,
                        "oldName":"wz"//真正的排序字段
                    },
                    "wjlx":{
                        "sWidth" : "80",
                        "mDataProp":function (row) {
                            return row.wjlx;
                        },
                        "bSortable":true,
                        "oldName":"wjlx"//真正的排序字段
                    }
                    ,
                    "wjdx":{
                        "sWidth" : "80",
                        "mDataProp":function (row) {
                        	 File_size = row.wjdx;
                             if (File_size < 1024) {
                                 return File_size = File_size + 'B';
                             } else if (File_size >= 1024 && File_size < 1024 * 1024) {
                                 return File_size = (File_size / 1024).toFixed(2) + 'KB';
                             } else {
                                 return File_size = (File_size / 1024 / 1024).toFixed(2) + 'MB';
                             }
                        },
                        "bSortable":true,
                        "oldName":"wjdx"//真正的排序字段
                    }
                    ,
                    "scsj":{
                        "sWidth" : "120",
                        "mDataProp":function (row) {
                            return row.scsj;
                        },
                        "bSortable":true,
                        "oldName":"scsj"//真正的排序字段
                    }

                }

            },
            "url":KjUrl,
            "getId":function(row){
                return row.wjid;
            },
            "defaultSort":{"asc":"wjid"},//function 的列不能排序 roleId
            "sortAble":"",//此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
            "settings":{
                "iDisplayLength":3,"oLanguage":{
                	"sProcessing" : "正在获取数据，请稍候...",
                    "sLengthMenu" : "每页显示 _MENU_ ",
                    "sZeroRecords" : "没有您要搜索的内容",
                    "sInfo" : wlxtlang_gongyoushuju,
                    "sInfoEmpty" : "0",
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                    "sInfoPostFix" : "",
                    "sSearch" : "搜索",
                    "sUrl" : "",
                    "oPaginate": {
                        //"sFirst" : "第一页",
                        //"sPrevious" : "上一页",
                        //"sNext" : "下一页",
                        //"sLast" : "最后一页"
                
                    	},
                },
            },
            "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]
            
        });
}
  
function delById(id){
	Modal({
        type: "confirm",
        content: "删除后讨论贴及所有回复信息也将删除",
	    contentDetail: "确定要删除吗？",
        okfn: function() {
            var delDataUrl = "/b/wlxt/bbs/bbs_tltb/teacher/delById";
			$.post(delDataUrl,{id:id},function(data){
				if(data.result == 'success'){
			    	Modal({ 
			    		type: data.result, 
			    		content: data.msg,
				    	okfn: function() {
							dataTable.fnDraw();
			            }
			        });
				}else{
					Modal({
			            type: "regest",
			            content: data.msg, 
			            contentDetail: " " 
			        })
				}
			});
        },
        cancelfn: function() {

        }
    })
}
/**作业列表刷新*/
var zyallmdt;
function zyall(){
	var zyurl= "/b/kc/v_xszy_search/student/pageList?v=1";
    zyallmdt= MyApp.createServerTable({
        "table":$("#zyalltable"),
        "head":{
        	 "columnMap":{"wz":wlxtlang_xuhao,"bt":wlxtlang_zuoyetimu,"zywcfs":wlxtlang_wanchengfangshi,"jzsjStr":wlxtlang_jiezhiriqi,"jzsj":wlxtlang_jiezhidaojishi,"scsjStr":wlxtlang_tijiaoriqi,"jsm":wlxtlang_piyuejiaoshi,"pysjStr":wlxtlang_piyueriqi,"cj":wlxtlang_chengji}
        },
        "body":{
         	  "control":function(row){
         	  if(row.zt=="已交" &&  row.pyzt !="已批改"|| row.pyzt =="未批改" || row.pyzt == "未批阅"){
            	   var time=row.jzsj-now.getTime();
                   	if(time<=0){
                   	 return '<a   class="btn reviewBtn disabled" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
                   	}
                  	 return '<a href="/f/wlxt/kczy/zy/student/tijiao?wlkcid='+wlkcid+'&xszyid=' + row.xszyid + '" class="btn reviewBtn" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
         	  }else if(row.zt=="未交"){
         		  var time=row.jzsj-now.getTime();
                 	if(time<=0){
                 	 return '<a  class="btn reviewBtn disabled" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
                 	}
                 	 return '<a href="/f/wlxt/kczy/zy/student/tijiao?wlkcid='+wlkcid+'&xszyid=' + row.xszyid + '" class="btn reviewBtn" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
         	  }else if(row.pyzt=="已批改"){
         		  return '<a href="/f/wlxt/kczy/zy/student/viewCj?wlkcid='+wlkcid+'&xszyid=' + row.xszyid + '" class="btn reviewBtn" style="margin-right: 6px;"><i class="webicon-edit" style="padding-right: 5px;"></i>'+wlxtlang_chakanpiyue+'</a>  ';
         	   }
         	  },
         	 "columnsDIY":{
          		 "wz":{
            		 "mDataProp": function(row) {
	                        return row.wz + 1;
	                    },
	                    "sWidth": "28"
                 },
          		"bt":{
                   "mDataProp":function(row){
                   	 if(row!=null){
   	        			 $("#zydiv").removeClass("hidden")
   	        		 }
                   	 if(row.zt=="已交" &&  row.pyzt !="已批改" || row.pyzt =="未批改" || row.pyzt == "未批阅"){  // 已交未改
                   		 return '<a href="/f/wlxt/kczy/zy/student/viewTj?wlkcid='+wlkcid+'&zyid='+row.zyid+'&xszyid=' + row.xszyid + '" >'+row.bt+'</a>  '; 
                   	 }else if(row.zt=="未交"){
                   		 return '<a href="/f/wlxt/kczy/zy/student/viewZy?wlkcid='+wlkcid+'&zyid='+row.zyid+'&xszyid=' + row.xszyid + '" >'+row.bt+'</a>  ';
                   	 }else if(row.pyzt=="已批改"){
                   		 return '<a href="/f/wlxt/kczy/zy/student/viewCj?wlkcid='+wlkcid+'&zyid='+row.zyid+'&xszyid=' + row.xszyid + '" >'+row.bt+'</a>  ';
                   	 }
                   },
                   "sWidth": "200",
                    "bSortable" : true,
                    "oldName" : "bt"
               },
               "pysjStr":{
            	   "mDataProp":function(row){
            		   return row.pysjStr;
            	   },
            	   "sWidth": "90",
                   "oldName" : "jzsjStr"
               },
               "jzsjStr":{
            	   "mDataProp":function(row){
            		   return row.jzsjStr;
            	   },
            	   "sWidth": "90",
                   "oldName" : "jzsjStr"
               },
               "scsjStr":{
            	   "mDataProp":function(row){
            		   return row.scsjStr;
            	   },
            	   "sWidth": "90",
                   "oldName" : "scsjStr"
               },
               "jsm" :{
            	   "mDataProp":function(row){
            		   return row.jsm;
            	   },
            	   "sWidth": "60",
                   "bSortable" : true,
                   "oldName" : "jsm"
               },
      		 "zywcfs":{
               "mDataProp":function(row){
               	if(row.zywcfs==2){
               		 return wlxtlang_zu;//"组";
               	}else{
               		 return wlxtlang_geren;//"个人";
               	}
               },
               "sWidth": "80",
                "bSortable" : true,
                "oldName" : "zywcfs"
           },
           "jzsj":{
               "mDataProp":function(row){
              	 var time=row.jzsj-now.getTime();
              	 var days=Math.ceil(time/86400000);
                 var wlxtlang_shengyutianshu1 = wlxtlang_shengyutianshu.replace("{0}",days);
               	if(time<=0){
               		 return wlxtlang_yiguoqi;//'已过期';
               	}else if(time<=86400000){//多于7天
               		 return '<span style="color:#f50f40;">'+wlxtlang_shaoyuyitian+'</span>';
               	}else if(days<=3){

               		 return '<span style="color:#f50f40;">'+wlxtlang_shengyutianshu1+'</span>';//剩余多少天
               	}else if(days<=7){
              		 return '<span style="color:#ef7d03;">'+wlxtlang_shengyutianshu1+'</span>';//剩余多少天
               	}else{//多于7天
               		 return wlxtlang_shengyutianshu1;//"剩余"+days+"天";
               	}
               },
                "sWidth": "80",
                "bSortable" : true,
                "oldName" : "jzsj"
           },
           "cj":{
               "mDataProp":function(row){
              	if(row.cj>=0){
               		return row.cj;
               	}else{//已批改
						return row.djzcj;
               	}
               },
               "sWidth": "50",
                "bSortable" : true,
                "oldName" : "cj"
           }
      	 }
         },
           "url":zyurl,
           "getId":function(row){
               return row.zyid;
           },
           "defaultSort":{"desc":"wz"},//function 的列不能排序 roleId
           "settings":{
               "iDisplayLength":3,"oLanguage":{
               	"sProcessing" : "正在获取数据，请稍候...",
                   "sLengthMenu" : "每页显示 _MENU_ ",
                   "sZeroRecords" : "没有您要搜索的内容",
                   "sInfo" : wlxtlang_gongyoushuju,
                   "sInfoEmpty" : "0",
                   "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                   "sInfoPostFix" : "",
                   "sSearch" : "搜索",
                   "sUrl" : "",
                   "oPaginate": {
                       //"sFirst" : "第一页",
                       //"sPrevious" : "上一页",
                       //"sNext" : "下一页",
                       //"sLast" : "最后一页"
               
                   	},
               },
           },
         "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]
     });
} 
/**bbsurl 讨论列表刷新*/
var dataTable;
function bbsall(){
	var bbsurl= "/b/wlxt/bbs/v_bbs_tltb_all/xsbbspageListSearch?v=1";
    bbsallmdt= MyApp.createServerTable({
        "table":$("#bbsalltable"),
        "head":{
    		"columnMap":{"xh":wlxtlang_xuhao,"bt":wlxtlang_zhuti,"ftsj":wlxtlang_fatieshijian,"fbr":wlxtlang_fabiaoren,"hfs":wlxtlang_huifushu,"zhhfrxm":wlxtlang_zuixinhuifuren}
        },
        "body":{
             
            "columnsDIY":{
            	 "xh":{
            		 "mDataProp": function(row, type, full, meta) {
	                        return meta.row + 1;
	                    },
	                    "sWidth": "50"
                 },
                "bt":{
                	"mDataProp": function(data, type, full, meta) {
                		 if(data!=null){
    	        			 $("#tldiv").removeClass("hidden")
    	        		 }
     	    				var sfzd = '';
     	    				var jh = '';
     	    				if(data.sfjh!=null && data.sfjh=="是"){
     	    					jh = '<span class="jing">'+wlxtlang_jing+'</span>';
     	    				}
     	    				if (data.sfzd == '是') {
     	    					sfzd = '<span class="jing">'+wlxtlang_ding+'</span>';
                             } 
                             return tosubstr2({"bt":data.bt,"len":30,"detailUrl":"/f/wlxt/bbs/bbs_tltb/student/viewTlById?wlkcid=" + data.wlkcid + "&id=" + data.id +'&tabbh=' + "&bqid=" + data.bqid}) + sfzd + jh;
     	                },
	                "sWidth": "250",
	                "oldName":"bt" //如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。
                    },
                 "ftsj":{
                	 "mDataProp": "fbsj","sWidth": "121"
                 },
                 "fbr":{
                	 "mDataProp": "fbrxm","sWidth": "50"
                 },
                 "hfs":{
                	 "mDataProp": "hfcs","sWidth": "50"
                 },
                 "zhhfrxm":{
                	 "mDataProp": "zhhfrxm","sWidth": "80"
                 },
                  
            }
        },
        "url":bbsurl,
        "getId":function(row){
            return row.id;
        },
        "defaultSort":{"desc":"wz"},//function 的列不能排序 roleId
        "settings":{
            "iDisplayLength":3,"oLanguage":{
            	"sProcessing" : "正在获取数据，请稍候...",
                "sLengthMenu" : "每页显示 _MENU_ ",
                "sZeroRecords" : "没有您要搜索的内容",
                "sInfo" : wlxtlang_gongyoushuju,
                "sInfoEmpty" : "0",
                "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                "sInfoPostFix" : "",
                "sSearch" : "搜索",
                "sUrl" : "",
                "oPaginate": {
                    //"sFirst" : "第一页",
                    //"sPrevious" : "上一页",
                    //"sNext" : "下一页",
                    //"sLast" : "最后一页"
            
                	},
            },
        },
        "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]
    });
}
/**dyall 答疑刷新列表*/
var dataTable;
function dyall(){
	var dyurl = '/b/wlxt/bbs/v_bbs_tltb_all/xsdypageList?v=1'; 
	    dyallmdt= MyApp.createServerTable({
	        "table":$("#dyalltable"),
	        "head":{
	    		"columnMap":{"xh":wlxtlang_xuhao,"bt":wlxtlang_biaoti,"twsj":wlxtlang_tiwenshijian,"hdsj":wlxtlang_huidahsijian}
	        },
	        "body":{
	        	"control": function(data) {
    				var _delBtn = '';
    				if(data.fbr=userid && data.zhhfr==""){
    					var tabid = 1;
    				//	var _editBtn = '<a href="/f/wlxt/bbs/bbs_kcdy/student/beforeEditDy?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" class="btn" style="margin-right: 3px;"><i class="webicon-edit" style="padding-right: 5px;"></i>修改</a>';
    					var _viewBtn = '<a class="btn" href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" style="margin-right: 3px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_chakan+'</a>';
    					_delBtn = ' <a  class="btn" href="javascript:void(0);" onclick="del(\''+data.id+'\','+data.hfcs+');" class="btn"><i class="webicon-delete" style="padding-right: 5px;"></i>'+wlxtlang_shanchu+'</a>';
    					return _viewBtn + _delBtn;
    				} 
    				if(data.fbr!= data.zhhfr && data.sfjh=="是"){
    					var tabid = 3;
    					var _viewBtn = '<a class="btn" href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" style="margin-right: 3px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_chakan+'</a>';
    					return _viewBtn;
    				}
    				if(data.fbr!= data.zhhfr ){
    					var tabid = 2;
    					var _viewBtn = '<a class="btn" href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" style="margin-right: 3px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_chakan+'</a>';
    					return _viewBtn;
    				}
    				 
	            },
	            "columnsDIY":{
	            	 "xh":{
	            		 "mDataProp": function(row, type, full, meta) {
		                        return meta.row + 1;
		                    },
		                    "sClass": "order",
		                    "sWidth": "50"
	                 },
	                "bt":{
	                    "mDataProp": function(data, type, full, meta) {
	                    	 if(data!=null){
	    	        			 $("#dydiv").removeClass("hidden")
	    	        		 }
	                    	 if(data.fbr=userid && data.zhhfr==""){
		        					var tabid = 1;
		                    	}
		                    	if(data.fbr!= data.zhhfr ){
		        					var tabid = 2;
		                    	}
		                    	if(data.fbr!= data.zhhfr && data.sfjh=="是"){
		        					var tabid = 3;
		                    	}
	        				var jj = '';
	        				if(data.sfjh!=null && data.sfjh=="是"){
	        					jj = '<span class="jing">'+wlxtlang_jijin+'</span>';
	        				}
	                    	return '<a href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" type="td_title">'+  data.bt + '</a>' + jj;
	                    },
	                    "sWidth": "380",
	                    "oldName":"bt" //如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。
	                },
	                 "twsj":{
	                	 "mDataProp": "fbsj","sWidth": "180"
	                 },
	                 "hdsj":{
	                	 "mDataProp": "zhhfsj","sWidth": "180"
	                 },
	                  
	            }
	        },
	        "url":dyurl,
	        "getId":function(row){
	            return row.id;
	        },
	        "defaultSort":{"desc":"wz"},//function 的列不能排序 roleId
	        "settings":{
	            "iDisplayLength":3,"oLanguage":{
	            	"sProcessing" : "正在获取数据，请稍候...",
                    "sLengthMenu" : "每页显示 _MENU_ ",
                    "sZeroRecords" : "没有您要搜索的内容",
                    "sInfo" : wlxtlang_gongyoushuju,
                    "sInfoEmpty" : "0",
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                    "sInfoPostFix" : "",
                    "sSearch" : "搜索",
                    "sUrl" : "",
                    "oPaginate": {
                        //"sFirst" : "第一页",
                        //"sPrevious" : "上一页",
                        //"sNext" : "下一页",
                        //"sLast" : "最后一页"
                
                    	},
	            },
	        },
	     "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}] 
	    });
}
 
// 格式化时间戳
function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}

//搜索
function courseinsideSearch(){
	ggallmdt.search();
	kjallmdt.search();
	zyallmdt.search();
	bbsallmdt.search();
	dyallmdt.search();
}
/*公告列表查询*/
function ggsearchlist(){
	var dataTable;
	var ggurl = '/b/wlxt/kcgg/wlkc_ggb/student/pageListXsSearch';
	  ggmdt= MyApp.createServerTable({

	        "table":$("#examplesearch"),
	        "head":{
	            "columnMap":{"ggbt":wlxtlang_gonggaobiaoti,"fbz":wlxtlang_fabuzhe,"fbsj":wlxtlang_fabushijian}
	        },
	        
	        "body":{
	        	   
	            "columnsDIY":{
	                  "ggbt": { "mDataProp":  function(data, type, full, meta) {
	                	  var emp="";var newIcon="";
	                  	if (data.sfqd == 1) {
	                  		emp='<img src="/res/app/wlxt/img/important.png" alt="" />'
	                  	 }
	                  	if(data.ydsj==""){
	                  		 newIcon='<img src="/res/app/wlxt/img/new.gif" alt="" />'
	                  	}
	                      return '<a type="td_title" href="/f/wlxt/kcgg/wlkc_ggb/student/beforeViewXs?wlkcid=' + data.wlkcid + '&id=' + data.ggid + '">'+data.bt+'</a>'+newIcon+emp ;
	            } ,"bSortable": true,
                "oldName": "bt"
                },
	                "fbz": 
	                     { "mDataProp": "fbr","bSortable": true,
	                    "oldName": "fbz","sWidth": "121" },
	                    
	                "fbsj": { "mDataProp": "fbsj" ,"bSortable": true,
	                    "oldName": "fbsj","sWidth": "121"},
	            }
	        },
	        "url":ggurl,
	        "getId":function(row){
	            return row.wlkcid;
	        },
	        "sortAble":"kcm,xnxq,jsmc,",//此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
	        "settings":{
	            "iDisplayLength":20,"oLanguage":{
	            	"sProcessing" : "正在获取数据，请稍候...",
                    "sLengthMenu" : wlxtlang_meiyexianshi+" _MENU_ ",
                    "sZeroRecords" : wlxtlang_meiyouninyaosousuodeneirong,//,
                    "sInfo" : wlxtlang_gongyoushuju,
                    "sInfoEmpty" : wlxtlang_zanwushuju,//,
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                    "sInfoPostFix" : "",
                    "sSearch" : "搜索",
                    "sUrl" : "",
                    "oPaginate": {
                        //"sFirst" : "第一页",
                        //"sPrevious" : "上一页",
                        //"sNext" : "下一页",
                        //"sLast" : "最后一页"
                
                    	},
	            },
	        },
	        "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]

	    });
}
function kjsearchlist(){
	 //数据url
    var KjUrl="/b/wlxt/kc/v_kjxxb_wjwjb_search/xspageList";
    var dataTable;
    //初始化表格
        kjmdt= MyApp.createServerTable({
        	
            "table":$("#examplesearch"),
            "head":{
            	"columnMap":{"wz":wlxtlang_xuhao,"bt":wlxtlang_biaoti,"wjlx":wlxtlang_wenjianleixinghanzi,"wjdx":wlxtlang_fujiandaxiao,"scsj":wlxtlang_fabushijian}
            },
            "body":{
               /* "checkBox":'<input type="checkbox" class="checkboxes" name="username"  value="_ID_" />',*/
            	"control": function(data) {
                    return    '<a  href="javascript:void(0)" onclick="download_kj(\'' + data.wjid + '\')"  class="download btn " wjid=' + data.wjid + ' kjxxid=' + data.kjxxid + '     style="margin-right: 6px;"><i class="webicon-download " style="padding-right: 5px;"></i>'+wlxtlang_xiazai+'</a>' +
                     '<a href="/f/wlxt/kj/wlkc_kjxxb/student/beforePageList?wlkcid='+data.wlkcid+'&kjxxid='+data.kjxxid+'&sfgk=0"  class="btn  play" style="margin-right: 6px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_bofangfujian+'</a>'
                },
                "columnsDIY":{
                    "bt":{
                            "mDataProp":function(row){
                            	var sfqd = false;
                            	if(row.sfqd=='0'){
                            		sfqd = false;
                            	}else{
                            		sfqd = true;
                            	}
                            	
                            	return tosubstr({
                            		bt:row.bt,
                            		sfqd:sfqd,
                            		detailUrl:'/f/wlxt/kj/wlkc_kjxxb/student/beforePageList?wlkcid='+row.wlkcid+'&kjxxid='+row.kjxxid+'&sfgk=0'
                            	});
                                
                            },
                             "sWidth" : "350",
                             "bSortable" : true,
                            "oldName":"bt" //如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。
                        },
                        

                    "wz":{
                        "sWidth" : "45",
                        "mDataProp":function (row) {
                            return row.wz;
                        },
                        "bSortable":true,
                        "oldName":"wz"//真正的排序字段
                    },
                    "wjlx":{
                        "sWidth" : "100",
                        "mDataProp":function (row) {
                            return row.wjlx;
                        },
                        "bSortable":true,
                        "oldName":"wjlx"//真正的排序字段
                    }
                    ,
                    "wjdx":{
                        "sWidth" : "100",
                        "mDataProp":function (row) {
                        	 File_size = row.wjdx;
                             if (File_size < 1024) {
                                 return File_size = File_size + 'B';
                             } else if (File_size >= 1024 && File_size < 1024 * 1024) {
                                 return File_size = (File_size / 1024).toFixed(2) + 'KB';
                             } else {
                                 return File_size = (File_size / 1024 / 1024).toFixed(2) + 'MB';
                             }
                        },
                        "bSortable":true,
                        "oldName":"wjdx"//真正的排序字段
                    }
                    ,
                    "scsj":{
                        "sWidth" : "150",
                        "mDataProp":function (row) {
                            return row.scsj;
                        },
                        "bSortable":true,
                        "oldName":"scsj"//真正的排序字段
                    }

                }

            },
            "url":KjUrl,
            "getId":function(row){
                return row.wjid;
            },
            "defaultSort":{"asc":"wjid"},//function 的列不能排序 roleId
            "sortAble":"",//此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
            "settings":{
                "iDisplayLength":20,"oLanguage":{	"sProcessing" : "正在获取数据，请稍候...",
                    "sLengthMenu" : wlxtlang_meiyexianshi+" _MENU_ ",
                    "sZeroRecords" : wlxtlang_meiyouninyaosousuodeneirong,//,
                    "sInfo" : wlxtlang_gongyoushuju,
                    "sInfoEmpty" : wlxtlang_zanwushuju,//,
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                    "sInfoPostFix" : "",
                    "sSearch" : "搜索",
                    "sUrl" : "",
                    "oPaginate": {
                        //"sFirst" : "第一页",
                        //"sPrevious" : "上一页",
                        //"sNext" : "下一页",
                        //"sLast" : "最后一页"
                
                    	},},
            },
            "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]
            
        });
}
 /*下载课件*/
 function download_kj(wjid){
	    	$.ajax({
	    		url:'/b/wlxt/kj/wlkc_kjxxb/student/downloadFileBefore',
	    		data:{ 
	    			wjid:wjid
	    		},
	    		type:'get',
	    		dataType:'json',
	    		success:function(data){
	    			if("success"==data.result){
	    				window.location.href="/b/wlxt/kj/wlkc_kjxxb/student/downloadFile?sfgk=0&wjid="+wjid;
	    			}else{
	    				Modal({ type: "regest", content: data.msg,css: "one",  //默认  '操作失败'
				            okfn: function() {
				            }, });
	    			}
	    		},
	    		error:function(){
	    			Modal({ type: "regest", content: wlxtlang_wenjianxiazaishibai, css: "one", //默认  '操作失败'
			            okfn: function() {
			            }, });
	    		}
	    	});
 } 

/**作业列表刷新*/

function zysearchlist(){
	var zyurl= "/b/kc/v_xszy_search/student/pageList";
    zymdt= MyApp.createServerTable({
        "table":$("#examplesearch"),
        "head":{
       	 "columnMap":{"wz":wlxtlang_xuhao,"bt":wlxtlang_zuoyetimu,"zywcfs":wlxtlang_wanchengfangshi,"jzsjStr":wlxtlang_jiezhiriqi,"jzsj":wlxtlang_jiezhidaojishi,"scsjStr":wlxtlang_tijiaoriqi,"jsm":wlxtlang_piyuejiaoshi,"pysjStr":wlxtlang_piyueriqi,"cj":wlxtlang_chengji}
       },
       "body":{
       	  "control":function(row){
       	  if(row.zt=="已交" &&  row.pyzt !="已批改"|| row.pyzt =="未批改" || row.pyzt == "未批阅"){
          	   var time=row.jzsj-now.getTime();
                 	if(time<=0){
                 	 return '<a   class="btn reviewBtn disabled" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
                 	}
                	 return '<a href="/f/wlxt/kczy/zy/student/tijiao?wlkcid='+wlkcid+'&xszyid=' + row.xszyid + '" class="btn reviewBtn" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
       	  }else if(row.zt=="未交"){
       		  var time=row.jzsj-now.getTime();
               	if(time<=0){
               	 return '<a  class="btn reviewBtn disabled" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
               	}
               	 return '<a href="/f/wlxt/kczy/zy/student/tijiao?wlkcid='+wlkcid+'&xszyid=' + row.xszyid + '" class="btn reviewBtn" style="margin-right: 6px;"><i class="webicon-edit" style=""></i>'+wlxtlang_tijiaozuoye+'</a>  ';
       	  }else if(row.pyzt=="已批改"){
       		  return '<a href="/f/wlxt/kczy/zy/student/viewCj?wlkcid='+wlkcid+'&xszyid=' + row.xszyid + '" class="btn reviewBtn" style="margin-right: 6px;"><i class="webicon-edit" style="padding-right: 5px;"></i>'+wlxtlang_chakanpiyue+'</a>  ';
       	   }
       	  },
          	 "columnsDIY":{
          		 "wz":{
            		 "mDataProp": function(row) {
	                        return row.wz + 1;
	                    },
	                    "sWidth": "28"
                 },
          		"bt":{
                   "mDataProp":function(row){
                   	 if(row!=null){
   	        			 $("#zydiv").removeClass("hidden")
   	        		 }
                   	 if(row.zt=="已交" &&  row.pyzt !="已批改" || row.pyzt =="未批改" || row.pyzt == "未批阅"){  // 已交未改
                   		 return '<a href="/f/wlxt/kczy/zy/student/viewTj?wlkcid='+wlkcid+'&zyid='+row.zyid+'&xszyid=' + row.xszyid + '" >'+row.bt+'</a>  '; 
                   	 }else if(row.zt=="未交"){
                   		 return '<a href="/f/wlxt/kczy/zy/student/viewZy?wlkcid='+wlkcid+'&zyid='+row.zyid+'&xszyid=' + row.xszyid + '" >'+row.bt+'</a>  ';
                   	 }else if(row.pyzt=="已批改"){
                   		 return '<a href="/f/wlxt/kczy/zy/student/viewCj?wlkcid='+wlkcid+'&zyid='+row.zyid+'&xszyid=' + row.xszyid + '" >'+row.bt+'</a>  ';
                   	 }
                   },
                   "sWidth": "200",
                    "bSortable" : true,
                    "oldName" : "bt"
               },
               "pysjStr":{
            	   "mDataProp":function(row){
            		   return row.pysjStr;
            	   },
            	   "sWidth": "90",
                   "oldName" : "jzsjStr"
               },
               "jzsjStr":{
            	   "mDataProp":function(row){
            		   return row.jzsjStr;
            	   },
            	   "sWidth": "90",
                   "oldName" : "jzsjStr"
               },
               "scsjStr":{
            	   "mDataProp":function(row){
            		   return row.scsjStr;
            	   },
            	   "sWidth": "90",
                   "oldName" : "scsjStr"
               },
               "jsm" :{
            	   "mDataProp":function(row){
            		   return row.jsm;
            	   },
            	   "sWidth": "60",
                   "bSortable" : true,
                   "oldName" : "jsm"
               },
      		 "zywcfs":{
               "mDataProp":function(row){
               	if(row.zywcfs==2){
               		 return wlxtlang_zu;//"组";
               	}else{
               		 return wlxtlang_geren;//"个人";
               	}
               },
               "sWidth": "80",
                "bSortable" : true,
                "oldName" : "zywcfs"
           },
           "jzsj":{
               "mDataProp":function(row){
              	 var time=row.jzsj-now.getTime();
              	 var days=Math.ceil(time/86400000);
                   var wlxtlang_shengyutianshu2 = wlxtlang_shengyutianshu.replace("{0}",days);
               	if(time<=0){
               		 return wlxtlang_yiguoqi;//'已过期';
               	}else if(time<=86400000){//多于7天
               		 return '<span style="color:#f50f40;">'+wlxtlang_shaoyuyitian+'</span>';
               	}else if(days<=3){
               		 return '<span style="color:#f50f40;">'+wlxtlang_shengyutianshu2+'</span>';//'剩余'+days+'天
               	}else if(days<=7){
              		 return '<span style="color:#ef7d03;">'+wlxtlang_shengyutianshu2+'</span>';
               	}else{//多于7天
               		 return wlxtlang_shengyutianshu2;//"剩余"+days+"天";
               	}
               },
                "sWidth": "80",
                "bSortable" : true,
                "oldName" : "jzsj"
           },
           "cj":{
               "mDataProp":function(row){
              	if(row.cj>=0){
               		return row.cj;
               	}else{//已批改
						return row.djzcj;
               	}
               },
               "sWidth": "50",
                "bSortable" : true,
                "oldName" : "cj"
           }
      	 }
         },
         "url":zyurl,
         "getId":function(row){
             return row.zyid;
         },
         "defaultSort":{"desc":"wz"},//function 的列不能排序 roleId
         "settings":{
             "iDisplayLength":20,"oLanguage":{
             	"sProcessing" : "正在获取数据，请稍候...",
                 "sLengthMenu" : wlxtlang_meiyexianshi+" _MENU_ ",
                 "sZeroRecords" : wlxtlang_meiyouninyaosousuodeneirong,//,
                 "sInfo" : wlxtlang_gongyoushuju,
                 "sInfoEmpty" : "0",
                 "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                 "sInfoPostFix" : "",
                 "sSearch" : "搜索",
                 "sUrl" : "",
                 "oPaginate": {
                     //"sFirst" : "第一页",
                     //"sPrevious" : "上一页",
                     //"sNext" : "下一页",
                     //"sLast" : "最后一页"
             
                 	},
             },
         },
       "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]
   });
}   
/**讨论列表刷新*/
function bbssearchlist(){
	var bbsurl= "/b/wlxt/bbs/v_bbs_tltb_all/xsbbspageListSearch";
    bbsmdt= MyApp.createServerTable({
        "table":$("#examplesearch"),
        "head":{
    		"columnMap":{"xh":wlxtlang_xuhao,"bt":wlxtlang_zhuti,"fbr":wlxtlang_fabiaoren,"fbsj":wlxtlang_fatieshijian,"hfs":wlxtlang_huifushu,"zhhfrxm":wlxtlang_zuixinhuifuren}
        },
        "body":{
            
            "columnsDIY":{
            	 "xh":{
            		 "mDataProp": function(row, type, full, meta) {
	                        return meta.row + 1;
	                    },
	                    "sWidth": "50"
                 },
                "bt":{
                	"mDataProp": function(data, type, full, meta) {
	    				var sfzd = '';
	    				var jh = '';
	    				if(data.sfjh!=null && data.sfjh=="是"){
	    					jh = '<span class="jing">'+wlxtlang_jing+'</span>';
	    				}
	    				if (data.sfzd == '是') {
	    					sfzd = '<span class="jing">'+wlxtlang_ding+'</span>';
                        } 
                        return tosubstr2({"bt":data.bt,"len":30,"detailUrl":"/f/wlxt/bbs/bbs_tltb/student/viewTlById?wlkcid=" + data.wlkcid + "&id=" + data.id + '&tabbh=' +"&bqid=" + data.bqid}) + sfzd + jh;
	                },
	                "sWidth": "250",
	                "oldName":"bt" //如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。
                    },
                 "fbsj":{
                	 "mDataProp": "fbsj","sWidth": "80"
                 },
                 "fbr":{
                	 "mDataProp": "fbrxm","sWidth": "80"
                 },
                 "hfs":{
                	 "mDataProp": "hfcs","sWidth": "80"
                 },
                 "zhhfrxm":{
                	 "mDataProp": "zhhfrxm","sWidth": "80"
                 },
                  
            }
        },
        "url":bbsurl,
        "getId":function(row){
            return row.id;
        },
        "defaultSort":{"desc":"wz"},//function 的列不能排序 roleId
        "settings":{
            "iDisplayLength":20,"oLanguage":{	"sProcessing" : "正在获取数据，请稍候...",
                "sLengthMenu" : wlxtlang_meiyexianshi+" _MENU_ ",
                "sZeroRecords" : wlxtlang_meiyouninyaosousuodeneirong,//,
                "sInfo" : wlxtlang_gongyoushuju,
                "sInfoEmpty" : wlxtlang_zanwushuju,//,
                "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                "sInfoPostFix" : "",
                "sSearch" : "搜索",
                "sUrl" : "",
                "oPaginate": {
                    //"sFirst" : "第一页",
                    //"sPrevious" : "上一页",
                    //"sNext" : "下一页",
                    //"sLast" : "最后一页"
            
                	},},
        },
        "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]
    });
}
/**答疑刷新列表*/
function dysearchlist(){
	var dyurl = '/b/wlxt/bbs/v_bbs_tltb_all/xsdypageList';
	    dymdt= MyApp.createServerTable({
	        "table":$("#examplesearch"),
	        "head":{
	    		"columnMap":{"xh":wlxtlang_xuhao,"bt":wlxtlang_biaoti,"twsj":wlxtlang_tiwenshijian,"hdsj":wlxtlang_huidahsijian}
	        },
	        "body":{
	        	"control": function(data) {
    				var _delBtn = '';
    				if(data.fbr=userid && data.zhhfr==""){
    					var tabid = 1;
    				//	var _editBtn = '<a href="/f/wlxt/bbs/bbs_kcdy/student/beforeEditDy?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" class="btn" style="margin-right: 3px;"><i class="webicon-edit" style="padding-right: 5px;"></i>修改</a>';
    					var _viewBtn = '<a class="btn" href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" style="margin-right: 3px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_chakan+'</a>';
    					_delBtn = ' <a  class="btn" href="javascript:void(0);" onclick="del(\''+data.id+'\','+data.hfcs+');" class="btn"><i class="webicon-delete" style="padding-right: 5px;"></i>'+wlxtlang_shanchu+'</a>';
    					return _viewBtn + _delBtn;
    				} 
    				if(data.fbr!= data.zhhfr && data.sfjh=="是"){
    					var tabid = 3;
    					var _viewBtn = '<a class="btn" href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" style="margin-right: 3px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_chakan+'</a>';
    					return _viewBtn;
    				}
    				if(data.fbr!= data.zhhfr ){
    					var tabid = 2;
    					var _viewBtn = '<a class="btn" href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" style="margin-right: 3px;"><i class="webicon-display" style="padding-right: 5px;"></i>'+wlxtlang_chakan+'</a>';
    					return _viewBtn;
    				}
    				 
	            },
	            "columnsDIY":{
	            	 "xh":{
	            		 "mDataProp": function(row, type, full, meta) {
		                        return meta.row + 1;
		                    },
		                    "sClass": "order",
		                    "sWidth": "50"
	                 },
	                "bt":{
	                    "mDataProp": function(data, type, full, meta) {
	                    	if(data.fbr=userid && data.zhhfr==""){
	        					var tabid = 1;
	                    	}
	                    	if(data.fbr!= data.zhhfr ){
	        					var tabid = 2;
	                    	}
	                    	if(data.fbr!= data.zhhfr && data.sfjh=="是"){
	        					var tabid = 3;
	                    	}
	        				var jj = '';
	        				if(data.sfjh!=null && data.sfjh=="是"){
	        					jj = '<span class="jing">'+wlxtlang_jijin+'</span>';
	        				}
	                    	return '<a href="/f/wlxt/bbs/bbs_kcdy/student/viewDyById?wlkcid=' + data.wlkcid + '&id=' + data.id + '&tabid=' + tabid + '" type="td_title">'+  data.bt + '</a>' + jj;
	                    },
	                    "sWidth": "250",
	                    "oldName":"bt" //如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。
	                },
	                 "twsj":{
	                	 "mDataProp": "fbsj","sWidth": "200"
	                 },
	                 "hdsj":{
	                	 "mDataProp": "zhhfsj","sWidth": "200"
	                 },
	                  
	            }
	        },
	        "url":dyurl,
	        "getId":function(row){
	            return row.id;
	        },
	        "defaultSort":{"desc":"wz"},//function 的列不能排序 roleId
	        "settings":{
	            "iDisplayLength":20,"oLanguage":{	"sProcessing" : "正在获取数据，请稍候...",
                    "sLengthMenu" : wlxtlang_meiyexianshi+" _MENU_ ",
                    "sZeroRecords" : wlxtlang_meiyouninyaosousuodeneirong,//,
                    "sInfo" : wlxtlang_gongyoushuju,
                    "sInfoEmpty" : wlxtlang_zanwushuju,//,
                    "sInfoFiltered" : "(全部记录数 _MAX_ 条)",
                    "sInfoPostFix" : "",
                    "sSearch" : "搜索",
                    "sUrl" : "",
                    "oPaginate": {
                        //"sFirst" : "第一页",
                        //"sPrevious" : "上一页",
                        //"sNext" : "下一页",
                        //"sLast" : "最后一页"
                
                    	},},
	        },
	        "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]
	    });
}
 
var tabchange = function(i) { //模拟数据返回        课内搜索
    var data = { "tablist": [{ list: [{ title: wlxtlang_quanbu, count: allnum }, { title: wlxtlang_gonggao, count: ggnum }, { title: wlxtlang_wenjian, count: kjnum }, { title: wlxtlang_zuoye, count: zynum }, { title: wlxtlang_taolun, count: bbsnum }, { title: wlxtlang_dayi, count: dynum }, ] }],"tab":i,"con":searchvalue};
    var selfhtml = template('searchconspt', data);
    $("#searchcon").html(selfhtml);
    flushnum();
    if (i == 0) {
        $("#alltab").show();
        $("#other").hide();
        initall();
        allsearch();
        $(".dataTables_info").hide();
        $(".dataTables_length").hide();
        $(".dataTables_paginate").hide();
        return;
    }
    $("#alltab").hide();
    $("#other").show();
    if(i==1){
        ggsearchlist()
    	ggmdt.search();
    }
    if(i==2){
    	kjsearchlist()
    	kjmdt.search();
    }
    if(i==3){
    	zysearchlist()
    	zymdt.search();
    }
    if(i==4){
    	bbssearchlist()
    	bbsmdt.search();
    }
    if(i==5){
    	dysearchlist()
    	dymdt.search();
    }
    
    //computeHeight();

}
var seemore = function(dom, child) { //查看更多
    $(dom).on('click', '', function(event) {
        //debugger;
        var parentdom = $(this).parent()
        if ($(parentdom).hasClass('up')) {
            $(parentdom).removeClass('up');
            $(".zeromodal-container").css("height", '370px');
            isModal(".zeromodal-container", $(this));
            return;
        }
        $(parentdom).addClass('up');
        $(".zeromodal-container").css("height", '470px');

        isModal(".zeromodal-container", $(this));
        event.preventDefault();
        /* Act on the event */
    });
}

var isModal = function(dom, thisdom) {
    if ($(thisdom).parents(dom)) {
        _resizeBodyHeight($(thisdom).parents(".zeromodal-container").height());
    }

}
function del(id){
	var delDataUrl = "/b/wlxt/kcgg/wlkc_ggb/teacher/delete";
	$.post(delDataUrl,{id:id},function(data){
		Modal({ type: "success", content: data.msg });
		if(data.result == 'success'){
			dataTable.fnDraw();
		}
	});
}
function _resizeBodyHeight(height) {
    var headerHeight = 50;
    var buttonHeight = 60;
    var height = height - headerHeight - buttonHeight;
    $('.zeromodal-body').css('height', height);
}
var computeHeight = function() {
    /*debugger;*/
    var heighto = $("#searchpanel").outerHeight(true); // search_height

    var toph = $("#searchcon").css("top");
    // nav_height
    $(".rtcon").height(heighto + 86);
    /*if ($("#rtcon").length && $("#rtcon").height() > nh) {
        return;
    }*/



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
    //debugger;
    if (size > 1024 && size < 1048576) {
        return (size / 1024).toFixed(2) + 'K';
    }
    if (size < 1024) {
        return size+'B';
    }
    if (size > 1048576 && size < 1048576 * 1024) {
        return (size / 1048576).toFixed(2) + 'M';
    }
    if (size > 1048576 * 1024) {
        return (size / 1048576 / 1024).toFixed(2) + 'G';
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

function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, " ", expdate);
}

// 左侧 nav 显示与隐藏
$(function() {
	  now= new Date();
    if ($("select").length != 0 && !$("select").hasClass('none')) {

        if ($("select").length != 0 && !$("select").hasClass('none')) {

            $("select").select2({ minimumResultsForSearch: -1 });
        }
    }
    $("#searchicon").on('click', '', function(event) {
        var parentdom=$(this).parent();
        if($(parentdom).hasClass('up')){
            $(parentdom).removeClass('up');
        }else{
            $(parentdom).addClass('up');
        }
        $(document).delegate('body', 'click', function(event) {
            //debugger;
            if($(event.target).attr('class')=="search up"){
                 return;
            }
            if($(event.target).attr('class')=="webicon-search"){
                 return;
            }
            if($(event.target).attr('id')=="searchcourse"){
                return;
            }
            $(".search").removeClass('up');
        });
        event.preventDefault();
        /* Act on the event */
    });
    /*$("#shrinkbtn").on('click', '', function(event) {
    	if($(this).attr('class')==""){
    		$(this).addClass("cover");
    		$(".navlef").addClass("mini");
    		$(".rtcon").addClass("mini");
    		setCookie("wlxt|nav_cover", "cover", 15)
    	}else{
    		$(this).removeClass("cover");
    		$(".navlef").removeClass("mini");
    		$(".rtcon").removeClass("mini");
    		deleteCookie("wlxt|nav_cover");
    	}
        
        
        event.preventDefault();
         Act on the event 
    }); */
    
    $("#morebtn ").on('click', 'i', function(event) {
        var parentClass = $(this).parent().attr('class');
        if ($(event.target).hasClass('webicon-up')) {
            $(this).parent().removeClass('in');
            $('.morebtn').css({ "background-color": "#ffffff" });
            deleteCookie("wlxt|nav_left");
        } else {
            $(this).parent().addClass('in');
            $('.morebtn').css({ "background-color": "#f2f2f2" });
            setCookie("wlxt|nav_left", "up", 15)
        }

        event.preventDefault();
        /* Act on the event */
    });


});
function allsearch(){
	ggallmdt.search();
	kjallmdt.search();
	zyallmdt.search();
	bbsallmdt.search();
	dyallmdt.search();
}
/*搜索全部*/
function initall(){
	ggall();
	kjall();
	zyall();
	bbsall();
	dyall();
	
}
function flushnuminit(){
	 var ggallnum= $("#ggalltable_info").text();
	 var kjallnum= $("#kjalltable_info").text();
	 var zyallnum= $("#zyalltable_info").text();
	 var bbsallnum= $("#bbsalltable_info").text();
	 var dyallnum= $("#dyalltable_info").text();
	 ggallnum = $("#ggallnum").val(ggallnum).val();
	 kjallnum = $("#kjallnum").val(kjallnum).val();
	 zyallnum = $("#zyallnum").val(zyallnum).val();
	 bbsallnum= $("#bbsallnum").val(bbsallnum).val();
	 dyallnum = $("#dyallnum").val(dyallnum).val();
	 ggnum =getNum(ggallnum);
	 kjnum =getNum(kjallnum);
	 zynum =getNum(zyallnum);
	 bbsnum =getNum(bbsallnum);
	 dynum =getNum(dyallnum);
	 if(ggnum==""){
		 ggnum = "0";
	 }
	 if(kjnum==""){
		 kjnum = "0";
	 }
	 if(zynum==""){
		 zynum = "0";
	 }
	 if(bbsnum==""){
		 bbsnum = "0";
	 }
	 if(dynum==""){
		 dynum = "0";
	 }
  $(".count-0").text(parseInt(ggnum)+parseInt(kjnum)+parseInt(zynum)+parseInt(bbsnum)+parseInt(dynum) );
  $(".count-1").text(ggnum);
  $(".count-2").text(kjnum);
  $(".count-3").text(zynum);
  $(".count-4").text(bbsnum);
  $(".count-5").text(dynum);
};
function getheadernum(){
	 ggallnum = $("#ggallnum").val();
	 kjallnum = $("#kjallnum").val();
	 zyallnum = $("#zyallnum").val();
	 bbsallnum= $("#bbsallnum").val();
	 dyallnum = $("#dyallnum").val();
	 ggnum =getNum(ggallnum);
	 kjnum =getNum(kjallnum);
	 zynum =getNum(zyallnum);
	 bbsnum =getNum(bbsallnum);
	 dynum =getNum(dyallnum);
	 if(ggnum==""){
		 ggnum = "0";
	 }
	 if(kjnum==""){
		 kjnum = "0";
	 }
	 if(zynum==""){
		 zynum = "0";
	 }
	 if(bbsnum==""){
		 bbsnum = "0";
	 }
	 if(dynum==""){
		 dynum = "0";
	 }
	 
}
function flushnum(){
	getheadernum();
	 $(".count-0").text("0");
	$(".count-0").text(parseInt(ggnum)+parseInt(kjnum)+parseInt(zynum)+parseInt(bbsnum)+parseInt(dynum) );
   $(".count-1").text(ggnum);
   $(".count-2").text(kjnum);
   $(".count-3").text(zynum);
   $(".count-4").text(bbsnum);
   $(".count-5").text(dynum);
};
function flushalldivhidden(){
	getheadernum();
	 if(ggnum==0){
		 $("#ggdiv").addClass("hidden");
	 } if (kjnum==0){
		 $("#kjdiv").addClass("hidden");
	 } if (zynum==0){
		 $("#zydiv").addClass("hidden");
	 }  if (bbsnum==0){
		 $("#tldiv").addClass("hidden");
	 } if (dynum==0){
		 $("#dydiv").addClass("hidden");
	 }  
    computeHeight();
    /*if ($("#searchpanel").height() < $("#content .course-w").height()) {
        $("#searchcon").height($("#content .course-w").height() + 20);
    } else {
        $("#searchcon").height($("#searchpanel").height());
    }*/
    $("#searchcon").height($("#searchpanel").height());
}
function getNum(text){
	var value = text.replace(/[^0-9]/ig,""); 
	return(value);
	}
/**
 * jQuery MD5 hash algorithm function
 * 
 * 	<code>
 * 		Calculate the md5 hash of a String 
 * 		String $.md5 ( String str )
 * 	</code>
 * 
 * Calculates the MD5 hash of str using the » RSA Data Security, Inc. MD5 Message-Digest Algorithm, and returns that hash. 
 * MD5 (Message-Digest algorithm 5) is a widely-used cryptographic hash function with a 128-bit hash value. MD5 has been employed in a wide variety of security applications, and is also commonly used to check the integrity of data. The generated hash is also non-reversable. Data cannot be retrieved from the message digest, the digest uniquely identifies the data.
 * MD5 was developed by Professor Ronald L. Rivest in 1994. Its 128 bit (16 byte) message digest makes it a faster implementation than SHA-1.
 * This script is used to process a variable length message into a fixed-length output of 128 bits using the MD5 algorithm. It is fully compatible with UTF-8 encoding. It is very useful when u want to transfer encrypted passwords over the internet. If you plan using UTF-8 encoding in your project don't forget to set the page encoding to UTF-8 (Content-Type meta tag). 
 * This function orginally get from the WebToolkit and rewrite for using as the jQuery plugin.
 * 
 * Example
 * 	Code
 * 		<code>
 * 			$.md5("I'm Persian."); 
 * 		</code>
 * 	Result
 * 		<code>
 * 			"b8c901d0f02223f9761016cfff9d68df"
 * 		</code>
 * 
 * @alias Muhammad Hussein Fattahizadeh < muhammad [AT] semnanweb [DOT] com >
 * @link http://www.semnanweb.com/jquery-plugin/md5.html
 * @see http://www.webtoolkit.info/
 * @license http://www.gnu.org/licenses/gpl.html [GNU General Public License]
 * @param {jQuery} {md5:function(string))
 * @return string
 */
(function($){
	var rotateLeft = function(lValue, iShiftBits) {
		return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
	}
	var addUnsigned = function(lX, lY) {
		var lX4, lY4, lX8, lY8, lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
		if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		if (lX4 | lY4) {
			if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}
	var F = function(x, y, z) {
		return (x & y) | ((~ x) & z);
	}
	var G = function(x, y, z) {
		return (x & z) | (y & (~ z));
	}
	var H = function(x, y, z) {
		return (x ^ y ^ z);
	}
	var I = function(x, y, z) {
		return (y ^ (x | (~ z)));
	}
	var FF = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var GG = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var HH = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var II = function(a, b, c, d, x, s, ac) {
		a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
		return addUnsigned(rotateLeft(a, s), b);
	};
	var convertToWordArray = function(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWordsTempOne = lMessageLength + 8;
		var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
		var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
		var lWordArray = Array(lNumberOfWords - 1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while (lByteCount < lMessageLength) {
			lWordCount = (lByteCount - (lByteCount % 4)) / 4;
			lBytePosition = (lByteCount % 4) * 8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount - (lByteCount % 4)) / 4;
		lBytePosition = (lByteCount % 4) * 8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
		lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
		lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
		return lWordArray;
	};
	var wordToHex = function(lValue) {
		var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
		for (lCount = 0; lCount <= 3; lCount++) {
			lByte = (lValue >>> (lCount * 8)) & 255;
			WordToHexValueTemp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
		}
		return WordToHexValue;
	};
	var uTF8Encode = function(string) {
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};
		 md5=function(string) {
			var x = Array();
			var k, AA, BB, CC, DD, a, b, c, d;
			var S11=7, S12=12, S13=17, S14=22;
			var S21=5, S22=9 , S23=14, S24=20;
			var S31=4, S32=11, S33=16, S34=23;
			var S41=6, S42=10, S43=15, S44=21;
			string = uTF8Encode(string);
			x = convertToWordArray(string);
			a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
			for (k = 0; k < x.length; k += 16) {
				AA = a; BB = b; CC = c; DD = d;
				a = FF(a, b, c, d, x[k+0],  S11, 0xD76AA478);
				d = FF(d, a, b, c, x[k+1],  S12, 0xE8C7B756);
				c = FF(c, d, a, b, x[k+2],  S13, 0x242070DB);
				b = FF(b, c, d, a, x[k+3],  S14, 0xC1BDCEEE);
				a = FF(a, b, c, d, x[k+4],  S11, 0xF57C0FAF);
				d = FF(d, a, b, c, x[k+5],  S12, 0x4787C62A);
				c = FF(c, d, a, b, x[k+6],  S13, 0xA8304613);
				b = FF(b, c, d, a, x[k+7],  S14, 0xFD469501);
				a = FF(a, b, c, d, x[k+8],  S11, 0x698098D8);
				d = FF(d, a, b, c, x[k+9],  S12, 0x8B44F7AF);
				c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
				b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
				a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
				d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
				c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
				b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);
				a = GG(a, b, c, d, x[k+1],  S21, 0xF61E2562);
				d = GG(d, a, b, c, x[k+6],  S22, 0xC040B340);
				c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
				b = GG(b, c, d, a, x[k+0],  S24, 0xE9B6C7AA);
				a = GG(a, b, c, d, x[k+5],  S21, 0xD62F105D);
				d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
				c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
				b = GG(b, c, d, a, x[k+4],  S24, 0xE7D3FBC8);
				a = GG(a, b, c, d, x[k+9],  S21, 0x21E1CDE6);
				d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
				c = GG(c, d, a, b, x[k+3],  S23, 0xF4D50D87);
				b = GG(b, c, d, a, x[k+8],  S24, 0x455A14ED);
				a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
				d = GG(d, a, b, c, x[k+2],  S22, 0xFCEFA3F8);
				c = GG(c, d, a, b, x[k+7],  S23, 0x676F02D9);
				b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);
				a = HH(a, b, c, d, x[k+5],  S31, 0xFFFA3942);
				d = HH(d, a, b, c, x[k+8],  S32, 0x8771F681);
				c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
				b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
				a = HH(a, b, c, d, x[k+1],  S31, 0xA4BEEA44);
				d = HH(d, a, b, c, x[k+4],  S32, 0x4BDECFA9);
				c = HH(c, d, a, b, x[k+7],  S33, 0xF6BB4B60);
				b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
				a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
				d = HH(d, a, b, c, x[k+0],  S32, 0xEAA127FA);
				c = HH(c, d, a, b, x[k+3],  S33, 0xD4EF3085);
				b = HH(b, c, d, a, x[k+6],  S34, 0x4881D05);
				a = HH(a, b, c, d, x[k+9],  S31, 0xD9D4D039);
				d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
				c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
				b = HH(b, c, d, a, x[k+2],  S34, 0xC4AC5665);
				a = II(a, b, c, d, x[k+0],  S41, 0xF4292244);
				d = II(d, a, b, c, x[k+7],  S42, 0x432AFF97);
				c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
				b = II(b, c, d, a, x[k+5],  S44, 0xFC93A039);
				a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
				d = II(d, a, b, c, x[k+3],  S42, 0x8F0CCC92);
				c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
				b = II(b, c, d, a, x[k+1],  S44, 0x85845DD1);
				a = II(a, b, c, d, x[k+8],  S41, 0x6FA87E4F);
				d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
				c = II(c, d, a, b, x[k+6],  S43, 0xA3014314);
				b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
				a = II(a, b, c, d, x[k+4],  S41, 0xF7537E82);
				d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
				c = II(c, d, a, b, x[k+2],  S43, 0x2AD7D2BB);
				b = II(b, c, d, a, x[k+9],  S44, 0xEB86D391);
				a = addUnsigned(a, AA);
				b = addUnsigned(b, BB);
				c = addUnsigned(c, CC);
				d = addUnsigned(d, DD);
			}
			var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
			return tempValue.toLowerCase();
		}
})(jQuery);

$(function() {
	
	userid = $("#userid").val();
	wlkcid = $("#wlkcidbyleft").val();

	$("#searchcourse").blur(function(){
		var con = $("#searchcourse").val();
		//加密成md5
	    var userid_md5 = md5(userid);
		     setCookie(userid_md5,con);
		     console.log("setCookie--ksy:"+userid_md5+"value:"+con);
	});
    $('label.mycheck input[type="radio"]').on("click", function() {
        // $(this).children('i').css({ 'border-color': '#fe8125' });
        $(this).siblings().children('i').css({ 'border-color': '#999999' });

    });
    if ($("#searchcourse").length) {

        $("#searchtab .btn").on('click', '', function(event) { //课内搜索
         	var key = event.which;
            var con = $("#searchcourse").val();
            if (!con) {
            	   Modal({ type: "notice", content: wlxtlang_shuruneirong, css: "one", //默认  '操作失败'
   		            okfn: function() {
   		            }, });
                return;
            }
            if (key == 1) {
                $("#searchcon").removeClass('hide').show();
                searchvalue = con;  
                tabchange(0);
                courseinsideSearch();
                if($('.navlef.mini').length){
                    $(".search.up").removeClass('up');
                };
                computeHeight();
                $(".dataTables_info").hide();
                $(".dataTables_length").hide();
                $(".dataTables_paginate").hide();
                computeHeight();
                flushnuminit();
	            setTimeout(function(){
	            	flushnuminit ();
	            	flushalldivhidden();
	            },500);
	            setTimeout(function(){
	            	flushnuminit ();
	            	flushalldivhidden();
	            },1000);
	            computeHeight();
	            $("#searchcon").siblings('.course-w').hide();
	            event.preventDefault();
            }
        });
        $("#content").delegate('#searchclose', 'click', function(event) {
            $("#searchcon").addClass('hide');
            $("#searchtab").hide();
            $("#searchcourse").val("");
         //   $("#searchkenei").val(""); //清空session  
            computeHeight();
        });
        if ($("#searchcourse").val()) {
            $("#searchtab").addClass('hide')
        }
        /*if ($("#searchtab.hide").length)
            $("#searchtab.hide").on('click', '', function(event) {
                if ($("#searchtab").hasClass('init')) {
                    $("#searchtab").removeClass('init')
                }
                $("#searchcon").removeClass('hide').show();
                $(this).removeClass('hide')
                event.preventDefault();
               
            });*/
      
    }
    var dataTable;
    /*if ($('.navlef').length != 0) { //debugger;
        var nav_height = $('.navlef').outerHeight(true);
        var content_height = $('.content_height').outerHeight(true);
        if (nav_height <= content_height) {
            $('.navlef').css({ "height": content_height + 40 + "px" })
        }

    }*/
    
     allnum=0;
     ggnum=0;
     kjnum=0;
     zynum=0;
     bbsnum=0;
     dynum=0;
    var searchdata = { "tablist": [{ list: [{ title: wlxtlang_quanbu, count: allnum }, { title: wlxtlang_gonggao, count: ggnum }, { title: wlxtlang_wenjian, count: kjnum }, { title: wlxtlang_zuoye, count: zynum }, { title: wlxtlang_taolun, count: bbsnum }, { title: wlxtlang_dayi, count: dynum }, ] }],"tab":0};
    if($("#searchconspt").length && $("#searchcon").length){
        var selfhtml = template('searchconspt', searchdata);
        $("#searchcon").html(selfhtml); //所教课程
       // initall(); // 初始化表格
    }
});

function escapeChars(str) {
	if(str!=null && str!=""){
		try{
		return $("<div/>").html(str).text();
		}catch(e){
			
		}
	    str = str.replace(/&amp;/g, '&');
	    str = str.replace(/&lt;/g, '<');
	    str = str.replace(/&gt;/g, '>');
	    str = str.replace(/&acute;/g, '\'');
	    str = str.replace(/&quot;/g, '"');
	    str = str.replace(/&brvbar;/g, '|');
	    str = str.replace(/&nbsp;/g, ' ');
	    str = str.replace(/&ldquo;/g, '“');
	    str = str.replace(/&rdquo;/g, '”');
	    $("<div/>").html(data.object.wtnr_str).text()
	}
    return str;
}
