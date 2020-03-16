
function onLoadText() {





// 



var cir = document.getElementById("cir");

var cir2 = document.getElementById("cir2");
var cir2r = document.getElementById("cir2r");
var cir2b = document.getElementById("cir2b");
var lerpFracs = [
  {x:0,y:0,s:0,ts:1},
  {x:0,y:0},
  {x:0,y:0},
  {x:0,y:0},
  {x:0,y:0,s:0,ts:0.01},
  {x:0,y:0,s:0,ts:0.04}
  ]
function mouseoverEffect(e){
  e.target.style.filter="blur(0.3px)";
  lerpFracs[0].ts = 1.7;
  cir.style.opacity = 1;
  cir2.style.opacity = 0;
  cir2r.style.opacity = 0;
  cir2b.style.opacity = 0;

}
function mouseoutEffect(e){
  e.target.style.filter="blur(0px)";
  lerpFracs[0].ts = 1;
  cir.style.opacity = 1;
  cir2.style.opacity = 1;
  cir2r.style.opacity = 1;
  cir2b.style.opacity = 1;

}

function doHover(domlist){
  
  domlist.forEach((l)=>{
    var doml  = null;
    if(l.id){
      doml =  document.getElementsByClassName(l.id)[0];
    }else{
      doml =  document.querySelectorAll(l.classname);
    }
  
    doml.forEach((domll)=>{

      domll.addEventListener("mouseover",mouseoverEffect);
      domll.addEventListener("mouseout",mouseoutEffect)
    
    })

  })
}

window.addEventListener('mousedown', (e)=>{
  isClicked = true;
  cir.style.opacity = 0.5;

  cir2.style.opacity = 0;
  cir2r.style.opacity = 0;
  cir2b.style.opacity = 0;
},true);
window.addEventListener('mouseup', (e)=>{
  isClicked = false;
  cir.style.opacity = 1;
  cir2.style.opacity = 1;
  cir2r.style.opacity = 1;
  cir2b.style.opacity = 1;

},true);
var mx = window.innerWidth/2;
var my = window.innerHeight/2;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



window.addEventListener('mousemove', (e)=>{
mx = e.clientX;
my = e.clientY;

});
window.addEventListener('touchmove', (e)=>{

  mx = event.touches[0].clientX;
  my = event.touches[0].clientY;
});
function lerpTrans(cir,i,c,b,iscanvas,func){
  if(iscanvas){
    b.x += (mx/3 - b.x)*i;
    b.y += (my/3 - b.y)*i;
  }else{
    b.x += (mx - b.x)*i;
    b.y += (my - b.y)*i;
  }


  if(typeof b.s !="undefined"){
    b.s += (b.ts - b.s)*i;
    if(!func){
      cir.style.transform = "translate("+(b.x -c)+"px,"+(b.y-c)+"px) scale("+b.s+")";
    }else{
      func(b);
    }
  
    
  }else{
    if(!func){
      cir.style.transform = "translate("+(b.x -c)+"px,"+(b.y-c)+"px)";
    }else{
      func(b);
    }
    
    
  }

}


function loop() {

  lerpTrans(cir,0.1,26,lerpFracs[0]);
  lerpTrans(cir2,0.23,5,lerpFracs[1]);
  lerpTrans(cir2r,0.24,5,lerpFracs[2]);
  lerpTrans(cir2b,0.22,5,lerpFracs[3]);



  requestAnimationFrame(loop);
}

loop();


var d3ds = document.querySelectorAll(".add3D.Left");
d3ds.forEach((d3d)=>{
  //---
  
  var text = d3d.innerHTML;
  text = text.split("");
  d3d.innerHTML = "";
  for(var i=0;i<text.length;i++){
    if(text[i]==" ")
      text[i]= "&nbsp;";
    d3d.innerHTML+="<div style='float: left;' class='d3d'><span class='b'>"+text[i]+"</span><span class='r'>"+text[i]+"</span><span>"+text[i]+"</span></div>";
    
  }
});
doHover([{classname:".d3d > span"}])
doHover([{classname:"a"}])
doHover([{classname:".floatingMnu .circ"}])
doHover([{classname:".about-btn"}])
doHover([{classname:".hamburger"}])
}
