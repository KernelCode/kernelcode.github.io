
var canvas = document.getElementById('background-effect'),
ctx = canvas.getContext('2d');
var points = [];

window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  points = [];
  drawStuff(); 
}
resizeCanvas();

function drawPoint(point){
  var x = point.x;
  var y = point.y;
  var s = point.s;
  var size = s ;

  ctx.fillStyle = "rgb("+point.c.r+","+point.c.g+","+point.c.b+")";
  ctx.fillRect(x,y,size,size);

  
}
var center,left,right,altahery,Abdullah;
var size = 15;
if(window.innerWidth>1200){
   size = 15;
}else{
   size = 3;
}
async function drawStuff() {
 
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  for(var x=0;x<canvas.width;x+=size){
    for(var y=0;y< canvas.height;y+=size){

      var data = [0,0,0,0]//pixel.data;
      points.push({
        learp:0.02,
        clearp:0.2,
        c:{
          r:data[0],
          g:data[1],
          b:data[2],
          a:data[3]
        },
        x:x+getRandomInt(10,100),
        y:y+getRandomInt(10,100),
        s:1,
        toc:{
          r:data[0],
          g:data[1],
          b:data[2],
          a:data[3]
        },tox:1,toy:1,tos:1,
        rx:x+getRandomInt(10,100),
        ry:y+getRandomInt(10,100),
 
        rs:1,
        rc:{
          r:data[0],
          g:data[1],
          b:data[2],
          a:data[3]
        }
      });
    }
  }

}
var mx,my;
var gap = 200;

var showFace = false;
var pointsSlowVal = [0.02,0.002];

window.addEventListener('mousemove', (e)=>{
  
  mx = e.clientX;
  my = e.clientY;
  if(!showFace){
    return;
  }
  if(!left || !right || !center){

    return;
  }
  if(mx>(canvas.width/2)+gap){ // right
  
    for(var i=0;i<right.length;i+=1){
      if(!points[i]){
        continue;
      }
  
      points[i].rx = (right[i].p[0] || points[i].rx)+(canvas.width/2)-250;
      points[i].ry = (right[i].p[1] || points[i].ry); 
      points[i].rc.g = getRandomInt(100,200);

    }
    lines = [];
    lines2 = [];
    lines3 = [];
  }
  if(mx<(canvas.width/2)-gap){ // left

    for(var i=0;i<left.length;i+=1){
    
      if(!points[i]){
        continue;
      }

      //((i)=>{
      //  setTimeout(()=>{
          points[i].rx = (left[i].p[0] || points[i].rx)+(canvas.width/2)-250;
          points[i].ry = (left[i].p[1] || points[i].ry); 
          points[i].rc.g = getRandomInt(100,200);
      //  },i)
      //})(i)
    
      


    } 
    lines = [];
    lines2 = [];
    lines3 = [];
  }
  if(mx<(canvas.width/2)+gap && mx>(canvas.width/2)-gap){ // center
    for(var i=0;i<center.length;i+=1){
      if(!points[i]){
        continue;
      }
      points[i].rx = (center[i].p[0] || points[i].rx)+(canvas.width/2)-250;
      points[i].ry = (center[i].p[1] || points[i].ry); 
     
      points[i].rc.g = getRandomInt(100,200);
 
    }
  }

});
window.addEventListener('touchmove', (e)=>{

  mx = event.touches[0].clientX;
  my = event.touches[0].clientY;
});


function inArea(a,p1,p2){
  if(Math.pow(p1.x-p2.x,2) + Math.pow(p1.y - p2.y,2) < Math.pow(a,2)){
    return true;
  }
  return false;

}
function learpFunc(points,i){
  points[i].x += (points[i].tox - points[i].x)*points[i].learp;
  points[i].y += (points[i].toy - points[i].y)*points[i].learp;
  points[i].s += (points[i].tos - points[i].s)*points[i].learp;

  points[i].c.r += (points[i].toc.r - points[i].c.r)*points[i].clearp;
  points[i].c.g += (points[i].toc.g - points[i].c.g)*points[i].clearp;
  points[i].c.b += (points[i].toc.b - points[i].c.b)*points[i].clearp;
  return points[i];
}
var ara = 20;
var val =150;
isClicked = false;

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

