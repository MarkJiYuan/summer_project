
function _playFile(object){//第二个参数 表示 当前用户是教师(teacher)还是学生(student)，非课件模块不传，默认值是teacher；；；第三个参数例如，课程公告，课程信息，课程文件，课程作业，课程讨论，课程答疑，教学笔记，课业成绩，课程邮件，学生信息
											//  sfgk 是否公开课的页面   0不是  1是
	/*
	 * mk,如下对应模块传对应的key
	 * 
	 * 	put("mk_kcgg", "课程公告");
		put("mk_kcxx", "课程信息");
		put("mk_kcwj", "课程文件");
		put("mk_kczy", "课程作业");
		put("mk_kctl", "课程讨论");
		put("mk_kcdy", "课程答疑");
		put("mk_grbj", "教学笔记");
		put("mk_kycj", "作业成绩");
		put("mk_kcyj", "课程邮件");
		put("mk_xsxx", "学生信息");
		put("mk_xsfzsz", "学生分组设置");
		put("mk_xsjmsz", "学生界面设置");
		put("mk_jsjmsz", "教师界面设置");
		put("mk_hjzjsz", "合教助教设置");
		put("mk_kcqxsz", "课程权限设置");
		put("mk_lskcdr", "历史课程导入");
		put("mk_xshd", "学生活动");
	 */
	//debugger;
	var objectDefault = {
       wjid:'',
       roleType:'teacher',
       mk:'',
       sfgk:'0',
       downloadUrl:'',
       downloadFileBeforeUrl:'/b/kc/wj_wjb/downloadFileBefore'
    };

	
    /* object 合并到 objectDefault 中 */
    $.extend(objectDefault, object);
    var wjid =  objectDefault.wjid;   
    var roleType =  objectDefault.roleType;   
    var mk =  objectDefault.mk;   
    var sfgk =  objectDefault.sfgk;   
	if(mk=='mk_kcwj')objectDefault.downloadFileBeforeUrl = '/b/wlxt/kj/wlkc_kjxxb/'+roleType+'/downloadFileBefore';
    
	if(objectDefault.wjid==''){
		console.log("error,文件ID不可为空");
		return;
	}
	if(objectDefault.mk==''){
		console.log("error,mk不可为空");
		return;
	}
		
	var browser  = IEVersion();//获取浏览器版本
		$.ajax({
			url : '/b/kc/wj_wjb/'+roleType+'/beforePlay',
			type : 'get',
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			data : {
				wjid:wjid,
				mk:encodeURI(mk),
				sfgk:sfgk
			},
			success :function(data){
				if(data.result=="error"){
					if("zip" == data.object){// 
						tips(objectDefault);
					}else {
						resTip(data.msg);
					}
					
				}else if(data.result=="success"){
					if((browser=="6"||browser=="7"||browser=="8"||browser=="9"||browser=="10")&&"doc"==data.object.type){// 
						tips(objectDefault);
					}else{
						var urlCurrent = window.location.href;
						if(urlCurrent.indexOf("openNewWindow")>-1){
							window.location.href=encodeURI(encodeURI(data.object.playUrl+"&mk="+data.object.mk+"&sfgk="+data.object.sfgk+"&browser="+browser));
						}else{
							window.open(encodeURI(encodeURI(data.object.playUrl+"&mk="+data.object.mk+"&sfgk="+data.object.sfgk+"&browser="+browser)));
						}
						
					}	
				}
			},
			error:function(){
				
			}
		});
	
	
	
	
}

function resTip(msg){
	Modal({
		type : "regest",
		content : msg, // 默认 '操作失败'
		css: "one",
		okfn : function() {
			window.close()
		},
	});
}
function downFile(objectDefault){
	$.ajax({
		url:objectDefault.downloadFileBeforeUrl,
		data:{
			wjid:objectDefault.wjid
		},
		type:'get',
		dataType:'json',
		success:function(data){
			if("success"==data.result){
				window.location.href=objectDefault.downloadUrl;
			}else{
				Modal({ type: "regest", content: data.msg,css: "one", // 默认
		            okfn: function() {
		            }, });
				
			}
		},
		error:function(){
			Modal({ type: "regest", content: wlxtlang_wenjianxiazaishibai, css: "one", // 默认
	            okfn: function() {
	            }, });
		}
	});
}


function tips(objectDefault){
	Modal({ type: "confirm", content: wlxtlang_wenjianbuzhichiyulanqingxiazai, contentDetail: wlxtlang_shifoujixu, // 默认
        okfn: function() {
        	downFile(objectDefault);
        },
        cancelfn: function() {
        	window.close();
        }
	});
}
