/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : UizeDotCom.Page.Home
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2009-2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/
Uize.module({name:'UizeDotCom.Page.Home',required:['Uize.Node.Event','Uize.Widget.HoverFader','Uize.Widget.Scrolly','Uize.Widget.AutoTooltip','Uize.Template','Uize.Fx','Uize.Fx.xShadows','Uize.Curve','Uize.Curve.Rubber'],builder:function(e_a){var e_b=e_a.subclass(null,function(){var e_c=this;e_c.addChild('demosScrolly',Uize.Widget.Scrolly).fade.set({curve:Uize.Curve.Rubber.easeOutBounce(3,.5),duration:1000});e_c.addChild('demoInfoTooltip',Uize.Widget.AutoTooltip,{nodes:{className:/\bdemosItem\b/},html:true});e_c.addChild(
'borderHoverFader',Uize.Widget.HoverFader,{nodes:{className:/\b(subPod|demosItem)\b/},defaultStyle:{borderColor:'788'},hoverStyle:{borderColor:'f'},fadeIn:{duration:800,curve:{borderColor:[Uize.Curve.easeOutPow(9),Uize.Curve.easeInPow(2),Uize.Curve.easeInPow(6)]}},fadeOut:{duration:1200,curve:{borderColor:[Uize.Curve.easeOutPow(4),null,Uize.Curve.easeInPow(3)]}}});e_c.addChild('podHeadingHoverFader',Uize.Widget.HoverFader,{nodes:{className:/\bpodHeading\b/},defaultStyle:{textShadow:['0em 0em 0em #0','0em 0em 0em #0','0em 0em 0em #0','0em 0em 0em #0'].join(',')},hoverStyle:{textShadow:['-1.5em 0em 1.5em #f','1.5em 0em 1.5em #f','0em -.3em 1.5em #abc','0em .3em 1em #def'].join(',')},fadeIn:{duration:700,curve:{textShadow:Uize.Curve.easeOutPow(4)}},fadeOut:{duration:1800,curve:{textShadow:Uize.Curve.easeInOutPow(2)}}});}),e_d=e_b.prototype;e_d.wireUi=function(){var e_c=this;if(!e_c.isWired){e_a.prototype.wireUi.call(e_c);Uize.Fx.fadeStyle(page.getNode('mantleImage'),{opacity:.01,clip:[50,450,50,450]},
{opacity:1,clip:[0,900,100,0]},2000,{curve:Uize.Curve.easeInOutPow(4)});}};e_b.set({showFooter:false,showShareThisPanel:false});return e_b;}});