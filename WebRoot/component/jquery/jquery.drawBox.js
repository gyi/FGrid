;(function($) {

    //var urlBase = "http//192.168.1.4:8080/ryx/";//可以为空，为空时是相对路径,如果要是绝对路径请注意结尾有"/"
    var urlBase = "";
    // 参数说明
    //  html 保存后的信息 包括背景图片、图形元素和描述DIV。长宽位置等信息时 实际尺寸，初始化后会转成适合的尺寸，并生成div列表。
    //  name 生成的变量应用名称，用于注册事件。
    //  bgImageSrc 背景图片地址，1、没有html或html为空时,bgImageSrc用于生成背景图片。  2、当html中已经存在背景图片时，此属性无用。
    //  edit false 不能编辑 true(默认)可以编辑
    $.fn.drawBox = function(op){
        var $drawBox = this;
        var drawBoxid = "zml_drawbox_div";
        var htmlarray = ['<table  id="',drawBoxid,'_all" style="width:100%;height:100%;position:absolute;top:0px;left:0px;background-color:#FFF;z-index:1"  border="0" cellpadding="0" cellspacing="0" >',
                        '<tr>',
                        '   <td style="height:36px;" colspan="2" valign="middle">',
                        '       <ul id="',drawBoxid,'_toolbar"  class="zml_drawbox_bar" >',
                        op.edit==false?'':'         <li optype="move" onclick="'+op.name+'.setBarType(this)" title="移动" style="background-position-y:-64;" class="move"></li>',
                        op.edit==false?'':'         <li optype="pen" onclick="'+op.name+'.setBarType(this)" title="钢笔" class="pen"></li>',
                        op.edit==false?'':'         <li optype="oval" onclick="'+op.name+'.setBarType(this)" title="画圆" class="oval"></li>',
                        op.edit==false?'':'         <li optype="rect" onclick="'+op.name+'.setBarType(this)"  title="画方" class="rect"></li>',
                        op.edit==false?'':'         <li optype="word" onclick="'+op.name+'.setBarType(this)"  title="文字" class="word"></li>',
                        op.edit==false?'':'         <li optype="ys"   onclick="'+op.name+'.setBarType(this)" title="样式刷" class="ys"></li>',
                        op.edit==false?'':'         <li optype="del" onclick="'+op.name+'.setBarType(this)" title="橡皮擦" class="del"></li>',
                        op.edit==false?'':'         <li class="fg"></li>',
                        '           <li optype="fd" onclick="',op.name,'.gozoom(\'fd\')" title="放大"  class="fd"></li>',  
                        '           <li optype="sx" onclick="',op.name,'.gozoom(\'sx\')" title="缩小"  class="sx"></li>',
                        '           <li optype="sh" onclick="',op.name,'.gozoom(\'sh\')" title="适合大小显示"  class="sh"></li>',  
                        '           <li optype="sj" onclick="',op.name,'.gozoom(\'sj\')" title="实际大小显示"  class="sj"></li>',
                        '           <li optype="max" onclick="',op.name,'.gozoom(\'maxmin\',this)" curType="max" title="最大化，需要更大按[F11]" class="max"></li>', 
                        op.edit==false?'':'         <li optype="cx" onclick="'+op.name+'.cx()" title="撤销[Ctrl-Z]" class="cx" style="display:none"></li>',
                        op.edit==false?'':'         <li optype="fcx" onclick="'+op.name+'.fcx()"  title="反撤销[Ctrl-Y]" class="fcx" style="display:none"></li>',
                        op.edit==false?'':'         <li class="colorSize" style="padding-left:5px;padding-top:5px;width:200px;"><div id="lineColor" style="cursor:pointer;width:24px;height:24px;border:1px #BBB solid;background-color:#F00;float:left;" title="选择颜色"></div><input type="text" name="'+drawBoxid+'_lineSelectBox" id="'+drawBoxid+'_lineSelectBox" value="1"></li>',
                        '       </ul>', 
                        '   </td>' ,
                        '</tr>',
                        '<tr>',
                        '   <td  style="width:100%">',
                        '       <div id="',drawBoxid,'" class="zml_drawbox_divs" style="width:100%;height:100%;position:relative;top:0px;left:0px;overflow:auto;border:1px #ccc solid;border-left:none" >',
                        '           <v:group id="',drawBoxid,'_group" style="width:10000px;height:10000px;position:absolute;top:0px;left:0px;" coordSize="10000,10000">',
                        '</v:group>',
                        '  <div id="resizeDiv" style="border:1px dashed #666;width:200px;height:100px;position:absolute;top:0px;left:0px;display:none;z-index:999999;background:transparent">',
  						'     <div id="resizeDiv_nw"  style="border:1px solid #666;width:6px;height:6px;line-height:1px;position:absolute;top:-3px;left:-3px;cursor:nw-resize;"></div> ',
 						'     <div id="resizeDiv_ne"  style="border:1px solid #666;width:6px;height:6px;line-height:1px;position:absolute;top:-3px;right:-3px;cursor:ne-resize;"></div> ',
 						'     <div id="resizeDiv_sw"  style="border:1px solid #666;width:6px;height:6px;line-height:1px;position:absolute;bottom:-3px;left:-3px;cursor:sw-resize;"></div> ',
 					    '     <div id="resizeDiv_se"  style="border:1px solid #666;width:6px;height:6px;line-height:1px;position:absolute;bottom:-3px;right:-3px;cursor:se-resize;"></div>',
                        '   </div></td><td style="width:150px;',op.showlist==false?'display:none':'','" ><div style="width:150px;border:1px #ccc solid;border-left:none;height:100%;overflow:auto;" ><ul class="zml_drawbox_list_ul"  style="width:100%;" id="',drawBoxid,'_list"></ul></div></td> ',
                        '</tr>',
                        '</table>',
                        '<div class="contextMenu" id="',drawBoxid,'_myRightMenu1" style="display:none;">',
                        '<ul>',
                        '<li id="edit" style="line-height:20px;border-bottom:1px #CCC solid" ><div class="rightMenuEdit"></div>编辑</li>',
                        '<li id="delete" style="line-height:20px;border-bottom:1px #CCC solid" ><div class="rightMenuDelete"></div>删除</li>',
                        '<li id="cancel" style="line-height:20px;border-bottom:1px #CCC solid" ><div class="rightMenuCancel"></div>取消</li>',
                        '</ul>',
                        '</div>'
            ];


        var $html = $(htmlarray.join('')); 
        var $table_all = $('#'+drawBoxid+'_all');
        if( $table_all.length > 0 ){
            $table_all.remove();
            $('#' + drawBoxid + '_mask_div').remove();
            $('#' + drawBoxid + '_myRightMenu1').remove();
        }
        $drawBox.append($html).append($('<div id="' + drawBoxid + '_mask_div" style="width:100%;height:100%;position:absolute;top:0px;left:0px;background-color:#FFF;z-index:2"><div style="position:absolute;width:300px;height:90px;left:50%;top:50%;margin-left:-150px;background:url('+urlBase+'images/vml/loading.gif) center 0 no-repeat; margin-top:-45px;text-align:center"><span style="position:absolute;left:82px;bottom:0px;">请稍候，工艺单正在写入中...</span></div><div>'));
        
        $("#"+drawBoxid+"_group").html(op.html);

        var $div = $("#" + drawBoxid); 
        $div.data("evalName",op.name);
        var $gr  =  $("#" + drawBoxid+ '_group');
        var group = $gr[0]; 
        var oldx = group.coordsize.x;
        var oldy = group.coordsize.y;
        var op_history = new Array();;
        var op_history_index = -1;

        $div.data('zoom_value',1);
        var zoom_value = 1;
        var curOp = "move";

        //注册按钮事件
        $("#"+drawBoxid+"_toolbar li[optype]").hover(
              function () {
                if($div.data('curOp')==this.optype){
                    return;
                }
                this.style.backgroundPositionY="-32"; 
              },
              function () {
                if($div.data('curOp')==this.optype){
                    return;
                } 
                this.style.backgroundPositionY="0"; 
              }
            ); 
        

        var ev = {
            setBarType:function(obj){ 
                if(obj.optype=="move"){
                    $div[0].style.cursor = "";
                    group.style.cursor = "move";
                    var bgImage = document.getElementById(drawBoxid + '_bgImage');
                    bgImage.style.cursor = "url("+urlBase+"images/vml/hand.cur)"; 
                }else{
                    if(obj.optype=="pen"){
                        $div[0].style.cursor = "url("+urlBase+"images/vml/pen.ani)";
                    }else if(obj.optype=="del"){
                        $div[0].style.cursor = "url("+urlBase+"images/vml/del.ani)";  
                    }else if(obj.optype=="word"){
                        $div[0].style.cursor = "text";  
                    }else if(obj.optype=="ys"){
                        $div[0].style.cursor = "url("+urlBase+"images/vml/ys.ani)"; 
                    }else{
                        $div[0].style.cursor = ""; 
                    }
                    document.body.style.cursor = ""; 
                    group.style.cursor = "";
                    var bgImage = document.getElementById(drawBoxid + '_bgImage');
                    bgImage.style.cursor = "";  
                    
                }
                var editDiv = document.getElementById($div[0].id+"_noteEdit"); 
                if(editDiv){editDiv.style.display='none'}
                var curli = $("#"+drawBoxid+"_toolbar li[optype="+$div.data('curOp')+"]")[0]; 
                curli.style.backgroundPositionY="0";
                obj.style.backgroundPositionY="-64";
                curOp = obj.optype;
                $div.data('curOp',obj.optype);
                $("#resizeDiv").css({"display":"none"});
            }, 
            gozoom:function(type,btn){
                $("#resizeDiv").css({"display":"none"});
                var x = group.coordsize.x;
                var y = group.coordsize.y;
                if(type == "maxmin"){
                    if("min"==btn.curType){ 
                        btn.curType = "max"; 
                        btn.optype = "max";
                        btn.className = "max";
                        $drawBox.append($html); 
                    }else{ 
                        btn.curType = "min";
                        btn.optype = "min";
                        btn.className = "min";
                        $html.appendTo(document.body); 
                    }
                }else{
                    if( type == "fd"){  
                        group.coordsize = x/1.5 + ","+ y/1.5; 
                        $div[0].scrollLeft = Math.round($div[0].scrollLeft*1.5);
                        $div[0].scrollTop = Math.round($div[0].scrollTop*1.5);
                    }else if(type == "sx"){
                        group.coordsize = x*1.5 + ","+ y*1.5;
                        $div[0].scrollLeft = Math.round($div[0].scrollLeft/1.5);
                        $div[0].scrollTop = Math.round($div[0].scrollTop/1.5);
                    }else if(type == "sh"){//初始化后自动设置为合适尺寸
                        var bgImage = document.getElementById(drawBoxid + '_bgImage');
                        var sjW = bgImage.sjW;
                        var sjH = bgImage.sjH; 
                        var dw = parseInt($div.width(),10); 
                        var dh = parseInt($div.height(),10);
                        var bili = Math.max(sjH/dh,sjW/dw);
                        if(bili>1){ 
                            group.coordsize = oldx*bili + ","+ oldy*bili;
                        }
                    }else if(type == "sj"){
                        group.coordsize = oldx + ","+ oldy;
                    }  
                    zoom_value = (oldx/group.coordsize.x).toFixed(4);  
                    var editDiv = document.getElementById($div[0].id+"_noteEdit");
                    if( editDiv && editDiv.style.display!="none" ){
                        var obj = document.getElementById(document.getElementById($div[0].id+"_noteEdit_objId").value);
                        var b = 0;
                        if(obj.strokeweight && !isNaN(parseInt(obj.strokeweight,10))){
                            b=parseInt(obj.strokeweight,10);
                        }
                        editDiv.style.left = Math.round((parseInt(obj.style.left,10) + parseInt(obj.style.width ,10))*zoom_value) + b;
                        editDiv.style.top = Math.round((parseInt(obj.style.top ,10) + parseInt(obj.style.height,10))*zoom_value) + b;   
                    } 
                    var notes = group.getElementsByTagName("DIV");
                    for(var i=0;i<notes.length;i++){
                        var note = notes[i];
                        if(note.id==$div[0].id+"_noteEdit"){continue;}
                        var obj = document.getElementById(note.objId); 
                        var b = 0;
                        if(obj.strokeweight && !isNaN(parseInt(obj.strokeweight,10))){
                            b=parseInt(obj.strokeweight,10);
                        }
                        note.style.left = Math.round((parseInt(obj.style.left,10) + parseInt(obj.style.width ,10))*zoom_value) + b;
                        note.style.top = Math.round((parseInt(obj.style.top ,10) + parseInt(obj.style.height,10))*zoom_value) + b;
                    }
                    $div.data('zoom_value',zoom_value);  
                    if(op_history_index == -1&&!(op.edit==false)){ev.addHistory()};
                }
            },
            showNoteEdit:function(obj,curOp) { 
                var b = 0;
                if(obj.strokeweight && !isNaN(parseInt(obj.strokeweight,10))){
                    b=parseInt(obj.strokeweight,10);
                }
                var left = Math.round((parseInt(obj.style.left,10) + parseInt(obj.style.width ,10)) * zoom_value) + b;
                var top  = Math.round((parseInt(obj.style.top ,10) + parseInt(obj.style.height,10)) * zoom_value) + b;  
                var bgImage = document.getElementById(drawBoxid + '_bgImage');
                bgImage.zz=parseInt(bgImage.zz,10)+1;
                var editDiv = document.getElementById($div[0].id+"_noteEdit"); 
                if( !editDiv ){ 
                    var zihao = new Array();
                    var zh = [9,11,12,14,16,18,23,28,32,40,46,50,58,66,74,86,92,100];
                    for(var i=0;i<zh.length;i++){
                        zihao.push("<option value ='");
                        zihao.push(zh[i]);
                        zihao.push("px' "); 
                        if(zh[i]==16)zihao.push(" selected='selected'"); 
                        zihao.push(">");
                        zihao.push(zh[i]);
                        zihao.push("</option>");
                    } 
                    editDiv = $div[0].appendChild(
                             document.createElement("<div id='"+$div[0].id+"_noteEdit' style='position:absolute;left:"+left+";top:"+top+";width:235px;height:135px;display:none;background-color:#FFF;z-index:999999;border:1 solid #08347B;'/>"));
                    editDiv.innerHTML = ["<textarea id='"+$div[0].id+"_noteEdit_textarea'  name='"+$div[0].id+"_noteEdit_textarea' style='fontWeight:normal;color:red;font-size:16px;border:none;border-bottom:1 solid #A5C7E7;width:230px;height:100px;'></textarea>"
                                        ,"<div style='padding:3px 1px 0px 1px'><button  id='"+$div[0].id+"_noteEdit_close' onclick=\"document.getElementById('"+$div[0].id+"_noteEdit').style.display='none';closeIColorPicker();\" style='margin-left:4px;cursor:pointer;float:right;'>关闭</button><button  id='"+$div[0].id+"_noteEdit_ok' style='margin-left:4px;cursor:pointer;float:right;' onclick=\""+op.name+".saveNoteEdit()\" >确定</button>"
                                        ,"<label  id='"+$div[0].id+"_noteEdit_label' style='font-size:12px;float:right;display:inline;'>&nbsp;大小"
                                        ,"<select id='"+$div[0].id+"_noteEdit_fontsize' onchange=\"document.getElementById('"+$div[0].id+"_noteEdit_textarea').style.fontSize=this.value;\" >"
                                        ,zihao.join('')
                                        ,"</select></label><div id='"+$div[0].id+"_noteEdit_wordColor' style='width:18px;height:18px;border:1px #BBB solid;background-color:#F00;cursor:pointer;float:right;display:inline;' title='选择颜色'></div><label for='"+$div[0].id+"_noteEdit_isBold' style='cursor:pointer;float:right;'><input type='checkbox' name='"+$div[0].id+"_noteEdit_isBold' id='"+$div[0].id+"_noteEdit_isBold' onclick=\"document.getElementById('"+$div[0].id+"_noteEdit_textarea').style.fontWeight = this.checked ?'bold':'normal';\" style='cursor:pointer;'/>加粗&nbsp;</label>"
                                        ,"<input type='hidden' id='"+$div[0].id+"_noteEdit_zz' name='"+$div[0].id+"_noteEdit_zz' value='"+bgImage.zz+"' >"
                                        ,"<input type='hidden' id='"+$div[0].id+"_noteEdit_objId' name='"+$div[0].id+"_noteEdit_objId' value='"+obj.id+"' >"
                                        ,"<input type='hidden' id='"+$div[0].id+"_noteEdit_curOp' name='"+$div[0].id+"_noteEdit_curOp' value='"+curOp+"' >"
                                        ,"</div>"].join('');
                                        
                    var $wordColor = $("#"+$div[0].id+"_noteEdit_wordColor");
                    var changeColor = function(event,c){
                        document.getElementById($div[0].id+"_noteEdit_textarea").style.color = c;
                    }
                    $wordColor.bind("changeColor",changeColor); 
                    iColorPicker($wordColor);
                } else {
                    document.getElementById($div[0].id+"_noteEdit_textarea").value = "";
                    document.getElementById($div[0].id+"_noteEdit_zz").value = bgImage.zz;
                    document.getElementById($div[0].id+"_noteEdit_objId").value = obj.id;
                    document.getElementById($div[0].id+"_noteEdit_curOp").value = curOp;
                    editDiv.style.left = left;
                    editDiv.style.top = top;

                } 
                var editArea = document.getElementById($div[0].id+"_noteEdit_textarea");//
                var noteDiv = $("#"+obj.id+"_note");
                if(noteDiv.length>0){
                    editArea.style.fontSize = noteDiv[0].style.fontSize;
                    editArea.style.color = noteDiv[0].style.color;
                    editArea.style.fontWeight = noteDiv[0].style.fontWeight; 
                    editArea.innerText = noteDiv[0].innerText;
                    document.getElementById($div[0].id+"_noteEdit_fontsize").value = noteDiv[0].style.fontSize;
                    document.getElementById($div[0].id+"_noteEdit_wordColor").style.backgroundColor = noteDiv[0].style.color;
                    document.getElementById($div[0].id+"_noteEdit_isBold").checked = noteDiv[0].style.fontWeight=='bold'?true:false;
                    document.getElementById($div[0].id+"_noteEdit_zz").value = noteDiv.css('z-index');
                }
                editDiv.style.display = "";
                editArea.focus();
            },
            saveNoteEdit:function(){
                var editDiv = document.getElementById($div[0].id+"_noteEdit");
                var left = editDiv.style.left;
                var top = editDiv.style.top;
                var zz = document.getElementById($div[0].id+"_noteEdit_zz").value;
                var objId = document.getElementById($div[0].id+"_noteEdit_objId").value;
                var curOp = document.getElementById($div[0].id+"_noteEdit_curOp").value;

                var area = document.getElementById($div[0].id+"_noteEdit_textarea");
                closeIColorPicker();
                if(area.value == ""){
                    editDiv.style.display = 'none';
                    return;
                }
                
                var fontdiv = document.getElementById(objId+"_note");
                if(!fontdiv){ 
                    fontdiv = group.appendChild(document.createElement("<div id='"+objId+"_note' objId='"+objId+"' op='"+curOp+"'  style='border:1px #ccc solid;position:absolute;left:"+left+";top:"+top+";color:red;background-color:#F7F7F7;z-index:"+zz+";'/>"));
                    ev.regMenu($(fontdiv));
                }
                fontdiv.style.fontSize = area.style.fontSize;
                fontdiv.style.fontWeight = area.style.fontWeight;
                fontdiv.style.color = area.style.color;
                fontdiv.old_color = area.style.color;
                fontdiv.innerText = area.value;
                var fontli = document.getElementById(objId+"_note_li");
                if(!fontli){
                    var $list = $("#"+$div[0].id+"_list");
                    var $li = $(["<li id='"+objId+"_note_li' divId='"+objId+"_note' objId='"+objId+"' class='",curOp,"'>",area.value,"</li>"].join(''));
                    $list.append($li); 
                    $li.hover(
                      function () {
                        $(this).css({'background-color':'#DEE7FF','border':'1px #BDD3F7 solid'});
                      },
                      function () {
                        $(this).css({'background-color':'','border':'none','border-bottom':'1px #BDD3F7 solid'});
                      }
                    );
                    $li.click(function(){
                        var divC = $("#"+this.divId).attr('old_color');
                        $("#"+this.divId).css('color','#EEE').stop().animate({ 'color': divC}, 300).animate({ 'color': '#EEE'}, 300).animate({ 'color': divC}, 300); 
                        if($("#"+this.objId).css('display')=="none"){ 
                            return;
                        }
                        var objC = $("#"+this.objId).attr('old_strokecolor'); 
                        objC=new String(objC).toString();
                        $("#"+this.objId).attr('strokecolor','#EEE').stop().animate({ 'strokecolor': objC}, 300).animate({ 'strokecolor': '#EEE'}, 300).animate({ 'strokecolor': objC}, 300); 
                    });
                }else{
                    fontli.innerHTML = area.value;
                }
                editDiv.style.display = 'none'; 
                ev.addHistory();
            },
            refreshNoteList:function(){
                var $divs = $gr.find("div");
                var $list = $("#"+$div[0].id+"_list");
                $list.html('');
                for(var i=0;i<$divs.length;i++){
                    var $li = $(["<li id='"+$divs[i].id+"_li' divId='"+$divs[i].id+"' objId='"+$divs[i].objId+"' class='",$divs[i].op,"'>",$divs[i].innerText,"</li>"].join(''));
                    $list.append($li); 
                    $li.hover(
                      function () {
                        $(this).css({'background-color':'#DEE7FF','border':'1px #BDD3F7 solid'});
                      },
                      function () {
                        $(this).css({'background-color':'','border':'none','border-bottom':'1px #BDD3F7 solid'});
                      }
                    );
                    $li.click(function(){ 
                        var divC = $("#"+this.divId).attr('old_color');
                        divC=new String(divC).toString();
                        $("#"+this.divId).css('color','#EEE').stop().animate({ 'color': divC}, 300).animate({ 'color': '#EEE'}, 300).animate({ 'color': divC}, 300); 
                        if($("#"+this.objId).css('display')=="none"){ 
                            return;
                        }
                        var objC = $("#"+this.objId).attr('old_strokecolor'); 
                        objC=new String(objC).toString();
                        $("#"+this.objId).attr('strokecolor','#EEE').stop().animate({ 'strokecolor': objC}, 300).animate({ 'strokecolor': '#EEE'}, 300).animate({ 'strokecolor': objC}, 300); 
 
                    });
                } 
                if(op.edit==false){return;}
                ev.regMenu($divs); 
                ev.regMenu($gr.find("rect")); 
                ev.regMenu($gr.find("oval")); 
                
            },
            edit_note:function(edit_obj){
                 if(edit_obj.tagName == "DIV"){
                    var obj = document.getElementById(edit_obj.objId);
                    ev.showNoteEdit(obj,obj.op);
                 }else{
                    ev.showNoteEdit(edit_obj,edit_obj.op);
                 }

            },
            removeObj:function(delObj){
                if(delObj.id.indexOf('bgImage')==-1){
                    if(delObj.tagName == "DIV"){
                        $("#"+delObj.objId).remove();
                        $("#"+delObj.id+"_li").remove();
                    }
                    var delObjDiv = $("#"+delObj.id+"_note");
                    if(delObjDiv){
                        delObjDiv.remove();
                        $("#"+delObjDiv.attr('id')+"_li").remove();
                    } 
                    $(delObj).remove();
                    ev.addHistory();
                }   
            },
            regMenu:function(edit_obj){
                edit_obj.contextMenu(drawBoxid+'_myRightMenu1', {
                  bindings: {
                    'edit': function(t) {
                       ev.edit_note(t);
                    },
                    'delete': function(t) {
                       ev.removeObj(t);
                    },
                    'cancel': function(t) {
                       
                    }
                  }
                });
            },
            toStyleObj:function(styleObj){
                if(styleObj.id.indexOf('bgImage')==-1&&styleObj.tagName != "DIV"){ 
                    styleObj.strokecolor =$div[0].curColor; 
                    styleObj.old_strokecolor =$div[0].curColor; 
                    styleObj.strokeweight=$div[0].curSize; 
                    ev.addHistory();
                }   
            }, 
            cx:function(){   
                if(op_history_index<=0){
                    return;
                }
                op_history_index--; 
                var his = op_history[op_history_index];
                $div.html(his.html);
                $div.data('zoom_value',his.zoomValue);
                document.getElementById(drawBoxid + '_bgImage').zz = his.curzz;
                zoom_value=his.zoomValue; 
                $div[0].curSize = his.curSize;
                $div[0].scrollLeft = his.scrollLeft;
                $div[0].scrollTop = his.scrollTop;
                $div[0].style.overflow = his.divOverflow;
                $gr  =  $("#" + drawBoxid+ '_group');
                group = $gr[0];  
                var curli = $("#"+drawBoxid+"_toolbar li[optype="+curOp+"]")[0];  
                ev.setBarType(curli);
                ev.refreshNoteList();
                ev.setCX_FCX_btn();
            }, 
            fcx:function(){
                if(op_history_index+1>=op_history.length){
                    return;
                } 
                op_history_index++;
                var his = op_history[op_history_index];
                $div.html(his.html);
                $div.data('zoom_value',his.zoomValue);
                document.getElementById(drawBoxid + '_bgImage').zz = his.curzz;
                zoom_value = his.zoomValue;
                $div[0].curSize = his.curSize;
                $div[0].scrollLeft = his.scrollLeft;
                $div[0].scrollTop = his.scrollTop;
                $div[0].style.overflow = his.divOverflow;
                $gr   = $("#" + drawBoxid+ '_group');
                group = $gr[0];  
                var curli = $("#"+drawBoxid+"_toolbar li[optype="+curOp+"]")[0]; 
                ev.setBarType(curli);
                ev.refreshNoteList();
                ev.setCX_FCX_btn();
            },
            addHistory:function(){  
	            if(op.edit==false){
	                return;
	            }
                if(op_history_index<op_history.length-1){ //当在撤销状态时重新操作，记录新操作的信息，并删除之后的重做信息
                    op_history.splice(op_history_index+1,op_history.length-1-op_history_index);
                }
                op_history.push({ //部分信息可以用outerHTML时 省去记录.//这里用innerHTML需要记录全
                    "html":$div.html(), //vml对象元素代码 
                    "divOverflow":$div[0].style.overflow,
                    "curSize":$div[0].curSize,//定义画笔基本粗度
                    "curColor":$div[0].curColor,//定义画笔基本颜色
                    "scrollLeft":$div[0].scrollLeft,//div滚动条位置
                    "scrollTop":$div[0].scrollTop,//div滚动条位置 
                    "zoomValue":zoom_value,//当前比例 
                    "curzz":document.getElementById(drawBoxid + '_bgImage').zz//当前z轴高度 
                });
                op_history_index++;  
                ev.setCX_FCX_btn();
            },
            setCX_FCX_btn:function(){
                //if($("#"+drawBoxid+"_toolbar li[optype=cx]").length>0){
	                var cxBtn = $("#"+drawBoxid+"_toolbar li[optype=cx]")[0]; 
	                var fcxBtn = $("#"+drawBoxid+"_toolbar li[optype=fcx]")[0]; 
	                if(op_history_index<=0){
	                    cxBtn.style.display= 'none';
	                }else{
	                    cxBtn.style.display= '';
	                }
	                if(op_history_index >= op_history.length-1){
	                    fcxBtn.style.display= 'none';
	                }else{
	                    fcxBtn.style.display= '';
	                }
                //}
            },
            getVmlHTML:function(){
              return $('#'+drawBoxid+'_group').html();
            },
            setVmlHTML:function(str){
              return $('#'+drawBoxid+'_group').html(str);
            },
            appendImg:function(url,width,height){
                var idSuffix = "_"+new Date().getTime()+"_"+parseInt(100*Math.random(),10);
                var style = ""; 
                var noSize = false;
                if(width&&!isNaN(parseInt(width,10))){style+="width:"+width*zoom_value+"px;"}else{
                	noSize=true;
                }
                if(height&&!isNaN(parseInt(height,10))){style+="height:"+height*zoom_value+"px;"}else{
                	noSize=true;
                }
                if(noSize){
                	var mishuTestimg = new Image();
		            var $mishuTestimg = $(mishuTestimg);
		            $mishuTestimg.bind('load',function (){
		                var sjH = mishuTestimg.height;
		                var sjW = mishuTestimg.width;  
		                $gr.append($('<v:image id="'+drawBoxid + '_img_'+idSuffix+'"  src="'+url+'" style="position:absolute;top:0;left:0;width: '+sjW*zoom_value+'; height: '+sjH*zoom_value+';" />'));  
		                $mishuTestimg.remove();  
		            }).bind('abort error',function(){alert("异常：插入图片失败！网络超时！"); });
		            mishuTestimg.src = url;	
                }else{
                	$gr.append($('<v:image id="'+drawBoxid + '_img_'+idSuffix+'" src="'+url+'" style="position:absolute;z-index:2;top:0;left:0;'+style+'" />'));
                }
                
                
            }
        };

        if(op.edit!=false){
            $(document).keydown(function(e){
                //dcoument.title = e.which; 
                if(e.ctrlKey && e.which == 90) {   //Ctrl+Z 
                    ev.cx();
                } else if (e.ctrlKey && e.which==89) {//Ctrl+Y 
                    ev.fcx();
                }     
            });
        }
        
        //获得实际尺寸.
        //1、新图片地址（html属性为空的） 需要 append后 onload后获得 width 和 height
        //2、存在html属性，直接在html上获取       
        if(!op.html||op.html==""){
	        if(!op.bgImageSrc){
	           op.bgImageSrc = "images/g.gif";
	        }
            var mishuTestimg = new Image();
            var $mishuTestimg = $(mishuTestimg);
            $mishuTestimg.bind('load',function (){
                var sjH = mishuTestimg.height;
                var sjW = mishuTestimg.width;  
                $gr.append($('<v:image id="'+drawBoxid + '_bgImage" sjW="'+sjW+'" sjH="'+sjH+'" zz="0" src="'+op.bgImageSrc+'" style="cursor:url('+urlBase+'images/vml/hand.cur);position:absolute;top:0;left:0;width: '+sjW+'; height: '+sjH+';" />'));
                $div[0].style.overflow = 'auto';
                group.style.cursor = "move";
                $mishuTestimg.remove();
                $.drawBoxEvent($div,ev);
                window.setTimeout(function(){ev.gozoom('sh')},0);
                document.getElementById(drawBoxid + '_mask_div').style.display = 'none';
            }).bind('abort error',function(){alert("异常：加载图片失败！网络超时！"); document.getElementById(drawBoxid + '_mask_div').style.display = 'none';});
            mishuTestimg.src = op.bgImageSrc;
        }else{
            var bgImage = document.getElementById(drawBoxid + '_bgImage'); 
            bgImage.style.width = bgImage.sjW;
            bgImage.style.height = bgImage.sjH;
            $.drawBoxEvent($div,ev);
            group.style.cursor = "move";
            ev.refreshNoteList();
            window.setTimeout(function(){ev.gozoom('sh')},0);
            document.getElementById(drawBoxid + '_mask_div').style.display = 'none'; 
        }
        

        return ev;
    }

    

    $.drawBoxEvent = function(drawbox_div,evalObj){ 
        var poly1,oldvalue,oval,rect,wordoval; 
        var moveObj;
        var $div = drawbox_div;
        var evalName = $div.data("evalName"); 
        var bgImage = document.getElementById($div[0].id + '_bgImage');  
        var xx = 0;
        var yy = 0;
        var subX = 0;
        var subY = 0;
        var ysTop = 0;
        var ysLeft = 0;
        var ysW = 0;
        var ysH= 0;
        $div[0].curSize='1'//定义画笔基本粗度
        $div[0].curColor='red';//定义画笔基本颜色
        var tempx = 0;
        var tempy = 0;
        var zoom_value = 1;
        var begin = false;
        var $resizeDiv = $("#resizeDiv");
        var curResize;
        $div.data("curOp","move");
        //鼠标按下
        function msDown() {
            if( event.button == 1 ){   
                if(event.srcElement.id && event.srcElement.id.indexOf($div[0].id+"_noteEdit")>=0){
                    return true;
                }
                var editDiv = document.getElementById($div[0].id+"_noteEdit");
                if(editDiv && editDiv.style.display!="none"){ 
                    return true;
                }
                begin = true;
                var idSuffix = "_"+new Date().getTime()+"_"+parseInt(100*Math.random(),10);
                var curOp = $div.data("curOp");  
                if(editDiv){editDiv.style.display='none'}
                $div[0].setCapture();       //画笔绘画开始，锁定鼠标
                if ( curOp == "move" ){
                     moveObj = event.srcElement; 
            	     curResize = null;
                     if( event.srcElement==$div[0]){
                     	 $resizeDiv.css({"display":"none"});
                         return false;
                     } 
                     zoom_value = $div.data('zoom_value');  
                     if( !moveObj || moveObj.id.indexOf('bgImage')>0  || moveObj.tagName=='shape'){
                     	$resizeDiv.css({"display":"none"});
                        document.body.style.cursor = "url("+urlBase+"images/vml/hand_down.cur)"; 
                        ysTop = $div[0].scrollTop;
                        ysLeft = $div[0].scrollLeft;
                        subX = event.x;
                        subY = event.y;
                        return;
                     }else{ 
                     	var  temObj = moveObj;
                     	if(temObj.id.indexOf("resizeDiv")==0){
                        	moveObj = $resizeDiv.data("resizeObj");
                     	}
                     	if(temObj.id.indexOf("resizeDiv_")==0){
                     		curResize = temObj.id;
	                        ysTop = parseInt(moveObj.style.top,10);
	                        ysLeft = parseInt(moveObj.style.left,10);
	                        ysW = parseInt(moveObj.style.width,10);
	                        ysH = parseInt(moveObj.style.height,10);
                     	}else{ 
                     		if( moveObj.tagName=='DIV' ){
	                            subX = event.x + $div[0].scrollLeft - parseInt(moveObj.style.left,10);
	                            subY = event.y + $div[0].scrollTop  - parseInt(moveObj.style.top,10);
	                        }else{
	                            subX = Math.round((event.x + $div[0].scrollLeft)/zoom_value - parseInt(moveObj.style.left,10));
	                            subY = Math.round((event.y + $div[0].scrollTop)/zoom_value  - parseInt(moveObj.style.top,10));
	                        }
	                        if(moveObj.tagName=='image' ){
	                        	$resizeDiv.data("resizeObj",moveObj);
		                        $resizeDiv.css({"display":"block","top":parseInt(moveObj.style.top,10)*zoom_value,"left":parseInt(moveObj.style.left,10)*zoom_value,"width":parseInt(moveObj.style.width,10)*zoom_value,"height":parseInt(moveObj.style.height,10)*zoom_value});
	                        }else{
	                        	$resizeDiv.css({"display":"none"});
	                        }
                     	}
                     }
                } else if( curOp == "del" ){ 
                    if( event.srcElement==$div[0]){
                        return false;
                    } 
                    var delObj = event.srcElement;  //被删除的对象
                    evalObj.removeObj(delObj);
                } else if( curOp == "ys" ){ 
                    if( event.srcElement==$div[0]){
                        return false;
                    } 
                    var styleObj = event.srcElement;  //被更新颜色的对象
                    evalObj.toStyleObj(styleObj);
                } else if ( curOp == "pen" ){ 
                     color1="red";  //定义画笔基本颜色
                     size1=1;  //定义画笔基本粗度
                     zoom_value = $div.data('zoom_value');  
                     xx=Math.round((event.x+$div[0].scrollLeft)/zoom_value);
                     yy=Math.round((event.y+$div[0].scrollTop)/zoom_value);   
                     bgImage.zz=parseInt(bgImage.zz,10)+1;  //定义基本起始坐标,bgImage.zz是第三维,默认递增
                     poly1 = document.getElementById($div[0].id+"_group").appendChild(document.createElement("<v:shape id='"+$div[0].id+idSuffix+"' filled=false path='m"+xx+","+yy+" l"+xx+","+yy+"' style='position:absolute;z-index:"+bgImage.zz+";width:500px;height:500px' strokecolor='"+$div[0].curColor+"' old_strokecolor='"+$div[0].curColor+"' strokeweight='"+$div[0].curSize+"' coordsize='500,500'/>"));
                     oldvalue = poly1.path.value.replace("e","");
                } else if( curOp == "oval" ){  
                     zoom_value = $div.data('zoom_value'); 
                     xx=Math.round((event.x+$div[0].scrollLeft)/zoom_value);
                     yy=Math.round((event.y+$div[0].scrollTop)/zoom_value);  
                     tempx = xx;
                     tempy = yy;
                     bgImage.zz=parseInt(bgImage.zz,10)+1;  //定义基本起始坐标,bgImage.zz是第三维,默认递增
                     oval = document.getElementById($div[0].id+"_group").appendChild(
                         document.createElement("<v:oval id='"+$div[0].id+idSuffix+"' op='oval'  style='position:absolute;left:"+xx+";top:"+yy+";width:1px;height:1px;z-index:"+bgImage.zz+";' filled='true'  strokecolor='"+$div[0].curColor+"' old_strokecolor='"+$div[0].curColor+"'  strokeweight='"+$div[0].curSize+"'  ></v:oval>"));
                     oval.innerHTML="<v:fill  opacity='0'/>";
                     evalObj.regMenu($(oval));
                } else if( curOp == "rect" ){  
                     zoom_value = $div.data('zoom_value'); 
                     xx=Math.round((event.x+$div[0].scrollLeft)/zoom_value);
                     yy=Math.round((event.y+$div[0].scrollTop)/zoom_value);  
                     tempx = xx;
                     tempy = yy;
                     bgImage.zz=parseInt(bgImage.zz,10)+1;  //定义基本起始坐标,bgImage.zz是第三维,默认递增
                     rect = document.getElementById($div[0].id+"_group").appendChild( 
                         document.createElement("<v:rect id='"+$div[0].id+idSuffix+"' op='rect'  style='position:absolute;left:"+xx+";top:"+yy+";width:1px;height:1px;z-index:"+bgImage.zz+";' filled='true' strokecolor='"+$div[0].curColor+"'  old_strokecolor='"+$div[0].curColor+"'  strokeweight='"+$div[0].curSize+"'  />"));
                     rect.innerHTML="<v:fill  opacity='0'/>";
                     evalObj.regMenu($(rect));
                } else if( curOp == "word" ){  
                    zoom_value = $div.data('zoom_value'); 
                    xx=Math.round((event.x+$div[0].scrollLeft)/zoom_value);
                    yy=Math.round((event.y+$div[0].scrollTop)/zoom_value);  
                    tempx = xx;
                    tempy = yy;
                    bgImage.zz=parseInt(bgImage.zz,10)+1;  //定义基本起始坐标,bgImage.zz是第三维,默认递增
                    wordoval = document.getElementById($div[0].id+"_group").appendChild(
                         document.createElement("<v:oval id='"+$div[0].id+idSuffix+"' op='word' style='position:absolute;left:"+xx+";top:"+yy+";width:1px;height:1px;display:none'  filled='false'   />"));
                    evalObj.showNoteEdit(wordoval,curOp);
                } 
            }
        }  
        //鼠标移动
        function msMove() {
            //document.title = event.srcElement.tagName;
            if( event.button == 1 ){ 
                if(!begin){return true;}
                if(event.srcElement.id && event.srcElement.id.indexOf($div[0].id+"_noteEdit")>=0){
                    return true;
                }
                var editDiv = document.getElementById($div[0].id+"_noteEdit");
                if(editDiv && editDiv.style.display!="none"){ 
                    return true;
                }
                var curOp = $div.data("curOp");  
                if ( curOp == "move" ){
                    if( moveObj==$div[0]){   
                        return false;
                    } 
                    if( event.srcElement!=$div[0] && event.srcElement.id.indexOf($div[0].id)==-1 &&event.srcElement.id.indexOf("resizeDiv")!=0){    
                        document.body.style.cursor = 'auto'; 
                        $div[0].releaseCapture();
                        return false;
                    }  
                    if( !moveObj || moveObj.id.indexOf('bgImage')>0 || moveObj.tagName=='shape'){ 
                        var moveX = ysLeft - (event.x-subX);
                        var moveY = ysTop - (event.y-subY);
                        if(moveX<0){
                            moveX=0;
                        }
                        if(moveY<0){
                            moveY=0;
                        }
                        $div[0].scrollLeft = moveX;
                        $div[0].scrollTop = moveY;
                        return;
                     }  
                    if( moveObj.tagName=='DIV' ){ 
                        xx = event.x+$div[0].scrollLeft-subX;
                        yy = event.y+$div[0].scrollTop -subY;    
                        var obj = document.getElementById(moveObj.objId);
                        var b = 0;
                        if(obj.strokeweight && !isNaN(parseInt(obj.strokeweight,10))){
                            b=parseInt(obj.strokeweight,10);
                        } 
                        var oxx = Math.round((xx - b) /zoom_value-parseInt(obj.style.width ,10));
                        var oyy = Math.round((yy - b) /zoom_value-parseInt(obj.style.height ,10)); 
                        if(oxx<b*2){oxx=b*2+1;xx=Math.round((oxx + parseInt(obj.style.width ,10))*zoom_value)+b;}
                        if(oyy<b*2){oyy=b*2+1;yy=Math.round((oyy + parseInt(obj.style.height ,10))*zoom_value)+b;}  
                        obj.style.left = oxx;
                        obj.style.top = oyy;
                        moveObj.style.left = xx;
                        moveObj.style.top = yy; 
                    }else{
                    	if(curResize!=null){ 
	                        xx = Math.round((event.x+$div[0].scrollLeft)/zoom_value);  
	                        yy = Math.round((event.y+$div[0].scrollTop)/zoom_value);
	                    	//resizeDiv_ne resizeDiv_nw resizeDiv_se resizeDiv_sw
	                    	var h = 0;
	                    	var w = 0;
	                        if(curResize.indexOf("_n")>0){
		                        h =ysH + (ysTop - yy ); 
		                        moveObj.style.top =ysTop + (ysH - h); 
	                        }else{
		                        h =yy - ysTop;
	                        }
	                        if(curResize.indexOf("w")>0){
	                        	w = ysW + (ysLeft - xx );
		                        moveObj.style.left =ysLeft + (ysW - w);  
	                        }else{
	                        	w =xx - ysLeft; 
	                        }
	                        if(w<3){w = 3;}
	                        if(h<3){h = 3;}
	                        moveObj.style.width = w; 
	                        moveObj.style.height = h; 
	                        $resizeDiv.css({"top":parseInt(moveObj.style.top,10)*zoom_value,"left":parseInt(moveObj.style.left,10)*zoom_value,"width":parseInt(moveObj.style.width,10)*zoom_value,"height":parseInt(moveObj.style.height,10)*zoom_value});
	                        
                    	}else{
	                        var b = 0;
	                        if(moveObj.strokeweight && !isNaN(parseInt(moveObj.strokeweight,10))){
	                            b=parseInt(moveObj.strokeweight,10);
	                        }
	                        xx = Math.round((event.x+$div[0].scrollLeft)/zoom_value)-subX;
	                        yy = Math.round((event.y+$div[0].scrollTop)/zoom_value)-subY;
	                        if(xx<b*2){xx=b*2+1} //超出范围，停止。
	                        if(yy<b*2){yy=b*2+1}
	                        moveObj.style.left = xx;
	                        moveObj.style.top = yy;     
	                        var objDiv = document.getElementById(moveObj.id+"_note");
	                        if(objDiv){
	                            oxx  = Math.round((parseInt(moveObj.style.left,10) + parseInt(moveObj.style.width ,10))*zoom_value)+b;
	                            oyy  = Math.round((parseInt(moveObj.style.top ,10) + parseInt(moveObj.style.height,10))*zoom_value)+b;  
	                            if(oxx<0){oxx=0}
	                            if(oyy<0){oyy=0}  
	                            objDiv.style.left = oxx;
	                            objDiv.style.top = oyy;
	                        } 
	                        if(moveObj.tagName=="image"&&$resizeDiv.css("display")!="none"){
	                        	$resizeDiv.css({"top":parseInt(moveObj.style.top,10)*zoom_value,"left":parseInt(moveObj.style.left,10)*zoom_value});
	                        }
                    	}
                    }
                } else if ( curOp == "pen" ){  
                    if( event.srcElement!=$div[0] && event.srcElement.id.indexOf($div[0].id)==-1 ){ 
                        $div[0].releaseCapture();
                        return false;
                    } 
                    oldvalue += ","+Math.round((event.x+$div[0].scrollLeft)/zoom_value)+"," + Math.round((event.y+$div[0].scrollTop)/zoom_value);
                    poly1.path.value = oldvalue; 
                    poly1.path.value = poly1.path.value.replace(",0,",",");
                } else if( curOp == "oval" ){ 
                    if( event.srcElement!=$div[0] && event.srcElement.id.indexOf($div[0].id)==-1 ){ 
                        $div[0].releaseCapture();
                        return false;
                    } 
                    xx=Math.round((event.x+$div[0].scrollLeft)/zoom_value);
                    yy=Math.round((event.y+$div[0].scrollTop)/zoom_value);  
                    oval.style.width=Math.abs(tempx-xx);
                    oval.style.height=Math.abs(tempy-yy);
                    oval.style.left=Math.min(tempx,xx);
                    oval.style.top=Math.min(tempy,yy);
                } else if( curOp == "rect" ){ 
                    if( event.srcElement!=$div[0] && event.srcElement.id.indexOf($div[0].id)==-1 ){ 
                        $div[0].releaseCapture();
                        return false;
                    } 
                    xx=Math.round((event.x+$div[0].scrollLeft)/zoom_value);
                    yy=Math.round((event.y+$div[0].scrollTop)/zoom_value);  
                    rect.style.width=Math.abs(tempx-xx);
                    rect.style.height=Math.abs(tempy-yy);
                    rect.style.left=Math.min(tempx,xx);
                    rect.style.top=Math.min(tempy,yy);
                }  else if( curOp == "del" ){ 
                    if( event.srcElement!=$div[0] && event.srcElement.id.indexOf($div[0].id)==-1 ){ 
                        $div[0].releaseCapture();
                        return false;
                    } 
                    if( event.srcElement==$div[0]){
                        return false;
                    }
                    var delObj = event.srcElement;  //被删除的对象
                    evalObj.removeObj(delObj);
                } 
            }
        }
        //鼠标弹起
        function msUp() {
            if(!begin){return;}
            $div[0].releaseCapture(); 
            curResize = null;
            if(event.srcElement.id && event.srcElement.id.indexOf($div[0].id+"_noteEdit")>=0){
                return true;
            }
            //$("#debug").val($("#" + $div[0].id+ '_group').html())//+"-----------"+$("#"+$div[0].id+'_list').html()); 
            var curOp = $div.data("curOp");  
            if ( curOp == "move" ){ 
                if(!moveObj || moveObj.id.indexOf('bgImage')>0){
                    document.body.style.cursor = 'auto';
                }
                evalObj.addHistory();
            } else if( curOp == "oval" ){ 
                evalObj.addHistory();
                evalObj.showNoteEdit(oval,curOp); 
            } else if( curOp == "rect" ){  
                evalObj.addHistory();
                evalObj.showNoteEdit(rect,curOp);
            } else if( curOp == "pen" ){  
                evalObj.addHistory(); 
            } 
            begin = false;
        }
        

        this.init = function(){
            $div.bind("mousedown",msDown); 
            $div.bind("mousemove",msMove);
            $div.bind("mouseup",msUp); 
            $div.bind("selectstart",function(){ var the = event.srcElement ; 
                                                if(!(( the.tagName== "INPUT" && the.type.toLowerCase() == "text" ) || the.tagName== "TEXTAREA")) {return false; } 
                                                return true ; 
                                               });
                                               
            var $lineColor = $("#lineColor");
            var $selectbox = $('#'+$div[0].id+'_lineSelectBox').lineSelectBox();//元素的jquery 对象
            $('#'+$div[0].id+'_lineSelectBox').bind('change',function(event,val,li){//必须重新获取新的jquery对象 
                $div[0].curSize = val;
            });
            var changeColor = function(event,c){ 
                $div[0].curColor = c;
            }
            $lineColor.bind("changeColor",changeColor); 
            iColorPicker($lineColor);
        }
        this.init();

    }  

})(jQuery);