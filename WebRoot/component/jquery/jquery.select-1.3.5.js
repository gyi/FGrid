/*
 * jQuery Select Plugins v1.3.5
 * Copyright (c) 2009 zhangjingwei
 * Dual licensed under the MIT and GPL licenses.
 * Date: 2009-08-29 21:10
 * Revision: 1.3.5
 * 
 * 修改:何宇航
 *   2010.11.02
 * 1.调整生成的div的宽度
 * 2.修改一个获取浏览器正文高度的方法
 *   2010.11.03
 * 3.自动执行select的onchange方法
 *   2010.11.08
 * 4.增加2个赋值方法
 *   2010.11.09
 * 5.弹出层增加滚动条
 *   2010.11.10
 * 6.修改初始化时select不可见导致的bug
 *   2010.11.11
 * 7.增加2个方法 分别用来显示和隐藏模拟下拉框
 * 8.多次调用初始化方法不会生成多个模拟下拉框了
 *   2010.11.15
 * 9.修改2次初始化时下拉框不显示的bug
 */

var static_fix_top_height = 126;
(function($){
$.fn.extend({
	sSelect: function(selectHeight) {
		var selectId = $(this).attr('id'), //获得下拉框ID
			selectZindex = $(this).css('z-index'), //获得下拉框默认z-index
			selectIndex = $('#'+selectId+' option').index($('#'+selectId+' option:selected')[0]); //获得下拉框选中option的index
		$('#'+selectId+' .dropselectbox').remove();
		$(this).append('<div class="dropselectbox"><h4><h3></h3></h4><ul style="display:none; overflow:auto;"><li></li></ul></div>');
		if(selectHeight) $('#'+selectId+' h4').css({height:selectHeight,font:('12px/'+selectHeight) + ' Arial'});
		$('#'+selectId+' h4 h3').empty().append($('#'+selectId+' option:selected').text()).css({'white-space':'nowrap','overflow':'hidden','font-size':'100%','font-weight':'normal'});
		$('.dropselectbox').show(); //ff中莫名其妙不好用
		
		//取select的宽度
		var selectWidth;
		var $select = $('#'+selectId+' select');
		if($select.is(':visible')){
			$.browser.msie ? selectWidth = $select.width() : selectWidth = $(this).width();
		}else{
			var $selectCopy = $select.clone();
			var tempDiv = $('<div></div>').attr('id','_tempDiv')
										  .css({position: 'absolute',top: '-1111px',left: '0px'})
										  .append($selectCopy)
										  .appendTo($(document.body));
			$.browser.msie ? selectWidth = $selectCopy.width() : selectWidth = $('#_tempDiv').width();
			tempDiv.remove();
		}
		if(selectWidth == 0 ) selectWidth = parseInt($select.get(0).style.width);
		
		//$('#'+selectId+' .dropselectbox').css('width',200);////不知道为什么不可以
		$('#'+selectId+' h4').css({width:selectWidth});
		$('#'+selectId+' h4 h3').css({'width':selectWidth-20});
		if($select.css('display') == 'none') $(this).hideSelect();
		
		var selectUlwidth = selectWidth + parseInt($('#'+selectId+' h4').css("padding-left")) + parseInt($('#'+selectId+' h4').css("padding-right"));
		$('#'+selectId+' ul').css({width:selectUlwidth+'px'});
		//$('#'+selectId+' select').hide();//返回等操作会2次调用此方法时会导致生成的下拉框为隐藏
		this.append($('<div></div>').css('display','none').append($select));
		$('#'+selectId+' div').hover(
			function(){
				if($('#'+selectId+' ul').css('display') == 'none') $('#'+selectId+' h4').addClass("over");
			},function(){
				if($('#'+selectId+' ul').css('display') == 'none') $('#'+selectId+' h4').removeClass("over");
			});
		$('#'+selectId)
		.bind("focus",function(){
			$.fn.clearSelectMenu();
			$('#'+selectId+' h4').addClass("over");
		})
		.bind("click",function(e){
			if($('#'+selectId+' ul').css("display") == 'block'){
				$.fn.clearSelectMenu();
				return false;
			}else{
				if ($.browser.opera){this.clearSelectMenu();}
				$('#'+selectId+' h4').addClass("current");
				$('#'+selectId+' ul').show();
				var selectZindex = $(this).css('z-index');
				if ($.browser.msie || $.browser.opera){$('.dropdown').css({'position':'relative','z-index':'0'});}
				$('#'+selectId).css({'position':'relative','z-index':'999'});
				$.fn.setSelectValue(selectId);
				
				//var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $(this).offset().top;
				var windowspace = ($(window).scrollTop() + $(document.body).height()) - $(this).offset().top;//div距离body下边的距离
				var ulspace = $('#'+selectId+' ul').outerHeight(true);//div中ul(弹出层)的高度
				var windowspace2 = $(this).offset().top - $(window).scrollTop() - ulspace;//上方的空余 windowspace2<0说明上边放不下 windowspace2>0说明上边能放下
				//alert($(window).scrollTop() +"  "+ document.documentElement.clientHeight +"  "+ $(this).offset().top);
				//alert($('#'+selectId+' ul').outerHeight(true));
				//windowspace < ulspace && windowspace2 > 0?$('#'+selectId+' ul').css({top:-ulspace}):$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
				if(windowspace < ulspace){//下方的空间不够
					if(windowspace2 > static_fix_top_height){//上方的空间够,显示在上方
						$('#'+selectId+' ul').css({top:-ulspace});
					}else{//上方的空间也不够 调整弹出层的高度为(下方的空间-2*h4的高度)
						$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true), height:(windowspace-2*$('#'+selectId+' h4').outerHeight(true))});
					}
				}else{//下方的空间够.显示在下方
					$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
				}
				
				selectIndex = $('#'+selectId+' li').index($('.selectedli')[0]);
				$(window).scroll(function(){
					//var windowspace = ($(window).scrollTop() + document.documentElement.clientHeight) - $('#'+selectId).offset().top;
					var _windowspace = ($(window).scrollTop() + $(document.body).height()) - $('#'+selectId).offset().top;//div距离body下边的距离
					var _ulspace = $('#'+selectId+' ul').outerHeight(true);//div中ul(弹出层)的高度
					var _windowspace2 = $('#'+selectId).offset().top - $(window).scrollTop() - _ulspace;//上方的空余 windowspace2<0说明上边放不下 windowspace2>0说明上边能放下

					//windowspace < ulspace?$('#'+selectId+' ul').css({top:-ulspace}):$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
					if(_windowspace < _ulspace){//下方的空间不够
						if(_windowspace2 > static_fix_top_height){//上方的空间够,显示在上方
							$('#'+selectId+' ul').css({top:-_ulspace});
						}else{//上方的空间也不够 调整弹出层的高度为(下方的空间-2*h4的高度)
							//$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true), height:(windowspace-2*$('#'+selectId+' h4').outerHeight(true))});
						}
					}else{//下方的空间够.显示在下方
						$('#'+selectId+' ul').css({top:$('#'+selectId+' h4').outerHeight(true)});
					}
				});
				$('#'+selectId+' li').click(function(e){
					selectIndex = $('#'+selectId+' li').index(this);
					if($select[0].selectedIndex != selectIndex) {
						$select[0].selectedIndex = selectIndex;
						if($select[0].onchange && typeof $select[0].onchange == 'function') {
							if ($select[0].fireEvent) {
								$select[0].fireEvent("onchange");
							} else {
								var evt = document.createEvent('HTMLEvents');
								evt.initEvent('change',true,true);
								$select[0].dispatchEvent(evt);
							}
						}
					}
					$('#'+selectId+' h4 h3').empty().append($('#'+selectId+' option:selected').text());
					$.fn.clearSelectMenu(selectId,selectZindex);
					e.stopPropagation();
					e.cancelbubble = true;
				})
				.hover(
					function(){
						$('#'+selectId+' li').removeClass("over");
						$(this).addClass("over").addClass("selectedli");
						selectIndex = $('#'+selectId+' li').index(this);
					},
					function(){
						$(this).removeClass("over");
					}
				);
			};
			e.stopPropagation();
		})
		.bind('mousewheel', function(e,delta) {
			e.preventDefault();
			var mousewheel = {
				$obj : $('#'+selectId+' li.over'),
				$slength : $('#'+selectId+' option').length,
				mup:function(){
					this.$obj.removeClass("over");
					selectIndex == 0?selectIndex = 0:selectIndex--;
					$.fn.keyDown(selectId,selectIndex);
				},
				mdown:function(){
					this.$obj.removeClass("over");
					selectIndex == (this.$slength - 1)?selectIndex = this.$slength - 1:selectIndex ++;
					$.fn.keyDown(selectId,selectIndex);
				}
			}
			delta>0?mousewheel.mup():mousewheel.mdown();
		 })
		.bind("dblclick", function(){
			$.fn.clearSelectMenu();
			return false;
		})
		.bind("keydown",function(e){
			$(this).bind('keydown',function(e){
				if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 35 || e.keyCode == 36){
					return false;
				}
			});
			var $obj = $('#'+selectId+' li.over'),$slength = $('#'+selectId+' option').length;
			switch(e.keyCode){
				case 9:
					return true;
					break;
				case 13:
					//enter
					$.fn.clearSelectMenu();
					break;
				case 27:
					//esc
					$.fn.clearSelectMenu();
					break;
				case 33:
					$obj.removeClass("over");
					selectIndex = 0;
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 34:
					$obj.removeClass("over");
					selectIndex = ($slength - 1);
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 35:
					$obj.removeClass("over");
					selectIndex = ($slength - 1);
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 36:
					$obj.removeClass("over");
					selectIndex = 0;
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 38:
					//up
					e.preventDefault();
					$obj.removeClass("over");
					selectIndex == 0?selectIndex = 0:selectIndex--;
					$.fn.keyDown(selectId,selectIndex);
					break;
				case 40:
					//down
					e.preventDefault();
					$obj.removeClass("over");
					selectIndex == ($slength - 1)?selectIndex = $slength - 1:selectIndex ++;
					$.fn.keyDown(selectId,selectIndex);
					break;
				default:
					e.preventDefault();
					break;
			};
		})
		.bind("blur",function(){
			$.fn.clearSelectMenu(selectId,selectZindex);
			return false;
		});
		$('.dropselectbox').bind("selectstart",function(){
				return false;
		});
	},
	clearSelectMenu:function(selectId,selectZindex){
		$('.dropselectbox ul').empty().hide();
		$('.dropselectbox h4').removeClass("over").removeClass("current");
		$('.dropselectbox span').removeClass("over");
		$('#'+selectId).css({'z-index':selectZindex});
	},
	setSelectValue:function(sID){
		$('#'+sID+' ul').empty();
		$('#'+sID+' ul').css('height','');
		var content = []
		$.each($('#'+sID+' option'), function(i){
			content += "<li class='FixSelectBrowser' title='"+$(this).text()+"'>"+$(this).text()+"</li>";
		});
		$('#'+sID+' ul').html(content);
		$('#'+sID+' h4 h3').empty().append($('#'+sID+' option:selected').text());
		$('#'+sID+' li').eq($('#'+sID+' select')[0].selectedIndex).addClass("over").addClass("selectedli");
	},
	setSelectIndex:function(optionIndex){
		$(this.selector+' option:eq('+optionIndex+')').attr('selected','selected');
		this.setSelectValue(this.selector.substr(1));
	},
	setSelectVal:function(value){
		$(this.selector+' select').val(value);
		this.setSelectValue(this.selector.substr(1));
	},
	keyDown:function(sID,selectIndex){
		if($('#'+sID+' select')[0].selectedIndex != selectIndex) {
			$('#'+sID+' select')[0].selectedIndex = selectIndex;
			$('#'+sID+' select')[0].selectedIndex = selectIndex;
			if($('#'+sID+' select')[0].onchange && typeof $('#'+sID+' select')[0].onchange == 'function') {
				if ($('#'+sID+' select')[0].fireEvent) {
					$('#'+sID+' select')[0].fireEvent("onchange");
				} else {
					var evt = document.createEvent('HTMLEvents');
					evt.initEvent('change',true,true);
					$('#'+sID+' select')[0].dispatchEvent(evt);
				}
			}
		}
		$('#'+sID+' li:eq('+selectIndex+')').toggleClass("over");
		$('#'+sID+' h4 h3').empty().append($('#'+sID+' option:selected').text());
	},
	showSelect:function(){
		$(this).css({display:'block'});
	},
	hideSelect:function(){
		$(this).css({display:'none'});
	}
});
var types = ['DOMMouseScroll', 'mousewheel'];
$.event.special.mousewheel = {
	setup: function() {
		if ( this.addEventListener )
			for ( var i=types.length; i; )
				this.addEventListener( types[--i], handler, false );
		else
			this.onmousewheel = handler;
	},	
	teardown: function() {
		if ( this.removeEventListener )
			for ( var i=types.length; i; )
				this.removeEventListener( types[--i], handler, false );
		else
			this.onmousewheel = null;
	}
};
$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});
function handler(event) {
	var args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true;
	event = $.event.fix(event || window.event);
	event.type = "mousewheel";	
	if ( event.wheelDelta ) delta = event.wheelDelta/120;
	if ( event.detail     ) delta = -event.detail/3;
	args.unshift(event, delta);
	return $.event.handle.apply(this, args);
}
})(jQuery);