var lines = [];
var lines2 = [];
var lines3 = [];
function InLines(point,lines){
  for(var i=0;i<lines.length;i++){
    if(point.x==lines[i].x && point.y==lines[i].y){
      return true;
    }
  }
  return false;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var isWin = false;
var tn = false;
var tntime = 0;
var lineLimit = 150;
var linesWin = 1;
var isClicedToAdd = false;
var learpStrickLight = [
  {x:0,y:0,tox:0,toy:0},
  {x:0,y:0,tox:0,toy:0}
]
function loop() {
  
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 1;
  var inAriaPoints = [];
  if(isClicked){
    ara = 50;
    //isClicedToAdd = true;
  }else{
    ara = 50;
  }


  for(var i=0;i<points.length;i++){
    if(inArea(ara*2,{x:mx,y:my},points[i])){
      points[i].toc   = {r:getRandomInt(20,55),g:getRandomInt(105,255),b:getRandomInt(20,55)};
      points[i].tos = getRandomInt(1,2);

    }
    if(inArea(ara,{x:mx,y:my},points[i])){
     if(lines.length>lineLimit){
        lines.splice(Math.random()*10,1)
        
      }
      if(lines2.length>lineLimit){
        lines2.splice(Math.random()*10,1)
        
      }
      if(lines3.length>lineLimit){
        lines3.splice(Math.random()*10,1)
        
      }
  
      var randi = getRandomInt(i-3,i);
      if(randi<0){
        randi = 0;
      }
      if(randi>points.length-1){
        randi = points.length-1;
      }
      if(points[randi]){
        if(
          lines.length>linesWin &&
          points[randi].x==lines[0].x &&
          points[randi].y==lines[0].y 
        ){
  
          
        }
        
        if(!isWin && showFace){
          
          if(!InLines(points[randi],lines))
            lines.push(points[randi]);
          else{
            lines.splice(randi,1)
          }
          var np = JSON.parse(JSON.stringify(points[randi])) ;
          np.x = np.x+getRandomInt(1,2)
          np.y = np.y+getRandomInt(1,7)
       
    
      

          if(!InLines(np,lines2))
            lines2.push(np);
          else{
            lines2.splice(randi,1)
          }
          np.x = np.x+getRandomInt(1,2)
          np.y = np.y+getRandomInt(1,7)

          if(!InLines(np,lines3))
            lines3.push(np);
          else{
            lines3.splice(randi,1)
          }
        }
      
      }
      
      
    
      if(mx>points[i].x){
        points[i].tox = points[i].rx-(val);
      }else{
        points[i].tox = points[i].rx+(val);
      }
      if(my>points[i].y){
        points[i].toy = points[i].ry-(val);
      }else{
        points[i].toy = points[i].ry+(val);
      }
      //points[i].tos   = 0;
      //points[i].toc   = {r:0,g:255,b:0};
      points[i].learp =  pointsSlowVal[0];
      points[i].clearp = 0.07;
    }else{

      points[i].tox = points[i].rx;
      points[i].toy = points[i].ry;
      points[i].tos = points[i].rs;
      points[i].toc = points[i].rc;
      points[i].learp =  pointsSlowVal[1];
      points[i].clearp = 0.008;
    }
    drawPoint(learpFunc(points,i))
  }
  
  // lines from here
  if(lines.length){
    ctx.beginPath();
    ctx.moveTo(lines[0].x, lines[0].y);
    if(isWin){
      if(tn && tntime>10){
        tn = false;
        ctx.strokeStyle = "rgba(0,255,0,0.5)";
        tntime = 0;
      }else{
        tn = true;
        ctx.strokeStyle = "rgba(0,55,0,0.5)";
        tntime++;
      }
      
    }else{
      ctx.strokeStyle = "rgba(20,100,20,0.2)";
    }
    
    for(var i=1;i<lines.length;i+=1){
      ctx.lineTo(lines[i].x,lines[i].y);
    }

    ctx.stroke();
    ctx.closePath();
    
     //////////
    if(lines2.length){
      ctx.beginPath();
      ctx.moveTo(lines2[0].x, lines2[0].y);
      ctx.strokeStyle = "rgba("+getRandomInt(40,155)+","+getRandomInt(40,255)+","+getRandomInt(40,255)+",0.1)";
      for(var i=1;i<lines2.length;i+=1){
        ctx.lineTo(lines2[i].x+getRandomInt(1,2),lines2[i].y+getRandomInt(1,2));
      }
      
      ctx.stroke();
      ctx.closePath();
    }


    ////////// RED
    if(lines3.length){
      ctx.beginPath();
      ctx.moveTo(lines3[0].x, lines3[0].y);
      ctx.strokeStyle = "rgba("+getRandomInt(40,255)+","+getRandomInt(40,155)+","+getRandomInt(40,255)+",0.1)";
      for(var i=1;i<lines3.length;i+=1){
        ctx.lineTo(lines3[i].x+getRandomInt(1,2),lines3[i].y+getRandomInt(1,2));
      }

      ctx.stroke();
      ctx.closePath();
    }
  }
  if(inAriaPoints.length){
    ctx.beginPath();
    ctx.moveTo(inAriaPoints[0].x, inAriaPoints[0].y);
    ctx.strokeStyle = "rgb(0,100,0)";
    for(var i=1;i<inAriaPoints.length;i++){
      ctx.lineTo(inAriaPoints[i].x,inAriaPoints[i].y);
    }
    
    ctx.stroke();
  }

  var INDEX = 1;
  
  ctx.beginPath();
  ctx.fillStyle='rgba(20, 150, 20,0.5)';
  ctx.moveTo(canvas.width-50,50);
  ctx.arc(canvas.width-50,50,20,(INDEX*Math.PI/4)+aaa,(INDEX*(Math.PI/4))+aaa+ARC_SIZE,false); 
  ctx.closePath();
  ctx.fill();
  aaa  += (aaa+1 - aaa)*learpA;

  
  ////
  learpA  += (tolearpA - learpA)*learpAL;
  

  for(var i=0;i<blocks.length;i++){
    renderBlock(blocks[i]);
  }
  
  requestAnimationFrame(loop);
}

var aaa = 1;
var learpA = 0.1;
var tolearpA = 0.1;
var learpAL = 0.1;
var ARC_SIZE = 2;

setInterval(()=>{
  tolearpA = getRandomInt(10,40)/100;
},2000);
function renderBlock(block){
  block.c.g  += (block.c.tog - block.c.g)*block.c.learpG;
  ctx.fillStyle = "rgb("+block.c.r+","+block.c.g+","+block.c.b+")";
  ctx.fillRect(block.x,block.y,block.sizeX,block.sizeY);
}
var blocks = generateRandomBlocks({x:canvas.width-100,y:100},15)
function generateRandomBlocks(pos,size){
  var rb = [];
  var blocksize = {x:5,y:1}
  for(var i=0;i<size;i++){
    rb.push({
      x:pos.x+blocksize.x+((i+1)*(blocksize.x)+i/4),
      y:pos.y+blocksize.y,
      c:{
        r:0,
        g:getRandomInt(10,255),
        b:0,
        learpG:0.1,
        tog:255,
        a:255
      },
      sizeX:blocksize.x,
      sizeY:blocksize.y
    });
  }
  setInterval(()=>{
    for(var i=0;i<size;i++){
      ((rbox)=>{
        rbox.c.tog = getRandomInt(10,255);
      })(rb[i])
    }
  },300);
  return rb;
}
loop();

// screens
function screensInout(screens,isIn){
  
  if(screens.length>0){
    var stime = 200;
    if(isIn){
      screens[0].style.top="0%";
    
      for(var i=1;i<screens.length;i++){
        stime+=200;
        ((s)=>{
          setTimeout(()=>{
            s.style.top="0%";
           
          },stime)
          
        })(screens[i])
      }
    }else{
      var stime = 200;
      screens[screens.length-1].style.top="200%";
    
      for(var i=screens.length-1;i>=0;i--){
        stime+=200;
        ((s)=>{
          setTimeout(()=>{
            s.style.top="200%";
           
          },stime)
          
        })(screens[i])
      }
    }

  }
}



