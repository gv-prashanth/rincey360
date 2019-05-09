/*
	UIZE JAVASCRIPT FRAMEWORK 2010-04-14

	http://www.uize.com/reference/Uize.Widget.Page.xDeferredLinks.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Page.xDeferredLinks',required:'Uize.Node',builder:function(d_a){d_a.prototype.wireDeferredLinks=function(){var d_b=this,d_c=Uize.Node,d_d=d_b.d_e,d_f=d_d.length,d_g=0;(function d_h(){function d_i(d_j){var d_k=d_j[0],d_l=d_j[1];if(typeof d_l=='string')d_c.setProperties(d_k,{href:d_l});else d_c.wire(d_k,'click',function(){d_b.launchPopup(d_a.copyInto({url:d_l.href,name:d_l.target},d_l.popupParams))});}for(var d_m=Math.min(d_f,d_g+d_b.d_n);d_g<d_m;d_g++)d_i(d_d[d_g]);if(d_g<d_f)setTimeout(d_h,0);})();};d_a.registerProperties({d_e:{name:'deferredLinks',value:[]},d_n:{name:'linkBatchSize',value:25}});}});