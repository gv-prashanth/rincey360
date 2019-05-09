/*
	UIZE JAVASCRIPT FRAMEWORK 2010-04-14

	http://www.uize.com/reference/Uize.Widget.Tree.List.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Tree.List',required:['Uize.Node','Uize.Tooltip','Uize.Xml'],builder:function(d_a){var d_b,d_c=true,d_d=false,d_e=Uize.pathToResources+'Uize_Widget_Tree_List/',d_f=Uize.Node,d_g=Uize.Tooltip,d_h=Uize.Xml.toAttributeValue;var d_i=d_a.subclass(),d_j=d_i.prototype;d_j.setItemExpanded=function(d_k,d_l){var d_m=this;if(d_m.isWired){var d_n=d_m.getItemFromSpecifier(d_k);d_m.displayNode(d_k+'Children',d_n.expanded=typeof d_l=='boolean'?d_l:d_n.expanded===d_d);d_m.setNodeProperties(d_k+'Toggler',{src:d_m.d_o(d_n),title:d_m.d_p(d_n)});}else{d_a.prototype.setItemExpanded.call(d_m,d_k,d_l);}};d_j.d_o=function(d_n){return d_e+this.d_q+'-'+(d_n.expanded===d_d?'collapsed':'expanded')+'.gif';};d_j.d_p=function(d_n){return'Click to '+(d_n.expanded===d_d?'expand':'collapse');};d_j.wireUi=function(){var d_m=this;if(!d_m.isWired){var d_r=d_m.d_r;d_m.traverseTree({itemHandler:function(d_n,d_k){d_r&&d_m.wireNode(d_k+'TitleLink',{mouseover:function(){var d_s=Uize.Node.getById(d_r),d_t=d_n.description;
if(d_s&&d_t){d_f.setInnerHtml(d_s,d_h(d_t));d_g.showTooltip(d_s,d_c);}},mouseout:function(){d_g.showTooltip(d_m.d_r,d_d)}});},beforeSubItemsHandler:function(d_n,d_k){d_m.wireNode([d_k+'TogglerLink',!d_n.link||d_m.d_u?(d_k+'TitleLink'):d_b],{click:function(d_v){if(d_v.shiftKey||d_v.ctrlKey||d_v.metaKey){d_m.setExpandedDepth(d_m.getItemFromSpecifier(d_k).expanded!==d_d?0:(d_v.shiftKey?1:1000),d_k);d_v.cancelBubble=d_c;}else{d_m.setItemExpanded(d_k);}},focus:function(){this.blur()}});}});d_a.prototype.wireUi.call(d_m);}};d_i.registerProperties({d_w:{name:'alwaysLinkHeadings',value:d_d},d_x:{name:'iconBgColor',value:'#aaa'},d_q:{name:'iconTheme',value:'arrows'},d_y:{name:'levelClasses',value:[]},d_u:{name:'linksAlwaysToggleExpanded',value:d_d},d_z:{name:'spaceBeforeText',value:7},d_r:'tooltip'});d_i.set({html:{process:function(input){var d_m=this,d_A=[],d_B=input.idPrefix,d_C=d_i.getBlankImageUrl(),d_D='<img src="'+d_C+'" class="divider" align="center"/>',
d_E='style="'+(input.iconBgColor?('background:'+input.iconBgColor+'; '):'')+'width:9px; height:9px;"',d_y=input.levelClasses,d_F=d_y.length-1;d_m.traverseTree({itemHandler:function(d_n,d_k,d_G){var d_H=d_n.link,d_I=d_i.itemHasChildren(d_n),d_J='<img src="'+d_C+'" width="'+(d_G*(10+input.spaceBeforeText))+'" height="10"/>',d_K=d_y[Math.min(d_G,d_F)];d_A.push('<nobr>'+d_J+(d_i.itemIsDivider(d_n)?d_D:('<span style="width:10px; height:10px; padding-right:'+input.spaceBeforeText+'px;">'+(d_I?('<a id="'+d_B+'-'+d_k+'TogglerLink" href="javascript://"><img id="'+d_B+'-'+d_k+'Toggler" src="'+d_m.d_o(d_n)+'" '+d_E+' border="0" title="'+d_m.d_p(d_n)+'"/></a>'):'<img src="'+d_e+input.iconTheme+'-bullet.gif" '+d_E+'"/>')+'</span>'+(d_H||(d_I&&input.alwaysLinkHeadings)?('<a id="'+d_B+'-'+d_k+'TitleLink" class="'+d_K+'" href="'+(d_H||'javascript://')+'">'+d_n.title+'</a>'):('<span class="'+d_K+'">'+d_n.title+'</span>'))))+'</nobr><br/>');},beforeSubItemsHandler:function(d_n,d_k){
d_A.push('<span id="'+d_B+'-'+d_k+'Children" style="display:'+(d_n.expanded!==d_d?'block':'none')+';">');},afterSubItemsHandler:function(){d_A.push('</span>\n')}});return d_A.join('');}}});return d_i;}});