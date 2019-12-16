	/**
 * 2018-04-28
 */

/*初始化学年学期*/
 initSemesterInfo =  function() {
	 $.get("/b/kc/zhjw_v_code_xnxq/getCurrentAndNextSemester",
				function(data){ 
					if(data.message = "success" ){
						var list =data.result.xnxq.toString().split("-") ;
						if(locale == 'en' ){
							currentSemester = (list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:" ")+ " "+list[0]+"-"+list[1];
						}else{
							currentSemester = list[0]+"-"+list[1]+(list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:"");
						}
						$("#profile0-tab-span").text(currentSemester); // 当前学期
						 $("#profile0-tab").attr("onclick","queryCurrentSemesterCourse('"+data.result.xnxq+"')");
						 if(data.resultList[0]!=null){
							 var list   =data.resultList[0].xnxq.toString().split("-");
							 if(locale == 'en' ){
								 nextCurrentSemester = (list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:" ")+" "+list[0]+"-"+list[1];
								}else{
									nextCurrentSemester = list[0]+"-"+list[1]+(list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:"");
								}
							 $("#profile-tab-span").text(nextCurrentSemester); // 下学期
							 var  nextCurrentSemesterId=data.resultList[0].xnxq;
							 $("#profile-tab").attr("onclick","queryNextSemesterCourse('"+nextCurrentSemesterId+"')");
						 }else{
							$("#profile-tab").css("display", 'none');
						 }
						 if(data.resultList[1]!=null){
							 var list   =data.resultList[1].xnxq.toString().split("-");
							 if(locale == 'en' ){
								 doubleNextCurrentSemester = (list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:" ")+" "+list[0]+"-"+list[1];
							 }else{
								doubleNextCurrentSemester = list[0]+"-"+list[1]+(list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:" ");
							 }
							 $("#profile1-tab-span").text(doubleNextCurrentSemester); // 下下学期
							 $("#profile1-tab").attr("onclick","queryDoubleNextSemesterCourse('"+data.resultList[1].xnxq+"')");
						 }else{
							 $("#profile1-tab").css("display", 'none');
						 }
					}else{
							alert("获取学年学期失败！")
						}
					}
			);
};
// 初始化当前学期的主讲、助教课程
 queryCurrentSemesterCourse = function (semesterId){
    initCourse("suoxuecourse",semesterId);
    initAssCourse("assistcourse",semesterId);
 };
//获取下学期的主讲、助教课程
 queryNextSemesterCourse = function (semesterId){
    initCourse("nextsuojiaocourse",semesterId);
    initAssCourse("nextassistcourse",semesterId);
 };
//获取下下学期的主讲、助教课程
 queryDoubleNextSemesterCourse = function (semesterId){
    initCourse("doubleNextsuojiaocourse",semesterId);
    initAssCourse("doubleNextassistcourse",semesterId);
 };

 /*加载所學课程*/
 initCourse = function(id,semesterId){
	 
	 $.get("/b/wlxt/kc/v_wlkc_xs_xkb_kcb_extend/student/loadCourseBySemesterId/"+semesterId+"?timestamp="+getTimestamp,
				function(data){ 
					if(data.message = "success" ){
						 if(data.resultList!=""){
							 $("#"+id).parent().removeClass("hidden");
							 renderSxCourse(id,data.resultList);
						 }else{
							 $("#"+id).parent().removeClass("hidden");
							  $("#"+id).empty();
					 		var rows ="<dd><div class='null-div'><img src='/res/app/wlxt/img/null_data.png'><p>"+wlxtlang_meiyoukecheng+"</p></div></dd>";
					 		 $("#"+id).append(rows);
						 }
					}else{
						alert(data.message);
					}
			 });
			 };
