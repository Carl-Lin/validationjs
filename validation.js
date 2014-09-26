/*========================================================================================================== 
Author: Carl  Lin
Time: Sep, 2014
Description:   Since jquery.validation is suck!!!!  Rewrite one with more simple function
===========================================================================================================*/
if(typeof module === 'object'){
	module.export = FormValidation;
}

var FormValidation = (function(window, document, my){
	var end = function(){
		///recover all we do at init
	};

///now only can input form class, will add input form id. in put for id like #xxx.
	my.init = function( formClass, requireList){
			var l=requireList.length,
				element = document.getElementsByClassName( formClass ),
				elementLength = element.length,
				warningArr = [];

			var warningLength,   ///variables for set warning span
				warningContent = '',
				warningTemp = '';

			for( var i=0; i<elementLength; i++ ){
				[].forEach.call(element[i].querySelectorAll('input'), function(e){
					///add validation-require class to empty input.
					for( i=0; i<l; i++ ){
						if( e.name === requireList[i] ){
							if( e.value==='' ){
								e.classList.add('validation-require');
								warningArr.push( e.name );
							}
						}
					}
					///
					if( warningArr.length !== 0 ){
						var warningLength = warningArr.length,
							warningContent = '',
							warningTemp;

						warningDiv = document.createElement( 'div' );
						for( i=0; i<warningLength; i++ ){
							warningTemp = '<span class="validation-warning">'+ warningArr[i]  + 'is required' +'</span>';
							warningContent = warningContent + warningTemp;
						}
						warningDiv.innerHTML = warningContent;
						// console.log( element );
						element.insertBefore( warningDiv, element.firstChild );
					}
				});
			}	
	}

	return my;
}(window, document, FormValidation||{}));