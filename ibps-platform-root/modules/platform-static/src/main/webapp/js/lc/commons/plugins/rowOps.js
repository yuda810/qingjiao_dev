/**
 * rowOps,行功能键控件
 * 
 */
(function($) {

	$.fn.rowOps = function(options) {
		var me = $(this),
			ops_container = $("<div></div>"),
			ops_btn = $("<div></div>"),
			clear_bosh = $("<div></div>")
				.css("clear", "both"), 
			ops_box = $("<div></div>")
				.addClass("ops_box ops_itemDiv"),
			ops_ul = $("<ul></ul>"),
			ops_em = $("<em></em>")
				.addClass("ops_shadeEm"),
			hasCommon = false, 
			num = me.children("a").length,
			widthed = 0,
			defaults ={
				isShowDrop:true,
				showNum:0,
				showDropNum:true
			};
		if(!options){
			options ={	};
		}else{
			if(!options.isShowDrop && !options.showDropNum)
				options.showNum = num;
		}
		
		options = $.extend({}, defaults, options);
		
		if( num<= options.showNum){//少于N个按钮，直接显示，不隐藏
			me.attr('title', '').attr("nowrap", "nowrap").css('width',num*60);//每个按钮长度60px
			me.children("a").each(function(i,n){
				$(n).addClass("ops_button");
			});
			return;
		}
			
		me.attr('title', '').attr("nowrap", "nowrap").append(ops_container);
		ops_btn.addClass("ops_btn").attr("href", "javascript:void(0);").attr("title",
				"更多操作");
		ops_box.append(ops_ul);

		ops_container.append(ops_btn).append(clear_bosh).append(ops_box)
				.append(ops_em);
		//去掉空格、回车和换行符
		function trimBr(key){ 
			key = key.replace(/\s+/g, ""); 
			key = key.replace(/[\r\n]/g,"");
		    return  key;
		}
				
		var idx = 0;
		me.find("a").each(function(i,n) {
			var _self = $(this), isCommon = _self.attr("isCommon");
			if (typeof isCommon == "undefined" || isCommon != "true") {
				_self.addClass("ops_more");
				var ops_li = $("<li></li>").addClass("ops_li").append(_self);
				ops_ul.append(ops_li);
				var aText  =_self.text(), textLength=0;
				if(aText.length>0)
					aText = trimBr(aText);
				// 根据<a>的个数，设置ul的宽度，从而变成横排
				textLength = aText.length>0?(aText.length*14):0;
				//字的宽度+偏移的宽度+图标的宽度
				widthed +=  (textLength+18+20);	//5 - >15
				if(i+1==num){
					ops_ul.css("width",widthed);
				}
			} else {
				hasCommon = true;
			}
			if(idx==0){
				_self.focus();
			}
			idx++;
		});

		if (hasCommon) {
			ops_container.addClass("ops_container_type1");
		} else {
			ops_container.addClass("ops_container_type2");
		}

		var button = ops_btn,
			box = ops_box, 
			shade = ops_em,
			table = me
				.closest("table");

		var otherHide = function() {
			table.find(".ops_box").hide();
			table.find(".ops_shadeEm").hide();
			table.find(".ops_btn").removeClass('ops_active');
		};
		
		me.hoverDelay({
		            outDuring: 1000,
		            hoverEvent: function(){
		            	otherHide();
		            	box.show();
		            	shade.show();
		            	button.addClass('ops_active');
		            },
		            outEvent: function(){
		            	box.hide();
		            	shade.hide();
		            	button.removeClass('ops_active');
		            }
		        });
/*
 button.mouseup(function(event) {
			if (button.hasClass("ops_active")) {
				otherHide();
			} else {
				otherHide();
				box.toggle();
				shade.toggle();
				button.toggleClass('ops_active');
			}
			event.stopPropagation();
		});

		$("body").mouseup(function() {
			otherHide();
		});

 */ 
	};
	/*
	 * hoverDuring        鼠标经过的延时时间
       outDuring          鼠标移出的延时时间
       hoverEvent         鼠标经过执行的方法
       outEvent           鼠标移出执行的方法
	 */
	  $.fn.hoverDelay = function(options){
	        var defaults = {
	            hoverDuring: 200,
	            outDuring: 200,
	            hoverEvent: function(){
	                $.noop();
	            },
	            outEvent: function(){
	                $.noop();    
	            }
	        };
	        var sets = $.extend(defaults,options || {});
	        var hoverTimer=0, outTimer=0, that = this;
	        return $(this).each(function(){
	            $(this).hover(function(){
	                clearTimeout(outTimer);
	                hoverTimer = setTimeout(function(){sets.hoverEvent.apply(that);}, sets.hoverDuring);
	            },function(){
	                clearTimeout(hoverTimer);
	                outTimer = setTimeout(function(){sets.outEvent.apply(that);}, sets.outDuring);
	            });    
	        });
	    };     

})(jQuery);
