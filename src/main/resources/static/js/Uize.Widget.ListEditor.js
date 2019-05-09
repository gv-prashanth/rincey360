/*
	UIZE JAVASCRIPT FRAMEWORK 2010-04-14

	http://www.uize.com/reference/Uize.Widget.ListEditor.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.ListEditor',required:['Uize.Data','Uize.Widget.Button','Uize.Widget.TextInput','Uize.Node.Event'],builder:function(c_a){var c_b;var c_c=c_a.subclass(null,function(){var c_d=this;function c_e(){if(c_d.children.add.get('enabledInherited')){var c_f=c_d.c_g?c_d.c_g(c_h+''):c_h+'',c_i=Uize.indexIn(c_d.c_j,c_f);if(c_i<0){c_d.c_k(c_f);var c_j=c_d.c_j.concat();c_d.c_l=='prepend'?c_j.unshift(c_f):c_j.push(c_f);c_d.set({c_j:c_j});}else if(c_d.c_m){c_d.c_m.selectedIndex=c_i;}c_d.c_n();c_o();}}var c_h=c_d.addChild('input',Uize.Widget.TextInput,{minLength:1});function c_o(){c_h.set({value:''})};c_h.wire({Ok:function(c_p){c_p.cancelSubmit=true;c_e();},Cancel:c_o,'Changed.isValid':function(){c_d.c_q()}});c_d.c_r('add',c_e);c_d.c_r('remove',function(){c_d.c_s()});c_d.c_t=true;c_d.c_q();c_d.c_n();}),c_u=c_c.prototype;c_u.c_r=Uize.Widget.Button.addChildButton;c_u.c_k=function(c_f,c_v){var c_m=this.c_m;if(c_m){var c_w=document.createElement('option');c_w.text=c_w.value=c_f;if(c_v){try{
c_m.add(c_w,null);}catch(c_x){c_m.add(c_w);}}else{try{c_m.add(c_w,c_m.options[0]||null);}catch(c_x){c_m.add(c_w,0);}}}};c_u.c_y=function(c_z){this.c_m&&this.c_m.remove(c_z);};c_u.c_s=function(){var c_d=this;if(c_d.c_m){var c_A=[],c_B=c_d.c_m.options,c_C=c_B.length;if(c_C){for(var c_D= -1;++c_D<c_C;)c_B[c_D].selected&&c_A.push(c_D);if(c_A.length==1){var c_h=c_d.children.input;c_h.set({value:c_d.c_j[c_A[0]]});c_h.focus();}var c_j=c_d.c_j.concat();for(var c_E=c_A.length;--c_E>=0;){var c_F=c_A[c_E];c_d.c_y(c_F);c_j.splice(c_F,1);}c_d.set({c_j:c_j});}}};c_u.c_G=function(c_j){var c_l=this.c_l;if(c_l!='prepend'&&c_l!='append'){var c_H=typeof c_l=='function'?c_l:c_l=='z-a'?function(a,b){return a>b? -1:1}:c_b;c_H?c_j.sort(c_H):c_j.sort();}return c_j;};c_u.c_I=function(c_J,c_K){this.children[c_J].set({enabled:c_K?'inherit':false})};c_u.c_q=function(){this.c_t&&this.c_I('add',this.children.input.get('isValid'));};c_u.c_n=function(){var c_d=this;c_d.c_t&&c_d.c_I('remove',c_d.c_m&&c_d.c_m.selectedIndex> -1);};
c_u.c_L=function(){var c_d=this,c_m=c_d.c_m;if(c_d.isWired&&c_m){var c_B=c_m.options,c_C=c_B.length,c_j=c_d.c_j,c_M=c_j.length,c_D;for(c_D=Math.min(c_C,c_M);--c_D>=0;){var c_N=c_B[c_D],c_f=c_j[c_D];if(c_f!=c_N.text||c_f!=c_N.value)c_N.text=c_N.value=c_f;}if(c_M>c_C){for(c_D=c_C-1;++c_D<c_M;)c_d.c_k(c_j[c_D],true);}else if(c_M<c_C){for(c_D=c_C;--c_D>=c_M;)c_d.c_y(c_D);}if(c_d.c_O){var c_P={},c_Q=[],c_O=c_d.c_O,c_D;for(c_D=c_M;--c_D>=0;)c_P[c_j[c_D]]=1;for(c_D=c_O.length;--c_D>=0;)delete c_P[c_O[c_D]];for(var c_f in c_P)c_Q.push(c_f);c_d.setNodeValue(c_m,c_Q);}c_d.c_O=c_j;c_d.c_n();}};c_u.updateUi=function(){var c_d=this;if(c_d.isWired){c_d.c_L();c_d.c_n();}};c_u.wireUi=function(){var c_d=this;if(!c_d.isWired){c_d.wireNode(c_d.c_m=c_d.getNode('list'),{keyup:function(c_R){Uize.Node.Event.isKeyDelete(c_R)&&c_d.c_s()},click:function(){c_d.c_n()}});c_a.prototype.wireUi.call(c_d);}};c_c.registerProperties({c_g:'itemConformer',c_j:{name:'list|value',conformer:function(c_S){this.c_G(c_S);
return c_S+''!=this.c_j+''?c_S:this.c_j;},onChange:c_u.c_L,value:[]},c_l:{name:'sort',onChange:function(){this.set({c_j:this.c_G(this.c_j.concat())})},value:'prepend'}});return c_c;}});