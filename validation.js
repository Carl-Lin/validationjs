/*========================================================================================================== 
Author: Carl  Lin
Time: Sep, 2014
Description:   Since jquery.validation is suck!!!!  Rewrite one with more simple function
===========================================================================================================*/
if(typeof module === 'object'){
	module.export = FormValidation;
}

var FormValidation = (function(window, document, my){
	var recoverForm = function(){
		///recover all we do at init
	};

///now only can input form class, will add input form id. in put for id like #xxx.
	my.submit = function( formClass, requireList){
			var l = requireList.length,
					element = document.getElementsByClassName( formClass ),
					elementLength = element.length,
					elementCounting,
					flag = true;

			var warningArr = [],///variables for set warning span
					warningLength,
					warningContent = '',
					warningTemp = '';

			///iterate all form named Formclass
			for( var elementCounting=0; elementCounting<elementLength; elementCounting++ ){
				///iterate all input in form
				[].forEach.call(element[elementCounting].querySelectorAll('input'), function(e){
					for( var i=0; i<l; i++ ){
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
					///append  span with 'xxx is required'
					if(warningContent !== ''){
						var warningDiv = document.createElement('div');
						warningDiv.id = 'required-warning';
						warningDiv.innerHTML = warningContent;
						element[elementCounting].insertBefore( warningDiv, element[elementCounting].childNodes[2] )
						warningContent = '';
					}
				});
			}
			return flag;// for stop submit
	}

	return my;
}(window, document, FormValidation||{}));


