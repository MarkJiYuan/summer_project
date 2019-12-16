;(function( $ , undefined) {
	
	var Util={
		"copyProperties":function(source, target){
			
			for (var i in source) {
				
				if (target[i] === undefined) target[i] = source[i];		
			
			};
			
			return target;
			
		},
	
		"coverProperties":function(source, target){
			
			for (var i in source) {
				
				if (source[i] === undefined){}else{ target[i] = source[i]};		
				
			};
			
			return target;
			
		}
	}

    MyDataTable= function($table){
    	//默认查询条件
    	this.defaultSearchCondition = new Array();
    	//查询条件
    	this.searchCondition = new Array();
    	//showLoadingDiv
    	this.loadingDiv=$table;
    	//DOM 页面table
    	this.table=$table;
    	//dataTable对象
    	this.dataTable=null;
    	//本地分页配置
    	this.localSettings={};
    	$.extend(true,this.localSettings,MyDataTable.defaultLocalSettings);
    	//服务器端分页配置
    	this.serverSettings={};
    	$.extend(true,this.serverSettings,MyDataTable.defaultServerSettings);
    	//导出配置
    	this.exportSettings={};
    	$.extend(true,this.exportSettings,MyDataTable.defaultExportSettings);
    	//列选择配置
    	this.columnSelectorSettings={};
    	$.extend(true,this.columnSelectorSettings,MyDataTable.defaultColumnSelectorSettings);
    	//小手
    	this.handButton="";
       
    }
    //默认本地分页配置
    MyDataTable.defaultLocalSettings={
    		/*"oLanguage" : {
    			"sUrl" : "js/plugin/datatable/i18n/chinese.json",    
    			"sSearch" : "<strong>搜索:</strong>",// 搜索
    			"sLengthMenu" : "_MENU_ 条/页",
    			"sZeroRecords" : "对不起,搜索数据不存在！",
    			"sInfo" : "显示第  _START_ 条到第  _END_ 条记录,一共  _TOTAL_ 条记录",
    			"sInfoEmpty" : "",
    			"sInfoFiltered" : "",
    			"oPaginate" : {
    				"sPrevious" : "上一页",
    				"sNext" : "下一页"
    			}
    		},*/
    		"aLengthMenu" : [ [ 5, 10, 15, -1 ], [ 5, 10, 15, "All" ] ],
    		"sDom" : "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6 center'p>>",
    		// "sDom" : "<'row-fluid'<f>>t",
    		"sPaginationType" : "bootstrap",
    		"aaSorting" : [],
    		"aoColumnDefs" : [ {
    			"bSortable" : false,
    			"aTargets" : [ 0 ]
    		} ],
    		"bPaginate" : false,// 分页按钮
    		"bFilter" : true,// 搜索栏
    		"bLengthChange" : false,// 每行显示记录数
    		"iDisplayLength" : -1,// 每页显示行数
    		"bSort" : true,// 排序
    		"bInfo" : true,// Showing 1 to 10 of 23 entries 总记录数没也显示多少等信息
    		"bAutoWidth" : true, // 自动计算列宽度
    		"aaData" : [],
    		"aoColumns" : []
    	};
    
    //默认服务器端分页配置
    MyDataTable.defaultServerSettings={
	    
	    	/*"oLanguage":{
	    		// "sSearch" : "搜索:",// 搜索
	    		"sLengthMenu" : "_MENU_ 条/页",
	    		"sZeroRecords" : "对不起,搜索数据不存在！",
	    		"sInfo" : "显示第  _START_ 条到第  _END_ 条记录,一共  _TOTAL_ 条记录",
	    		"sInfoEmpty" : "搜索到0条",
	    		"sInfoFiltered" : "",
	    		"oPaginate" : {
	    			"sPrevious" : "上一页",
	    			"sNext" : "下一页"
	    		}
	    	},*/
	    	"bPaginate": true,
	    	"bFilter": false,
	    	"bLengthChange": true,
	    	"iDisplayLength": 15,
	    	"bSort": true,
	    	"bInfo": true,
	    	"bAutoWidth": false,
	    //	"sPaginationType": "bootstrap",

        "dom": 'rtipl',
	    //	"sDom": "<'row-fluid'<'span6'l>r>C<'clear'>t<'row-fluid'<'span6'i><'span6'p>>",
	    	"aaSorting": [],
	    	"aLengthMenu": [ [ 15, 20, 30, -1 ], [ 15, 20, 30, "All" ] ],
	    	"bProcessing": false,
	    	"bServerSide": true,
	    	"sAjaxSource": "",
	    	"aoColumns": []
	    	// "fnDrawCallback": "",
	    }
   
    
    //默认导出配置
    MyDataTable.defaultExportSettings= {
    		"dataTableAoData": "",
    		"dataTableForm": $("#dataTableForm"),
    		"aoDataInput" : $("#aoDataInputId"),
    		"dataTableExportUrl": ""
    }
    
    //默认列选择配置
    MyDataTable.defaultColumnSelectorSettings= {
    		"selectorDiv": $("#dataTable_column_toggler")
    }
    
    
	// 查询条件
    MyDataTable.SearchCondition = function(name, value) {
		return {
			"name" : name,
			"value" : value
		}
	}
    
	// 表列
    MyDataTable.DataTableColumn = function(key) {
		return {
			"mDataProp" : key,
			"bSortable" : false,
			"sWidth" : "auto"
		}
	}
	//格式化某一列
    MyDataTable.DataTableColumnForMatter = function(key) {
        return {
            "mDataProp" : key,
            "bSortable" : false,
            "sWidth" : "auto",
			"sClass":"manual"
        }
    }


    MyDataTable.DataTableColumnForMatterWidth = function(key,property) {
        return {
            "mDataProp" : key,
            "bSortable" : false,
            "sWidth" : property.sWidth,
            "sClass":"manual"
        }
    }

	//每个字段对应的宽度
    MyDataTable.DataTableColumnWidth = function(sWidth) {
        return {
            "bSortable" : false,
            "sWidth" : sWidth
        }
    }
    
	// static表列
    MyDataTable.DataTableLocalColumn = function(value) {
		return {
			"sTitle" : value,
			"sClass" : "center"
		}
	}
    
	// 表行
    MyDataTable.DataTableRow = function() {
		this.row = null;
		var rowValues = [];
		this.length = -1;
		this.restoreRow = function(start, end) {
			try {
				var td = this.row.find('td');
				for (var i = start; i < end; i++) {
					$(td[i]).html(rowValues[i]);
				}
			} catch (e) {
				// TODO: handle exception
			}
		}
		this.setValues = function() {
			try {
				rowValues.length = 0;
				var td = this.row.find('td');
				td.each(function() {
					rowValues.push($(this).html());
				});
				this.length = rowValues.length;
			} catch (e) {
				// TODO: handle exception
			}
		}
		this.checkRow = function(nRow, fnCancle, fnToDo) {
			if (this.row !== null && this.row != nRow) {
				fnCancle();
				this.row = nRow;
				this.setValues();
				fnToDo();
			} else {
				this.row = nRow;
				this.setValues();
				fnToDo();
			}
		}
	}

    MyDataTable.fn = MyDataTable.prototype = {

        constructor: MyDataTable,
        
        initServerSettings:function(){
        	var that=this;
        	that.serverSettings.fnServerData = function(sSource, aoData, fnCallback) {
                //that.serverSettings.iDisplayLength = -1;
	    		var loadingDivId = that.loadingDiv;
	    		try{
	    			loadingDivId && loadingDivId.hideLoading();
	    			loadingDivId && loadingDivId.showLoading();
	    		}catch(e){
	    			console.log(e);
	    		}
	    		for (var j = 0; j < that.defaultSearchCondition.length; j++) {
	    			aoData.push(that.defaultSearchCondition[j]);
//	    			console.info("默认查询条件" + JSON.stringify(that.defaultSearchCondition[j]));
	    		}
	    		// 将查询条件中的数据存放到 aoData中
	    		for (var i = 0; i < that.searchCondition.length; i++) {
	    			aoData.push(that.searchCondition[i]);
	//    			console.info("查询条件" + JSON.stringify(that.searchCondition[i]));
	    		}
	    		
	    		if(that.serverSettings.aaSorting&&that.serverSettings.defaultCacheCustom){
	    			var desc = "";
	    			var asc = "";
	    			$.each(that.serverSettings.aaSorting,function(k,v){
	    				var cname = that.serverSettings.aoColumns[v[0]]["mDataProp"];
	    				if(typeof cname==="function"){
	    					cname = that.serverSettings.aoColumns[v[0]]["oldName"];
	    				}
	    				if(v[1]=="desc"){
	    					desc +=","+cname
	    				}else{
	    					asc +=","+cname
	    				}
	    			});
	    			
	    			if(desc!="")desc = desc.substring(1);
	    			if(asc!="")asc = asc.substring(1);
	    			var sort = new Object();
	    	    	sort.desc= desc;
	    	    	sort.asc = asc;
	    	    	var dataTableDefaultSortStr = getCookie("dataTableDefaultSort");
	    	    	var dataTableSort;
	    	    	if(dataTableDefaultSortStr){
	    	    		dataTableSort = JSON.parse(dataTableDefaultSortStr);
	    	    	}else{
	    	    		dataTableSort = new Object();
	    	    	}
	    	    	
	    	    	dataTableSort[that.serverSettings.defaultCacheCustom.defaultSortCache] = sort
	    	    	setCookie("dataTableDefaultSort",JSON.stringify(dataTableSort),30);
	    		}

	    		//从这里将用户设置的放入cookie
                that.setPageSettingToCookie(aoData,sSource);
	    		$.ajax({
	    			"type" : 'POST', // 请求方式
	    			"url" : sSource, // 发送的请求地址
	    			"dataType" : "json", // 返回的数据类型
	    			"data" : { // 发送的参数
	    				aoData : JSON.stringify(aoData)
	    			// 前面这个参数名是可以进行修改的，但是要与后台的参数名一致
	    			},
	    			"success" : function(data) {
	    				if (data.result == 'success') {
	    					fnCallback(data.object);
	    				} else {
	    					alert(data.msg);
	    				}
	    			}
	    		}).always(function() {
	    			loadingDivId && loadingDivId.hideLoading();
	    		}).error(function(a, b, c) {
	    			console.log("dataTalbe数据请求失败 原因:  " + c);
	    		});
	    		that.exportSettings.dataTableAoData=aoData;
	    	}
        },
        setPageSettingToCookie:function (aoData,sSource) {
			//从此处将用户的操作放入cookie,改为了放入localStorge
            var name = aoData[4].name;
            var pageLength =aoData[4].value;
            //key为url
			//setCookie(sSource,pageLength,30);
            localStorage.setItem(sSource,pageLength);
        },
        createLocalDataTable : function() {
    		// 创建静态的前台分页带搜索的dataTable
        	var that=this;
    		that.dataTable = that.table.dataTable(
    				that.localSettings);
    	},
    	createServerDataTable : function(url) {
    		// 创建从服务器取数据的表
    		var that=this;
    		that.initServerSettings();
    		that.serverSettings.sAjaxSource = url;
    		var set = that.serverSettings;
            /*set.iDisplayLength=-1;
            alert();*/
    		that.dataTable = that.table.dataTable(set);
    	},
    	
    	createAaData : function(info, columnMap,fnCreateCheckbox,fnCreateControl) {

    		// 创建aaData
    		var aaData = new Array();
    		if (info.length > 0) {
    			for (var i = 0; i < info.length; i++) {
    				var rowArray=new Array();
    				fnCreateCheckbox&&rowArray.push(fnCreateCheckbox(info[i]));
    				for ( var key in columnMap) {
    					rowArray.push(info[i][key]);
    				}
    				fnCreateControl&&rowArray.push(fnCreateControl(info[i]));
    				aaData.push(rowArray);
    			}
    		}
    		return aaData;
    	},
    	
    	/**
    	 * 列的操作
    	 */
    	createColumns : function(columnMap) {
    		// 跟据JOSN创建列
    		var columns = new Array();
    		for ( var key in columnMap) {
    			columns.push(new MyDataTable.DataTableColumn(key));
    		}
    		return columns;
    	},
    	createMoreColumns : function(viewColumnMap,selectColumnMap) {
    		// 跟据JOSN创建列
    		var columns = new Array();
    		for ( var key in selectColumnMap) {
    			var isVisible=viewColumnMap[key]?true:false;
    			columns.push({
    				"mDataProp" : key,
    				"bSortable" : false,
    				"sWidth" : "auto",
    				"bVisible": isVisible 
    			});
    		}
    		return columns;
    	},
    	replaceColumn : function(columns, name, newColumn) {
    		// 替换某一列
    		for (var i = 0; i < columns.length; i++) {
    			if (columns[i]["mDataProp"] == name) {
    				Util.coverProperties(newColumn,columns[i]);
    			}
    		}
    		return columns;
    	},
    	changeLocalColumn : function(columns, name, newColumn) {
    		// 改变static列表某一列
    		for (var i = 0; i < columns.length; i++) {
    			if (columns[i]["sTitle"] == name) {
    				columns[i]["fnRender"] = function(obj) {
    					var sReturn = obj.aData[obj.iDataColumn];
    					return newColumn(sReturn);
    				};
    			}
    		}
    	},
    	
    	replaceLocalColumn : function(columns, name, newColumn) {
    		// 改变static列表某一列
    		for (var i = 0; i < columns.length; i++) {
    			if (columns[i]["sTitle"] == name) {
    				columns[i]["fnRender"] = function(obj) {
    					//var sReturn = obj.aData[obj.iDataColumn];
    					return newColumn(obj.aData);
    				};
    			}
    		}
    	},
    	
    	setLocalColumnVisible : function(columns, name, isVisible) {
    		// 改变static列表某一列可见性
    		for (var i = 0; i < columns.length; i++) {
    			if (columns[i]["sTitle"] == name) {
    				columns[i]["bVisible"] = isVisible;
    			}
    		}
    	},
    	
    	setLocalColumnWidth : function(columns, name, width) {
    		// 改变static列表某一列宽度
    		for (var i = 0; i < columns.length; i++) {
    			if (columns[i]["sTitle"] == name) {
    				columns[i]["sWidth"] = width;
    			}
    		}
    	},
    	
    	addColumn : function(columns, newColumn) {
    		// 增加一列
    		columns.push(newColumn);
    		return columns;
    	},
    	insertColumn : function(columns, num, newColumn) {
    		// 插入一列
    		columns.splice(num, 0, newColumn);
    		return columns;
    	},
    	deleteColumn : function(columns, num) {
    		// 删除一列
    		columns.splice(num, 1);
    		return columns;
    	},
    	setDefaultSortCache : function(defaultSortCache) {
    		this.serverSettings.defaultSortCache = defaultSortCache;
    	},
    	setDefaultCacheCustom : function(defaultCacheCustom) {
    		this.serverSettings.defaultCacheCustom = defaultCacheCustom;
    	},
    	
    	setDefaultSort : function(columns, ascNames, descNames) {
    		// 默认排序
    		var sortArray = new Array();
    		var ascNameArray = ascNames.split(",");
    		for (var i = 0; i < columns.length; i++) {
    			for (var j = 0; j < ascNameArray.length; j++) {
    				//如果columns[i]["mDataProp"]为function则取oldName的值
					var currentProp = columns[i]["mDataProp"];
					if(typeof currentProp==="function"){
						currentProp = columns[i]["oldName"];
					}
    				if (currentProp == ascNameArray[j]) {
    					sortArray.push([ i, "asc" ]);
    				}
    			}
    		}
    		var descNameArray = descNames.split(",");
    		for (var  k = 0; k < columns.length; k++) {
    			for (var l = 0; l < descNameArray.length; l++) {
                    //如果columns[i]["mDataProp"]为function则取oldName的值
                    var currentProp = columns[k]["mDataProp"];
                    if(typeof currentProp==="function"){
                        currentProp = columns[k]["oldName"];
                    }
    				if (currentProp == descNameArray[l]) {
    					sortArray.push([ k, "desc" ]);
    				}
    			}
    		}
    		this.serverSettings.aaSorting = sortArray;
    		return sortArray;
    	},
    	setAaSoring:function(aaSorting){
    		this.serverSettings.aaSorting = aaSorting;
    	},
    	setLocalDefaultSort : function(aaSorting) {
    		// 静态列表设置默认排序
    		this.localSettings.aaSorting = aaSorting;
    	},
    	setSortAble : function(columns, names, isAble) {
    		// 某几列加排序
    		var nameArray = names.split(",");
    		for (var i = 0; i < columns.length; i++) {
    			for (var j = 0; j < nameArray.length; j++) {
    				if (columns[i]["mDataProp"] == nameArray[j]) {
    					columns[i]["bSortable"] = isAble;
    				}
    			}
    		}
    		return columns;
    	},
    	createColumnsSelector : function(columnMap, checkBox,$div) {
    		// 生成列选择选项
    		this.columnSelectorSettings.selectorDiv=$div||this.columnSelectorSettings.selectorDiv;
    		var selector = this.columnSelectorSettings.selectorDiv;
    		var content = "";
    		var index = 1;
    		if (checkBox == false) {
    			index = 0;
    		}
    		for ( var key in columnMap) {
    			var row = '<label><input type="checkbox" checked="checked" data-column="'
    					+ (index)
    					+ '" data-column-name="'
    					+ key
    					+ '" /><span>'
    					+ columnMap[key] + '</span> </label>';
    			content += row;
    			index++;

    		}
    		selector.html(content);
    		var columnToggler = selector.find('input[type="checkbox"]');
    		this.columnTogglerHideOrShow(columnToggler);
    	},
    	
    	createMoreColumnsSelector : function(viewColumnMap,selectColumnMap,checkBox,$div) {
    		// 生成列选择选项大于显示列数
    		this.columnSelectorSettings.selectorDiv=$div||this.columnSelectorSettings.selectorDiv;
    		var selector = this.columnSelectorSettings.selectorDiv;
    		// var title=$("#dataTableId").find(".hidden-480");
    		var content = "";
    		var index = 1;
    		if (checkBox == false) {
    			index = 0;
    		}
    		for ( var key in selectColumnMap) {
    			var isChecked=viewColumnMap[key]?"checked=checked":"";
    			var row = '<label><input type="checkbox" '+isChecked+' data-column="'
    					+ (index)
    					+ '" data-column-name="'
    					+ key
    					+ '" /><span>'
    					+ selectColumnMap[key] + '</span> </label>';
    			content += row;
    			index++;

    		}
    		selector.html(content);
    		var columnToggler = selector.find('input[type="checkbox"]');
    		this.columnTogglerHideOrShow(columnToggler);
    	},
    	
    	createLocalHead : function(columnMap, checkBox, control) {
    		// 创建前台分页列表表头
    		var aoColumns = new Array();
    		if (checkBox == true) {
    			aoColumns.push(new MyDataTable.DataTableLocalColumn(
    					'<input type="checkbox" id="checkbox1" class="head-checkbox" data-set="#'
    							+ this.dataTableId + ' .checkboxes" />'));
    		}
    		for ( var key in columnMap) {
    			var column = new MyDataTable.DataTableLocalColumn(columnMap[key]);
    			aoColumns.push(column);
    		}
    		if (control == true) {
    			aoColumns.push(new MyDataTable.DataTableLocalColumn('操作' + this.handButton));
    		}
    		return aoColumns;

    	},
    	createHead : function(columnMap, checkBox, control) {
    		// 创建表头
    		var table = this.table;
    		var content = "<thead><tr>";
    		if (checkBox == true) {
    			content += '<th style="width: 8px;"><input type="checkbox"  class="head-checkbox" /></th>';
    		}
    		for ( var key in columnMap) {
    			var row = '<th class="hidden-480">' + columnMap[key] + '</th>';
    			content += row;
    		}
    		if (control == true) {
    			content += '<th>'+wlxtlang_caozuo + this.handButton + '</th>';
    		}
    		content += '</tr></thead>';
    		table.html(content);
    	},
    	search : function(condition) {
    		condition=condition||[];
    		// 查询
    		$(".dataTable-search").each(function(index) {
    			var name = "";
    			var value = "";
    			if($(this).is(":radio")||$(this).is(":checkbox")){
    				if(this.checked){
    					alert(this.value)
    					name=$(this).attr("sname");
        				value=this.value;
    				}
    			}else{
    				name=$(this).attr("sname");
    				value=this.value;
    			}
    			if (!name||!value) {

    			} else {
    				if ($(this).hasClass("number-search") && value == "") {
    					value = 0;
    				}
    				condition.push({
    					"name" : name,
    					"value" : value
    				});
    			}
    		});
    		this.searchCondition=condition;
    		this.dataTable.fnDraw();
    	},
        searchByClassName : function(className,condition) {

            condition=condition||[];
            // 查询
            $("."+className).each(function(index) {
                var name = "";
                var value = "";
                if($(this).is(":radio")||$(this).is(":checkbox")){
                    if(this.checked){
                        alert(this.value)
                        name=$(this).attr("sname");
                        value=this.value;
                    }
                }else{
                    name=$(this).attr("sname");
                    value=this.value;
                }
                if (!name||!value) {

                } else {
                    if ($(this).hasClass("number-search") && value == "") {
                        value = 0;
                    }
                    condition.push({
                        "name" : name,
                        "value" : value
                    });
                }
            });
            this.searchCondition=condition;
            this.dataTable.fnDraw();
        },
    	exportExcel : function(url) {
    		// 导出Excel
    		var that=this;
    		var $table=this.table;
    		var settings = that.exportSettings;
    		var exportAoData = that.getColumnChecked(settings.dataTableAoData
    				.concat());
    		settings.dataTableForm=$table.parents("form");
    		var aoDataInput=settings.dataTableForm.find('input[name="aoData"]');
    		if(aoDataInput.length<1){
    			aoDataInput=$("<input type='hidden' name='aoData'>");
    			settings.dataTableForm.append(aoDataInput);
    		}
    		settings.aoDataInput=aoDataInput;
    		settings.dataTableForm.attr('action', url);
    		settings.dataTableForm.attr('method', 'post');
    		settings.aoDataInput.attr('value', JSON.stringify(exportAoData));
    		settings.dataTableForm.submit();
    	},
    	exportDBF : function(url) {
    		// 导出DBF
    		this.exportExcel(url);
    	},
    	getRowCheckedCount : function() {
    		// 获得选择的行数
    		return  this.table.find("tbody").find("input[type=checkbox]:checked").length;
    	},
    	getColumnChecked : function(exportAoData) {
    		// 获得选择的列
    		var i = 0;
    		var selector = this.columnSelectorSettings.selectorDiv;
    		selector.find('input[type="checkbox"]').each(
    				function() {
    					if ($(this).is(":checked")) {
    						exportAoData.push({
    							"name" : "iDisplayCol_" + i,
    							"value" : $(this).attr("data-column-name") + '|'
    									+ $(this).next().html()
    						});
    						i++;
    					}
    				});
    		return exportAoData;
    	},
    	createColumnsId : function(colValues) {
    		// 为每列加ID，导出时用
    		var columns = $("#dataTableId").find(".hidden-480");
    		for (var i = 0; i < colValues.length; i++) {
    			$(columns[i]).attr("id", colValues[i]["mDataProp"]);
    		}
    	},
    	columnTogglerHideOrShow : function(columnToggler) {
    		// 可选列的显示与隐藏
    		var dataTable = this.dataTable;
    		columnToggler.change(function() {
    			var iCol = parseInt($(this).attr("data-column"));
    			var bVis = dataTable.fnSettings().aoColumns[iCol].bVisible;
    			dataTable.fnSetColumnVis(iCol, (bVis ? false : true), false);
    		});
    	},
    	toggleCheckAll : function() {
    		// 列全选、全不选
    		var that=this;
    		var $table=this.table;
    		var headCheckBox = $table.find(".head-checkbox");
    		headCheckBox.change(function() {
    			var set=$table.find("td input[type='checkbox']");
    			console.log(set);
    			var checked = $(this).is(":checked");
    			$(set).each(function(index) {
    				if (checked) {
    					$(this)[0].checked=true;
    					$(this).closest("tr").addClass(that.rowHighlightClass);
    				} else {
    					$(this)[0].checked=false;
    					$(this).closest("tr").removeClass(that.rowHighlightClass);
    				}
    			});
    			// jquery.uniform.update(set);
    		});
    	},
    	checkedByRowOnClick : function() {
    		// 实现 触发某一行就改变复选框的选中状态
    		var that = this;
    		var tr = this.table.find("tr");
    		tr.unbind().bind("click", function(e) {
    			e = e || window.event;
    			var target = e.target || e.srcElement;
    			if (target.tagName.toLowerCase() == 'td') {
    				if ($(this).find(":checkbox").prop("checked")) {
    					$(this).find(":checkbox").prop("checked", false);
    					$(this).removeClass(that.rowHighlightClass);
    				} else {
    					$(this).find(":checkbox").prop("checked", true);
    					$(this).addClass(that.rowHighlightClass);
    				}
    			}
    		});
    	},
    	checkedChangeColor : function() {
    		// 选中改变行颜色
    		var that= this;
    		var checkBox = $("#" + this.dataTableId).find(".checkboxes");
    		checkBox.change(function() {
    			if ($(this).prop("checked")) {
    				$(this).closest("tr").addClass(that.rowHighlightClass);
    			} else {
    				$(this).closest("tr").removeClass(that.rowHighlightClass);
    			}
    		});
    	},
    	reDraw : function() {
    		// 刷新
    		this.dataTable.fnDraw();
    	},
    	drawCallBack : function(fn) {
    		// 刷新后执行
    		this.serverSettings.fnDrawCallback = function(oSettings) {
    			fn();
    		}
    	},
    	staticReDraw : function() {
    		// 刷新静态表格
    		var that=this;
    		var clazz = that.rowHighlightClass;
    		$("." + clazz).removeClass(clazz);
    		that.dataTable.fnDraw();
    	},
    	staticDrawCallCack : function(fn) {
    		// 静态列表刷新后执行
    		this.localSettings.fnDrawCallback = function() {
    			fn();
    		}
    	},

    	getRecentRow : function(names, ids, char) {
    		// 得到最近操作的行
    		if (typeof char == "undefined") {
    			var condition = new Array();
    			condition.push({
    				"name" : names,
    				"value" : ids
    			});
    			this.search(condition);
    		} else {
    			var nameArray = names.split(char);
    			var idArray = ids.split(char);
    			var condition = new Array();
    			for (var i = 0; i < nameArray.length; i++) {
    				condition.push({
    					"name" : nameArray[i],
    					"value" : idArray[i]
    				});
    			}
    			this.search(condition);
    		}
    	},
    	createId : function(form, names, char) {
    		// 拼ID
    		var nameArray = names.split(",");
    		var values = form.serializeArray();
    		var id = "";
    		for (var i = 0; i < nameArray.length; i++) {
    			for (var j = 0; j < values.length; j++) {
    				if (values[j].name == nameArray[i]) {
    					id += values[j].value + char;
    				}
    			}
    		}
    		id = id.substring(0, id.length - 1);
    		return id;
    	},
    	addHand : function($obj) {
    		// 添加小手
    		$("#hand").remove();
    		var hand = this.hand;
    		$obj.append(hand);
    	},
    	getHand : function(names, ids, char, fn) {
    		// 找小手
    		if (ids == null || ids == "") {
    			$.art.page.message("warning", '<strong>您当前还未操作!</strong>');
    		} else {
    			if ($('[id="handButton"]>i').attr("class") == "icon-hand-down") {
    				$('[id="handButton"]>i').attr("class", "icon-hand-left");
    				this.getRecentRow(names, ids, char);
    			} else {
    				$('[id="handButton"]>i').attr("class", "icon-hand-down");
    				if (typeof fn == "undefined") {
    					this.search([]);
    				} else {
    					fn();
    				}
    			}
    		}
    	},

    	setDisplyLength : function(len) {
    		// 设置显示记录数
    		this.serverSettings.iDisplayLength = len;
    	},
    	setLengthChange : function(tf) {
    		// 设置是否可以改变显示记录数
    		this.serverSettings.bLengthChange = tf;
    	},
    	setLocalDisplayLength : function(length) {
    		// 设置前台分页列表显示的记录数
    		this.localSettings.iDisplayLength = length;
    	},

       	setLoadingDiv : function(div) {
    		// 设置loadingDiv
    		this.loadingDiv=div;
    	},
    	getLoadingDiv : function() {
    		// 得到loadingDiv
    		return this.loadingDiv;
    	},

    	setColumns : function(columns) {
    		// 设置列
    		this.serverSettings.aoColumns = columns;
    	},
    	setSettings : function(newSettings) {
    		// 设置dataTable配置
    		settings = newSettings;
    	},

    	getSettings : function() {
    		// 获得dataTable配置
    		return this.serverSettings;
    	},
    	setLocalAaData : function(aaData) {
    		// 前台分页列表设置数据
    		this.localSettings.aaData = aaData;
    	},
    	setLocalHead : function(aoColumns) {
    		// 前台分页列表设置表头
    		this.localSettings.aoColumns = aoColumns;
    	},
    	getRowHighlightClass : function() {
    		// 高亮类名
    		return rowHighlightClass;
    	},
    	getHighlightClass : function() {
    		// 高亮类名
    		return rowHighlightClass;
    	},
    	setDefaultSearchCondition : function(condition) {
    		// 设置默认查询条件
    		this.defaultSearchCondition=condition;
    	},

    	setLanguage : function(name, value) {
    		// 设置语言
    		this.serverSettings.oLanguage[name] = value;
    	},
    	
    	setLocalLanguage : function(name, value) {
    		// 设置语言
    		this.localSettings.oLanguage[name] = value;
    	},

    	setDom : function(dom) {
    		// 设置DOM
    		this.serverSettings.sDom = dom;
    	},

        setLocalDom:function(dom){
            this.localSettings.sDom=dom;
        }
    }

})(jQuery);


