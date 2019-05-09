/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Node.Classes Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 6
	codeCompleteness: 60
	testCompleteness: 0
	docCompleteness: 8
*/

/*?
	Introduction
		The =Uize.Node.Classes= module facilitates manipulation of the value of the =className= property of DOM nodes, with support for adding classes, removing classes, toggling classes, and more.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Node.Classes= module is a package under the =Uize.Node= namespace.

		In a Nutshell
			document...

			Benefits
				More Elegant, Easier to Read

					BEFORE
					....................................................
					var node = Uize.Node.getById ('recommendationsPod');
					if (!/\bpodPopulated\b/.test (node.className))
						node.className += ' ' + 'podPopulated'
					;
					....................................................

					AFTER
					.................................................................
					Uize.Node.Classes.addClass ('recommendationsPod','podPopulated');
					.................................................................

				Powerful State Paradigm
					document...

			Adding a Class
				document...

			Removing a Class
				document...

			Toggling a Class
				document...

			Testing For a Class
				document...

			Whitespace Handling
				Whitespace Respected
					document...

				No Whitespace Bloat
					document...

			The State Paradigm
				document...

				Setting State
					document...

				Getting State
					document...

				Toggling State
					document...
*/

Uize.module ({
	name:'Uize.Node.Classes',
	builder:function () {
		/*** Variables for Scruncher Optimization ***/
			var
				_package = function () {},
				_doForAll = Uize.Node.doForAll
			;

		/*** Global Variables ***/
			var
				_classesProfiles = {},
				_arrayWithEmptyString = ['']
			;

		/*** Public Static Methods ***/
			function _getClassesProfile (_classes) {
				var
					_classesProfileKey = _classes + '',
					_classesProfile = _classesProfiles [_classesProfileKey]
				;
				if (!_classesProfile && _classesProfileKey) {
					(_classes = _classesProfileKey.split (',')).length == 1 && _classes.unshift ('');
					var
						_classesRegExpStr = '\\b(?:' + _classes.join ('|').replace (/^\||\|$/,'') + ')\\b',
						_classToStateMap = {'':-1},
						_classesLength = _classes.length
					;
					for (var _classNo = _classesLength; --_classNo > -1;)
						_classToStateMap [_classes [_classNo]] = _classesLength > 2 ? _classNo : !!_classNo
					;
					_classesProfile = _classesProfiles [_classesProfileKey] = {
						_classes:_classes,
						_matchClassRegExp:new RegExp (_classesRegExpStr),
						_matchClassAndPaddingRegExp:new RegExp ('(\\s*)' + _classesRegExpStr + '(\\s*)'),
						_classToStateMap:_classToStateMap
					};
				}
				return _classesProfile;
			}

			var _getState = _package.getState = function (_node,_classes) {
				var _result = -1;
				if (Uize.Node.isNode (_node = Uize.Node.getById (_node))) {
					var _classesProfile = _getClassesProfile (_classes);
					if (_classesProfile)
						_result = _classesProfile._classToStateMap [
							(_node.className.match (_classesProfile._matchClassRegExp) || _arrayWithEmptyString) [0]
						]
					;
				}
				return _result;
				/*?
					Static Methods
						Uize.Node.Classes.getState
							document...

							SYNTAX
							..................................................................................
							stateBOOLorINT = Uize.Node.Classes.getState (nodeSTRorOBJ,stateClassesSTRorARRAY);
							..................................................................................

							For a more detailed discussion, see the section `Getting State`.

							NOTES
							- see the companion =Uize.Node.Classes.setState= and =Uize.Node.Classes.toggleState= static methods
				*/
			};

			_package.hasClass = function (_node,_class) {
				return _getState (_node,_class) == 1;
				/*?
					Static Methods
						Uize.Node.Classes.hasClass
							document...

							SYNTAX
							..................................................................
							hasClassBOOL = Uize.Node.Classes.hasClass (nodeSTRorOBJ,classSTR);
							..................................................................

							For a more detailed discussion, see the section `Testing For a Class`.

							NOTES
							- see the related =Uize.Node.Classes.addClass=, =Uize.Node.Classes.toggleClass=, and =Uize.Node.Classes.removeClass= static methods
							- see also the =Uize.Node.Classes.getState= static method
				*/
			};

			var _setState = _package.setState = function (_nodeBlob,_classes,_state) {
				var _classesProfile = _getClassesProfile (_classes);
				if (!_classesProfile) return;
				var
					_newClass = (_classes = _classesProfile._classes) [+_state],
					_nodeClassName
				;
				_doForAll (
					_nodeBlob,
					function (_node) {
						if ((_nodeClassName = _node.className) != _newClass) {
							if (_nodeClassName) {
								_node.className = _newClass
									? (
										_nodeClassName.replace (
											_classesProfile._matchClassRegExp,
											function () {return _newClass + (_newClass = '')}
										) + (_newClass && (' ' + _newClass))
									) : (
										_nodeClassName.replace (
											_classesProfile._matchClassAndPaddingRegExp,
											function (_match,_leadingWhitespace,_trailingWhitespace) {
												return _leadingWhitespace && _trailingWhitespace;
											}
										)
									)
								;
							} else {
								_node.className = _newClass;
							}
						}
					}
				);
				/*?
					Static Methods
						Uize.Node.Classes.setState
							document...

							SYNTAX
							............................
							Uize.Node.Classes.setState (
								nodeBLOB,
								stateClassesSTRorARRAY,
								stateBOOLor0to1INT
							);
							............................

							EXAMPLE
							...............................
							Uize.Node.Classes.setState (
								'recommendationsPod',
								['podEmpty','podPopulated'],
								hasRecommendations
							);
							...............................

							For a more detailed discussion, see the section `Setting State`.

							NOTES
							- see the companion =Uize.Node.Classes.getState= and =Uize.Node.Classes.toggleState= static methods
				*/
			};

			_package.addClass = function (_nodeBlob,_class) {
				_setState (_nodeBlob,_class,1);
				/*?
					Static Methods
						Uize.Node.Classes.addClass
							Adds the specified CSS class name to the =className= property of the specified node(s), provided that the class name is not already present.

							SYNTAX
							...............................................
							Uize.Node.Classes.addClass (nodeBLOB,classSTR);
							...............................................

							EXAMPLE
							.................................................................
							Uize.Node.Classes.addClass ('recommendationsPod','podPopulated');
							.................................................................

							In the above example, the class name ='podPopulated'= is being added to the =className= property of the DOM node with the =id= of ='recommendationsPod'=. If that class name is already present, the =className= property of the node will be unchanged. If the class name is not present, then is will be appended to the =className= string, with a single space character as a separator.

							For a more detailed discussion, see the section `Adding a Class`.

							NOTES
							- see the companion =Uize.Node.Classes.removeClass= static method
							- see the related =Uize.Node.Classes.hasClass= and =Uize.Node.Classes.toggleClass= static methods
							- see also the =Uize.Node.Classes.setState= static method
				*/
			};

			_package.removeClass = function (_nodeBlob,_class) {
				_setState (_nodeBlob,_class,0);
				/*?
					Static Methods
						Uize.Node.Classes.removeClass
							document...

							SYNTAX
							..................................................
							Uize.Node.Classes.removeClass (nodeBLOB,classSTR);
							..................................................

							For a more detailed discussion, see the section `Removing a Class`.

							NOTES
							- see the companion =Uize.Node.Classes.addClass= static method
							- see the related =Uize.Node.Classes.hasClass= and =Uize.Node.Classes.toggleClass= static methods
							- see also the =Uize.Node.Classes.setState= static method
				*/
			};

			_package.toggleClass = _package.toggleState = function (_nodeBlob,_classes) {
				var _classesProfile = _getClassesProfile (_classes);
				if (_classesProfile) {
					_classes = _classesProfile._classes;
					_doForAll (
						_nodeBlob,
						function (_node) {
							_setState (_node,_classes,(_getState (_node,_classes) + 1) % _classes.length);
						}
					);
				}
				/*?
					Static Methods
						Uize.Node.Classes.toggleClass
							document...

							SYNTAX
							..................................................
							Uize.Node.Classes.toggleClass (nodeBLOB,classSTR);
							..................................................

							For a more detailed discussion, see the section `Toggling a Class`.

							NOTES
							- see the related =Uize.Node.Classes.addClass=, =Uize.Node.Classes.hasClass=, and =Uize.Node.Classes.removeClass= static methods
							- see the related =Uize.Node.Classes.toggleState= static method

					Static Methods
						Uize.Node.Classes.toggleState
							document...

							SYNTAX
							................................................................
							Uize.Node.Classes.toggleState (nodeBLOB,stateClassesSTRorARRAY);
							................................................................

							For a more detailed discussion, see the section `Toggling State`.

							NOTES
							- see the companion =Uize.Node.Classes.getState= and =Uize.Node.Classes.setState= static methods
							- see the related =Uize.Node.Classes.toggleClass= static method
				*/
			};

		return _package;
	}
});

