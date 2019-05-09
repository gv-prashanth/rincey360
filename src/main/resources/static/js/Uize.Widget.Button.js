/*
	UIZE JAVASCRIPT FRAMEWORK 2010-07-07

	http://www.uize.com/reference/Uize.Widget.Button.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Button',required:'Uize.Node',builder:function(c_a){var c_b,c_c=true,c_d=false,c_e=Uize.Node;var c_f=c_a.subclass(null,function(){var c_g=this;function c_h(){if(c_g.isWired){c_g.c_i()||c_g.set({c_j:''});c_g.c_h();}}c_g.wire({'Changed.busyInherited':c_h,'Changed.enabledInherited':c_h});}),c_k=c_f.prototype;var c_l,c_m={},c_n={grayed:16,'':8,over:4,active:2,playing:1},c_o='(Grayed|Over|Active|Playing)',c_p=new RegExp(c_o),c_q=new RegExp('(?:(?:(\\S+)\\s+\\1'+c_o+'))','g'),c_r=new RegExp('\\S*'+c_o+'\\b','g'),c_s=/\b(disabled|over|active|playing)\b/,c_t={},c_u={mouseover:['over','Over'],mouseout:['','Out'],mousedown:['down','Down'],mouseup:['over','Up'],click:['over','Click']};c_k.c_v=c_d;c_k.c_i=function(){return(this.get('enabledInherited')&& !this.get('busyInherited')&&(!this.c_w||this.c_x));};c_k.c_y=function(){this.c_z!=c_b&&this.isWired&&this.setNodeInnerHtml('text',this.c_z);};var c_h=c_k.c_h=function(){var c_g=this;if(c_g.isWired){var c_A=c_g.c_A,
c_B=c_g.get('enabledInherited'),c_C=c_g.get('busyInherited'),c_D=(!c_B?16:0)|(!c_g.c_j||c_C?8:0)|(c_g==c_l?4:0)|(c_g.c_j=='down'||c_g.c_w?2:0)|(c_g.c_E?1:0),c_F=c_g.c_G[c_D];if(c_F==c_b){for(var c_H= -1,c_I=c_g.c_I,c_J=c_I.length;++c_H<c_J;){var c_K=c_I[c_H];if(c_D&c_n[c_K]){c_F=c_K;break;}}c_g.c_G[c_D]=c_F;}if(c_g.c_L=='classes'){var c_M=c_A.className,c_N='';if(c_g.c_O=='disambiguated'){var c_P=c_g.c_P;if(c_P==c_b){var c_Q=c_M.match(c_q);if(c_Q){c_P=c_Q[c_Q.length-1].split(' ',2)[0];}else{c_Q=c_M.replace(c_r,'').match(/(\S+)\s*$/);if(c_Q)c_P=c_Q[c_Q.length-1];}if(c_g.c_P=c_P=c_P||'')c_g.c_R=c_t[c_P]||(c_t[c_P]=new RegExp(c_P+'(\\s+'+c_P+c_o+')?'));}var c_S=c_F?' '+c_P+c_f.capFirstChar(c_F):'';c_N=c_P?c_M.replace(c_g.c_R,c_P+c_S):c_M.replace(c_p,'')+c_S;}else{var c_T=c_F=='grayed'?'disabled':c_F;c_N=c_s.test(c_M)?c_M.replace(c_s,c_T):c_M+(c_T?' ':'')+c_T;}if(c_N!=c_M)c_A.className=c_N;}else if(c_g.c_L=='frames'){c_g.c_U.style.top='-'+(c_g.c_V.c_W[c_F]*c_g.c_X.height)+'px';}if(c_g.c_Y&&Uize.Tooltip){
var c_Z=c_g.c_j=='over'&&c_B&& !c_g.c_w;c_Z!=c_g.c_v&&Uize.Tooltip.showTooltip(c_g.c_Y,c_g.c_v=c_Z);}c_g.get('busyInherited')?c_e.setStyle(c_A,{cursor:'wait'}):c_e.showClickable(c_A,c_g.c_i());}};c_k.c_0=function(c_1){var c_g=this;if(c_g.isWired){var c_2=c_1.type,c_3=c_2=='click',c_i=c_g.c_i();if(!c_g.c_4){c_g.c_4=c_c;function c_0(c_1){c_g.c_0(c_1)}c_g.wireNode(c_g.c_A,{mouseout:c_0,mousedown:c_0,mouseup:c_0});}if(c_3)c_1.cancelBubble=c_c;if(c_i){var c_5=c_u[c_2];c_g.set({c_j:c_5[0]});c_g.fire({name:c_5[1],domEvent:c_1});}}};c_k.updateUi=function(){this.c_h();this.c_y();};c_k.wireUi=function(){var c_g=this;if(!c_g.isWired){c_g.c_U=c_b;var c_A=c_g.c_A=c_g.getNode();if(c_A){var c_6=c_A.childNodes;if(c_6.length&&(c_6.length>1||c_6[0].nodeType!=3)&&(c_g.c_U=c_g.getNode('frames'))){c_g.c_L='frames';c_g.c_X=c_e.getDimensions(c_g.c_U.parentNode);}if(c_g.c_7&&c_A.tagName=='A'&& !c_A.onclick)c_A.onclick=c_e.returnTrue;function c_0(c_1){c_g.c_0(c_1)}c_g.wireNode(c_A,{mouseover:c_0,click:c_0});
c_a.prototype.wireUi.call(c_g);}}};c_f.addChildButton=function(c_8,c_9){var c_g=this,c_ba;function c_bb(){c_ba.wire('Click',function(c_bc){if(c_9)typeof c_9=='string'?c_g.fire(c_9):c_9(c_bc);c_g.fire(c_bc);});}if(c_g==c_f){c_ba=new c_f({idPrefix:c_8,name:c_8,c_7:c_c});c_bb();(window[c_ba.instanceId]=c_ba).wireUi();}else{c_ba=c_g.children[c_8];if(!c_ba){c_ba=c_g.addChild(c_8,c_f);c_bb();}}return c_ba;};c_f.registerProperties({c_x:{name:'clickToDeselect',onChange:c_h,value:c_d},c_O:{name:'classNamingForStates',value:'disambiguated'},c_V:{name:'frameOrder',onChange:function(){var c_V=this.c_V;if(!c_V.c_W){for(var c_bd= -1,c_be=c_V.length,c_W=c_V.c_W={};++c_bd<c_be;)c_W[c_V[c_bd]]=c_bd;}},value:['grayed','','over','active','playing']},c_7:{name:'followLink',value:c_d},c_L:{name:'mode',value:'classes'},c_E:{name:'playing',onChange:c_h,value:c_d},c_w:{name:'selected',onChange:c_h,value:c_d},c_j:{name:'state',onChange:function(){var c_g=this;if(!c_g.c_j){if(c_l==c_g)c_l=c_b;}else if(c_g.c_j=='over'){
c_l&&c_l!=c_g&&c_l.set({c_j:''});c_l=c_g;}c_g.isWired&&c_g.c_h();},value:''},c_I:{name:'statePrecedence',onChange:function(){var c_g=this,c_bf=c_g.c_I.c_bg||(c_g.c_I.c_bg=c_g.c_I.join(','));c_g.c_G=c_m[c_bf]||(c_m[c_bf]={});c_g.isWired&&c_g.c_h();},value:['playing','active','grayed','over','']},c_z:{name:'text',onChange:c_k.c_y},c_Y:'tooltip'});return c_f;}});