if (!self._FC2COUNTER168584)
{
	var _FC2COUNTER168584 =
	{
		id:168584,
		visit_info:function()
		{
			var time = new Date();
			var now = Math.floor(time.getTime()/1000);
			var version = 1, is_first, is_unique;
			var info = [version, 0];
			var cookie_name = "fc2cnt_" + this.id;
			var reg = (" " + document.cookie + ";").match(new RegExp(" " + cookie_name + "=([\\d\\-]+);"));
			if(reg)
			{
				info = reg[1].split("-");
				is_first = false;
				is_unique = (now - info[1] > 60*60*24);
			}
			else
			{
				is_first = true;
				is_unique = true;
			}
			time.setTime(time.getTime()+30*86400*1000);
			document.cookie = cookie_name + "="
				+ [
					version,
					(is_unique ? now : info[1])
				].join("-")
				+ " ; expires=" + time.toGMTString();
			return (is_first ? '2' : (is_unique ? '1' : '0'));
		},
		disp_js:function()
		{
			document.write('<script type="text/javascript" language="javascript"'
				+ ' src="http://counter1.fc2.com/counter_js.php?id=' + this.id
				+ '&amp;visitor=' + this.visit_info()
				+ '" charset="UTF-8"></'+'script>'
			);
		}
	}
}
_FC2COUNTER168584.disp_js();
