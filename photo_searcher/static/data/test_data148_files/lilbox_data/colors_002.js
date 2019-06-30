function RGB(_1,_2,_3){
this.r=_1;
this.g=_2;
this.b=_3;
this.getR=function(){
return this.r;
};
this.getG=function(){
return this.g;
};
this.getB=function(){
return this.b;
};
this.getHex=function(){
if(!this.hex){
var _4="0123456789ABCDEF";
this.hex=""+_4.substr(Math.floor(this.r/16),1)+_4.substr((this.r%16),1)+_4.substr(Math.floor(this.g/16),1)+_4.substr((this.g%16),1)+_4.substr(Math.floor(this.b/16),1)+_4.substr((this.b%16),1);
}
return this.hex;
};
this.toHSV=function(){
var r=this.r/255;
var g=this.g/255;
var b=this.b/255;
var _8=Math.max(Math.max(r,g),b);
var _9=Math.min(Math.max(r,g),b);
var _a=_8-_9;
var h=0;
var s=0;
var v=_8;
if(_8>0){
s=_a/_8;
}
if(_a>0){
if((_8==r)&&(_8!=g)){
h+=(g-b)/_a;
}
if((_8==g)&&(_8!=b)){
h+=(2+(b-r)/_a);
}
if((_8==b)&&(_8!=r)){
h+=(4+(r-g)/_a);
}
h=h*60;
if(h<0){
h+=360;
}
}
return new HSV(h,s,v);
};
this.dump=function(){
alert("Red: "+this.r+"\n"+"Green: "+this.g+"\n"+"Blue: "+this.b+"\n"+"Hex: "+this.getHex());
};
}
function HSV(_e,_f,_10){
this.h=_e;
this.s=_f;
this.v=_10;
this.getH=function(){
return this.h;
};
this.getS=function(){
return this.s;
};
this.getV=function(){
return this.v;
};
this.toRGB=function(){
var _11;
var _12;
var _13;
if(this.h<120){
_11=(120-this.h)/60;
_12=this.h/60;
_13=0;
}else{
if(this.h<240){
_11=0;
_12=(240-this.h)/60;
_13=(this.h-120)/60;
}else{
_11=(this.h-240)/60;
_12=0;
_13=(360-this.h)/60;
}
}
if(_11>1){
_11=1;
}
if(_12>1){
_12=1;
}
if(_13>1){
_13=1;
}
return new RGB(Math.round((1-this.s+this.s*_11)*this.v*255),Math.round((1-this.s+this.s*_12)*this.v*255),Math.round((1-this.s+this.s*_13)*this.v*255));
};
this.dump=function(){
alert("Hue: "+this.h+"\n"+"Saturation: "+this.s+"\n"+"Value: "+this.v+"\n");
};
}
function Color(_14,a,b,c){
if(_14=="rgb"){
this.rgb=new RGB(a,b,c);
this.r=a;
this.g=b;
this.b=c;
}else{
if(_14=="hsv"){
this.hsv=new HSV(a,b,c);
this.h=a;
this.s=b;
this.v=c;
}else{
if(_14.match(/[0-9a-f]{6}/i)){
var map="0123456789ABCDEF";
_14=_14.toUpperCase();
this.r=map.indexOf(_14.substr(0,1))*16+map.indexOf(_14.substr(1,1));
this.g=map.indexOf(_14.substr(2,1))*16+map.indexOf(_14.substr(3,1));
this.b=map.indexOf(_14.substr(4,1))*16+map.indexOf(_14.substr(5,1));
this.rgb=new RGB(this.r,this.g,this.b);
this.hex=_14;
}else{
return null;
}
}
}
this.getR=function(){
if(!this.r){
if(!this.rgb){
this.rgb=this.hsv.toRGB();
}
this.r=this.rgb.getR();
}
return this.r;
};
this.getG=function(){
if(!this.g){
if(!this.rgb){
this.rgb=this.hsv.toRGB();
}
this.g=this.rgb.getG();
}
return this.g;
};
this.getB=function(){
if(!this.b){
if(!this.rgb){
this.rgb=this.hsv.toRGB();
}
this.b=this.rgb.getB();
}
return this.b;
};
this.getH=function(){
if(!this.h){
if(!this.hsv){
this.hsv=this.rgb.toHSV();
}
this.h=this.hsv.getH();
}
return this.h;
};
this.getS=function(){
if(!this.s){
if(!this.hsv){
this.hsv=this.rgb.toHSV();
}
this.s=this.hsv.getS();
}
return this.s;
};
this.getV=function(){
if(!this.v){
if(!this.hsv){
this.hsv=this.rgb.toHSV();
}
this.v=this.hsv.getV();
}
return this.v;
};
this.getHex=function(){
if(!this.hex){
if(!this.rgb){
this.rgb=this.hsv.toRGB();
}
this.hex=this.rgb.getHex();
}
return this.hex;
};
this.getContrasting=function(){
var _19=this.getH();
var _1a=this.getS();
var _1b=this.getV();
if(_1a==0){
_1b=(_1b+0.5)%1;
}else{
_1a=(_1a+0.5)%1;
_1b=(_1b+0.5)%1;
if((_19>200)&&(_19<275)){
if((_1a>=0.5)&&(_1b>=0.5)){
_1a=_1a/2;
}else{
if((_1a<=0.5)&&(_1b<=0.5)){
_1b=_1b+0.5;
}
}
}
}
return new Color("hsv",_19,_1a,_1b);
};
this.getBlendingColor=function(){
var _1c=this.getH();
var _1d=this.getV();
var _1e=this.getS();
var _1f=(_1e>0.8)?0.1:0;
if(_1d>0.6){
_1d=_1d-0.2-_1f;
}else{
if(_1d<0.4){
_1d=_1d+0.2+_1f;
}else{
_1d=_1d-0.3;
}
}
if(_1c>200&&_1c<275){
if(_1e>0.8){
_1e=_1e-0.4;
}
}
return new Color("hsv",_1c,_1e,_1d);
};
this.isDark=function(){
var _20=false;
var v=this.getV();
if(v<0.6){
_20=true;
}else{
var h=this.getH();
var s=this.getS();
if((h>200)&&(h<275)){
if(s>0.5){
_20=true;
}
}
}
return _20;
};
this.dump=function(){
alert("Red: "+this.getR()+"\n"+"Green: "+this.getG()+"\n"+"Blue: "+this.getB()+"\n"+"Hex: "+this.getHex()+"\n"+"Hue: "+this.getH()+"\n"+"Saturation: "+this.getS()+"\n"+"Value: "+this.getV());
};
}

