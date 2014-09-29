/*========================================================================================================== 
Author: Carl  Lin
Time: Sep, 2014
Description:   
 	Since jquery.validation is suck!!!!  Decide to rewrite one
===========================================================================================================*/
if(typeof module === 'object'){
	module.export = FormValidation;
}

var FormValidation = (function(window, document, my){
	my.recoverForm = function(){
		///recover all we do at init
		var warning = document.getElementById('required-warning');
		if( warning ){
			warning.parentNode.removeChild(warning);
		}
		[].forEach.call(document.querySelectorAll('.validation-required'), function(e){
			e.classList.remove('validation-required');
		})

	};

/*
description: check if required field is empty & if retype is the same
not yet finish: Now only can input form class, will add input form id. in put for id like #xxx.
*/
	my.onsubmit = function( formClass, requireList, repeatList){
			var l = requireList.length,
					i,
					element = document.getElementsByClassName( formClass ),
					elementLength = element.length,
					elementCounting,
					flag = true;

			// var repeatTemp1 = '', ///variable for check repeat;
			// 	repeatTemp2 = '',
			// 	repeatLength = 0,
			// 	repeatDefault = false;

			var warningArr = [],///variables for set warning span
					warningLength,
					warningContent = '',
					warningTemp = '';

			///iterate all form named Formclass
			for( var elementCounting=0; elementCounting<elementLength; elementCounting++ ){
				///iterate all input in form
				[].forEach.call(element[elementCounting].querySelectorAll('input'), function(e){
					for( i=0; i<l; i++ ){
					///add validation-require class to empty input.
						if( e.name === requireList[i] ){
							if( e.value==='' ){
								flag = flag?false:false;
								e.classList.add('validation-required');
								warningTemp = '<span class="validation-warning">'+ e.name + ' is required' +'</span>';
								warningContent = warningContent + warningTemp;
							}
						}
					}
				});

				///append  span with 'xxx is required'
				if(warningContent !== ''){
					var warningDiv = document.createElement('div');
					warningDiv.id = 'required-warning';
					warningDiv.innerHTML = warningContent;
					element[elementCounting].insertBefore( warningDiv, element[elementCounting].childNodes[2] )
					warningContent = '';
				}
			}
			return flag;// for stop submit
	}

	return my;
}(window, document, FormValidation||{}));


