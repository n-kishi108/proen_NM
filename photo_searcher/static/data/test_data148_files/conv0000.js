var mad_host="http://track.send.microad.jp";
if(document.location.protocol=="https:"){
	mad_host="https://send.microad.jp";
}
var encode_url=escape(document.referrer);
var mad_query="clientid="+mad_client_id+"&group="+mad_group_id+"&prereferrer="+encode_url;
var mad_url=mad_host+"/track.cgi?"+mad_query;
var mad_target=new Image();
mad_target.src=mad_url;

