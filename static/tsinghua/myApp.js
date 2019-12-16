/**
 * 
 */
var MyApp=function(undefined){
	
	//加载页面
	function loadPage(url,param,fn){
		ClassUtil.overLoad(arguments,
				[2,3],
				[
					 function(url,fn){
						 $.post(url,fn);
					 },
					 function(url,param,fn){
						 $.post(url,param,fn);
					 }
				]);
	}
	
	//加载数据
	function loadData(url,param,fn){
		ClassUtil.overLoad(arguments,
				[2,3],
				[
					 function(url,fn){
						 $.post(url,fn);
					 },
					 function(url,param,fn){
						 $.post(url,param,fn);
					 }
				]);
	}
	//同步加载
	function loadDataLock(url,param,fn){
		ClassUtil.overLoad(arguments,
				[2,3],
				[
					 function(url,fn){
						 $.ajax({
							 async:false,
							 url:url
						 }).done(function(data){
							 fn(data);
						 });
					 },
					 function(url,param,fn){
						 $.ajax({
							 async:false,
							 data:param,
							 url:url
						 }).done(function(data){
							 fn(data);
						 });
					 }
				]);
	}
	//加载表单数据
	function loadFormData(url,param,fn){
		var callback=function(data){
			var info=data.object;
			if(info){
				for ( var key in info) {
					var $el=$("[name='"+key+"']:not(:hidden)").length>0?$("[name='"+key+"']"):$("#"+key);
					var value=StringUtil.empty(info[key]);
					if($el.is(":input")){
						if($el.is(":radio")){
							$el.each(function(){
								if(this.value==value){
									this.checked=true;
								}
							});
						}else{
							$el.val(value);
						}
					}else{
						$el.text(value);
						$("[name='"+key+"']:hidden").val(value);
					}
				}
				handleControls();
			}else{
				alert("加载数据出错！");
			}
		}
		ClassUtil.overLoad(arguments,
				[1,2,3],
				[
					 function(url){
						 $.ajax({url:url,async:false}).done(callback);
					 },
					 function(url,param){
						 $.ajax({url:url,data:param,async:false}).done(callback);
					 },
					 function(url,param,fn){
						 $.ajax({url:url,data:param,async:false}).done(fn);
					 }
				]);
	}
	
	//创建表单验证
	function createValidate($form){
		var mv=new MyValidate($form);
		return mv;
	}
	
	//验证表单
	function validateForm($form,dialog){
		/*if(!$form.valid()){
			try{
				if(!$form.hasClass("noscroll")){
					var mv=$form.data("validator");
					
					if(dialog){
						dialog.scrollTo($(mv.errorList[0].element));
					}
					DOMUtil.scrollTo($(mv.errorList[0].element),-50);
				}
			}catch(e){
				ExceptionUtil.showError(e);
			}
			return false;
		}*/
		return true;
		
	}
	
	//提交表单
	function submit(url,$form,fn){
		if(validateForm($form)){
			fn=fn||function(data){showResult(data)};
			$.post(url,$form.serialize(),fn);
		}
		
	}
	
	//文件上传 
	function fileUpload(url,formId,fn) {
        disableButton();
		fn=fn||function(data){showResult(data)};
		$.ajaxFileUpload({
			url : url,
			secureuri : false,
			formId : formId,
			dataType : 'json',
			success : function(data, status) {
               	data =  $.parseJSON(data);
				fn(data);
			},
			error : function(data, status, e) {
				alert(e);
			}
		});
	}	

	//提交表单禁用按钮
	function disableButton(){
		/*var saveObj = $(".saveBtn");
		var cancelObj = $(".cancelBtn");
		if(saveObj.length>0){
			//alert("禁用");
            disbtn(saveObj);
		}
		if(cancelObj.length>0){
            disbtn(cancelObj);
		}*/
	}

	function enableButton(){

        /*var saveObj = $(".saveBtn");
        var cancelObj = $(".cancelBtn");
        if(saveObj.length>0){
        	//alert("释放");
            rebtn(saveObj);
        }
        if(cancelObj.length>0){
            rebtn(cancelObj);
        }*/

	}
	
	//文件上传带进度条  单文件上传
	function fileUploadProgress(url,formId,fn) {
        disableButton();
		fn=fn||function(data){showResult(data)};
		var form = $("#"+formId);
		var fd = new FormData();
		var fileId = form.find("[type='file']").attr("id");
		var file = document.getElementById(fileId).files[0];
	    fd.append(form.find("[type='file']").attr("name"),file);
		var dataList = $("#"+formId).serializeArray();
		$.each(dataList,function(k,v){
			 fd.append(v.name, v.value);
			 console.log(v.name+":"+v.value);
		});
		
		var xhr = $.ajaxSettings.xhr();
	    xhr.upload.addEventListener("progress", uploadProgress, false);
	    xhr.addEventListener("load", uploadComplete, false);
	    xhr.addEventListener("error", uploadFailed, false);
	  //  xhr.addEventListener("abort", uploadCanceled, false);
	    
	    xhr.onreadystatechange = function(){
	        if (xhr.readyState == 4){
	            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
	            	  fn(eval("("+xhr.responseText+")"));
	            } else {
	            	console.log("Request was unsuccessful: " + xhr.status);
	            }
	        }
	    }
	    xhr.open("POST", url); 
	    xhr.send(fd);
	};
	
	function getTimehhmmss(timeRest){
	    // 计算
	    var h=0,i=0,s=parseInt(timeRest);
	    if(s>60){
	        i=parseInt(s/60);
	        s=parseInt(s%60);
	        if(i > 60) {
	            h=parseInt(i/60);
	            i = parseInt(i%60);
	        }
	    }
	    // 补零
	    var zero=function(v){
	        return (v>>0)<10?"0"+v:v;
	    };
	    return [zero(h),zero(i),zero(s)].join(":");
	};
	
	
	
	function uploadComplete(evt) {
	     start = "0";
	   	 end = "0";
	     loadedStart = "0";
	     loadedEnd = "0";
	     console.log("上传完毕");
	}
	
	function uploadFailed(evt) {
		console.log("上传失败");
	}
	
	
	var start = "0";
	var end = "0";
	var loadedStart = "0";
	var loadedEnd = "0";
	function uploadProgress(evt) {
		if("0"== start ){
			start = evt.timeStamp;
			loadedStart = evt.loaded;
		}else{
			end = evt.timeStamp;
			loadedEnd = evt.loaded;
		}
		var restTime = "";
		if("0"!= start&&"0"!= end){
			var time = (parseInt(end)-parseInt(start))/1000;//秒
			var size = (parseInt(loadedEnd)-parseInt(loadedStart));
			var rest = parseInt(evt.total) - parseInt(evt.loaded);
			var timeRest = parseInt((rest / size) * time);
			
			restTime = getTimehhmmss(timeRest);
			//start = end;
			//loadedStart = loadedEnd;
		
		    if (evt.lengthComputable) {
		        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
		        zeroModal.progressbar(percentComplete.toString(), restTime);
		    } else {
		        console.log( 'unable to compute ');
		    }
	    
		}
	}
	
	
	
	
	//执行操作
	function post(url,param,fn){
		ClassUtil.overLoad(arguments,
				[1,2,3],
				[
					 function(url){
						$.post(url,function(data){
							showResult(data);
						});
					 },
					 function(url,fn){
						 $.post(url,fn);
					 },
					 function(url,param,fn){
						 $.post(url,param,fn);
					 }
				]);
	}


    function showResult(data,detailmessage,fn){
        ClassUtil.overLoad(arguments,
            [2,3],
            [

                function(data,fn){

                    if(data.result=="success"){
                        showMessage("success",data.msg,fn);
                    }else{
                        showMessage("error",data.msg);
                    }
                },
                function(data,detailmessage,fn){

                    if(data.result=="success"){
                        showMessageTwo("success",data.msg,fn,detailmessage);
                    }else{
                        showMessageTwo("error",data.msg,fn,detailmessage);
                    }
                }
            ]);
	}

	//显示返回的信息，失败情况下仍然调用fn
    function showResultErrorGoOn(data,fn){

                    if(data.result=="success"){
                        showMessageErrorGoOn("success",data.msg,fn);
                    }else{
                        showMessageErrorGoOn("error",data.msg,fn);
                    }

    }

	
	//显示操作结果
	function showResulted(data,fn){

		if(data.result=="success"){
			showMessage("success",data.msg,fn);
		}else{
			showMessage("error",data.msg);
		}
	}


    //显示提示
    function showMessageErrorGoOn(type,message,fn){
	
        enableButton();
        var typemsg ;
        if(type=="success"){
            Modal({ type: "success", content: message,  //默认  '操作成功'
                css:"one",
                okfn: function () {
                    fn();
                }
            });
        }else{

                Modal({
                    type: "regest",
                    content:  message, //默认  '删除分组方案将清除本方案及所有数据'
                    css:"one",
					okfn:function () {
                    
						fn();
                    }
                    //  contentDetail: "自定义标题2", //默认  '确定删除吗？',
                });
        }


    }
	
	//显示提示
	function showMessage(type,message,fn){
        enableButton();
		var typemsg ;
		if(type=="success"){
            Modal({ type: "success", content: message,  //默认  '操作成功'
				css:"one",
                okfn: function () {
                    fn();
                }
            });
		}else{
            /**
			 * 此处耦合了业务，由于无法区分开什么时候弹框什么时候赋字给页面
             */
			if(message.indexOf("上传")!=-1){
				tipfile(message);
			}else{
				Modal({
					type: "regest",
					content:  message, //默认  '删除分组方案将清除本方案及所有数据'
					css:"one"
				  //  contentDetail: "自定义标题2", //默认  '确定删除吗？',
				});
            }
		}


	}

    function showMessageTwo(type,message,fn,detailmessage){
        enableButton();
        var typemsg ;
        if(type=="success"){
            Modal({ type: "success", content: message,  //默认  '操作成功'
                contentDetail:detailmessage,
                okfn: function () {
                    fn();
                }
            });
        }else{
            if(message.indexOf("上传")!=-1){
                tipfile(message);
            }else {
                Modal({
                    type: "regest",
                    content: message, //默认  '删除分组方案将清除本方案及所有数据'
                    contentDetail: detailmessage
                    //  contentDetail: "自定义标题2", //默认  '确定删除吗？',
                });
            }
        }


    }

	
	//显示询问
	function showConfirm(message,fn){

        Modal({
            type: "confirm",
            content: message,   //默认  '导入文件失败';
            contentDetail: wlxtlang_quedingjixu,//"确定继续吗？", //默认  '请选择导入课程及导入栏目'
            okfn: function() {
                fn();
            },
            cancelfn: function() {
            },
            //width:'800'
        })
	}
	
	//删除
	function tableDelete(url,$form,fn){
		var count=$form.find('td input[type="checkbox"]:checked').length;
		if(count<1){
			showMessage("warning","请至少选择一条记录");
		}else{
			showConfirm("question","确定要删除"+count+"条记录吗？",function(){
				submit(url,$form,function(data){
					showResult(data,fn);
				});
			});
		}
		
	}
	
	//打开新的页面
	function open(url,$a){
		if($a){
			$a.attr("href",url).attr("target","_blank");
		}else{
			window.open(url);
		}
		
	}
	
	//填充右侧区域
	function contentBody(url, param, fn) {
		
		if (typeof param == "undefined") {
			param = {};
		}
		$.post(url, param, function(data) {
			// App.unblockUI(pageContent);
			var pageContentBody = $('.page-content .page-content-body');
			pageContentBody.html(data);
			App.fixContentHeight(); // fix content height
			fn && fn();
		});

	}
	
	//显示一个对话框
	function showDialog(s){
		/*var url=s.url;
		var param=s.data||{};
		var md=new MyDialog();
		md.showDialog(s);
		$.post(url,param,function(data){
			//s.content=data;
			md.initHeight().content(data).heightLock().showAnimate().scrollTo();
		});
		
        return md;*/
		
	}

	
	//创建一个服务器端表格
	function createServerTable(s){
		if(!s.table.length||!s.table.is($("table"))){
			throw new Error("table不存在");
		}else if(s.table.length>1){
			throw new Error("table冲突");
		}
		
		var mdt=new MyDataTable(s.table);
		
		if(s.loadingDiv!==undefined){
			mdt.setLoadingDiv(s.loadingDiv);
		}
		
		//实体类属性与显示名称对应关系JSON串
		var columnMap=s.head.columnMap;
		s.createPage&&MyPage.createPageContent(s.createPage, columnMap, "operateFormId" );
		//要显示的列
		var vColumnMap=s.head.vColumnMap;
		
		var columns;
		
		//创建表头   参数(对应关系JSON串,第一列是否有checkBox,最后一列是否有操作)
		mdt.createHead(columnMap,!s.body.checkBox?false:true,!s.body.control?false:true);
		
		if(vColumnMap){
			
			//创建datatable列的JSON串      参数(对应关系JSON串)
			columns=mdt.createMoreColumns(vColumnMap,columnMap);
		}else{
			
			//创建datatable列的JSON串      参数(对应关系JSON串)
			columns=mdt.createColumns(columnMap);
		}

		
		if (s.body.columns) {
			for ( var key in s.body.columns) {
				var newCol=new MyDataTable.DataTableColumn(s.body.columns[key]);
				mdt.replaceColumn(columns, key,newCol);
			}
		}
		//自定义属性的值
        if(s.body.columnsDIY){
            for(var key in s.body.columnsDIY){
                var newCol=s.body.columnsDIY[key];
                mdt.replaceColumn(columns, key,newCol);

            }
        }

		//为列JSON串插入一列  参数(列JSON串,插入位置,插入列的内容)
		if(ObjectUtil.getType(s.body.checkBox)=="string"){
			mdt.insertColumn(columns,0,{
				"mDataProp" : function(row) {
					var id=s.getId?s.getId(row):row.id;
					return s.body.checkBox.replace(/_ID_/g,id);
		        },
				"bSortable" : false,
				"sWidth" : "20px"
			});
		}else if(ObjectUtil.getType(s.body.checkBox)=="function"){
			mdt.insertColumn(columns,0,{
				"mDataProp" : s.body.checkBox,
				"bSortable" : false,
				"sWidth" : "20px"
			});
		}
		
		//为列JSON串添加一列  参数(列JSON串，列内容)
		if(ObjectUtil.getType(s.body.control)=="string"){
			mdt.addColumn(columns,new MyDataTable.DataTableColumn(function(row) {
				var id=s.getId?s.getId(row):row.id;
				return s.body.control.replace(/_ID_/g,id);
	        }));
		}else if(ObjectUtil.getType(s.body.control)=="function"){
			if(s.body.controlProperty==undefined){
                mdt.addColumn(columns,new MyDataTable.DataTableColumnForMatter(s.body.control));
			}else{
                mdt.addColumn(columns,new MyDataTable.DataTableColumnForMatterWidth(s.body.control,s.body.controlProperty));
			}

		}
		
		if(s.defaultCacheCustom){
			mdt.setDefaultCacheCustom(s.defaultCacheCustom);
		
			if(s.defaultCacheCustom.defaultSortCache){
				var dataTableDefaultSortStr = getCookie("dataTableDefaultSort");
				if(dataTableDefaultSortStr){
					var dataTableSort = JSON.parse(dataTableDefaultSortStr);
					var sort = dataTableSort[s.defaultCacheCustom.defaultSortCache] ;
					if(sort){
						mdt.setDefaultSort(columns,sort.asc||"",sort.desc||"");
					}else{
						if(s.defaultSort){
							mdt.setDefaultSort(columns,s.defaultSort.asc||"",s.defaultSort.desc||"");
						}
					}
				}else{
					if(s.defaultSort){
						mdt.setDefaultSort(columns,s.defaultSort.asc||"",s.defaultSort.desc||"");
					}
				}
				
				if(s.defaultSort){
					mdt.setSortAble(columns,s.defaultSort.asc||""+","+s.defaultSort.desc||"",true);
				}
			}else{
				if(s.defaultSort){
					mdt.setDefaultSort(columns,s.defaultSort.asc||"",s.defaultSort.desc||"");
					mdt.setSortAble(columns,s.defaultSort.asc||""+","+s.defaultSort.desc||"",true);
				}
			}
		
		}else{
			if(s.defaultSort){
				mdt.setDefaultSort(columns,s.defaultSort.asc||"",s.defaultSort.desc||"");
				mdt.setSortAble(columns,s.defaultSort.asc||""+","+s.defaultSort.desc||"",true);
			}
		}
		
		
		
		s.sortAble&&mdt.setSortAble(columns,s.sortAble,true);
		//设置列之前对列的一些处理 
		s.beforeSetColumns&&(s.beforeSetColumns(columns,mdt));
		
		//把列JSON串赋给dataTable
		mdt.setColumns(columns);

        //dataTable重绘后的操作　　关于dataTable行，列，以及其中元素的操作放在这里
		s.drawCallBack||mdt.drawCallBack(function(){
			// 创建列选择
			if(vColumnMap){
				s.columnSelector&&mdt.createMoreColumnsSelector(vColumnMap,columnMap,!s.body.checkBox?false:true,s.columnSelector);
			}else{
				s.columnSelector&&mdt.createColumnsSelector(columnMap,!s.body.checkBox?false:true,s.columnSelector);
			}
			//单击行　选中/不选中
			mdt.checkedByRowOnClick();
			//选中改变行的样式
			mdt.checkedChangeColor();
			
			//自定义 重绘之后的回调
			if(s.callBackDIY){
				s.callBackDIY();
			}
		});
		s.defaultSearchCondition&&mdt.setDefaultSearchCondition(s.defaultSearchCondition);
        //在此处获取localStorage放入用户选择的页数
        delCookie(s.url);
        var pageCookie = localStorage.getItem(s.url);
        if(pageCookie!=""&&pageCookie!=undefined) {
            s.settings.iDisplayLength = pageCookie;
        }
		s.settings&&ObjectUtil.coverProperties(s.settings,mdt.serverSettings);
		//debugger;
		// 创建DataTable
		var dataTableReqUrl = s.url;
		mdt.createServerDataTable(dataTableReqUrl);

		if(s.body.checkBox){
			//绑定全选事件
			mdt.toggleCheckAll();
		}
		
        return mdt;
	}
	
	//创建一个本地列表
	function createLocalTable(s){
		
		var sdt=new MyDataTable(s.table);
		
		//实体类属性与显示名称对应关系JSON串
		var columnMap=s.head.columnMap;
		
		// 创建表头()
		var head=sdt.createLocalHead(columnMap,!s.body.checkBox?false:true,!s.body.control?false:true);
		
		//设置表头
		sdt.setLocalHead(head);
		
		//加载数据
		var url=s.url;
		
		$.ajax({
			async:false,
			url:url,
			data:s.data
		}).done(function(data){
			var aaData=sdt.createAaData(data.object,columnMap,
					s.body.checkBox,s.body.control);
			console.log(aaData);
			sdt.setLocalAaData(aaData);
			sdt.staticDrawCallCack(function(){
				//单击行　选中/不选中
				sdt.checkedByRowOnClick();
				//选中改变行的样式
				sdt.checkedChangeColor();
			});
			//创建静态dataTable
			sdt.createLocalDataTable();
			
			if(s.body.checkBox){
				//绑定全选事件
				sdt.toggleCheckAll();
			}
		});
		return sdt;
	}
	
	//创建一个目录树(未开发)
	
	//初始化下拉列表　单选按钮  日期控件
	function handleControls(){
		
		for ( var i = 0; i < $("select").length; i++) {
			try{
				Common.handleSelect2($($("select")[i]));
			}catch(e){
				continue;
			}
		}
			
		for ( var i = 0; i < $(":radio").length; i++) {
			try{
				Common.handleUniform($($(":radio")[i]));
			}catch(e){
				continue;
			}
		}
		for ( var i = 0; i < $(".date-picker").length; i++) {
			try{
				Common.handleDatePickers($($(".date-picker")[i]));
			}catch(e){
				continue;
			}
		}
		for(var i=0;i < $(".fa-calendar").length;i++){
			try{
                /*laydate.render({
                    elem: '#startime', //日历渲染
                    format: 'yyyy-M-d HH:mm'
                });
                laydate.render({
                    elem: '#endtime', //日历渲染
                    type: 'datetime',
                    format: 'yyyy-M-d HH:mm'
                });*/
                Common.handleLayDateRender(".handleDate");
			}catch (e){
				continue;
			}
		}
	}
	
	//html转回String
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
	
	
	
    function reverse(str) {
        if(str!=null && str!="") {
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/'/g, '&acute;');
            str = str.replace(/"/g, '&quot;');
            str = str.replace(/\|/g, '&brvbar;');
            str = str.replace(/ /g, '&nbsp;');
            str = str.replace(/“/g, '&ldquo;');
            str = str.replace(/”/g, '&rdquo;');

        }
        return str;
    }
    
    
   function fileSizeFormate(size) {
        // debugger;
	   
	   	if (size==""||size=="null"||size==undefined) {
		   return "";
	   	}
        if (size > 1024 && size < 1048576) {
            return (size / 1024).toFixed(0) + 'K';
        }
        if (size < 1024) {
            return size + 'B';
        }
        if (size > 1048576 && size < 1048576 * 1024) {
            return (size / 1048576).toFixed(1) + 'M';
        }
        if (size > 1048576 * 1024) {
            return (size / 1048576 / 1024).toFixed(2) + 'G';
        }
    }
	
	
	//html符号转回String
	function unescapeHtmlChars(str) {
		return $("<div/>").html(str).text();
/*		if(str!=null && str!=""){
		    str = str.replace(/&lt;/g, '<');
		    str = str.replace(/&gt;/g, '>');
		    str = str.replace(/&acute;/g, '\'');
		    str = str.replace(/&quot;/g, '"');
		    str = str.replace(/&brvbar;/g, '|');
		    str = str.replace(/&nbsp;/g, ' ');
		    str = str.replace(/&ldquo;/g, '“');
		    str = str.replace(/&rdquo;/g, '”');
		    str = str.replace(/&amp;/g, '&');
		}
	    return str;*/
	}
	//String转html符号
	function escapeHtmlChars(str) {
		return $("<div/>").text(str).html();
/*		if(str!=null && str!=""){
			str = str.replace(/&/g, '&amp;');
		    str = str.replace(/</g, '&lt;');
		    str = str.replace(/>/g, '&gt;');
		    str = str.replace(/'/g, '&acute;');
		    str = str.replace(/"/g, '&quot;');
		    str = str.replace(/\|/g, '&brvbar;');
		    str = str.replace(/ /g, '&nbsp;');
		    str = str.replace(/“/g, '&ldquo;');
		    str = str.replace(/”/g, '&rdquo;');
		    
		}
	    return str;*/
	}
	//获取左侧列表的内容
	function getLeftBarList(wlkcid) {
        MyApp.post("/f/wlxt/index/course/teacher/course?id="+wlkcid,function () {
            if(location.href.indexOf('#reloaded')==-1){
                location.href=location.href+"#reloaded";
                location.reload();
            }

        });
    }

    function setUploadIconClass(fileName) {
        var zIndex = fileName.lastIndexOf('\.');
        var zExtension = fileName.substring(zIndex + 1);
        if (zExtension == 'png') {
            zExtension = 'jpg'
        }
        $("#attachment").addClass(zExtension);
    }
    
    
    
    
    function setDefaultSortForNotUsingMyApp(key,aoData){
    	//debugger;
    	if(!key)return aoData;
    	var aoDataStr = JSON.stringify(aoData);
    	if(aoDataStr.indexOf("iSortCol")<0||aoDataStr.indexOf("sSortDir")<0){
    		var dataTableDefaultSortStr = getCookie("dataTableDefaultSortForNotUsingMyApp");
			if(dataTableDefaultSortStr){
				var dataTableSort = JSON.parse(dataTableDefaultSortStr);
				if(dataTableSort[key]){
					var sortNum = 0;
					for(var keys in dataTableSort[key]){
						aoData.push({name:keys,value:dataTableSort[key][keys]});
						if(keys.indexOf("iSortCol")>-1){
							sortNum++;
						}
					}
					$.each(aoData,function(kData,objData){
						if(objData.name=="iSortingCols"){
							objData.value = sortNum;
						}
					})
					
				}
			}
		}else{
    		var sort = new Object();
    		var dataTableSort = new Object();
    		$.each(aoData,function(k,obj){
    			if(obj.name.indexOf("iSortCol")>-1||obj.name.indexOf("sSortDir")>-1){
    				sort[obj.name] = obj.value;
    			}
    		});
    		dataTableSort[key] = sort;
    		setCookie("dataTableDefaultSortForNotUsingMyApp",JSON.stringify(dataTableSort),30);
    	}
    	return aoData;
    }
    
    function tosubstr(options){
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
    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
             var a = val.charAt(i);
             if (a.match(/[^\x00-\xff]/ig) != null) 
            {
                len += 2;
            }
            else
            {
                len += 1;
            }
        }
        return len;
    }
    
    function getChineseLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
             var a = val.charAt(i);
             if (a.match(/[^\x00-\xff]/ig) != null) 
            {
                len += 1;
            }
        }
        return len;
    }

    function setTableSortFlagForNotUsingMyApp(tableId,aoData) {
    	
    	//debugger;
    	
    	//var sortArray =aoData.filter(item => item.name.indexOf("iSortCol")>-1||item.name.indexOf("sSortDir")>-1);
    	var sortArray = new Array();
    	$.each(aoData,function(k,objSort){
    		if(objSort.name.indexOf("iSortCol")>-1||objSort.name.indexOf("sSortDir")>-1){
    			sortArray.push(objSort);
    		}
    	});
    	var sortDetailArray = new Array();
    	$.each(sortArray,function(k,obj){
    		var sortDetail ;
    		if(k%2==0&&(obj.name.indexOf("iSortCol")>-1)){
    			sortDetail =  new Object();
    			sortDetailArray.push(sortDetail);
    		}else{
    			sortDetail = sortDetailArray[parseInt(k/2)];
    		}
    		if(obj.name.indexOf("iSortCol")>-1){
    			sortDetail.iSortCol = obj.value;
    		}
    		if(obj.name.indexOf("sSortDir")>-1){
    			sortDetail.sSortDir = obj.value;
    		}
    	});
    	$.each(sortDetailArray,function(k,objSortDetail){
    		if(objSortDetail.sSortDir == "asc"){
    			//console.log($("#"+tableId).find(" thead th:eq("+objSortDetail.iSortCol+")").size());
    			$("#"+tableId).find(" thead th:eq("+objSortDetail.iSortCol+")").removeClass().addClass("sorting_asc");
    		}else if(objSortDetail.sSortDir == "desc"){
       			//console.log($("#"+tableId).find(" thead th:eq("+objSortDetail.iSortCol+")").size());
    			$("#"+tableId).find(" thead th:eq("+objSortDetail.iSortCol+")").removeClass().addClass("sorting_desc");
    		}
    	})

    }
	return{
		"getLeftBarList":function (wlkcid) {
			return getLeftBarList(wlkcid);
        },
		"showDialog":function(s){
			return showDialog(s);
		},
		"showConfirm":function(message,fn){
			showConfirm(message,fn);
		},
		"showMessage":function(type,message,fn){
			showMessage(type,message,fn);
		},
		"createServerTable":function(s){
			return createServerTable(s);
		},
		"createLocalTable":function(s){
			return createLocalTable(s);
		},
		"createValidate":function($form){
			return createValidate($form);
		},
		"loadData":function(){
			loadData.apply(this, arguments);
		},
		"loadDataLock":function(){
			loadDataLock.apply(this,arguments);
		},
		"loadFormData":function(){
			loadFormData.apply(this, arguments);
		},
		"submit":function(url,$form,fn){
			submit(url,$form,fn);
		},
		"submitFileForm":function(url,formId,fn){
			fileUpload(url,formId,fn);
		},
		"submitFileFormProgress":function(url,formId,fn){
			fileUploadProgress(url,formId,fn);
		},
		"post":function(){
			post.apply(this, arguments);
		},
        "showResult":function(){
            showResult.apply(this,arguments);
        },
		"showResultErrorGoOn":function (data,fn) {
            showResultErrorGoOn(data,fn);
        },
		"tableDelete":function(url,$form,fn){
			tableDelete(url,$form,fn);
		},
		"validateForm":function($form,dialog){
			 return validateForm($form,dialog);
		},
		"handleControls":function(){
			 handleControls();
		},
		"open":function(url,$a){
			open(url,$a);
		},
		"contentBody":function(url, param, fn){
			contentBody(url, param, fn);
		},
		"escapeChars":function(str){
			return escapeChars(str);
		},
		"reverse":function(str){
			return reverse(str);
		},
		"fileSizeFormate":function(size){
			return fileSizeFormate(size);
		},
		"unescapeHtmlChars":function(str){
			return unescapeHtmlChars(str);
		},
		"escapeHtmlChars":function(str){
			return escapeHtmlChars(str);
		},
		//设置文件图标
		"setUploadIconClass":function(fileName){
            setUploadIconClass(fileName);
		},
		//没有使用MyApp的table 排序记忆专用
    	//与MyApp.setTableSortFlagForNotUsingMyApp 配对使用 这个方法用于 读取排序信息存于cookie 或 从cookie读取信息应用于查询
		"setDefaultSortForNotUsingMyApp":function(key,aoData){
			return setDefaultSortForNotUsingMyApp(key,aoData);
		},
		"tosubstr":function(options){
			return tosubstr(options)
		}
		,
		//没有使用MyApp的table 排序记忆专用
 	   //与MyApp.setDefaultSortForNotUsingMyApp 配对使用 这个方法用于 读取cookie中排序之后显示对应的排序标志
		//特别注意 此方法必须位于fnCallback之后
		"setTableSortFlagForNotUsingMyApp":function(tableId,aoData){
			return setTableSortFlagForNotUsingMyApp(tableId,aoData)
		}
	}
	
}();