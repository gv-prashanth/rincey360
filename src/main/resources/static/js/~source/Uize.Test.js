/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Test Class
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=b" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Class
	importance: 9
	codeCompleteness: 40
	testCompleteness: 0
	docCompleteness: 0
*/

/*?
	Introduction
		The =Uize.Test= class...

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Test= module defines the =Uize.Test= class, a subclass of the =Uize=.
*/

Uize.module ({
	name:'Uize.Test',
	required:[
		'Uize.Data',
		'Uize.Json'
	],
	builder:function (_superclass) {
		/*** Variables for Scruncher Optimization ***/
			var
				_true = true,
				_false = false,
				_undefined
			;

		/*** Global Variables ***/
			var
				_forceAsync = typeof navigator == 'object',
					/* NOTE:
						Force tests to be asynchronous for browsers for two reasons

						1. Some browsers don't repaint while locked in JavaScript execution, so executing tons of tests without giving the browser opportunities to paint DOM updates would make for a lousy experience when running a test suite in a browser.

						2. Some browsers pop up alert dialogs if JavaScript takes too long before returning control, which is definitely not what you want when running a large test suite in a browser.
					*/
				_synopsisDivider = '\n----------------------------------------------------------\n\n'
			;

		/*** Class Constructor ***/
			var
				_class = _superclass.subclass (),
				_classPrototype = _class.prototype
			;

		/*** Utility Functions ***/
			function _inheritsFrom (_testInstanceOrClass,_baseInstanceOrClass) {
				if (_baseInstanceOrClass == _undefined) return _testInstanceOrClass == _undefined;
				if (_testInstanceOrClass == _undefined) return _baseInstanceOrClass == Object;
				if (!(_testInstanceOrClass instanceof Function))
					_testInstanceOrClass = _testInstanceOrClass.constructor
				;
				if (!(_baseInstanceOrClass instanceof Function))
					_baseInstanceOrClass = _baseInstanceOrClass.constructor
				;
				while (
					_testInstanceOrClass != _baseInstanceOrClass &&
					typeof (_testInstanceOrClass = _testInstanceOrClass.superclass) == 'function'
				);
				return _testInstanceOrClass == _baseInstanceOrClass;
			}

			function _className (_object) {
				if (_inheritsFrom (_object,Uize)) return _object.moduleName || '';
				var _contructorFunctionNameMatch = (_object + '').match (/function\s+([^\(]+)\s*\(/);
				return _contructorFunctionNameMatch ? _contructorFunctionNameMatch [1] : '';
			}

			function _valueToJsonSerializer (_value) {
				return function () {return Uize.Json.to (_value)};
			}

		/*** Private Instance Methods ***/
			_classPrototype._expectSuccess = function (_succeeded,_serializeExpected,_serializeActual) {
				_succeeded ||
					this.set ({
						_reasonForFailure:
							'EXPECTED:\n\n' +
							(typeof _serializeExpected == 'function' ? _serializeExpected () : _serializeExpected) + '\n\n' +
							'ACTUAL:\n\n' +
							_serializeActual ()
					})
				;
				return _succeeded;
			};

		/*** Public Instance Methods ***/
			_classPrototype.expect = function (_expectedValue,_value) {
				return this._expectSuccess (
					Uize.Data.identical (_expectedValue,_value),
					_valueToJsonSerializer (_expectedValue),
					_valueToJsonSerializer (_value)
				);
			};

			_classPrototype.expectNonNull = function (_value) {
				return this._expectSuccess (
					_value != null,
					'value that is not null or undefined',
					_valueToJsonSerializer (_value)
				);
			};

			/*** methods for instance type expectations ***/
				_classPrototype.expectInstanceOf = function (_class,_value) {
					return this._expectSuccess (
						typeof _value == 'object' && _value &&
						_value.constructor == (typeof _class == 'string' ? eval (_class) : _class).prototype.constructor,
						function () {return 'instance of ' + _className (_class)},
						function () {return 'instance of ' + _className (_value.constructor)}
					);
				};

			/*** methods for type expectations ***/
				_classPrototype.expectType = function (_expectedType,_value) {
					return this._expectSuccess (
						typeof _value == _expectedType,
						function () {return 'type ' + _expectedType},
						function () {return 'type ' + typeof _value}
					);
				};

				_classPrototype.expectArray = function (_value) {
					return this.expectInstanceOf (Array,_value);
				};

				_classPrototype.expectBoolean = function (_value) {
					return this.expectType ('boolean',_value);
				};

				_classPrototype.expectFunction = function (_value) {
					return this.expectType ('function',_value);
				};

				_classPrototype.expectNumber = function (_value) {
					return this.expectType ('number',_value);
				};

				_classPrototype.expectObject = function (_value) {
					return this.expectType ('object',_value);
				};

				_classPrototype.expectRegExp = function (_value) {
					return this.expectInstanceOf (RegExp,_value);
				};

				_classPrototype.expectString = function (_value) {
					return this.expectType ('string',_value);
				};

			/*** methods for type-like expectations ***/
				_classPrototype.expectArrayLike = function (_value) {
					return this._expectSuccess (Uize.isArray (_value),'array like',_valueToJsonSerializer (_value));
				};

			/*** methods for range expectations ***/
				_classPrototype.expectValueRange = function (_minValue,_maxValue,_value) {
					return this._expectSuccess (
						_value >= _minValue && _value <= _maxValue,
						function () {return 'value within range ' + _minValue + ' to ' + _maxValue},
						_valueToJsonSerializer (_value)
					);
				};

				/*** convenience methods for negative and positive value ranges ***/
					_classPrototype.expectNegativeValue = function (_value) {
						return this.expectValueRange (-Infinity,0,_value);
					};

					_classPrototype.expectPositiveValue = function (_value) {
						return this.expectValueRange (0,Infinity,_value);
					};

				_classPrototype.expectLengthRange = function (_minLength,_maxLength,_value) {
					var _valueLength = _value.length;
					return this._expectSuccess (
						_valueLength >= _minLength && _valueLength <= _maxLength,
						function () {return 'length within range ' + _minLength + ' to ' + _maxLength},
						function () {return _valueLength}
					);
				};

				_classPrototype.expectNonEmpty = function (_value) {
					return this._expectSuccess (!Uize.Data.isEmpty (_value),'non-empty',_valueToJsonSerializer (_value));
				};

			/*** convenience methods for compound expectations ***/
				_classPrototype.expectInteger = function (_value) {
					return this._expectSuccess (Math.floor (_value) == +_value,'integer',_valueToJsonSerializer (_value));
				};

				_classPrototype.expectNegativeInteger = function (_value) {
					return this.expectInteger (_value) && this.expectNegativeValue (_value);
				};

				_classPrototype.expectPositiveInteger = function (_value) {
					return this.expectInteger (_value) && this.expectPositiveValue (_value);
				};

				_classPrototype.expectNoRepeats = function (_values) {
					return Uize.Data.getTotalKeys (Uize.Data.getLookup (_values)) == _values.length;
				};

				_classPrototype.expectNonEmptyArray = function (_value) {
					return this.expectArray (_value) && this.expectNonEmpty (_value);
				};

				_classPrototype.expectNonEmptyObject = function (_value) {
					return this.expectObject (_value) && this.expectNonEmpty (_value);
				};

				_classPrototype.expectNonEmptyString = function (_value) {
					return this.expectString (_value) && this.expectNonEmpty (_value);
				};

			_classPrototype.getDepth = function () {
				var
					_depth = 0,
					_parent = this
				;
				while (_parent = _parent.parent) _depth++;
				return _depth;
			};

			_classPrototype.getTotalTests = function () {
				var _totalTests = 0;
				function _getTotalTests (_subtests) {
					_totalTests++;
					if (Uize.isArray (_subtests)) {
						for (var _subtestNo = -1, _subtestsLength = _subtests.length; ++_subtestNo < _subtestsLength;)
							_getTotalTests (_subtests [_subtestNo]._test)
						;
					}
				}
				_getTotalTests (this._test);
				return _totalTests;
			};

			_classPrototype.getSynopsis = function () {
				var
					_this = this,
					_result = _this._result,
					_synopsis = _result ? 'PASSED' : 'FAILED',
					_reasonForFailure = _this._reasonForFailure
				;
				if (!_result && _reasonForFailure) {
					_synopsis += '\n' + _synopsisDivider;
					var
						_testParent = _this,
						_testBreadcrumbs = [],
						_testBreadcrumbsStr = '',
						_testBreadcrumbIndent = ''
					;
					while (_testParent) {
						_testBreadcrumbs.push (_testParent._title);
						_testParent = _testParent.parent;
					}
					for (var _testBreadcrumbNo = _testBreadcrumbs.length; --_testBreadcrumbNo > -1;) {
						_testBreadcrumbsStr +=
							_testBreadcrumbIndent + _testBreadcrumbs [_testBreadcrumbNo] + '\n'
						;
						_testBreadcrumbIndent += '   ';
					}
					_synopsis +=
						'BREADCRUMBS...\n\n' + _testBreadcrumbsStr + _synopsisDivider +
						'REASON FOR FAILURE...\n\n' + _reasonForFailure
					;
				}
				return _synopsis;
			};

			_classPrototype.stop = function () {
				var
					_this = this,
					_subtests = _this._test
				;
				if (Uize.isArray (_subtests)) {
					for (var _subtestNo = -1, _subtestsLength = _subtests.length; ++_subtestNo < _subtestsLength;)
						_subtests [_subtestNo].stop ()
					;
				}
				_this.set ({_inProgress:false});
			};

			_classPrototype.run = function (_callback) {
				/* NOTE:
					Ultimately, this code should find its way into the onChange handler for the inProgress set-get property, and then this method can be supplanted by a simple start method that only stops the test and then sets the inProgress property to true, making the interface for this class more in line with the Uize.Fade class.
				*/
				var
					_this = this,
					_test = _this._test,
					_testResult = _true
				;
				_this.stop ();
				_this.set ({
					_inProgress:_true,
					_progress:0,
					_startTime:new Date,
					_endTime:_undefined,
					_isAsync:_false,
					_log:[],
					_result:_undefined,
					_reasonForFailure:_undefined
				});
				_this.fire ({name:'Start',bubble:_true});
				function _updateResultProperty () {
					_this.set ({_result:_testResult});
					if (_testResult == _isAsync) {
						_this.set ({_isAsync:_true});
					} else {
						var _endTime = new Date;
						_this.set ({
							_duration:_endTime - _this._startTime,
							_endTime:_endTime,
							_progress:1
						});
						_this.stop ();
						_this.fire ({name:'Done',bubble:_true});
						_this._isAsync && _callback && _callback (_testResult);
					}
				}
				if (Uize.isArray (_test)) {
					var
						_testLength = _test.length,
						_testNo = -1
					;
					function _continue () {
						_this.set ({_progress:(_testNo + 1) / _testLength});
						function _setResultAndContinue (_result) {
							_testResult = _result;
							_continue ();
						}
						while (_this._inProgress && _testResult === _true && ++_testNo < _testLength)
							_testResult = _test [_testNo].run (_setResultAndContinue)
						;
						_updateResultProperty ();
					}
					_continue ();
				} else {
					try {
						_testResult = _isAsync;
						var
							_returned = _false,
							_testFunctionReturnValue = _test.call (
								_this,
								function (_result) {
									_testResult = _result;
									_returned && _updateResultProperty ();
								}
							)
						;
						if (_testFunctionReturnValue !== _undefined)
							_testResult = _testFunctionReturnValue
						;
						_returned = true;
					} catch (_error) {
						_this.set ({
							_reasonForFailure:
								'JavaScript Error...\n' +
								'ERROR NAME: ' + _error.name + '\n' +
								'ERROR MESSAGE: ' + _error.message + '\n' +
								'ERROR DESCRIPTION: ' + _error.description + '\n' +
								'LINE NUMBER: ' + _error.number + '\n'
						});
						_testResult = _false;
					}
					if (_testResult != _isAsync && _forceAsync) {
						var _storedTestResult = _testResult;
						_testResult = _isAsync;
						_updateResultProperty ();
						setTimeout (
							function () {
								_testResult = _storedTestResult;
								_updateResultProperty ();
							},
							0
						);
					} else {
						_updateResultProperty ();
					}
				}

				return _testResult;
			};

		/*** Public Static Properties ***/
			var _isAsync = _class.isAsync = {};

		/*** Public Static Methods ***/
			_class.addTest = function (_test) {
				(this._test || (this._test = [])).push (_test);
			};

			_class.log = function (_message) {
				this._log.push ({timestamp:new Date,message:_message});
			};

			var _splitHostAndProperty = _class.splitHostAndProperty = function (_propertyFullName) {
				var _lastPeriodPos = _propertyFullName.lastIndexOf ('.');
				return {
					host:_propertyFullName.slice (0,_lastPeriodPos),
					property:_propertyFullName.slice (_lastPeriodPos + 1)
				};
			};

			/*** factory methods for creating test classes using declarative syntax ***/
				_class.declare = function (_test) {
					var
						_testIsTestSubclass = _inheritsFrom (_test,_class),
						_testClass = _testIsTestSubclass ? _test : _class.subclass ()
					;
	
					/*** if test property is an array of subtests, then resolve any declarative subtests ***/
						var _subtests = _testIsTestSubclass ? _test._test : _test.test;
						if (Uize.isArray (_subtests)) {
							for (
								var _subtestNo = -1, _subtestsLength = _subtests.length, _subtest;
								++_subtestNo < _subtestsLength;
							)
								if ((_subtest = _subtests [_subtestNo]).constructor == Object)
									_subtests [_subtestNo] = _class.declare (_subtest)
							;
						}
	
					_testIsTestSubclass || _testClass.set (_test);
					return _testClass;
				};
	
				_class.requiredModulesTest = function (_modules) {
					return Uize.Test.declare ({
						title:'REQUIRED MODULES TEST: ' + _modules,
						test:function (_continue) {
							Uize.module ({
								required:_modules,
								builder:function () {_continue (true)}
							});
						}
					});
				};
	
				_class.staticPropertyTest = function (_propertyFullName,_expectedType) {
					var
						_hostAndProperty = _splitHostAndProperty (_propertyFullName),
						_propertyHost = _hostAndProperty.host
					;
					return _class.declare ({
						title:'Test that ' + _propertyFullName + ' exists and is a ' + _expectedType,
						test:[
							{
								title:'Test that host ' + _propertyHost + ' is defined',
								test:function () {return this.expectNonNull (eval (_propertyHost))}
							},
							{
								title:'Test that ' + _propertyFullName + ' is a ' + _expectedType,
								test:function () {
									return this.expectType (
										_expectedType,
										eval (_propertyHost) [_hostAndProperty.property]
									);
								}
							}
						]
					});
				};
	
				_class.staticMethodTest = function (_methodFullName,_cases,_testProperties) {
					var
						_hostAndProperty = _splitHostAndProperty (_methodFullName),
						_methodHostName = _hostAndProperty.host,
						_methodName = _hostAndProperty.property,
						_test = [_class.staticPropertyTest (_methodFullName,'function')]
					;
					function _getCaseTest (_case) {
						return (
							Uize.isArray (_case)
								? _class.declare ({
									title:_case [0],
									test:function () {
										var
											_methodHost = eval (_methodHostName),
											_arguments = _case [1]
										;
										return this.expect (
											_case [2],
											_methodHost [_methodName].apply (
												_methodHost,
												Uize.isArray (_arguments) ? _arguments : [_arguments]
											)
										);
									}
								})
								: _case
						);
					}
					for (var _caseNo = -1, _casesLength = _cases.length; ++_caseNo < _casesLength;)
						_test.push (_getCaseTest (_cases [_caseNo]))
					;
					return _class.declare (
						_class.copyInto (
							{
								title:'STATIC METHOD TEST: ' + _methodFullName,
								test:_test
							},
							_testProperties
						)
					);
				};
	
				_class.staticMethodTests = function (_staticMethodTests) {
					var _test = [];
					for (
						var _staticMethodTestNo = -1, _staticMethodTestsLength = _staticMethodTests.length;
						++_staticMethodTestNo < _staticMethodTestsLength;
					) {
						var _staticMethodTest = _staticMethodTests [_staticMethodTestNo];
						_test.push (
							Uize.isArray (_staticMethodTest)
								? _class.staticMethodTest.apply (this,_staticMethodTest)
								: _staticMethodTest
						);
					}
					return _class.declare ({title:'Static Method Tests',test:_test});
				};
	
				_class.testModuleTest = function (_testModule) {
					var _loadTestModuleTest = _class.requiredModulesTest (_testModule);
					_loadTestModuleTest.set ({_title:'REQUIRE TEST MODULE: ' + _testModule});
					return _class.declare ({
						title:'TEST MODULE: ' + _testModule,
						test:[
							_loadTestModuleTest,
							Uize.Test.declare (
								{
									title:'RUN TEST MODULE: ' + _testModule,
									test:function (_continue) {return (new (eval (_testModule))).run (_continue)}
								}
							)
						]
					});
				};
	
				_class.testSuite = function (_testSuiteTitle,_testSuiteModules) {
					var _test = [];
					for (
						var _testSuiteModuleNo = -1, _testSuiteModulesLength = _testSuiteModules.length;
						++_testSuiteModuleNo < _testSuiteModulesLength;
					)
						_test.push (_class.testModuleTest (_testSuiteModules [_testSuiteModuleNo]))
					;
					return _class.declare ({title:_testSuiteTitle,test:_test});
				};

		/*** Register Properties ***/
			_class.registerProperties ({
				_isAsync:'isAsync',
				//_breathe:'breathe',
				//_cleanup:'cleanup',
				//_context:'context',
				_duration:'duration',
				_endTime:'endTime',
				_inProgress:{
					name:'inProgress',
					value:_false
				},
				_log:'log',
				_progress:{
					name:'progress',
					value:0
				},
				_reasonForFailure:'reasonForFailure',
				_result:'result',
				_test:{
					name:'test',
					conformer:function (_value) {
						if (Uize.isArray (_value)) {
							var _subtests = _value;
							_value = [];
							for (var _subtestNo = -1, _subtestsLength = _subtests.length; ++_subtestNo < _subtestsLength;)
								_value.push (new _subtests [_subtestNo] ({parent:this}))
							;
						}
						return _value;
					}
				},
				//_setup:'setup',
				_startTime:'startTime',
				_title:'title'
			});

		return _class;
	}
});

