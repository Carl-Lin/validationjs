/*========================================================================================================== 
Author: Carl  Lin
Time: Sep, 2014
Description:
 	Since jquery.validation is suck!!!!  Decide to rewrite one

 	onsubmit need to get a json- { formClass: '',  requireList: '',  repeatList: '' };
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
description: check if required field is empty & if retype is the same. But the part of retype is not finish yet. 
not yet finish: Now only can input form class, will add input form id. in put for id like #xxx.
*/

// formClass, requireList, repeatList
	my.onsubmit = function( initJson ){
			var formClass = initJson.formClass,
				requireList = initJson.requireList,
				repeatList = initJson.repeatList?initJson.repeatList:[];

			var l = requireList.length,
					i,
					element = document.getElementsByClassName( formClass ),
					elementLength = element.length,
					elementCounting,
					flag = true;

			var repeatContentArr = [], ///variable for check repeat;
					repeatLength = repeatList.length;

			var warningArr = [],///variables for set warning span
					warningLength,
					warningContent = '',
					warningTemp = '';

			///iterate all form named Formclass
			for( var elementCounting=0; elementCounting<elementLength; elementCounting++ ){
				///iterate all input fueld in form
				[].forEach.call(element[elementCounting].querySelectorAll('input'), function(e){
					for( i=0; i<l; i++ ){
					///add validation-require class to empty input.
						if( e.name === requireList[i] ){
							if( e.value==='' ){
								flag = false;
								e.classList.add('validation-required');
								warningTemp = '<div class="validation-warning">'+ e.name + ' is required' +'</div>';
								warningContent = warningContent + warningTemp;
							}
						}
					}
					///if there have been askd for check two field to be the same
					if(repeatLength!==0){
						for(i=0; i<repeatLength; i++){
							if(e.name === repeatList[i] && e.value !== ''){
								repeatContentArr.push(e.value);
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
				// else if( repeatContentArr.length !== 0 ){
				// 	for(i=0; i<repeatList.length; i++){
				// 		if()
				// 	}
				// }
			}
			return flag;// for stop submit
	};
	return my;
}(window, document, FormValidation||{}));


