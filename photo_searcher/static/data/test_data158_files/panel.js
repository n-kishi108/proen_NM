
var TogglePanel = Class.create();
TogglePanel.states = new Object();

TogglePanel.prototype = {
    initialize: function(element) {
        this.id = $(element).id;
        var footer = $(this.id + '-footer');
        var button = $(this.id + '-button');

        if(typeof TogglePanel.states[this.id] == 'undefined') {
	    TogglePanel.states[this.id] = true;
        }
        if(TogglePanel.states[this.id]) {
            TogglePanel.states[this.id] = false;
            Element.hide($(element));
            button.src = '/img/cmn/btn_plus.gif';
            button.onmouseover = function(){
                this.src = '/img/cmn/btn_plus_on.gif';
            }.bind(button);
            button.onmouseout = function(){
                this.src = '/img/cmn/btn_plus.gif';
            }.bind(button);
            footer.src = '/img/cmn/stream_btm2.gif';
        }
        else {
            TogglePanel.states[this.id] = true;
            Element.show($(element));
            button.src = '/img/cmn/btn_minus.gif';
            button.onmouseover = function(){
                this.src = '/img/cmn/btn_minus_on.gif';
            }.bind(button);
            button.onmouseout = function(){
                this.src = '/img/cmn/btn_minus.gif';
            }.bind(button);
            footer.src = '/img/cmn/stream_btm.gif';
        }
    }
};
