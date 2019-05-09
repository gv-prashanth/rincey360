/*
	UIZE JAVASCRIPT FRAMEWORK 2010-07-07

	http://www.uize.com/reference/Uize.Widget.Log.InstanceEvents.html
	Available under MIT License or GNU General Public License -- http://www.uize.com/license.html
*/
Uize.module({name:'Uize.Widget.Log.InstanceEvents',required:['Uize.Json','Uize.String'],builder:function(d_a){var d_b=d_a.subclass(),d_c=d_b.prototype;d_b.registerProperties({d_d:{name:'instance',onChange:function(){var d_e=this,d_f=d_e.d_f,d_d=d_e.d_d;d_f&&d_f.d_d.unwire(d_f.d_g);d_e.clear();d_e.d_f=d_d?{d_d:d_d,d_g:{'*':function(d_h){Uize.String.startsWith(d_h.name,'Changed.')||d_e.log(d_e.localize('customInstanceEvent')+': '+d_h.name);},'Changed.*':function(d_h){d_e.log(d_e.localize('propertiesChangedEvent')+': '+Uize.Json.to(d_h.properties,'mini'));}}}:null;d_d&&d_d.wire(d_e.d_f.d_g);}}});d_b.set({localized:{customInstanceEvent:'CUSTOM INSTANCE EVENT',propertiesChangedEvent:'PROPERTIES CHANGED EVENT'}});return d_b;}});