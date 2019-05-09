/*______________
|       ______  |   U I Z E    J A V A S C R I P T    F R A M E W O R K
|     /      /  |   ---------------------------------------------------
|    /    O /   |    MODULE : Uize.Wsh.BuildUtils Package
|   /    / /    |
|  /    / /  /| |    ONLINE : http://www.uize.com
| /____/ /__/_| | COPYRIGHT : (c)2010 UIZE
|          /___ |   LICENSE : Available under MIT License or GNU General Public License
|_______________|             http://www.uize.com/license.html
*/

/*ScruncherSettings Mappings="=" LineCompacting="TRUE"*/

/* Module Meta Data
	type: Package
	importance: 3
	codeCompleteness: 100
	testCompleteness: 0
	docCompleteness: 2
*/

/*?
	Introduction
		The =Uize.Wsh.BuildUtils= package provides various utility methods to facilitate building of pages for a Web site project.

		*DEVELOPERS:* `Chris van Rensburg`

		The =Uize.Wsh.BuildUtils= modules is a package under the =Uize.Wsh= namespace, designed specifically to run in the context of Windows Script Host.
*/

Uize.module ({
	name:'Uize.Wsh.BuildUtils',
	required:[
		'Uize.Url',
		'Uize.Template',
		'Uize.Data.Simple',
		'Uize.String.Lines',
		'Uize.Json'
	],
	builder:function () {
		/*** Variables for Scruncher Optimization ***/
			var _package = function () {};

		/*** Global Variables ***/
			var _compiledJstFilesByPath = {};

		/*** Utility Functions ***/
			function _returnAsIs (_value) {return _value}

		/*** Public Static Methods ***/
			_package.getHtmlFilesInfo = function (_folderToIndex,_titleExtractor) {
				var _files = [];
				if (!_titleExtractor) _titleExtractor = _returnAsIs;

				for (
					var
						_fileNo = -1,
						_filesToIndex = Uize.Wsh.getFiles (_folderToIndex),
						_filesToIndexLength = _filesToIndex.length
					;
					++_fileNo < _filesToIndexLength;
				) {
					var
						_filePath = _filesToIndex [_fileNo],
						_fileName = Uize.Url.from (_filePath).file
					;
					if (/\.html$/i.test (_fileName) && _fileName.charAt (0) != '~') {
						var
							_fileText = Uize.Wsh.readFile (_filePath),
							_keywordsMatch = _fileText.match (/<meta name="keywords" content="(.*?)"\/>/),
							_descriptionMatch = _fileText.match (/<meta name="description" content="(.*?)"\/>/),
							_imageSrcMatch = _fileText.match (/<link rel="image_src" href="(.*?)"\/>/)
						;
						_files.push ({
							path:_folderToIndex + '/' + _fileName,
							title:_titleExtractor (_fileText.match (/<title>(.*?)<\/title>/) [1]),
							keywords:_keywordsMatch ? _keywordsMatch [1] : '',
							description:_descriptionMatch ? _descriptionMatch [1] : '',
							imageSrc:_imageSrcMatch ? Uize.Url.toAbsolute (_folderToIndex,_imageSrcMatch [1]) : ''
						});
					}
				}

				/*** sort files in case-insensitive alphanumeric order ***/
					_files.sort (
						function (_elementA,_elementB) {
							return (
								(_elementA._titleLowerCase || (_elementA._titleLowerCase = _elementA.title.toLowerCase ())) <
								(_elementB._titleLowerCase || (_elementB._titleLowerCase = _elementB.title.toLowerCase ()))
									? -1 : 1
							);
						}
					);
					for (var _fileNo = -1, _filesLength = _files.length; ++_fileNo < _filesLength;)
						delete _files [_fileNo]._titleLowerCase
					;

				return _files;
			};

			_package.readSimpleDataFile = function (_simpleDataFilePath) {
				return Uize.Data.Simple.parse ({simple:Uize.Wsh.readFile (_simpleDataFilePath),collapseChildren:true});
			};

			_package.compileJstFile = function (_jstTemplatePath) {
				var _template = _compiledJstFilesByPath [_jstTemplatePath];
				if (!_template) {
					if (!Uize.Wsh.fileExists (_jstTemplatePath)) return;
					_template = _compiledJstFilesByPath [_jstTemplatePath] = Uize.Template.compile (
						Uize.Wsh.readFile (_jstTemplatePath),
						{result:'full'}
					);
					Uize.module ({required:_template.required});
				}
				return _template.templateFunction;
			};

			_package.processJstFile = function (_jstTemplatePath,_input) {
				var _template = _package.compileJstFile (_jstTemplatePath);
				_template && Uize.Wsh.writeFile ({path:_jstTemplatePath.replace (/\.jst$/,''),text:_template (_input)});
			};

			_package.runScripts = function (_scripts) {
				var _error;
				if (!Uize.isArray (_scripts)) _scripts = [_scripts];
				for (
					var
						_scriptNo = -1,
						_scriptsLength = _scripts.length,
						_wshShell = new ActiveXObject ('WScript.Shell'),
						_errorCode
					;
					++_scriptNo < _scriptsLength && !_error;
				)
					if (_errorCode = _wshShell.Run ('WScript ' + _scripts [_scriptNo],0,true))
						_error = {
							script:_scripts [_scriptNo],
							errorCode:_errorCode
						}
				;
				return _error;
			};

			_package.runUnitTests = function (_unitTestsModuleName) {
				Uize.module ({
					required:_unitTestsModuleName,
					builder:function () {
						var _unitTests = new (eval (_unitTestsModuleName));
						_unitTests.wire (
							'Done',
							function (_event) {
								var
									_test = _event.source,
									_result = _test.get ('result')
								;
								if (!_result || _test == _unitTests) {
									(WScript.Arguments.Count () && WScript.Arguments.Item (0) == 'silent') ||
										alert (_test.getSynopsis ())
									;
									_result || WScript.Quit (1);
								}
							}
						);
						_unitTests.run ();
					}
				});
			};

			_package.writeDataModule = function (_moduleFolderPath,_moduleName,_moduleData) {
				Uize.Wsh.writeFile ({
					path:_moduleFolderPath + '\\' + _moduleName + '.js',
					text:
						'Uize.module ({\n' +
							'\tname:\'' + _moduleName + '\',\n' +
							'\tbuilder:function () {\n' +
								'\t\treturn function () {\n' +
								'\t\t\treturn ' + Uize.String.Lines.indent (Uize.Json.to (_moduleData),3,'\t',false) + ';\n' +
								'\t\t};\n' +
							'\t}\n' +
						'});\n'
				});
			};

		return _package;
	}
});

