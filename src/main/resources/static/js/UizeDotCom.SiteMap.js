/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.SiteMap
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/
Uize.module({name:'UizeDotCom.SiteMap',required:['UizeDotCom.ModulesTree','UizeDotCom.ExamplesInfoForSiteMap'],builder:function(){var _a;return function(){if(!_a){var _b={title:'-'};function _c(_d){return'reference/'+_d+'.html';}function _e(_f,_g,_h){var _d=_f+(_f&&'.')+_g,_i=_c(_d),_j={title:_g,link:_i},_k=_j.items=[];if(_h)for(var _l in _h)_k.push(_e(_d,_l,_h[_l]));_k.length&&_d&&_k.unshift({title:'[[ BASE ]]',link:_i},_b);return _j;}var _m=_e('','',UizeDotCom.ModulesTree());_m.title='Module Reference';
_m.link='javascript-modules-index.html';function _j(_n,_o,_p){return{title:_n,link:(_o||'')+(_p||_n.toLowerCase().replace(/\W+/g,'-'))+'.html'}}function _q(_n,_p){return _j(_n,'explainers/',_p)}function _r(_n,_p){return _j(_n,'appendixes/',_p)}function _s(_n,_p){return _j(_n,'tests/performance/',_p)}var _t=UizeDotCom.ExamplesInfoForSiteMap();function _u(_v){var _w='javascript-'+(_v!='all'?(_v+'-'):'')+'examples.html';return{title:Uize.capFirstChar(_v)+' examples',link:_w,items:[{title:'TOUR '+_v.toUpperCase()+' EXAMPLES',link:'javascript-feature-tours.html?tour='+_v},_b,{title:'Index of '+_v+' examples',link:_w}]}}var _x=[_u('featured'),_b];for(var _y= -1,_z=_t.keywords,_A=_z.length,_B;++_y<_A;)((_B=_z[_y])!='featured')&&_x.push(_u(_B));_x.push(_b,_u('all'),_b,{title:'EXAMPLES, BY MODULE...',link:'javascript-examples-by-module.html'});var _C=[];for(var _D= -1,_E=_t.tools,_F=_E.length,_G;++_D<_F;)_C.push({title:(_G=_E[_D]).title,link:_G.path});_C.push(_b,
_j('Index of JavaScript Tools','','javascript-tool-examples'));_a=[_j('Home','','index'),_j('DOWNLOAD'),_q('Getting Started'),_j('Latest News'),_b,{title:'Examples',link:'javascript-examples.html',items:_x},_r('Showcase'),{title:'Widgets To Go',link:'javascript-widgets.html'},{title:'Tools',link:'javascript-tool-examples.html',items:_C},_b,{title:'Explainers',link:'javascript-explainers.html',items:[_q('Introduction to UIZE'),_q('Getting Started With UIZE','getting-started'),_q('Using the Documentation'),_q('Overview of Features'),_q('Building UIZE-powered Pages'),{title:'MORE TOPICS...',items:[_q('JavaScript Animation and Effects'),_q('JavaScript Inheritance'),_q('Set-get Properties'),_q('JavaScript Event System'),_q('JavaScript DOM Events'),_q('JavaScript Localization'),_q('JavaScript Modules'),_q('JavaScript Libraries'),_q('JavaScript Templates'),_q('JavaScript Widgets'),_q('JavaScript Troubleshooting'),_q('JavaScript Build Scripts'),_q('All About Scrunching'),_q('JavaScript Documentation System'),
_q('The Philosophy of UIZE','philosophy-of-uize')]},_b,_j('Index of JavaScript Explainers','','javascript-explainers')]},_m,{title:'Appendixes',items:[_r('Press Center'),_r('Showcase'),_j('License'),_b,_r('Credits'),_j('Endorsements'),_b,_r('HTML Style Guide'),_r('JavaScript Code Conventions'),_r('JavaScript Optimization'),_b,_j('Index of JavaScript Modules','','javascript-modules-index'),_r('SOTU (State of the UIZE)','sotu'),_b,_r('JavaScript Fun'),_r('JavaScript Interview Questions'),_r('Code Fragments'),_r('Glossary')]},_b,{title:'UIZE Development',items:[_q('Creating a New UIZE Module'),_q('Creating a New UIZE Example Page'),_r('SOTU (State of the UIZE)','sotu'),_j('UIZE Unit Tests','examples/'),{title:'Performance Tests',items:[_s('Array Iteration Styles'),_s('Caching Node References'),_s('Checking if Undefined'),_s('Extended String Class'),_s('getElementById vs getElementsByName','getElementById-vs-getElementsByName'),_s('Repeat String Approaches'),_s('Storing Length for Iterator'),
_s('Storing Reference to Sub-object','storing-reference-to-subobject'),_s('String Concatenation Approaches'),_s('String Match Conditional Styles'),_s('String Starts With Substring Styles')]}]},_b,_j('SUPPORT'),_j('SITE MAP','','directory'),_j('SEARCH','','search-sections')];}return _a;};}});