/*加载所學课程*/	
			 
 renderSxCourse =  function(id,resultList) {
	 	$("#"+id).empty();
		$.each(resultList,function(i,val){
			var rows =" <dd class='clearfix stu'><div class='fl cour_left'></div>";
			rows +="<div class='fl cour_right'> <div class='hdtitle stu'>";
			if(locale == 'en' ){
				rows +="<a  target='_blank' onclick='initkcfws(\""+val.wlkcid+"\");' href='/f/wlxt/index/course/student/course?wlkcid="+val.wlkcid+"' class='title stu'>"+val.ywkcm+"("+val.kch+"-"+val.kxhnumber+")</a>";
			}else{
				rows +="<a  target='_blank' onclick='initkcfws(\""+val.wlkcid+"\");' href='/f/wlxt/index/course/student/course?wlkcid="+val.wlkcid+"' class='title stu'>"+val.kcm+"("+val.kch+"-"+val.kxhnumber+")</a>";
			}
			rows +="<div class='btngroup rt'>";
			rows +="<p class='stu_btn'>"+wlxtlang_zhujiangjiaoshi+"：<span>"+val.jsm+"</span></p>";//主讲教师
        	rows +="<p class='stu_btn_pai' ><span id='sksjdd'  class='hidden sksjdd_"+val.wlkcid+"'>"+wlxtlang_shangkeshijiandidian+"：</span> <span id='wlkcid_"+val.wlkcid+"'></span> </p>";
			rows +="</div> </div> <div class='state stu clearfix'>";
			rows +="<ul class=' stu clearfix'>";
			rows +="<li class='clearfix' style='padding: 0;'><p class='p_img'> <img src='/b/wlxt/kc/v_kcxx_jskcxx/teacher/showImageById?wlkcid="+val.wlkcid+"'> </p></li>";
			rows +="<li class='clearfix'><a class='uuuhhh' target='_blank'  href='/f/wlxt/kcgg/wlkc_ggb/student/beforePageListXs?wlkcid="+val.wlkcid+"&sfgk=0'>";
			rows +="<span class='name'>"+wlxtlang_gonggao+"</span>";//公告
			rows +="<span class='orange stud'>"+val.xggs+" <span class='unsee'>（"+wlxtlang_weiliulan+"）</span></span>";
			rows +=" </a><p class='stu clearfix zcount_stu'>";
			rows +="<span class='num liulan'>"+wlxtlang_zongshu+"："+val.ggzs+"</span>";
			rows +="</p> </li> <li class='clearfix'>";
			rows +=" <a class='uuuhhh' target='_blank' href='/f/wlxt/kj/wlkc_kjxxb/student/beforePageList?wlkcid="+val.wlkcid+"&sfgk=0'>";
			rows +="<span class='name'>"+wlxtlang_kejian+"</span>";//课件
			rows +="<span class='wee stud'>"+val.xkjs+"<span class='unsee'>（"+wlxtlang_weiliulan+"）</span></span>";
			rows +="</a> <p class='stu clearfix zcount_stu'>";
			rows +="<span class='num liulan'>"+wlxtlang_zongshu+"："+val.xskjs+"</span>";
			rows +="</p> </li>  <li class='clearfix'> <a class='uuuhhh'  target='_blank' href='/f/wlxt/kczy/zy/student/beforePageList?wlkcid="+val.wlkcid+"'>";
			rows +=" <span class='name'>"+wlxtlang_zuoye+"</span>";
			rows +="<span class='green stud'>"+val.wjzys+"<span class='unsee'>（"+wlxtlang_weitijao+"）</span></span>";
			rows +=" </a><p class='stu clearfix zcount_stu'><span class='num liulan'>"+wlxtlang_zongshu+"："+val.zyzs+"</span>";
			rows +=" </p>  </li>  <li class='clearfix'> <a class='uuuhhh' target='_blank'  href='/f/wlxt/bbs/bbs_tltb/student/beforePageTlList?wlkcid="+val.wlkcid+"&sfgk=0'>";
			rows +=" <span class='name'>"+wlxtlang_taolun+"</span>";
			rows +=" </a> <p class='stu clearfix zcount_stu'> <span class='num liulan'>"+wlxtlang_wocanyu+"："+val.cytls+"</span>";//我参与
			rows +="<span class='num faqi'>"+wlxtlang_wofaqi+"："+val.fqtls+"</span>";//我发起
			rows +="</p> </li> <li class='clearfix'> <a class='uuuhhh' target='_blank'href='/f/wlxt/bbs/bbs_kcdy/student/beforePageDyList?wlkcid="+val.wlkcid+"&sfgk=0'>";
			rows +=" <span class='name'>"+wlxtlang_dayi+"</span>";
			rows +="</a> <p class='stu clearfix zcount_stu'>";
			rows +="<span class='num liulan'>"+wlxtlang_zongshu+"："+val.xsdyzs+"</span>";
			rows +=" <span class='num faqi'>"+wlxtlang_yihuida+"："+val.yhddys+"</span>  </p>  </li>  </ul> </div> </div>  </dd>";//已回答
			 $("#"+id).append(rows);
			 initsksjdd(val.wlkcid);
		});

 }
 function toChinesNum(num){
		    var china = new Array('零','一','二','三','四','五','六','七','八','九');
		    var arr = new Array();
		    var english = num.toString().split("")
		    for(var i=0;i<english.length;i++){
		        arr[i] = china[english[i]];
		    }
		    return arr.join("")
	}
	 
 function isEmpty(obj){
	    if(typeof obj == "undefined" || obj == null || obj == ""){
	        return true;
	    }else{
	        return false;
	    }
	}
