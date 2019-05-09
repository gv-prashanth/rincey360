/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test.Uize.Node.Classes Class
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
	codeCompleteness: 50
	testCompleteness: 100
	docCompleteness: 100
*/

/*?
	Introduction
		The =Uize.Test.Uize.Node.Classes= module defines a suite of unit tests for the =Uize.Node.Classes= module.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Test.Uize.Node.Classes= module defines the =Uize.Test.Uize.Node.Classes= class, a subclass of the =Uize.Test= class.
*/

/* TODO:
	The _modifyClassesStaticMethodTest and _modifyClassesStaticMethodsTest methods are very similar in spirit to the Uize.Test.staticMethodTest and Uize.Test.staticMethodTests methods of the Uize.Test class. Perhaps this pattern could be formalized with some refactoring so that there isn't so much duplication of code in test modules like this.
*/

Uize.module ({
	name:'Uize.Test.Uize.Node.Classes',
	builder:function () {
		function _mockNodeWithClassName (_className) {
			/* NOTE:
				returns an object designed to fool the Uize.Node.isNode method into thinking it's a node, so we can test the classes methods without having to have a browser or a document, allowing this test module to run in Windows Script Host or other non-browser host
			*/
			return {
				className:_className,
				getAttribute:function () {}
			};
		}

		function _modifyClassesStaticMethodTest (_methodFullName,_cases,_testProperties) {
			var
				_hostAndProperty = Uize.Test.splitHostAndProperty (_methodFullName),
				_methodHostName = _hostAndProperty.host,
				_methodName = _hostAndProperty.property,
				_test = [Uize.Test.staticPropertyTest (_methodFullName,'function')]
			;
			function _getCaseTest (_case) {
				return (
					Uize.isArray (_case)
						? Uize.Test.declare ({
							title:_case [0],
							test:function () {
								var
									_mockNode = _mockNodeWithClassName (_case [1]),
									_methodHost = eval (_methodHostName),
									_arguments = _case [2]
								;
								_methodHost [_methodName].apply (
									_methodHost,
									[_mockNode].concat (Uize.isArray (_arguments) ? _arguments : [_arguments])
								);
								return this.expect (_case [3],_mockNode.className);
							}
						})
						: _case
				);
			}
			for (var _caseNo = -1, _casesLength = _cases.length; ++_caseNo < _casesLength;)
				_test.push (_getCaseTest (_cases [_caseNo]))
			;
			return Uize.Test.declare (
				Uize.Test.copyInto (
					{
						title:'STATIC METHOD TEST: ' + _methodFullName,
						test:_test
					},
					_testProperties
				)
			);
		}

		function _modifyClassesStaticMethodsTest (_staticMethodTests) {
			var _test = [];
			for (
				var _staticMethodTestNo = -1, _staticMethodTestsLength = _staticMethodTests.length;
				++_staticMethodTestNo < _staticMethodTestsLength;
			) {
				var _staticMethodTest = _staticMethodTests [_staticMethodTestNo];
				_test.push (
					Uize.isArray (_staticMethodTest)
						? _modifyClassesStaticMethodTest.apply (this,_staticMethodTest)
						: _staticMethodTest
				);
			}
			return Uize.Test.declare ({title:'Modify Classes Static Method Tests',test:_test});
		}

		return Uize.Test.declare ({
			title:'Test for Uize.Node.Classes Module',
			test:[
				Uize.Test.requiredModulesTest ('Uize.Node.Classes'),
				Uize.Test.staticMethodTests ([
					['Uize.Node.Classes.getState',[
						/*** test handling of invalid node cases ***/
							['Test that the integer -1 is returned when the node is null',
								[null,['disabled','enabled']],
								-1
							],
							['Test that the integer -1 is returned when the node is undefined',
								[undefined,['disabled','enabled']],
								-1
							],

						/*** test support for boolean state values ***/
							['Test that the boolean false is returned when the node\'s className string contains the first of two state classes',
								[_mockNodeWithClassName ('BEFORE disabled AFTER'),['disabled','enabled']],
								false
							],
							['Test that the boolean true is returned when the node\'s className string contains the second of two state classes',
								[_mockNodeWithClassName ('BEFORE enabled AFTER'),['disabled','enabled']],
								true
							],

						/*** test support for integer state values (ie. more than two states) ***/
							['Test that the integer 0 is returned when the node\'s className string contains the first of three state classes',
								[_mockNodeWithClassName ('BEFORE warning AFTER'),['warning','nonFatalError','fatalError']],
								0
							],
							['Test that the integer 1 is returned when the node\'s className string contains the second of three state classes',
								[_mockNodeWithClassName ('BEFORE nonFatalError AFTER'),['warning','nonFatalError','fatalError']],
								1
							],
							['Test that the integer 2 is returned when the node\'s className string contains the third of three state classes',
								[_mockNodeWithClassName ('BEFORE fatalError AFTER'),['warning','nonFatalError','fatalError']],
								2
							],

						/*** test handling of no state class present ***/
							['Test that the integer -1 is returned when the node\'s className string does not contain any of the state classes',
								[_mockNodeWithClassName ('populated selected featured'),['disabled','enabled']],
								-1
							],
							['Test that class matching is case sensitive when getting a state from a node\'s className',
								[_mockNodeWithClassName ('ENABLED'),['disabled','enabled']],
								-1
							],

						/*** test handling when class for one of the states is an empty string ***/
							['Test that the boolean false is returned when the first of the state classes is an empty string and the node\'s className string does not contain the second state class',
								[_mockNodeWithClassName ('populated featured'),['','selected']],
								false
							],
							['Test that the boolean true is returned when the second of the state classes is an empty string and the node\'s className string does not contain the first state class',
								[_mockNodeWithClassName ('populated featured'),['selected','']],
								true
							],

						/*** test support for state classes being specified using a string ***/
							/*** test support for multiple state classes being specified using a comma-separated string ***/
								['Test that the boolean false is returned when the node\'s className string contains the first of two state classes specified using a comma-separated string',
									[_mockNodeWithClassName ('BEFORE disabled AFTER'),'disabled,enabled'],
									false
								],
								['Test that the boolean true is returned when the node\'s className string contains the second of two state classes',
									[_mockNodeWithClassName ('BEFORE enabled AFTER'),'disabled,enabled'],
									true
								],

							/*** test handling of a single state class being specified using a string ***/
								['Test that the boolean false is returned when a state class specified using a string isn\'t contained inside the node\'s className string',
									[_mockNodeWithClassName ('populated featured'),'selected'],
									false
								],
								['Test that the boolean true is returned when a state class specified using a string is contained inside the node\'s className string',
									[_mockNodeWithClassName ('populated selected featured'),'selected'],
									true
								],
								['Test that the integer -1 is returned when an empty string is specified for the state class',
									[_mockNodeWithClassName ('enabled'),''],
									-1
								]
					]],
					['Uize.Node.Classes.hasClass',[
						/*** test handling of invalid node cases ***/
							['Test that the boolean false is returned when the node is null',
								[null,['selected']],
								false
							],
							['Test that the boolean false is returned when the node is undefined',
								[undefined,['selected']],
								false
							],

						/*** test when specified class is present ***/
							['Test that the boolean true is returned when the specified class is the first class of several classes in the node\'s className string',
								[_mockNodeWithClassName ('populated selected featured'),['populated']],
								true
							],
							['Test that the boolean true is returned when the specified class is the second class of several classes in the node\'s className string',
								[_mockNodeWithClassName ('populated selected featured'),['selected']],
								true
							],
							['Test that the boolean true is returned when the specified class is the last class of several classes in the node\'s className string',
								[_mockNodeWithClassName ('populated selected featured'),['featured']],
								true
							],

						/*** test when specified class is absent ***/
							['Test that the value false is returned when the node\'s className string does not contain the specified class',
								[_mockNodeWithClassName ('populated featured'),['selected']],
								false
							],
							['Test that class matching is case sensitive when testing if a class is present in a node\'s className string',
								[_mockNodeWithClassName ('populated selected featured'),['SELECTED']],
								false
							],

						/*** miscellaneous ***/
							['Test that the boolean false is returned when the class that is being tested for is an empty string',
								[_mockNodeWithClassName ('populated selected featured'),['']],
								false
							]
					]]
				]),
				_modifyClassesStaticMethodsTest ([
					/*
						- Uize.Node.Classes.setState
						- Uize.Node.Classes.toggleState
					*/
					['Uize.Node.Classes.addClass',[
						['Test that adding a class to a node that has no classes works correctly',
							'',
							'selected',
							'selected'
						],
						['Test that adding a class to a node that already has that class doesn\'t result in a duplicate',
							'populated selected',
							'selected',
							'populated selected'
						],
						['Test that adding a class to a node that already has a different class results in the new class being appended, with a single space as separator',
							'populated',
							'selected',
							'populated selected'
						],
						['Test that class matching is case sensitive when adding a class',
							'populated selected',
							'SELECTED',
							'populated selected SELECTED'
						],
						['Test that adding a class that is an empty string results in no change',
							'populated selected',
							'',
							'populated selected'
						]
					]],
					['Uize.Node.Classes.removeClass',[
						['Test that removing a class from a node that has no classes works correctly',
							'',
							'selected',
							''
						],
						['Test that removing a class that is at the beginning of a node\'s className string is handled correctly',
							'populated selected featured',
							'populated',
							'selected featured'
						],
						['Test that removing a class that is in the middle of a node\'s className string is handled correctly',
							'populated selected featured',
							'selected',
							'populated featured'
						],
						['Test that removing a class that is at the end of a node\'s className string is handled correctly',
							'populated selected featured',
							'featured',
							'populated selected'
						],
						['Test that removing a class that isn\'t in a node\'s className string results in no change',
							'populated selected featured',
							'BLAH',
							'populated selected featured'
						],
						['Test that removing a class that is an empty string results in no change',
							'populated selected featured',
							'',
							'populated selected featured'
						],
						['Test that removing the only class in a node\'s className string results in an empty className string',
							'populated',
							'populated',
							''
						],
						['Test that class matching is case sensitive when removing a class',
							'populated selected featured',
							'FEATURED',
							'populated selected featured'
						]
					]],
					['Uize.Node.Classes.toggleClass',[
						/*** test when specified class is present ***/
							['Test that toggling a class that is at the beginning of a node\'s className string is handled correctly',
								'populated selected featured',
								'populated',
								'selected featured'
							],
							['Test that toggling a class that is in the middle of a node\'s className string is handled correctly',
								'populated selected featured',
								'selected',
								'populated featured'
							],
							['Test that toggling a class that is at the end of a node\'s className string is handled correctly',
								'populated selected featured',
								'featured',
								'populated selected'
							],

						/*** test when specified class is absent ***/
							['Test that toggling a class for a node that has no classes works correctly',
								'',
								'selected',
								'selected'
							],
							['Test that toggling a class that isn\'t present for a node that has different classes in its className string results in the toggle class being appended, with a single space as separator',
								'populated selected',
								'featured',
								'populated selected featured'
							],

						/*** miscellaneous ***/
							['Test that class matching is case sensitive when toggling a class',
								'populated selected featured',
								'FEATURED',
								'populated selected featured FEATURED'
							],
							['Test that toggling a class that is an empty string results in no change',
								'populated selected featured',
								'',
								'populated selected featured'
							]
					]]
				])
			]
		});
	}
});

