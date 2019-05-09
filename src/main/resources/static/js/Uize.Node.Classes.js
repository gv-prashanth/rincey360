/*
	UIZE JAVASCRIPT FRAMEWORK 2010-07-20

	http://www.uize.com/reference/Uize.Node.Classes.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Node.Classes',builder:function(){var _a=function(){},_b=Uize.Node.doForAll;var _c={},_d=[''];function _e(_f){var _g=_f+'',_h=_c[_g];if(!_h&&_g){(_f=_g.split(',')).length==1&&_f.unshift('');var _i='\\b(?:'+_f.join('|').replace(/^\||\|$/,'')+')\\b',_j={'':-1},_k=_f.length;for(var _l=_k;--_l> -1;)_j[_f[_l]]=_k>2?_l: !!_l;_h=_c[_g]={_f:_f,_m:new RegExp(_i),_n:new RegExp('(\\s*)'+_i+'(\\s*)'),_j:_j};}return _h;}var _o=_a.getState=function(_p,_f){var _q= -1;if(Uize.Node.isNode(_p=Uize.Node.getById(_p))){var _h=_e(_f);if(_h)_q=_h._j[(_p.className.match(_h._m)||_d)[0]];}return _q;};_a.hasClass=function(_p,_r){return _o(_p,_r)==1;};var _s=_a.setState=function(_t,_f,_u){var _h=_e(_f);if(!_h)return;var _v=(_f=_h._f)[+_u],_w;_b(_t,function(_p){if((_w=_p.className)!=_v){if(_w){_p.className=_v?(_w.replace(_h._m,function(){return _v+(_v='')})+(_v&&(' '+_v))):(_w.replace(_h._n,function(_x,_y,_z){return _y&&_z;}));}else{_p.className=_v;}}});};_a.addClass=function(_t,_r){_s(_t,_r,1);};
_a.removeClass=function(_t,_r){_s(_t,_r,0);};_a.toggleClass=_a.toggleState=function(_t,_f){var _h=_e(_f);if(_h){_f=_h._f;_b(_t,function(_p){_s(_p,_f,(_o(_p,_f)+1)%_f.length);});}};return _a;}});