initsksjdd = function(wlkcid){
	 $.get("/b/kc/v_wlkc_xk_sjddb/detail?id="+wlkcid,
				function(data){
			        if(!isEmpty(data)){
			        	$(".sksjdd_"+wlkcid).removeClass("hidden");
                     $("#wlkcid_"+wlkcid+"").text(data);
			        	 $("#sksjdd").attr("title",$("#wlkcid_"+wlkcid+"").text());
                     $("#wlkcid_"+wlkcid+"").attr("title",$("#wlkcid_"+wlkcid+"").text());
			        	 
			        }
	 });
};
/* 加载助教课程*/
initAssCourse = function(id,semesterId){
	 $.get("/b/kc/v_wlkc_kcb/queryAsorCoCourseList/"+semesterId+"/0"+"?timestamp="+getTimestamp,
				function(data){
					if(data.message = "success" ){
						 if(data.resultList.length !=0){
							 $("#"+id).parent().removeClass("hidden");
							 renderCourse(id,data.resultList);
						 }else{
							 $("#"+id).parent().addClass("hidden");
						 }
					}else{
						alert(data.message);
					}
			 });
			 };

/*公共加载课程*/
 renderCourse =  function(id,resultList) {
	 	$("#"+id).empty();
	 	if(resultList.length=='0'){
	 		var rows ="<dd></dd>";
	 		 $("#"+id).append(rows);
	 	}else{
		$.each(resultList,function(i,val){
			var rows  =	"<dd><div class='hdtitle'>";
			if(locale == 'en' ){
				rows +=" <a target='_blank' rel='noopener noreferrer'  onclick='initkcfws("+val.wlkcid+");'href='/f/wlxt/index/course/teacher/course?wlkcid="+val.wlkcid+"' class='title'>"+val.ywkcm+"("+val.kch+"-"+val.kxh+") </a>";
			}else{
				rows +=" <a target='_blank' rel='noopener noreferrer'  onclick='initkcfws("+val.wlkcid+");'href='/f/wlxt/index/course/teacher/course?wlkcid="+val.wlkcid+"' class='title'>"+val.kcm+"("+val.kch+"-"+val.kxh+") </a>";
			}
			rows +=" <div class='btngroup rt'>";
			rows +=" <a  target='_blank' rel='noopener noreferrer' href='/f/wlxt/kcgg/wlkc_ggb/teacher/beforeAdd?wlkcid="+val.wlkcid+"' class='btn'>"+wlxtlang_fabugonggao+"</a>";//发布公告
			rows +=" <a target='_blank' rel='noopener noreferrer' href='/f/wlxt/jxbj/wlkc_jxbjb/teacher/beforeAdd?wlkcid="+val.wlkcid+"' class='btn'>"+wlxtlang_xinzengbiji+"</a>";//新增笔记
			rows +=" <a target='_blank' rel='noopener noreferrer' href='/f/wlxt/kczy/zy/teacher/bzzy?wlkcid="+val.wlkcid+"' class='btn'>"+wlxtlang_buzhizuoye+"</a>";//布置作业
			rows +=" <a target='_blank' rel='noopener noreferrer' href='/f/wlxt/kj/wlkc_kjxxb/teacher/beforeAdd?wlkcid="+val.wlkcid+"&sfgk=0' class='btn'>"+wlxtlang_shangchuankejian+"</a>";//上传课件
			rows +=" <a target='_blank' rel='noopener noreferrer' href='/f/wlxt/mail/yj_yjxxb/teacher/beforeAdd?wlkcid="+val.wlkcid+"' class='btn'>"+wlxtlang_fasongyoujian+"</a></div></div>";//发送邮件
			rows +=" <div class='state clearfix'>";
			rows +=" <ul class='fl'>";
			rows +=" <li class='clearfix'>";
			rows +=" <p><img src='/b/wlxt/kc/v_kcxx_jskcxx/teacher/showImageById?wlkcid="+val.wlkcid+"'/></p>";
	        rows +=" </li>";
			rows +=" <li class='clearfix'>";
			rows +=" <p><span class='name'>"+wlxtlang_zuoye+"</span><span class='homeWorkNum num'>"+wlxtlang_zongshu+"："+val.zys+"</span></p>";//作业
			/*rows +=" <p class='tj'><a class='counte counte1 orange newHomeWorkNum' >0</a>份未提交</p>";*/
			rows +=" <p class='rt'><a class='counte counte1 orange newHomeWorkNum' >"+val.wpgs+"</a>"+wlxtlang_fenweipigai+"</p>";//份未批改
	        rows +=" </li>";
	        rows +=" <li class='clearfix'>";
	        rows +=" <p><span class='name'>"+wlxtlang_dayi+"</span><span class='answerNum num'>"+wlxtlang_zongshu+"："+val.dys+"</span></p>";
	        rows +=" <p class='rt'><a class='counte counte2 green newSwerNum' >"+val.ddys+"</a>"+wlxtlang_tiaodaidayi+"</p>";//条待答疑
	        rows +=" </li>";
	        rows +=" <li class='clearfix'>";
	        rows +=" <p><span class='name'>"+wlxtlang_taolun+"</span><span class='bbsNum num'>"+wlxtlang_zongshu+"："+val.tlts+"</span></p>";
	        rows +=" <p class='rt'><a class='counte counte3 grass newBbsNum' >"+val.zts+"</a>"+wlxtlang_getaoluntieshu+"</p>";//个讨论帖数
	        rows +=" </li>";
	        rows +=" <li class='clearfix'>";
	        rows +=" <p><span class='name'>"+wlxtlang_xuesheng+"</span><span class='groupNum num'>"+wlxtlang_zongshu+"："+val.xss+"</span></p>";
	        rows +=" <p class='rt'><a class='counte counte4 orangered newStudentNum'>"+val.xsbds+"</a>"+wlxtlang_renshubianhua+"	</p>";//人数变化
	        rows +=" </li>";
	        rows +=" </ul>";
			rows +=" <div class='rt'>";
			rows +=" <p><span class='name'>"+wlxtlang_kechenggonggao+"</span><span class='count noticeNum'>"+val.ggs+"</span></p>";
			rows +=" <p><span class='name'>"+wlxtlang_jiaoxuebiji+"</span><span class='count NoteNum'>"+val.jxbjs+"</span></p>";
			rows +=" <p><span class='name'>"+wlxtlang_jiaoxuekejian+"</span><span class='count courseWareNum'>"+val.jxkjs+"</span></p>";
			rows +=" <p><span class='name'>"+wlxtlang_fangwencishu+"</span><span class='count browseNum'>"+val.kcfws+"</span></p>";
			rows +=" </div>";
			rows +=" </div></dd>";
			 $("#"+id).append(rows);
		});}
};
/*点击以前学期课程*/
beforecourse = function(){
	
};
/*增加课程访问次数*/
initkcfws = function(wlkcid){
	$.ajax({
        type: "POST",
        url: '/b/kc/wlkc_kcb/student/initkcfws?wlkcid='+wlkcid,
	});
	
}
//转换 yy-mm-dd
function fmtDate(obj){
	    var date =  new Date(obj);
	    var y = 1900+date.getYear();
	    var m = "0"+(date.getMonth()+1);
	    var d = "0"+date.getDate();
	    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
//转换 yy-mm-dd  hh-mm-ss
function formatDateTime(inputTime) {  
	    var date = new Date(inputTime);
	    var y = date.getFullYear();  
	    var m = date.getMonth() + 1;  
	    m = m < 10 ? ('0' + m) : m;  
	    var d = date.getDate();  
	    d = d < 10 ? ('0' + d) : d;  
	    var h = date.getHours();
	    h = h < 10 ? ('0' + h) : h;
	    var minute = date.getMinutes();
	    minute = minute < 10 ? ('0' + minute) : minute;  
	    return y + '-' + m + '-' + d+' '+h+':'+minute  ;  
	};
/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function myactivity(id,semesterId){
	 var day1 = new Date();
	  var courdate = day1.format("yyyy-MM-dd");
	   day1.setDate(day1.getDate() - 1);
	    var s1 = day1.format("yyyy-MM-dd");
	 $.get("/b/wlxt/xt/sys_log/logList?size=5",
			function(data){ 
				if(data.result = "success" ){
					   if(data.object.length !=0 ){
						 resultList= data.object;
						 $.each(resultList,function(i,val){
							 sj=fmtDate(val.sj);
							 hm1= formatDateTime(val.sj)
							 hm= hm1.substring(11);
							   var rows = " <ul class='step'>";
							 	 if(i==0){
									 rows +="<i class='circle prinple '></i>";
									 
								 }else if(i==1){
									 rows +="<i class='circle red'></i>"; 
								 }else if(i==2){
									 rows +="<i class='circle yellow'></i>"; 
								 }else if(i==3){
									 rows +="<i class='circle green'></i>"; 
								 } else if(i==4){
									 rows +="<i class='circle grass'></i>"; 
								 }
							 	 if(sj== s1){
							 		 rows +="<li>昨天 "+hm+"</li>";
							 	 }else if(sj== courdate){
							 		 rows +="<li>今天 "+hm+"</li>";
							 	 }else{
							 		 rows +="<li>"+hm1+"</li>";  
							 	 }
							 	 rows +="<li>"+val.kcm+"</li>";
							 	 rows +="<li>"+val.nr+"</li>";
							 	 rows +="</ul>";
							 $("#activity").append(rows); 
						 }
						 )
					  } 
				}else{
					alert(data.result);
				}
		 });
		 };
/*以前学期课程*/
var mdt;
dataTableUrl = "/b/wlxt/kc/v_wlkc_xs_xktjb_coassb/pageList"; //以前学期课程获取数据
function loadxnxq(){
 	$.getJSON("/b/wlxt/kc/v_wlkc_xs_xktjb_coassb/queryxnxq",function(data){ //本人当期课程的学期 非所有学期
 		$.each(data,function(k,obj){
 			if(obj!=null){
 				var list =obj.split("-") ;
 				if(locale == 'en' ){
 					semester = (list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:" ")+" "+list[0]+"-"+list[1];
					}else{
						semester = list[0]+"-"+list[1]+(list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:"");
					}
 	 			$(".xqxqselect").append("<option value=" + obj+ ">" + semester + "</option>");
 			}
 			
			
 		});
 	});
 };
// 学年学期触发事件
 function xnxqchange( ){
	  $("#hiddenxnxq").val($("#xqxqselect").val());
	 
 }
//教师类型触发事件
 function jslxchange( ){
	  $("#hiddenjslx").val($("#jslxselect").val());
	 
}
//清理tap页的数据
 function clean(){
	 $('#getAllNetCourse')[0].reset()
	 $("#kcm").val("");
	 $(".selection #select2-xqxqselect-container").text(wlxtlang_suoyouxueqi);//"所有学期"
	 $(".selection #select2-kcflmselect-container").text(wlxtlang_quanbubenyankecheng);//"全部本研课程"
	 $(".selection #select2-dwmcselect-container").text(wlxtlang_suoyouxi);//"所有系"
	 
 }
 //以前学期搜索
function queryBeforeCourseSearch(){
     mdt.search();
}

 //初始化表格
 function initDataTable(){
     wlxtlang_gongyoushuju = wlxtlang_gongyoushuju.replace("{0}","_TOTAL_");

     mdt= MyApp.createServerTable({

         "table":$("#overtable"),
         "head":{
             "columnMap":{"xuh":wlxtlang_xuhao,"kcm":wlxtlang_kechengmingcheng,"jslx":wlxtlang_leibie,"xnxq":wlxtlang_xuenianxueqi,"jsmc":wlxtlang_zhujiangjiaoshi}
         },
         "body":{
             "columnsDIY":{
                 "xuh":{
                     "mDataProp":function(row, type, full, meta) {
                         return meta.row + 1;
                     },"sWidth" : "50"
                 },
                 "kcm":{
                         "mDataProp":function(row){
                        	 if(row.jslx=="0"){
                        		 if(locale == 'en' ){
                        			 return '<p class="listtitle"><a target="_blank" style="color: #555;border:0;padding:0" href="/f/wlxt/index/course/teacher/course?wlkcid='+row.wlkcid+'"><span class="text">' + row.ywkcm + '</span></a></p><p class="listdetail">'+wlxtlang_kechenggonggao+row.ggs+'<i>|</i>'+wlxtlang_jiaoxuebiji+row.jxbjs+'<i>|</i>'+wlxtlang_jiaoxuekejian+row.jxkjs+'  <i>|</i>  '+wlxtlang_zuoye+row.zys+'   <i>|</i>'+wlxtlang_dayi+row.kcdys+' <i>|</i>'+wlxtlang_taolun+row.tlts+'<i>|</i> '+wlxtlang_fangwencishu+row.lls+'</p>';
                        		 }else{
                        			 return '<p class="listtitle"><a target="_blank" style="color: #555;border:0;padding:0" href="/f/wlxt/index/course/teacher/course?wlkcid='+row.wlkcid+'"><span class="text">' + row.kcm + '</span></a></p><p class="listdetail">'+wlxtlang_kechenggonggao+row.ggs+'<i>|</i>'+wlxtlang_jiaoxuebiji+row.jxbjs+'<i>|</i>'+wlxtlang_jiaoxuekejian+row.jxkjs+'  <i>|</i>  '+wlxtlang_zuoye+row.zys+'   <i>|</i>'+wlxtlang_dayi+row.kcdys+' <i>|</i>'+wlxtlang_taolun+row.tlts+'<i>|</i> '+wlxtlang_fangwencishu+row.lls+'</p>';
                        		 }
                             	} else{
                             		if(locale == 'en' ){
                             			return '<p class="listtitle "><a target="_blank"  onclick="initkcfws('+row.wlkcid+');" style="color: #555;border:0;padding:0"href="/f/wlxt/index/course/student/course?wlkcid='+row.wlkcid+'"><span class="text">' + row.ywkcm + '</span></a></p><p class="listdetail"> '+wlxtlang_wodezuoye+' '+row.zyzs+'<i>|</i> '+ wlxtlang_wodedayi +" "+row.xsdys+'  <i>|</i> '+wlxtlang_wodetaolun +" " +row.tls+'   </p>';                             			
                             		}else{
                             			return '<p class="listtitle "><a target="_blank"  onclick="initkcfws('+row.wlkcid+');" style="color: #555;border:0;padding:0"href="/f/wlxt/index/course/student/course?wlkcid='+row.wlkcid+'"><span class="text">' + row.kcm + '</span></a></p><p class="listdetail"> '+wlxtlang_wodezuoye+' '+row.zyzs+'<i>|</i> ' +wlxtlang_wodedayi +" "+row.xsdys+'  <i>|</i> '+wlxtlang_wodetaolun +" " +row.tls+'   </p>'; 
                             		}
                             	}
                         },
                         "sWidth" : "1100",
                          "bSortable" : true,
                          "oldName":"kcm" //如果想格式化某一列的同时又起到排序的效果，应该再将此值加上。
                     },
                     "jslx":{
                         "mDataProp": function(row) {
                        	 if(row.jslx=="0"){
                        		 return  wlxtlang_zhujiaokecheng;
                        	 }else{
                        		 return  wlxtlang_suoxuekecheng;
                        	 }
                      }, 
                      "sWidth" : "100",
                      "sClass":"text",
                      "bSortable":true,
                      "oldName":"jslx"//真正的排序字段
                      },
                 "xnxq":{
                         "mDataProp": function(row) {
                        	 var list =row.xnxq.toString().split("-") ;
                        	 if(locale == 'en' ){
              					semester = (list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:" ")+" "+list[0]+"-"+list[1];
             					}else{
             						semester = list[0]+"-"+list[1]+(list[2]=="1"?wlxtlang_qiuji:list[2]=="2"?wlxtlang_chunji:list[2]=="3"?wlxtlang_xiaji:"");
             					}
                             return  semester;
                      }, 
                      "sWidth" : "210",
                      "bSortable":true,
                      "sClass":"text",
                      "oldName":"xnxq"//真正的排序字段
                      },

                 "jsmc":{
                     "sWidth" : "100",
                     "mDataProp":function (row) {
                         return '<span class="text">'+row.jsm+'</span>';
                     },
                     "bSortable":true,
                     "oldName":"jsmc"//真正的排序字段
                 }

             }
         },
         "url":dataTableUrl,
         "getId":function(row){
             return row.wlkcid;
         },
         "defaultSort":{"asc":"userid"},//function 的列不能排序 roleId
         "sortAble":"kcm,xnxq,jsmc,",//此处的只对未格式化的标题管用，如果已经格式化请在columnsDIY自定义
         "settings": {
             "iDisplayLength": 15,
             "oLanguage": {
	             "sProcessing" : wlxtlang_zhengzaihuoqushujuqingshaohou,//"正在获取数据，请稍候...",
	             "sLengthMenu": wlxtlang_meiyexianshi+" _MENU_ ",
                 "sZeroRecords" : wlxtlang_meiyouninyaosousuodeneirong,//"没有您要搜索的内容",
                 "sInfo" : wlxtlang_gongyoushuju,//"共 _TOTAL_ 条数据",
                 "sInfoEmpty" : wlxtlang_zanwushuju,//"暂无数据",
                 "sInfoFiltered" : wlxtlang_quanbujilushu,//"(全部记录数 _MAX_ 条)",
                 "sInfoPostFix" : "",
                 "sSearch" : wlxtlang_sosuo,//"搜索",
                 "sUrl" : "",
                 "oPaginate": {
                     //"sFirst" : "第一页",
                     //"sPrevious" : "上一页",
                     //"sNext" : "下一页",
                     //"sLast" : "最后一页"
             
                 	},
             
                 },
         },
        /* "defaultSearchCondition":[{"name":"wlkcid","value":wlkcid}]*/

     });


 }
 function searchkeygl() {
	 setTimeout(function(){
		 searchkey=$("#kcmid").val().replace(/\s+/g, "");
		 $('.text').GL({
			 ocolor:'red',    //设置关键词高亮颜色
			 oshuru:searchkey   //设置要显示的关键词
		 });
	 },600); 
	} 
$(function(){
	getTimestamp=new Date().getTime(); 
	initSemesterInfo(); /*初始化学年学期*/
	currentSemesterId = $("#currentSemester").val();
	queryCurrentSemesterCourse(currentSemesterId);// 获取当前学期的全部课程（所教、合教、助教）
	initsksjdd();
	initDataTable();
	loadxnxq(); //  课程条件学期初始化
	myactivity();
});
