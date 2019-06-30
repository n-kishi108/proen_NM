
/**
 * Kumu.Ajax.executeTeedaAjaxのラッパー
 */
function executeLocalTeedaAjaxWrapper(callback, param, option, responseType) {
	// パラメータの作成
	var ajaxParams = {};
	if(param) {
		// オブジェクト(連想配列)
		if(param instanceof Object) {
			ajaxParams = param;
		}
		// 配列
		else if(param instanceof Array) {
			for(var i = 0; i < param.length; i++){
				ajaxParams["AjaxParam" + new String(i)] = param[i];
			}
		}
		// 文字列又は数値
		else {
			ajaxParams["AjaxParam0"] = param;
		}
	}
	// オプションを追加
	for(var key in option) {
		ajaxParams[key] = option[key];
	}
	// 実行
	Kumu.Ajax.URL = 'teeda.ajax';
	Kumu.Ajax.executeTeedaAjax(callback, ajaxParams, responseType);
}

var g_setSearchShopId_callback;

/**
 * 検索条件の店舗IDを記録。
 */
function setSearchShopId(shopId, callback) {
	g_setSearchShopId_callback = callback;
	executeLocalTeedaAjaxWrapper(userContextAjaxService_setSearchShopId, [shopId]);
}
function userContextAjaxService_setSearchShopId(response) {
	if (g_setSearchShopId_callback != null) {
		g_setSearchShopId_callback(response);
	}
}
