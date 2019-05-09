/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.UnitTests Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Test
	importance: 5
	codeCompleteness: 5
	testCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.UnitTests= class...

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Test.UnitTests= module defines the =Uize.Test.UnitTests= class, a subclass of the =Uize.Test= class.
*/

Uize.module ({
	name:'Uize.Test.UnitTests',
	required:[
		'Uize.Test',
		'UizeDotCom.ModulesTree'
	],
	builder:function () {
		var
			_knownTestModules = [
				/*** test core layer ***/
					'Uize.Test.Uize',
					'Uize.Test.Uize.Data',
					'Uize.Test.Uize.Data.Csv',
					'Uize.Test.Uize.Date',
					'Uize.Test.Uize.Date.Formatter',
					'Uize.Test.Uize.Doc',
					'Uize.Test.Uize.String',
					'Uize.Test.Uize.String.Builder',
					'Uize.Test.Uize.String.Lines',
					'Uize.Test.Uize.Url',
					'Uize.Test.Uize.Util',
					'Uize.Test.Uize.Xml',
	
				/*** test browser specific features ***/
					'Uize.Test.Uize.Node',
					'Uize.Test.Uize.Node.Classes',
	
				/*** test templates ***/
					'Uize.Test.Uize.Template',
					'Uize.Test.Uize.Templates',
					'Uize.Test.Uize.Templates.Calculator',
					'Uize.Test.Uize.Templates.Calendar',
					'Uize.Test.Uize.Templates.Collection',
					'Uize.Test.Uize.Templates.CollectionItem',
					'Uize.Test.Uize.Templates.ColorInfo',
					'Uize.Test.Uize.Templates.HashTable',
					'Uize.Test.Uize.Templates.JstModule',
					'Uize.Test.Uize.Templates.List',
					'Uize.Test.Uize.Templates.SevenSegmentDisplay'
			],
			_knownTestModulesMap = {},
			_testSuite = Uize.Test.testSuite ('UIZE JavaScript Framework Unit Tests',_knownTestModules)
		;

		/*** add dynamically generated tests for all modules that don't already have dedicated test modules ***/
			/*** create a lookup hash table from existing test modules array ***/
				for (
					var _knownTestModuleNo = -1, _knownTestModulesLength = _knownTestModules.length;
					++_knownTestModuleNo < _knownTestModulesLength;
				)
					_knownTestModulesMap [_knownTestModules [_knownTestModuleNo]] = 1
				;

			/*** create a flattened array of module names from the modules tree ***/
				var
					_modulesTree = UizeDotCom.ModulesTree (),
					_modules = []
				;
				function _addModules (_moduleName,_subModules) {
					_moduleName && _modules.push (_moduleName);
					if (_subModules) {
						for (var _subModule in _subModules)
							_addModules (_moduleName + (_moduleName && '.') + _subModule,_subModules [_subModule])
						;
					}
				}
				_addModules ('',_modulesTree);

			/*** create tests for all modules that aren't test modules and for which no dedicated test modules exist ***/
				for (var _moduleNo = -1, _modulesLength = _modules.length, _module; ++_moduleNo < _modulesLength;)
					!_knownTestModulesMap [_module = _modules [_moduleNo]] && // ignore known test modules
					_module.indexOf ('Uize.Test') == -1 &&                    // ignore any other unknown test modules
					_module.lastIndexOf ('library') != _module.length - 7 &&  // ignore library modules
					!_knownTestModulesMap ['Uize.Test.' + _module] &&         // ignore modules tested by known test modules
						_testSuite.addTest (Uize.Test.requiredModulesTest (_module))
				;

		return _testSuite;
	}
});

