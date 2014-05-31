;(function($) {
	  $.fn.lineSelectBox = function(){ 
		var $drawBox = this;
		var val = $drawBox.attr('value');
		var id = $drawBox.attr('id');
		var $selectBox = $(['<span class="select-box">',
							'<span class="input-span"></span><span class="btn-span"></span>',
							'<ul class="select-ul">',
							'<li val="1">1<span style="font-size:1px;height:10px;border-bottom:1px solid #000;width:90px;margin-left:2px;"></span></li>',
							'<li val="2">2<span style="font-size:1px;height:2px;background-color:#000;width:90px;margin-left:2px;"></span></li>',
							'<li val="3">3<span style="font-size:1px;height:3px;background-color:#000;width:90px;margin-left:2px;"></span></li>',
							'<li val="4">4<span style="font-size:1px;height:4px;background-color:#000;width:90px;margin-left:2px;"></span></li>',
							'<li val="5">5<span style="font-size:1px;height:5px;background-color:#000;width:90px;margin-left:2px;"></span></li>',
							'<li val="6">6<span style="font-size:1px;height:6px;background-color:#000;width:90px;margin-left:2px;"></span></li>',
							'</ul>',
							'</span>',
							'<input type="hidden" id="'+id+'" name="'+id+'" value="'+val+'"/>'
							].join(''));
		$drawBox.css('display','none'); 
		$drawBox.after($selectBox); 
		$drawBox.remove(); 
		var $selectUL = $selectBox.find("ul.select-ul");
		//设置默认值
		var def = $selectUL.find("li[val="+val+"]");
		if(def.length>0){
			$selectBox.find("span.input-span").html(def.html()); 
			$selectBox.trigger("change",[val,def]); 
		}else{
			$("#"+id).attr('value','');
		}

		function setBodyPosition(){
			var pos = $selectBox.find('span.input-span').position(); 
			return $selectUL.css({"top":pos.top+19,"left":(pos.left-1)});
		} 
		
		$selectBox.find('span.btn-span,span.input-span').click(function(){  
			setBodyPosition().toggle();
		}); 
		$selectUL.find("li").hover(
			function(){$(this).css({"background-color":"#EEE"});},
			function(){$(this).css({"background-color":"#fff"});}
		).click(function(){
			$selectBox.find("span.input-span").html($(this).html());
			$("#"+id).attr('value',$(this).attr("val"));
			$selectUL.toggle();
			$selectBox.trigger("change",[$(this).attr("val"),$(this)]); 
		});
		$(document).bind("mousedown",function(event){
			if(!$(event.target).parents().is("ul.select-ul")){ 
				$selectUL.css('display','none');
			}
		});
		$(window).bind("resize",function(){
			setBodyPosition();
		});
		
		return {
			value:function(val){
				if(val){
					var obj = $selectUL.find("li[val="+val+"]");
					if(obj.length>0){
						$selectBox.find("span.input-span").html(obj.html()); 
						$selectBox.trigger("change",[val,obj]); 
						$("#"+id).attr('value',val);
					}else{
						$("#"+id).attr('value','');
					} 
				} 
				return $("#"+id).attr('value');;
			}
		};
	}
	//调用和举例
	//$(function(){
	//	var $selectbox = $("#selectbox").lineSelectBox();//元素的jquery 对象
	//	$("#selectbox").bind('change',function(event,val,li){//必须重新获取新的jquery对象 
	//		 
	//	});
		
	//});
})(jQuery);