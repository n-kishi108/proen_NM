// passage time
var pass = 168;
 
// display content
var content = '<img src="/img/sports/top/icon_new.gif" class="new" alt="new" />';
 
var currentDate = new Date(); 
var spans = document.getElementsByTagName('span');
for (i = 0; i < spans.length; i++) {
    if(spans[i].getAttribute('class') == 'new' ||
       spans[i].getAttribute('className') == 'new') {
        time = spans[i].childNodes[0].nodeValue.split(":");
        var entryDate = new Date(time[0], time[1]-1, time[2], time[3], time[4], time[5]); 
        var now = (entryDate.getTime() - currentDate.getTime())/(60*60*1000); 
        now = Math.ceil(now);
        if(-now <= pass){
            spans[i].innerHTML = content;
            spans[i].style.display = 'inline';
        }
    }
}
