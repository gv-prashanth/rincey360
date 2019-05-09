/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Node Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Test
	importance: 8
	codeCompleteness: 1
	testCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.Uize.Node= module defines a suite of unit tests for the =Uize.Node= module.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Test.Uize.Node= module defines the =Uize.Test.Uize.Node= class, a subclass of the =Uize.Test= class.
*/

Uize.module ({
	name:'Uize.Test.Uize.Node',
	builder:function () {
		return Uize.Test.declare ({
			title:'Test for Uize.Node Module',
			test:[
				Uize.Test.requiredModulesTest ('Uize.Node')
			]
		});
	}
});

