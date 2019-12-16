function onclick_close() {
    var shade_content = $(".shade_content");
    var shade = $(".shade");
    shade_content.hide();
    shade.hide();

}

function onclick_queding() {
	window.location.reload();
}

function onclick_open() {//debugger;
    $(".shade_content").show();
    $(".shade").show();
}



$(function() {
	if (IEVersion() <= 9 && IEVersion() != -1) {//debugger;
        var mytabhtml = template('IE9temp', {});
        $("#uploadimg").replaceWith(mytabhtml);; //所教课程
        $("#uploadol").on('click', '', function(event) {
            onclick_open();
            event.preventDefault();
            /* Act on the event */
        });
        $(".btn-upload").click(function(event) {
            $("#doc").trigger('click');
        });
    } else {
        var mytabhtml = template('IE9tempbigger', {});
        $("#uploadimg").replaceWith(mytabhtml);; //所教课程

    }
	$("#up-img-touch").hover(function() {
        $(".logo-bg").show();
    }, function() {
        $(".logo-bg").hide();
    });
	$("#up-img-touch").click(function(){
		  $("#doc-modal-1").modal({width:'600px'});
});
	$("#filtericon").hover(function() {
        $(".divbox.filter.clearfix").show();
        $('#filtericon2').addClass('up');
    }, function() {
        $(".divbox.filter.clearfix").hide();
        $('#filtericon2').removeClass('up');
    });
})  
$(function() {
    'use strict';
    // 初始化
    var $image = $('#image');
    $image.cropper({
        aspectRatio: '1',
        autoCropArea:0.8,
        preview: '.up-pre-after',
        
    });

    // 事件代理绑定事件
    $('.docs-buttons').on('click', '[data-method]', function() {
   
        var $this = $(this);
        var data = $this.data();
        var result = $image.cropper(data.method, data.option, data.secondOption);
        switch (data.method) {
            case 'getCroppedCanvas':
            if (result) {
                // 显示 Modal
                $('#cropped-modal').modal().find('.am-modal-bd').html(result);
                $('#download').attr('href', result.toDataURL('image/jpeg'));
            }
            break;
        }
    });
    
    

    // 上传图片
    var $inputImage = $('#inputImage');
    var URL = window.URL || window.webkitURL;
    var blobURL;

    if (URL) {
        $inputImage.change(function () {
            var files = this.files;
            var file;

            if (files && files.length) {
               file = files[0];

               if (/^image\/\w+$/.test(file.type)) {
                    blobURL = URL.createObjectURL(file);
                    $image.one('built.cropper', function () {
                        // Revoke when load complete
                       URL.revokeObjectURL(blobURL);
                    }).cropper('reset').cropper('replace', blobURL);
                    $inputImage.val('');
                } else {
                    window.alert('请选择一个图片文件进行上传.');
                }
            }

            // Amazi UI 上传文件显示代码
            var fileNames = '';
            $.each(this.files, function() {
                fileNames += '<span class="am-badge">' + this.name + '</span> ';
            });
            $('#file-list').html(fileNames);
        });
    } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
    }
    
    //绑定上传事件
    $('#up-btn-ok').on('click',function(){
    	var $modal = $('#my-modal-loading');
    	var $modal_alert = $('#my-alert');
    	var image = document.getElementById('image');
        var imgWidth = document.getElementById("image").width;
        var imgHeight = document.getElementById("image").height;
    	var img_src=$image.attr("src");
    	if(img_src==""){
    		set_alert_info("没有选择上传的图片");
    		$modal_alert.modal();
    		return false;
    	}
    	$modal.modal();
    	
    	var url=$(this).attr("url");
    	var canvas=$("#image").cropper('getCroppedCanvas');
    	console.log("canvas"+canvas);
    	var data=canvas.toDataURL("image/jpeg", 1.0); //转成base64
    	console.log("data"+data);
    	var data1 = new FormData();
    	data1.append('image', data);
    	jQuery.ajax({
    	    url: '/b/wlxt/xt/v_jsxsxx/teacher/uploadZpByZjh',
    	    data: data1,
    	    cache: false,
    	    contentType: false,
    	    processData: false,
    	    method: 'POST',
    	    success: function(data){
    	    	$modal.modal('close');
            	Modal({ type: "success",css:"one", content: wlxtlang_caozuochenggongtishi,  //默认  '操作成功'
                    okfn: function () {
                    	onclick_queding();
                    }
                });
    	    },
    	    error: function(data){
    	    	Modal({ type: "error", css:"one",content: wlxtlang_caozuoshibaitishi,  //默认  '操作失败'
    	    		okfn: function () {
    	    			onclick_queding();
    	    		}
    	    	});
    	    }
    	})
    });
    
});

function rotateimgright() {
$("#image").cropper('rotate', 90);
}
$(function() {
    //debugger;
    if(getCookie("wlxt|nav_left")&&getCookie("wlxt|nav_left")!=" "){   //左菜单栏打开
        $("#morebtn").addClass('in');
    }
    if(getCookie("wlxt|nav_cover")&&getCookie("wlxt|nav_cover")!=" "){   //左菜单栏打开
    	$(".navlef").addClass("mini");
		$(".rtcon").addClass("mini");
		$("#shrinkbtn").addClass("cover");
    }
    if(getCookie("wlxt|nav_font")&&getCookie("wlxt|nav_font")!=" "){
    	$("body").addClass("bigger");
/*    	$("#slideThree").addClass('yes');
        $("#slideThree").children('input').prop('checked', 'checked');*/
    }

   /* var searchdata = { "tablist": [{ list: [{ title: "全部", count: 44 }, { title: "公告", count: 44 }, { title: "文件", count: 44 }, { title: "作业", count: 44 }, { title: "讨论", count: 44 }, { title: "答疑", count: 44 }, { title: "笔记", count: 44 },  ] }],"tab":0};
    var selfhtml = template('searchconspt', searchdata);
    
    $("#searchcon").html(selfhtml); //所教课程
*/
      
    $('#example tbody').on('click', 'tr', function() { //选中行
        // $(this).toggleClass('selected');
        var dom = $(this).find('[name=test]:checkbox');
        var proCK = $(dom).prop('checked');
        if (proCK == true) {
            $(dom).prop("checked", false)
        } else {
            $(dom).prop("checked", true)
        }

    });


    $("#all_checked").click(function() {
        $('[name=test]:checkbox').prop('checked', this.checked); //checked为true时为默认显示的状态

    });
 

    
});

function rotateimgleft() {
$("#image").cropper('rotate', -90);
}

function set_alert_info(content){
	$("#alert_content").html(content);
}



 
