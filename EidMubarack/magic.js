var c = document.getElementById("maincanvas");

var ctx=c.getContext("2d");
var canvasheight=window.innerHeight;
var canvaswidth=window.innerWidth;
c.width=canvaswidth-20;
c.height=canvasheight-20;
ctx.fillStyle="#000000";

function color(r,g,b,a){
    this.r=r;
    this.g=g;
    this.b=b;
    this.a=a;   
}
color.prototype.opacity = function(str) {
                this.a=opa;
        return this;
  
};
color.prototype.getString = function(str) {
        return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
  
};
color.prototype.convertToColor = function(str) {
        temp="";
        rgba = [0,0,0,0];
        rgba_index=0;
        for(i=4;i<str.length;i++){
            if(str[i]=="," || str[i]=="]"){
                i++;
                rgba[rgba_index]=parseInt(temp);
                rgba_index++;
                temp="";
                continue;
            }

            temp+=str[i];
        }
        this.r=rgba[0];
        this.g=rgba[1];
        this.b=rgba[2];
        this.a=rgba[3];
  
};
function draw_line(x,y,px,py,rcolor){
    
    ctx.beginPath();
    ctx.strokeStyle=rcolor.getString();
    ctx.moveTo(x, y);
    ctx.lineTo(px+x, py+y); 
    ctx.stroke();   
    ctx.closePath();
}
var fps = 34;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var is=[];
function randNumberF(max,min){
  return (Math.random()*max)+min;
}
function randNumber(max,min){
  return Math.floor((Math.random()*max))+min;
}
for(i=0;i<26;i++){
    is.push(randNumberF(100,0.2));
}
var x = 600;
var y = 600;
var point=function(x,y){
    this.x=x;
    this.y=y;
}
var points = [];
acc=0.01;
function draw() {
    
    window.requestAnimationFrame(draw);

    now = Date.now();
    delta = now - then;
    
    if (delta > interval) {
        ctx.clearRect(0,0,c.width,c.height); // clear canvas
        ctx.fillRect(0,0,c.width,c.height);
        ctx.strokeStyle="#fff";
        ctx.fontcolor="#fff";
        ctx.fillStyle="#fff";
        ctx.font="12px Arial";
        
        ctx.fillText("عيد مبارك - لجميع اعضاء مجتمع حسوب وجميع المسلمين ! :D ",
            20
            ,
            40
            );
        ctx.fillText("by Abdullah Altahery ",
            20
            ,
            20
            );
        ctx.fillStyle="#000";
        for(isi=1;isi<is.length;isi++){
            y=(Math.sin(is[isi])*is[isi]*3+c.height/2)+Math.sin(acc)*100*-1;
            x=(Math.cos(is[isi])*is[isi]/6+c.width/2)+Math.cos(acc)*200;
            draw_line(x,y,1,1,new color(0,0,0,1));
            points.push(new point(x,y));
        }

        for(isi=1;isi<is.length;isi++){
            y=(Math.cos(is[isi])*is[isi]/6+c.height/2)+Math.sin(acc)*100*-1;
            x=(Math.sin(is[isi])*is[isi]*3+c.width/2)+Math.cos(acc)*200;
            draw_line(x,y,1,1,new color(0,0,0,1));
            points.push(new point(x,y));
        }




        var rc=new color(randNumber(254,100),randNumber(254,100),randNumber(254,100),1);
        
        for(pi=0;pi<points.length;pi++){
            draw_line(points[pi].x++,points[pi].y++,2,2,rc);
        }
        for(isi=0;isi<is.length;isi++){
            is[isi]+=0.005;
        }
        if(points.length>600){
            for(psi=0;psi<50;psi++)
                points.splice(randNumberF(points.length,5), 1);
        }
        acc*=0.001;
    }
}

(function() {
var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());
window.requestAnimationFrame(draw);
