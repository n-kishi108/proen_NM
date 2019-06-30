			// ランダムに画像を表示する
			jmps = new Array();
			imgs = new Array();
			alts = new Array();
			titles = new Array();

			// ジャンプ先のアドレス(数字は画像、テキストと対応)

                        jmps[0] = "http://log.ti-da.net/ad/user/ad.php?id=3815";
                        jmps[1] = "http://log.ti-da.net/ad/user/ad.php?id=3825";
                        jmps[2] = "http://www.okinawa-asobi.jp/";
                        jmps[3] = "http://log.ti-da.net/ad/user/ad.php?id=3820";
                        jmps[4] = "http://tidana.ti-da.net/";


			// 画像のアドレス(数字はジャンプ先のアドレス、テキストと対応)

                        imgs[0] = "http://admin.ti-da.net/template/info/bnr_matiaruki140.gif";
                        imgs[1] = "http://admin.ti-da.net/template/info/info_famima.gif";
                        imgs[2] = "http://admin.ti-da.net/template/info/bnr_asonjaokinawa.gif";
                        imgs[3] = "http://admin.ti-da.net/template/info/kengaku_banner.jpg";
                        imgs[4] = "http://admin.ti-da.net/template/info/info_tidana.gif";

			// alt 属性の入力(数字は画像の alt、テキストと対応)

                        //てぃーだイチオシ情報

                        alts[0] = "「今」を写真で切り取るワークショップ"; //2011年4月21日まで
                        alts[1] = "琉球島和牛シリーズ沖縄ファミマ試食会"; //2011年4月29日まで
                        alts[2] = "沖縄旅行"; //2011年_4月_20日まで
                        alts[3] = "佐平建設 見学会"; //2011年_4月_29日18:00まで
                        alts[4] = "てぃーだな特集"; //

			// title 属性の入力(数字は画像の title、テキストと対応)

                        titles[0] = "「今」を写真で切り取るワークショップ";
                        titles[1] = "琉球島和牛シリーズ沖縄ファミマ試食会";
                        titles[2] = "沖縄旅行";
                        titles[3] = "佐平建設 見学会";
                        titles[4] = "てぃーだな特集";

			n = Math.floor(Math.random()*jmps.length);
			document.write("<a href='"+jmps[n]+"' target='_blank'>");
			document.write("<img src='"+imgs[n]+"' border='0' alt='"+alts[n]+"' title='"+titles[n]+"'>");
			document.write("</a>");
			