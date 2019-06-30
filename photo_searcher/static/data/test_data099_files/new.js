function newMark(y,m,d)
{
	oldDay = new Date(y+"/"+m+"/"+d);
	newDay = new Date();
	n = (newDay - oldDay)/(1000*60*60*24);
	if (n <= 1) document.write(" <font color=red>new!!</font>");
}