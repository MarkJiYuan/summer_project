;(function(undefined){
	/**
	 * 类操作工具
	 */
	ClassUtil=function(){
		
		// 重载
        /**
		 *
         * @param args
         * @param lens 是一个数组，如[2,3]
         * @param fns  是一个方法数组，[fn1,fn2]
		 * 如果传入了两个参数，则调用fn1,否则调用fn2
         */
		function overLoad(args,lens,fns){
			for ( var i = 0; i < lens.length; i++) {
				if(lens[i]==args.length){
					fns[i].apply(this,args);
				}
			}
		}
		
		// 合并默认配置
		function merge(defaults,config){
			
			for (var i in defaults) {
				
				if (config[i] === undefined) config[i] = defaults[i];		
			
			};
			
			return config;
			
		}
		
		
	    /**
		 * Creates a new class
		 * 
		 * @param superClass
		 * @param methods
		 */
	    function clazz(SuperClass, methods) {
	        var constructor = function () {};
	        constructor.prototype = new SuperClass;
	        constructor.prototype.constructor = constructor;
	        constructor.prototype.parent = SuperClass.prototype;
	        constructor.prototype = merge(constructor.prototype, methods);
	        return constructor;
	    }
	    
	    return {
	    	
	    	"createClass":function(SuperClass, methods){
	    		clazz(SuperClass, methods);
	    	},
	    	"overLoad":function(args,lens,fns){
	    		overLoad(args,lens,fns);
	    	}
	    
	    }
	    
	}();
	
	/**
	 * javascript对象工具
	 */
	ObjectUtil=function(){
		
	　　 function trim(text){
		 	str=text.toString();
		　　    return str.replace(/(^\s*)|(\s*$)/g, "");
	　　 }
	 
	 	function getType(o) {
			var _t; return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
		} 
		
		return{
			
			"copyProperties":function(source, target){
				
				for (var i in source) {
					
					if (target[i] === undefined) target[i] = source[i];		
				
				};
				
				return target;
				
			},
		
			"coverProperties":function(source, target){
				for (var i in source) {
					//此处仅仅是替换了target的属性值，并没有增加。
					if (source[i] === undefined||target[i]===undefined){

					}else{
						target[i] = source[i]
					};

					//添加增加属性到target的方法
					if(!target.hasOwnProperty(i)){
						target[i] = source[i];
					}
					
				};
				
				return target;
				
			},
			
			"getValue":function(obj,keys){
				
				for ( var i = 0; i < keys.length; i++) {
					if(obj[keys[i]]){
						return obj[keys[i]];
					}
				}
				return null;
			},
			
			"getTrimValue":function(obj,keys){
				
				for ( var i = 0; i < keys.length; i++) {
					if(obj[keys[i]]){
						return trim(obj[keys[i]]);
					}
				}
				return null;
			},
			
			"getType":function(o) {
				return getType(o);
			} 
			
		}
		
	}();
	
	/**
	 * 字符串操作工具
	 */
	StringUtil=function(){
		
		function trim(text){
			return isEmpty(text)?"":text.replace(/(^\s*)|(\s*$)/g, "");
		}
		
		function isEmpty(text){
			return !text&&text!='0';
		}
		
	    return{
	    	
	    	"defaultEscapeMarkup":function(markup) {
	            var replace_map = {
	                '\\': '&#92;',
	                '&': '&amp;',
	                '<': '&lt;',
	                '>': '&gt;',
	                '"': '&quot;',
	                "'": '&#39;',
	                "/": '&#47;'
	            };
	
	            return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
	                return replace_map[match];
	            });
	        },
	        "isEmpty":function(text){//text=="" return true  text==" " return false
	        	return isEmpty(text);
	        },
	        "hasText":function(text){
	        	return !isEmpty(text);
	        },
	        "empty":function(text,showText){
	        	return !text&&text!='0'?(showText||""):text;
	        },
			"isNumber" : function(value) {
				var patten = /^-?\d+\.?\d*$/;
				return patten.test(value);
			},
			"trim":function(text){ // 删除左右两端的空格
			　　     return trim(text);
		　　 },
		   "ltrim": function(text){ // 删除左边的空格
			　　    return isEmpty(text)?"":text.replace(/(^\s*)/g,"");
		　　 },
			"rtrim": function(text){ // 删除右边的空格
			　　    return isEmpty(text)?"":text.replace(/(\s*$)/g,"");
		　　 }
	    
	    }
	}();
	
	/**
	 * 数组操作工具
	 */
	ArrayUtil=function(){
		
	    /**
		 * Compares equality of a and b
		 * 
		 * @param a
		 * @param b
		 */
	    function equal(a, b) {
	        if (a === b) return true;
	        if (a === undefined || b === undefined) return false;
	        if (a === null || b === null) return false;
	        // Check whether 'a' or 'b' is a string (primitive or object).
	        // The concatenation of an empty string (+'') converts its argument
			// to a string's primitive.
	        if (a.constructor === String) return a+'' === b+''; // a+'' - in
																// case 'a' is a
																// String object
	        if (b.constructor === String) return b+'' === a+''; // b+'' - in
																// case 'b' is a
																// String object
	        return false;
	    }
		
		function isArray(array){
			return Object.prototype.toString.call(array) === '[object Array]';  
		}
		
		function checkArray(array){
			
			if(!isArray(array)){
				throw new Error("参数array不是数组！");
			}
			
		}
		
		return{
			
			"isArray":function(array){
				
				isArray(array);
				
			},
			"isEmpty":function(array){
				
				checkArray(array);
				return (array == null || array.length == 0);
				
			},
			"isOutOfBound":function(array,index) {
				
				checkArray(array);
				if (isEmpty(array)) {
					return true;
				}
				return (index >= array.length || array < 0);
				
			},
			 "indexOf":function(value, array) {
				 
				checkArray(array);
		        var i = 0, l = array.length;
		        for (; i < l; i = i + 1) {
		            if (equal(value, array[i])) return i;
		        }
		        return -1;
		        
		    },
		    "distinct":function(array){
		    	
		    	checkArray(array);
		    	
	    		 var res = [];
	    		 var json = {};
	    		 for(var i = 0; i < array.length; i++){
	    			 if(!json[array[i]]){
	    				 res.push(array[i]);
	    				 json[array[i]] = 1;
	    			 }
	    		 }
	    		 return res;
		    }
		}
	}();
	
	/**
	 * 日期操作工具
	 */
	DateUtil=function(){
		
		Date.prototype.Format = function(fmt) {
			var o = {
				"M+" : this.getMonth() + 1,
				"d+" : this.getDate(),
				"h+" : this.getHours(),
				"m+" : this.getMinutes(),
				"s+" : this.getSeconds(),
				"q+" : Math.floor((this.getMonth() + 3) / 3),
				"S" : this.getMilliseconds()
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
						.substr(4 - RegExp.$1.length));
			for ( var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
							: (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}
		
		var _date =new Date();
		
		return{
			
			"getDate":function(){
				
				return _date;
			
			},
			"getNow":function(){
				
				return _date.getTime();
			
			},
			// 时间戳格式 年
			"yearFormat": function(date) {
				
				return date?new Date(date).Format("yyyy"):"";
			
			},
			// 时间戳格式 年-月
			"yearMonthFormat": function(date) {
				
				return date?new Date(date).Format("yyyy-MM"):"";
			
			},
			// 时间戳格式 年-月-日
			"dateFormat": function(date) {
				
				return date?new Date(date).Format("yyyy-MM-dd"):"";
				
			},
			// 时间戳格式 年-月-日 时：分：秒
			"dateTimeFormat": function(date) {
				
				return date?new Date(date).Format("yyyy-MM-dd hh:mm:ss"):"";
				
			},
			// 自定义格式
			"format": function(date,fmt){
				
				return date?new Date(date).Format(fmt):"";
				
			}
			
		}
	}();
	
	/**
	 * JSON操作工具
	 */
	JSONUtil=function(){
		
	}();
	
	/**
	 * DOM操作工具
	 */
	DOMUtil=function(){
	
	    return{
	        scrollTo: function (el, offset) {
	            pos =  el ? el.offset().top : 0;
	            jQuery('html,body').animate({
	                scrollTop: pos + (offset ? offset : 0)
	            }, 'slow');
	        },
	
	        scrollTop: function () {
	            DOMUtil.scrollTo();
	        }
	    }
	
	}();
	
	/**
	 * 浏览器操作工具
	 */
	BrowserUtil=function(){
		
	}();
	
	/**
	 * Cookie操作工具
	 */
	CookieUtil=function(){
		
		function cookie(name, value, options) {
			
		    if (typeof value != 'undefined') { // name and value given, set
												// cookie
		        options = options || {};
		        if (value === null) {
		            value = '';
		            options = $.extend({}, options); // clone object since
														// it's unexpected
														// behavior if the
														// expired property were
														// changed
		            options.expires = -1;
		        }
		        var expires = '';
		        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
		            var date;
		            if (typeof options.expires == 'number') {
		                date = new Date();
		                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
		            } else {
		                date = options.expires;
		            }
		            expires = '; expires=' + date.toUTCString(); // use
																	// expires
																	// attribute,
																	// max-age
																	// is not
																	// supported
																	// by IE
		        }
		        // NOTE Needed to parenthesize options.path and options.domain
		        // in the following expressions, otherwise they evaluate to
				// undefined
		        // in the packed version for some reason...
		        var path = options.path ? '; path=' + (options.path) : '';
		        var domain = options.domain ? '; domain=' + (options.domain) : '';
		        var secure = options.secure ? '; secure' : '';
		        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		    } else { // only name given, get cookie
		        var cookieValue = null;
		        if (document.cookie && document.cookie != '') {
		            var cookies = document.cookie.split(';');
		            for (var i = 0; i < cookies.length; i++) {
		                var cookie = jQuery.trim(cookies[i]);
		                // Does this cookie string begin with the name we want?
		                if (cookie.substring(0, name.length + 1) == (name + '=')) {
		                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		                    break;
		                }
		            }
		        }
		        return cookieValue;
		    }
		    
		}
		
		return{
			
			"cookie":function(name, value, options){
				
				cookie(name, value, options);
			
			}
		
		}
		
	}();
	
	/**
	 * 键盘KEY工具
	 */
	KeyUtil=function(){
		
		var _key = {
		        TAB: 9,
		        ENTER: 13,
		        ESC: 27,
		        SPACE: 32,
		        LEFT: 37,
		        UP: 38,
		        RIGHT: 39,
		        DOWN: 40,
		        SHIFT: 16,
		        CTRL: 17,
		        ALT: 18,
		        PAGE_UP: 33,
		        PAGE_DOWN: 34,
		        HOME: 36,
		        END: 35,
		        BACKSPACE: 8,
		        DELETE: 46
		    };
		
		return {
			"getKey":function(){
				
				return _key;
				
			},
			"isArrow": function (k) {
				
	            k = k.which ? k.which : k;
	            switch (k) {
	            case KEY.LEFT:
	            case KEY.RIGHT:
	            case KEY.UP:
	            case KEY.DOWN:
	                return true;
	            }
	            return false;
	       
			},
	        "isControl": function (e) {
	        	
	            var k = e.which;
	            switch (k) {
	            case KEY.SHIFT:
	            case KEY.CTRL:
	            case KEY.ALT:
	                return true;
	            }
	
	            if (e.metaKey) return true;
	
	            return false;
	       
	        },
	        "isFunctionKey": function (k) {
	        	
	            k = k.which ? k.which : k;
	            return k >= 112 && k <= 123;
	       
	        }
		}
	}();
	
	/**
	 * 事件工具
	 */
	EventUtil=function(){
		
		return{
			
		    "killEvent":function(event) {//移除默放事件，阻止事件冒泡
		    	
		        event.preventDefault();
		        event.stopPropagation();
		        
		    },
		    "killEventImmediately":function(event) {
		    	
		        event.preventDefault();
		        event.stopImmediatePropagation();
		        
		    },
		    "getEventTarget" : function(e) {// 事件代理 获得事件源
				e = e || window.event;
				return e.target || e.srcElement;
			}
		    
		}
		
	}();
	
	/**
	 * 异常工具类
	 */
	ExceptionUtil = function(){
	    function showError(e){
	        alert(e);
	    }
	    return{
	        "showError":function(e){
	        	showError(e);
	        }
	    }
	}();
}());