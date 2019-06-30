function CallPickupDataFile () {
    var head_tag = document.getElementsByTagName("head");
    var pickup_json_data_file = document.createElement("script");
    var date_obj = new Date();

    pickup_json_data_file.src = "/opt/tag_anchor_pickup/pickupWordsJson.js?" + date_obj.getTime();
    head_tag[0].appendChild(pickup_json_data_file);
}
function TagAnchorPickup (pickup_words_data) {
    try {
        if (pickup_words_data['error_status'] == 1) return false;
    } catch (e) {
        return false;
    }

    var icon_url = "http://plaza.rakuten.co.jp/img/tag_anchor_pickup/";
    var anchorArray = document.getElementsByName("tagStaAnc");

    for (var i = 0; i < anchorArray.length; i++) {
        var pickup_index = new Array();
        var word_index   = new Array();
	var count = 0;
        var pickup_flg   = false;
        for (var index in pickup_words_data) {
            if (index == 'error_status') continue;

            var words = pickup_words_data[index]['words'];
            for (var j in words) {
                if (words[j] == anchorArray[i].innerHTML) {
                    pickup_index[count] = index;
                    word_index[count]   = j;
                    pickup_flg   = true;
		    count++;
                    break;
                }
            }
        }

        if (pickup_flg == false) {
            continue;
        }

        for(var z = 0 ; z < pickup_index.length; z++){
            var span_name = "tag_pickup_" + pickup_index[z];

            var tagNodeParent = anchorArray[i].parentNode;
            var spanArray = tagNodeParent.getElementsByTagName("span");

            var span_exists = false;
            for (var k in spanArray) {
                if (spanArray[k].name == span_name) {
                    span_exists = true;
                    break;
                }
            }
            if (span_exists == true) {
                continue;
            }

            var spanTag  = document.createElement("span");
            spanTag.name = span_name;
            spanTag.appendChild(document.createTextNode("¡¡¡¡"));

            var icon_path = icon_url+pickup_words_data[pickup_index[z]]['icon'] + '?' + new Date().getTime();
            var pr_word   = pickup_words_data[pickup_index[z]]['pr_word'];
            var ad_url    = pickup_words_data[pickup_index[z]]['url'];

            if (icon_path != "") {
                var pickupIcon   = document.createElement("img");
                pickupIcon.src   = icon_path;
                pickupIcon.align = "absmiddle";

                var iconAnchor = undefined;
                if (ad_url != "") {
                    iconAnchor = document.createElement("a");
                    iconAnchor.href = ad_url != "" ? ad_url : "#";
                    iconAnchor.target = "_blank";
                    pickupIcon.border = 0;
                    iconAnchor.appendChild(pickupIcon);
                    spanTag.appendChild(iconAnchor);
                } else {
                    spanTag.appendChild(pickupIcon);
                }
            }

            if (pr_word != "") {
                var anchorTag = document.createElement("a");
                anchorTag.href = ad_url != "" ? ad_url : "#";
                anchorTag.target = "_blank";
                anchorTag.appendChild(document.createTextNode(pr_word));
                spanTag.appendChild(anchorTag);
            }

            // Mebius
            var tmp_div = document.createElement("div");
            tmp_div.innerHTML = p(
                "2.1272.0",
                pickup_words_data[pickup_index[z]]['mebius'],
                pickup_words_data[pickup_index[z]]['mebius'],
                document.referrer
            );
            spanTag.appendChild(tmp_div.firstChild);

            tagNodeParent.appendChild(spanTag);
        }
    }
}

if (window.attachEvent) {
    window.attachEvent("onload", CallPickupDataFile);
} else if (window.addEventListener) {
    window.addEventListener("load", CallPickupDataFile, true);
}
