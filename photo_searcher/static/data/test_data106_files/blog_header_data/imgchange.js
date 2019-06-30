/************************************************************************************************************
Ajax Code Making
************************************************************************************************************/	
var imgchange2_noFading = false;
var imgchange2_timeBetweenSlides = 10000;	
var imgchange2_fadingSpeed = 10;	
var imgchange2_stats = new Array();
var imgchange2_slideIndex = new Array();	
var imgchange2_slideIndexNext = new Array();	
var imgchange2_imageDivs = new Array();	
var imgchange2_currentOpacity = new Array();	
var imgchange2_imagesInGallery = new Array();	
var Opera = navigator.userAgent.indexOf('Opera')>=0?true:false;

function createParentDivs(imageIndex,divId)
{
	if(imageIndex==imgchange2_imagesInGallery[divId])
	{	
		showGallery(divId);
	}
	else
	{
		var imgObj = document.getElementById(divId + '_' + imageIndex);	
		if(Opera)imgObj.style.position = 'static';
		if(!imgchange2_imageDivs[divId])imgchange2_imageDivs[divId] = new Array();
		imgchange2_imageDivs[divId][imgchange2_imageDivs[divId].length] =  imgObj;
		imgObj.style.visibility = 'hidden';	
		imageIndex++;
		createParentDivs(imageIndex,divId);	
	}		
}

function showGallery(divId)
{
	if(imgchange2_slideIndex[divId]==-1)imgchange2_slideIndex[divId]=0; else imgchange2_slideIndex[divId]++;	
	if(imgchange2_slideIndex[divId]==imgchange2_imageDivs[divId].length)imgchange2_slideIndex[divId]=0;
	imgchange2_slideIndexNext[divId] = imgchange2_slideIndex[divId]+1;	
	if(imgchange2_slideIndexNext[divId]==imgchange2_imageDivs[divId].length)imgchange2_slideIndexNext[divId] = 0;
	imgchange2_currentOpacity[divId]=100;	
	imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.visibility = 'visible';
	if(Opera)imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.display = 'inline';
	if(navigator.userAgent.indexOf('Opera')<0)
	{
		imgchange2_imageDivs[divId][imgchange2_slideIndexNext[divId]].style.visibility = 'visible';
	}
	
	if(document.all)
	{	// IE rules
		imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.filter = 'alpha(opacity=100)';
		imgchange2_imageDivs[divId][imgchange2_slideIndexNext[divId]].style.filter = 'alpha(opacity=1)';
	}
	else
	{
		imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.opacity = 0.99;	// firefox‚Å‚Ì‰æ–Ê‚Ì‚¿‚ç‚Â‚«‚ð”ð‚¯‚é‚½‚ßA1‚Æ0‚ÍŽg‚í‚È‚¢
		imgchange2_imageDivs[divId][imgchange2_slideIndexNext[divId]].style.opacity = 0.01;
	}		
	setTimeout('revealImage("' + divId + '")',imgchange2_timeBetweenSlides);		
}

// ‰æ‘œØ‚è‘Ö‚¦ˆ—
function revealImage(divId)
{
	if(imgchange2_noFading)
	{
		imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.visibility = 'hidden';
		if(Opera)imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.display = 'none';
		showGallery(divId);
		return;
	}
	imgchange2_currentOpacity[divId]--;
	if(document.all)
	{
		imgchange2_imageDivs[divId][imgchange2_slideIndexNext[divId]].style.filter = 'alpha(opacity='+(100-imgchange2_currentOpacity[divId])+')';
	}else{
		imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.opacity = Math.max(0.01,imgchange2_currentOpacity[divId]/100);	
		imgchange2_imageDivs[divId][imgchange2_slideIndexNext[divId]].style.opacity = Math.min(0.99,(1 - (imgchange2_currentOpacity[divId]/100)));
	}
	if(imgchange2_currentOpacity[divId]>0)
	{
		setTimeout('revealImage("' + divId + '")',imgchange2_fadingSpeed);
	}
	else
	{
		imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.visibility = 'hidden';	
		if(Opera)imgchange2_imageDivs[divId][imgchange2_slideIndex[divId]].style.display = 'none';		
		showGallery(divId);
	}
}

function initImageGallery(divId)
{
	var imgchange2_galleryContainer = document.getElementById(divId);
	imgchange2_slideIndex[divId] = -1;
	imgchange2_slideIndexNext[divId] = false;
	var galleryImgArray = imgchange2_galleryContainer.getElementsByTagName('IMG');
	for(var no=0;no<galleryImgArray.length;no++)
	{
		galleryImgArray[no].id = divId + '_' + no;
	}
	imgchange2_imagesInGallery[divId] = galleryImgArray.length;
	createParentDivs(0,divId);		
}