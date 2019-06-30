/*==========================================================================*/
/* zoome.page.circle.index                                                  */
/*==========================================================================*/

/* Initialize ==============================================================*/

if (!zoome)               var zoome                   = {};
if (!zoome.page)              zoome.page              = {};
if (!zoome.page.circle)       zoome.page.circle       = {};
if (!zoome.page.circle.index) zoome.page.circle.index = {};

/* Mission =================================================================*/

/* Mission : Data ----------------------------------------------------------*/

zoome.page.circle.index.data_chat_insert = function () {
  var  that = this.data_chat_insert;
  that.ses  = zoome.util.Sys.dfBoo(that.ses,  false);
  that.comp = zoome.util.Sys.dfBoo(that.comp, false);
  if (that.ses == false) {
    if (that.comp == false) {
      that.comp = true;
      that.mame = "data_chat_insert";
      zoome.util.Ajax.Base(that, {elems:["button","form","text"]});
      that.opts = {cal:that,mes:that.button(),tpl:"data_chat_list"};
      that.onComplete = function (head, data) { that.text().focus(); };
    }
    that.text().focus();
    if (that.text().value.length == 0) {
      var mes = "本文を入力してください";
      that.Message(true, that.button(), {mes:mes,mod:"warn"});
    }
    else if (that.text().value.length > 255) {
      var m  = "本文は255文字まで入力できます。(現在";
          m += that.text().value.length + "文字)";
      that.Message(true, that.button(), {mes:mes,mod:"warn"});
      that.text().select();
    }
    else { that.Request(); }
  }
};

zoome.page.circle.index.data_chat_delete = function (id) {
  var  that = this.data_chat_delete;
  that.ses  = zoome.util.Sys.dfBoo(that.ses,  false);
  that.comp = zoome.util.Sys.dfBoo(that.comp, false);
  if (that.ses == false) {
    if (that.comp == false) {
      that.comp = true;
      that.mame = "data_chat_delete";
      zoome.util.Ajax.Base(that, {elems:["button"]});
      that.opts = {cal:that,tpl:"data_chat_list"};
    }
    if (confirm("削除します。よろしいですか？")) {
      that.Request({par:{id:id}});
    }
  }
};

/*==========================================================================*/
