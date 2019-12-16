  $(function () {
	  loaddwmc();
  });
  var noReviewHw = 0;
  var recordCount; // 总纪录数
  var pageSize = 12; //  每页数据条数
  var currentPage = 1; //  当前页码
  var totalPage; //所有页
 
   function loaddwmc(){
     	$.getJSON("/b/kc/zhjw_code_dwdmb/pageList",function(data){
 		data=data.object.rows;
 		for(var i in data){
 			if(data[i]!=null){
	     			$("#dwmcselect").append("<option value=" + data[i].dwnm+ ">&nbsp;&nbsp;" + data[i].dwmc + "</option>");
 			}}
 		$("#dwmcselect [value='undefined']").remove();
 	});
 };
  function coursedetail(id){
	  window.open("/f/wlxt/kc/v_kcxx_jskcxx/student/gkBeforeKcxx?wlkcid="+id+"&sfgk=1");
	};
       SUCCESS = "success";
	  var  schoolCourse  = function(){
			   return {
						
			    paramList:{
					currentPage:1,
					pageSize:12
			    },
			  /**
				 * 初始化方法
				 * 2014年10月13日下午2:41:34
				 */
				init:function(type){
					schoolCourse.getData(type);
				},
				
				renderData:function(dataList){
					$("#schandglobadiv").empty();
					if(dataList==''){
						 if(locale == 'en' ){
							$("<tr><td><span class='gray ml20'>No data</span></td></tr>").appendTo("#topicList");
						}else{
							$("<tr><td><span class='gray ml20'>暂无数据</span></td></tr>").appendTo("#topicList");
						}
					}else{
						  currentPage = schoolCourse.paramList['currentPage'];
						  pageSize = schoolCourse.paramList['pageSize'];
						$.each(dataList,function(i,data){
							var rows ="<div  onclick='coursedetail(\""+data.courseid+"\")'class='fl clearfix'><a><div class='item-global'> <div class='img'>";
							if(data.coursephotourl==null){
								rows +=  "<img src='/res/app/wlxt/img/course-default2.jpg'>" ;
							}else{
								rows +=  "<img src='/b/wlxt/kc/v_kcxx_jskcxx/teacher/showImageById?wlkcid="+data.courseid+"'>" ;
							}
							if(locale == 'en' ){
								rows += "</div><div class='tit-pro'><div class='title'><span>"+data.ywkcm+"</span></div> <div class='professor'><p>"+data.teachername+"</p><p>"+data.unit+"</p> </div></div> </div> </a> </div>"
							}else{
								rows += "</div><div class='tit-pro'><div class='title'><span>"+data.coursename+"</span></div> <div class='professor'><p>"+data.teachername+"</p><p>"+data.unit+"</p> </div></div> </div> </a> </div>"
							}
							
							$("#schandglobadiv").append(rows);
					    });
					}
				},
				getData:function(type){
					var type=$("#type").val();
					$.ajax({
						url : "/b/kc/v_wlkc_jsjbxxb_wjb/queryPageList/"+type,
						data :{
							pageSize:schoolCourse.paramList['pageSize'],
							currentPage:schoolCourse.paramList['currentPage'],
							"kcm":$("#kcm").val(),
							"xnxq":$(".xqxqselectid").val(),
						    "kcflm":$("#kcflmselect").val(),
						    "kkdwnm":$("#dwmcselect").val()
							},
						type : 'POST',
						dataType : 'json',
						success : function(data) {	  
							if(data.MESSAGE = SUCCESS){
								recordCount = data.paginationList.recordCount;
								pageSize = data.paginationList.pageSize;
								currentPage = data.paginationList.currentPage;
								totalPage = Math.ceil(recordCount/pageSize);
								$(".totalNum").text(recordCount);
								$(".currentPage").text(currentPage);
								$(".totalPage").text(totalPage);
								schoolCourse.renderData(data.paginationList.recordList);
								schoolCourse.pagination.initData(data.paginationList);
							}else {
								alert('获取数据失败');
							}
						},
					    error : function(){     //** 表单提交失败回调函数，用于处理提交失败后的逻辑 *//*
					    	alert("获取数据失败");
					    }
					});	
				},
				  
			   /**
				 * 分页功能
				 */
				pagination : {
				
					/**
					 * 赋值及分页数据填充
					 * data:分页数据
					 * module:分页容器
					 */
					initData : function(data){
						$(".hw-list-footer").find(".totalNum").text(data.recordCount).end()
							.find(".currentPage").text(data.currentPage).end()
							.find(".totalPage").text(Math.ceil(data.recordCount/data.pageSize));
					},

					/**
					 * 改变每页显示条数
					 * str:每页显示条数
					 * el:this
					 * module:分页容器
					 * moduleName:模块名称
					 */
					changeSizePerPage : function(str,el){
						var type=$("#type").val();
						$(".list-num li a.active").removeClass('active');
						$(el).addClass('active');
						schoolCourse.paramList['pageSize'] = parseInt(str);
						schoolCourse.paramList['currentPage'] = 1;
						schoolCourse.getData(type);
					},
					
					/**
					 * 翻页
					 * str:+下一页|-上一页|end最后一页
					 */
					turnPage : function(str){
						var type=$("#type").val();
						  currentPage = schoolCourse.paramList['currentPage'];
						  pageSize = schoolCourse.paramList['pageSize'];
						if(str=='+'){//next page
							currentPage = Math.min((currentPage+1),totalPage);
						}else if(str=='-'){//previous page
							currentPage = Math.max((currentPage-1),1);
						}else if(str=='end'){//last page
							currentPage = totalPage;
						}else{
							currentPage = parseInt(str);
						}
						schoolCourse.paramList['currentPage']=currentPage;
						schoolCourse.getData(type);
					},
				}
			    
				};
		}();  
	  
	  
	 
	  
	
	  
	  
	  
	  
	  
	  
	 
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
