(function($){
	$.fn.tabs = function(options){
		var me = $(this);
		$.Tab = function(elm,opt){
			this.frameClass = opt.fClass||"jTabs_frame_class";
			var closeBtn = $("<span>",{
				"class":"tabs_close_btn",
				click:function(e){
					e.stopPropagation();
					$pNode = $(this).parent();
					$pNode.hasClass("active")&&$("#jTabs_container li").eq($pNode.index()-1).click();
					$("#"+$pNode.attr("targetFrame")).remove();
					$pNode.remove();
				}
			});
			var $tab = this.init(opt);
			opt.isHome||$tab.append(closeBtn);
			$(".active",elm).removeClass("active");
			$(elm).append($tab);
		};
		$.Tab.prototype = {
			init:function(opt){
				opt.isHome||$("<iframe>",{
					id:opt.frameId,
					src:opt.url,
					width:"100%",
					height:"100%",
					frameBorder:"0",
					"scrolling":"no"
				}).appendTo("#frame_container");
				return $("<li>",{
					id:"li_"+opt.frameId,
					"targetFrame":opt.isHome?"home_ifm":opt.frameId,
					"targetUrl":opt.isHome?"_blank":opt.url,
					"class":"active",
					"title":opt.tabTitle,
					html:"<span class='tabs_title'>"+opt.tabTitle+"</span>",
					mouseover:this.mouseover,
					mouseout:this.mouseout,
					click:this.click
				});
			},
			mouseover:function(){
				$(this).addClass("tabOver");
			},
			mouseout:function(){
				$(this).removeClass("tabOver");
			},
			click:function(){
				var $tab = $(this);
				$tab.siblings(".active").removeClass("active");
				$("#frame_container iframe").hide();
				$("#"+$(this).attr("targetFrame")).show();
				$tab.removeClass("activeqq");
				$tab.addClass("active");
				var dc = $("#jTabs_container");
				var tabPos = ($tab.index()+1)*options.tabWidth;
				var ml = parseInt(dc.css("margin-left"));
				if(tabPos>-ml&&tabPos<(dc.attr("offsetWidth")-ml)){
					return;
				}else if(tabPos<=-ml){
					_index = $tab.index()+1;
					$("#"+options.toLeftBtnId).click();
				}else{
					_index = $tab.index()-1-dc.attr("offsetWidth")/options.tabWidth;
					$("#"+options.toRightBtnId).click();
				}
			},
			refresh:function(){
				
			}
		};
		var _defaults = {
			arrowBarId   : "jTabs_arrow_bar",
			toLeftBtnId  : "jTabs_left_btn",
			toRightBtnId : "jTabs_right_btn",
			showToolBar  : true,
			tabWidth:96
		};
		var options = $.extend(_defaults,options);
		this.add = function(opt){
			$("#frame_container iframe").hide();
			if($("#li_"+opt.frameId).length>0){
				$("#li_"+opt.frameId).click();
				return;
			}
			new $.Tab($("#jTabs_container"),{isHome:false,frameId:opt.frameId,url:opt.url,tabTitle:opt.tabTitle});
		};
		this.actFrameId = "";
		var toolBar = function(){
			var $tb = $("<div>",{id:"jTabs_Tool_bar"});
			$tb.append($("<div>",{id:"jTabs_down_menu"})).click(function(){
				$("#jTabs_down_menu").toggle().html("");
				$("#jTabs_container li").each(function(){
					var $li = $(this);
					var div = $("<div>",{
						"class":"down_menu_item",
						"url" : $li.attr("targetUrl"),
						"tId" : $li.attr("id"),
						html  : "<span class='down_menu_title'>"+$li.attr("title")+"</span>",
						click : function(){$("#"+$(this).attr("tId")).click();},
						mouseover : function(){$(this).addClass("over");},
						mouseout  : function(){$(this).removeClass("over");}
					});
					$("#jTabs_down_menu").append(div);
				});
			});
			return $tb;
		};
		var _index = 0;
		var arrowBar = function(){
			return $("<div>",{id:options.arrowBarId}).append($("<div>",{
				id:options.toLeftBtnId,
				click:function(){
					if(_index<1){
						_index=0;
						return;
					}else{
						_index = _index - 1;
						$("#jTabs_container").css({"margin-left":-_index*options.tabWidth});
					}
				}
			})).append($("<div>",{
				id:options.toRightBtnId,
				click:function(){
					if(_index>($("#jTabs_container li").length-2)){
						return;
					}else{
						_index = _index + 1;
						$("#jTabs_container").css({"margin-left":-_index*options.tabWidth});
					}
				}
			}));
		}
		return this.each(function(){
			$ctn = $(this);
			$ctn.append($("<div>",{id:"jTabs_left_border"}));
			var $ul = $("<ul>",{id:"jTabs_container"});
			new $.Tab($ul,{isHome:true,tabTitle:"首页"});
			$ctn.append($("<div>",{id:"jTabs_div_center"}).append($ul)).append(arrowBar()).append(toolBar());
		});
	};
})(jQuery);