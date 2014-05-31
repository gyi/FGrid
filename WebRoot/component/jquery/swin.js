/*
 * swin
 * 轻量级层，代码宗旨简洁、轻松、愉快、可控
 *
 * settings
 * obj: 对象或者html代码
 * id:对象id
 * w
 * h
 * drag 是否允许移动
 * closeBtn 是否左上角显示关闭按钮
 * onclose 关闭时回调事件
 * appendToObj 插入到的元素
 * update 是否每次调用都重新创建更新
 * style
 * new swin({id:"swin_001",obj:divHtml,title:'标题',w:560,h:360,closeBtn:false});
 */ 
(function($){
    function getEvent(evt){
        return (evt) ? evt : ((window.event) ? window.event : "");
    }
    swin = function(settings){
        settings = jQuery.extend({
            title:"",
            obj:"",
            id:"swin_box",//必须
            w:"600",
            h:"370",
            style:"",
            drag:true,
            onRefresh:null,
            closeBtn:true,
            onclose:function(){},
            appendToObj:document.body,
            update:true
        },settings);
        var $_swin = $("#"+settings.id);
        if(!settings.update&&$_swin.length>0){
            return $_swin;
        }
        settings.w = parseInt(settings.w,10)+"px";
        settings.h = parseInt(settings.h,10)+"px";
        if(settings.style == ""){
            settings.style = "TOP: 50%; LEFT: 50%;margin-top:-"+parseInt(settings.h,10)/2+"px;margin-left:-"+parseInt(settings.w,10)/2+"px;";
        }
        var _w = (parseInt(settings.w,10)-26)+"px";
        var _h = (parseInt(settings.h,10)-53)+"px";
        var _html = ['<DIV style="WIDTH: ',settings.w,'; HEIGHT: ',settings.h,'; ',settings.style,'" id="',settings.id,'" onselectstart="if(_swin_moveStatus){return false}" class="dialogBox">'
         ,'    <DIV class="dlg_header" id="',settings.id,'_header">'
         ,'       <DIV class="dlg_tr">'
         ,'           <DIV class="dlg_tc"  id="',settings.id,'_title">',settings.title,'</DIV>'
         ,'       </DIV>'
         ,'   </DIV>'
         ,'   <DIV class="dlg_refresh" id="',settings.id,'_refresh" ',settings.onRefresh==null?'style="display:none"':'','><A onfocus=this.blur(); title=刷新窗口 href="#"></A></DIV>'
         ,'   <DIV class="dlg_close" ',settings.closeBtn==true?'':'style="display:none"',' id="',settings.id,'_close"><A onfocus=this.blur(); title="关闭窗口" href="#" ></A></DIV>'
         ,'   <DIV class="dlg_middle" id="',settings.id,'_middle">'
         ,'       <DIV class="dlg_mr">'
         ,'           <DIV style="WIDTH:',_w,'; HEIGHT: ',_h,';overflow:auto" id="',settings.id,'_main" class="dlg_main">'
         ,'           </DIV>'
         ,'       </DIV>'
         ,'   </DIV>' 
         ,'   <DIV class="dlg_bottom"><DIV class="dlg_br"><DIV class="dlg_bc"></DIV></DIV></DIV>'
         ,'</DIV>']; 
         if(settings.update&&$_swin.length>0){
            $_swin.remove();
         }
         $_swin = $(_html.join("")); 
         $(settings.appendToObj).append($_swin); 
         $("#"+settings.id+"_main").append($(settings.obj)); 
         if(settings.closeBtn==true){
             $("#"+settings.id+"_close").click(function(){
                settings.onclose(this);
                $_swin.hide();
             });
         }
         if(settings.onRefresh!=null){
             $("#"+settings.id+"_refresh").click(function(){
                settings.onRefresh($("#"+settings.id+"_main"),$_swin);
             });
         }
         if(settings.drag){
            $("#"+settings.id+"_header").css("cursor","move");
            dragWinBindEvent(settings.id+"_header",settings.id);
         }
         return $_swin;
    }
    
    
    _swin_moveStatus = false;
    _swin_zindex = 1;
    //为要拖曳的窗口 捆绑事件 bindElem ：点什么进行拖曳   dragElem ：移动的窗口
    dragWinBindEvent = function(bindElem,dragElem){ 
        jQuery("#"+bindElem).unbind('mousedown')
        .bind('mousedown',function(){
            this.setCapture();
            jQuery("#"+dragElem).css({"z-index":_swin_zindex++});
            //if(winDrag == null){
                winDrag = DragAndDrop(dragElem);
            //}
            _swin_moveStatus = true;
            winDrag.MouseDownHandler(window.event||arguments.callee.caller.arguments[0]);
        });
    }
    //移动窗口(div/iframe) dragWindowId 窗口Id
    DragAndDrop = function(dragWindowId){
        var currentPos;
        var lastCoords;
        //要移动的窗口 DIV IFrame $("#divMoveFile");
        var divObj = jQuery("#"+dragWindowId);
        var dragMouseMoveHandler = function(evt){
            if(!evt){
                evt = getEvent(window.event);
            }
            
            // Updated the last coordinates.
            var currentCoords =  {
                x : evt.screenX,
                y : evt.screenY
            } ;
            currentPos =  {
                x : currentPos.x + ( currentCoords.x - lastCoords.x ),
                y : currentPos.y + ( currentCoords.y - lastCoords.y )
            } ;
            
            lastCoords = currentCoords ;  
            if(currentPos.x-parseInt(divObj.css('margin-left'),10)-30 > 0 && currentPos.y+parseInt(divObj.css('margin-top'),10)+22 > 0){
                divObj.css({"left":currentPos.x + 'px',"top":currentPos.y + 'px'});
            }
        }
        
        return {
            MouseDownHandler:function(evt,o){
                if(!evt){
                    evt = getEvent(window.event);
                }
                lastCoords =  {
                    x : evt.screenX,
                    y : evt.screenY
                } ;
    
                // Save the current IFRAME position.  .css("left")  .css("top"
                currentPos =  {
                    x : parseInt(divObj.position().left,10),
                    y : parseInt(divObj.position().top,10)
                } ;
                
                jQuery(document).bind("mousemove",function(){
                    dragMouseMoveHandler(getEvent(window.event));
                });
                
                jQuery(document).bind('mouseup',function(){
                    this.releaseCapture();
                    _swin_moveStatus = false;
                    jQuery(document).unbind("mousemove");
                    jQuery(document).unbind("mouseup");
                });
            }
        }
    };
        
})(jQuery);

