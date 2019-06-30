(function(){
    grokIM4SankeiConfig = {};
    grokIM4SankeiConfig.source      = "sankei_jp_cat_ctxt_kz"; // set your surce
    grokIM4SankeiConfig.type        = "media_m";            // set this page's type
    grokIM4SankeiConfig.codec       = "shiftjis";              // set this site's codec
    grokIM4SankeiConfig.layout      = "main";                  // "main" or "side"
    grokIM4SankeiConfig.maxAdCount  = "4";                     // max ad count
    grokIM4SankeiConfig.extractType = "instant";
// write adContainer
    document.write('<div id="grokInstantContainer" style="display: none;">');
    document.write('</div>');
})();
