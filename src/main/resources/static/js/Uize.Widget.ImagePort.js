/*
	UIZE JAVASCRIPT FRAMEWORK 2010-04-14

	http://www.uize.com/reference/Uize.Widget.ImagePort.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.ImagePort',required:'Uize.Node',builder:function(c_a){var c_b,c_c=true,c_d=false,c_e=Uize.Node;var c_f=c_a.subclass(),c_g=c_f.prototype;function c_h(c_i,c_j,c_k,c_l,c_m){if(typeof c_l!='number')c_l=parseFloat(c_l)||0;if(typeof c_m!='number')c_m=parseFloat(c_m)||1;c_i= +c_i+c_l*c_j;c_j*=(c_m-c_l);return c_j==c_k?.5:c_i/(c_k-c_j);}c_g.c_n=function(){var c_o=this;if(c_o.isWired){var c_p=c_o.c_p,c_q=c_o.getScaledRect(c_p);c_o.setNodeStyle('image',c_q);c_o.set({c_r: !!(c_o.portVsScaledDelta[0]=c_p.portWidth-c_q.width),c_s: !!(c_o.portVsScaledDelta[1]=c_p.portHeight-c_q.height)});}};c_g.updateUi=function(){var c_o=this;if(c_o.isWired){var c_t=c_e.getDimensions(c_o.getNode());if(!c_o.c_u){var c_v=c_e.getDimensions(c_o.getNode('image'));c_o.c_u=c_v.width;c_o.c_w=c_v.height;}c_o.c_p={portWidth:c_t.width,portHeight:c_t.height,rectWidth:c_o.c_u,rectHeight:c_o.c_w};Uize.Node.isIe&&c_o.setNodeStyle('image',{msInterpolationMode:'bicubic'});c_o.c_n();}};c_g.wireUi=function(){var c_o=this;
if(!c_o.isWired){c_o.setNodeStyle('',{overflow:'hidden'});c_o.setNodeStyle('image',{position:'absolute'});c_o.portVsScaledDelta=[];c_a.prototype.wireUi.call(c_o);}};c_g.getScaledRect=c_f.getScaledRect=function(c_x){function c_y(c_z){return c_x[c_z]!==c_b?c_x[c_z]:c_o.get(c_z);}var c_o=this,c_A=c_x.portWidth,c_B=c_x.portHeight,c_C=c_x.rectWidth,c_D=c_x.rectHeight,c_E=c_y('coordConverter'),c_F=c_A/c_C,c_G=c_B/c_D,c_H={fit:Math.min(c_F,c_G),fill:Math.max(c_F,c_G)},c_I=c_H[c_y('sizingLowerBound')]||0,c_J=c_H[c_y('sizingUpperBound')]||0,c_K=Math.min(c_I+(c_J-c_I)*c_y('sizingValue'),c_y('maxScaling')),c_L=c_C*c_K,c_M=c_D*c_K;return{left:c_E((c_A-c_L)*c_y('alignX')),top:c_E((c_B-c_M)*c_y('alignY')),width:c_E(c_L),height:c_E(c_M)};};c_g.getSizingAndAlign=c_f.getSizingAndAlign=function(c_x){function c_N(c_O){return c_O=='fit'?c_P:(c_O=='fill'?c_Q:0);}function c_y(c_z){return c_x[c_z]!==c_b?c_x[c_z]:c_o.get(c_z);}var c_o=this,c_A=c_x.portWidth,c_B=c_x.portHeight,c_C=c_x.rectWidth,c_D=c_x.rectHeight,c_R=c_C*c_D,
c_F=c_A/c_C,c_G=c_B/c_D,c_S=Math.min(c_F,c_G),c_T=Math.max(c_F,c_G),c_U={fit:c_S*c_S*c_R,fill:c_T*c_T*c_R},c_V=c_U[c_y('sizingLowerBound')]||0,c_W=c_U[c_y('sizingUpperBound')]||0;return{sizingValue:Math.sqrt(c_R-c_V)/Math.sqrt(c_W-c_V),alignX:c_h(c_x.rectX,c_C,c_A),alignY:c_h(c_x.rectY,c_D,c_B)};};function c_X(){this.c_n();this.fire('Position Changed');}c_f.registerProperties({c_r:'alignApplicableX',c_s:'alignApplicableY',c_Y:{name:'alignX',onChange:c_X,value:.5},c_Z:{name:'alignY',onChange:c_X,value:.5},c_E:{name:'coordConverter',value:function(c_0){return c_0}},c_1:{name:'maxScaling',onChange:c_X,value:Infinity},c_2:{name:'sizingLowerBound',onChange:c_X,value:'fit'},c_3:{name:'sizingUpperBound',onChange:c_X,value:'fill'},c_4:{name:'sizingValue',onChange:c_X,value:1}});return c_f;}});