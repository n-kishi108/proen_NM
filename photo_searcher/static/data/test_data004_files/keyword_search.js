document.getElementById('infoseek_srch').onclick = function(){
        var type = 2;
        var form_dm = document.CCSB_FORM.dm;
        form_dm.value = '';
        var choice = document.infoseek_srch_choice.infoseek_srch_type;
        for(var i=0; i < choice.length; i++){
            if(choice[i].checked){
                type = choice[i].value;
            }
        }
        if( type == '2' ){
            document.CCSB_FORM.submit();
            return false;
        }
        var url = location.href;
        url = url.replace(/^http:\/\/|^https:\/\//,'');
        var each = url.split('/');
        if( type == '0' ){
            form_dm.value = each[0];
            document.CCSB_FORM.submit();
            return false;
        }
        if( type == '1' ){
            form_dm.value = each[0] + '/' + each[1];
            document.CCSB_FORM.submit();
            return false;
        }
       return false;
}
