var ie=document.all ? 1 : 0;
var ns6=document.getElementById&&!document.all ? 1 : 0;
var opera=window.opera ? 1 : 0;

/* 子メニューの表示・非表示切替 */
function openFolder(childObj, parentObj){
  var child="";
  var parent="";
  var sw="/img/icon/pulldown.gif"; /* フォルダ表示時のアイコン画像 */
  var hd="/img/icon/pullup.gif"; /* フォルダ非表示時のアイコン画像 */
  if(ie || ns6 || opera){
    child=ns6 ? document.getElementById(childObj).style : document.all(childObj).style;
    parent=ns6 ? document.getElementById(parentObj) : document.all(parentObj);
    if (child.display=="none"){
      child.display="block";
      parent.src=sw;
    }else{
      child.display="none";
      parent.src=hd;
    }
  }
}

var TabMaker = Class.create()
TabMaker.prototype = {
	initialize: function(name) {
		tabs = $A($(name + 'Index').getElementsByTagName('li'));
		var menu = new TabIndex(name);
		for(var i=0,l=tabs.length; i < l; i++){
			var tab = new Tab(name + '' + i, (i==0));
			menu.appendTab(tab);
		}
		menu.setTab();
	}
}

var Tab = Class.create();
Tab.prototype = {
	initialize: function(name, open) {
		this.name = name;
		this.page = name + 'Box';
		this.open = open;
	},
	styleTab: function() {
		if (this.open)
			this.setStyle('visible', 'block', '', 'open');
		else
			this.setStyle('hidden', 'none', 'absolute', 'close');
		this.open = false;
	},
	setStyle: function(visibility, display, position, className){
		var page = $(this.page).style;
		var name = $(this.name);
		page.visibility = visibility;
		page.display = display;
		page.position = position;
		name.className = className;
	}
}

var TabIndex = Class.create();
TabIndex.prototype = {
	initialize : function(name) {
		this.last = 0;
		this.tabs = new Array();
		this.tabName = name;

		this.tabMenuList = $(name + 'Index').getElementsByTagName('li');

		var temp = $A($(name + 'BoxIndex').getElementsByTagName('div'));
		var list = [];

		temp.each(function(div){
			if(div.className==name+'Box'){
				list.push(div);
			}
		});

		this.tabBoxList = list;
	},
	getTabAt : function(index) {
		return this.tabs[index];
	},
	appendTab : function(tab) {
		this.tabs[this.last] = tab;

		this.tabMenuList[this.last].id = tab.name;
		this.tabBoxList[this.last].id = tab.page;
		this.last++;

		var link = document.createElement('a');
		link.innerHTML = $(tab.name).innerHTML;
		link.href = 'javascript:void(0);'
		$(tab.name).innerHTML = '';
		$(tab.name).appendChild(link);
		$(tab.name).onclick = function(){
			tab.open = true;
			this.setTab();
		}.bind(this);
	},

	setTab: function() {
		this.tabs.each(function(tab) {
			tab.styleTab();
		});
	}
};