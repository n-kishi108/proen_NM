function common_change_class(OBJ_or_ID, new_class){
 $(OBJ_or_ID).className = new_class;
};


/*--------------------------
	Adjust Item Line
	require: prototype.js
------------------------------*/

var DispExtendItem = function(element, maxDisp, innerText){
	this.targetElement = element;
	this.maxDisp = maxDisp;
	this.addElementInner = innerText;
	this.init();
};

DispExtendItem.prototype = {
	maxDisp: 3,
	targetElement : "",
	addElementInner: "",
	init : function(){
		var targetList = $$(this.targetElement);
		if(targetList.length >= this.maxDisp){
			var _this = this;
			$A(targetList).each( function(e, i){
				if( i >= _this.maxDisp ){
					e.hide();
				}
			});
			
			var addElement = document.createElement($A(targetList).last().tagName);
			var anchorElement = document.createElement("A");
			anchorElement.setAttribute('href', 'javascript:void(0);');
			Event.observe(anchorElement, "click",function(event){
				$A(targetList).each( function(e, i){
					e.show();
				});
				Event.element(event).remove();
			});
			anchorElement.appendChild(document.createTextNode(_this.addElementInner));
			addElement.appendChild(anchorElement);


			$A(targetList).last().parentNode.appendChild(addElement);
		}
	}
};
