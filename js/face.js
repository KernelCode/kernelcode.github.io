var stageNum = 1;
function onLoadFace() {
  var canvas = document.getElementById('face'),
  ctx = canvas.getContext('2d');
  var points = [];


  var canvasWIDTH = window.innerWidth;
  var canvasHEIGHT = window.innerHeight;
  var AVALWIDTH = 250;
  var OffsitWidth =(window.innerWidth/2)-AVALWIDTH;
  var OffsitHight = 70;
  var RUNrand = true;
  var HD = false;
  var isMobile = false;
  if(window.innerWidth<950){
    isMobile=true;
  }

  var showAnimation = false;
  canvas.width = canvasWIDTH;
  canvas.height = canvasHEIGHT;
  points = [];
  drawStuff(); 
  var lastCalledTime;
  var fps,delta;
  var FPSMAX = 20;
  var isLow = false;
  var lowTimes = 0;

  function getUnixTime(){
    return Math.floor(+ new Date()/1000);
  }
  var waitTime =  getUnixTime()+6;
  function drawPoint(point){
    var x = point.x;
    var y = point.y;
    var s = point.s;
    var size = s ;

    if(fps<FPSMAX && waitTime-getUnixTime()<=0){
      lowTimes++;
      waitTime = getUnixTime()+1;

    }
    if(lowTimes>10){
      isLow = true;
    }
    if(isLow){
      x = Math.round(x);
      y = Math.round(y);
      size= Math.round(size);
    }
    //
    ctx.fillStyle = "rgb("+point.c.r+","+point.c.g+","+point.c.b+")";
    ctx.fillRect(x,y,size,size);

    
  }
  var center,left,right;
  var size = 1;
  var pNUM = 4000;
  if(window.innerWidth<950){
    pNUM = 1500;
  }
  async function drawStuff() {
  
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    center = await (await fetch("../imgs/center.min.points")).text();
    left = await (await fetch("../imgs/left.min.points")).text();
    right = await (await fetch("../imgs/right.min.points")).text();
   
    center = JSON.parse( LZString.decompressFromUTF16(center));
    left = JSON.parse(LZString.decompressFromUTF16(left));
    right = JSON.parse(LZString.decompressFromUTF16(right));

    for(var x=0;;x+=size){
      if(points.length>pNUM){
        break;
      }
      for(var y=0;;y+=size){
        if(points.length>pNUM){
          break;
        }
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
          x:x+getRandomInt(10,10),
          y:y+getRandomInt(10,10),
          s:1,
          toc:{
            r:data[0],
            g:data[1],
            b:data[2],
            a:data[3]
          },tox:1,toy:1,tos:1,
          rx:x+getRandomInt(-100,100),
          ry:y+getRandomInt(-100,100),
  
          rs:1,
          rc:{
            r:data[0],
            g:data[1],
            b:data[2],
            a:data[3]
          }
        });
      }
      if(points.length>=pNUM){
        break;
      }
    }
    // start face 1
    for(var i=0;i<right.length;i+=1){
      if(!points[i]){
        continue;
      }

      points[i].rx = (right[i].p[0] || points[i].rx)+(canvas.width/2)-AVALWIDTH+getRandomInt(-1400,1400); 
      points[i].ry = (right[i].p[1] || points[i].ry)+getRandomInt(-1400,1400); 
      if(isMobile){
        points[i].rc.g = getRandomInt(10,200);
        points[i].rc.r = getRandomInt(10,200);
        points[i].rc.b = getRandomInt(10,200);
      }else{
        points[i].rc.g = getRandomInt(30,30);
        points[i].rc.r = getRandomInt(30,30);
        points[i].rc.b = getRandomInt(30,30);
      }
     
    }
    setInterval(()=>{
      if(!RUNrand){
        return;
      }
      for(var i=0;i<points.length;i+=1){
    
    
        points[i].rx = points[i].rx-(Math.sin(points[i].rx)*getRandomInt(-100,100));//getRandomInt(points[i].ry-10,points[i].ry+1600)
        points[i].ry = points[i].ry-(Math.cos(points[i].ry)*getRandomInt(-100,100));//getRandomInt(points[i].rx-160,points[i].rx+160)

      }
    },200);

  }
  var mx,my;
  var gap = 200;

  var showFace = false;
  var pointsSlowVal = [0.02,0.01];
  var faceno = 0;
  var dieNow = false;
  /////
  function goup(){
    dieNow = false;
    RUNrand = true;
    for(var i=0;i<points.length;i+=1){
      points[i].rx = points[i].rx+getRandomInt(-420,420); 
      points[i].ry = points[i].ry-200;  
      points[i].rc.g = getRandomInt(15,155);
      points[i].rc.r = getRandomInt(15,155);
      points[i].rc.b = getRandomInt(15,155);
    }
  }
  function godown(){
    dieNow = true;
    RUNrand = false;
    for(var i=0;i<points.length;i+=1){
      points[i].rx = points[i].rx+getRandomInt(-620,620); 
      points[i].ry = points[i].ry+getRandomInt(-620,620);  
      points[i].rc.g = getRandomInt(15,55);
      points[i].rc.r = getRandomInt(15,55);
      points[i].rc.b = getRandomInt(15,55);
    }
  }
  setInterval(()=>{
    if(dieNow){
      return;
    }
    faceno++;
    if(faceno>5){
      faceno=0;
    }
    if(isMobile){
      return;
    }
    if(!left || !right || !center){

      return;
    }
    if(faceno==0 || faceno==2 || faceno==4){
      for(var i=0;i<points.length;i+=1){
        if(!points[i]){
          continue;
        }
        
        points[i].rx = points[i].rx+(getRandomInt(-40,40)); 
        points[i].ry = points[i].ry+(getRandomInt(-40,40));  
        if(isMobile){
          points[i].rc.g = getRandomInt(255,255);
          points[i].rc.r = getRandomInt(255,255);
          points[i].rc.b = getRandomInt(255,255);
        }else{
          points[i].rc.g = getRandomInt(155,155);
          points[i].rc.r = getRandomInt(155,155);
          points[i].rc.b = getRandomInt(155,155);
        }
        points[i].rc.g = getRandomInt(155,155);
        points[i].rc.r = getRandomInt(155,155);
        points[i].rc.b = getRandomInt(155,155);
      }
      setTimeout(()=>{
        RUNrand = true;
      },200)
      setTimeout(()=>{
        for(var i=0;i<points.length;i+=1){
          if(!points[i]){
            continue;
          }
      
          points[i].rx = (getRandomInt(-300,canvasWIDTH)); 
          points[i].ry = (getRandomInt(-800,canvasHEIGHT*2)); 
          points[i].rc.g = getRandomInt(0,0);
          points[i].rc.r = getRandomInt(0,0);
          points[i].rc.b = getRandomInt(70,70);
        }
        RUNrand = true;
      },1055)

      return;
    }
    if(faceno==3){
      
      for(var i=0;i<right.length;i+=1){
        if(!points[i]){
          continue;
        }
    
        points[i].rx = (right[i].p[0] || points[i].rx)+OffsitWidth; 
        points[i].ry = (right[i].p[1] || points[i].ry)+OffsitHight; 
        points[i].rc.g = getRandomInt(0,100);
        points[i].rc.r = getRandomInt(0,155);
        points[i].rc.b = getRandomInt(155,155);
      }
      
      setTimeout(()=>{
        RUNrand = false;
        for(var i=0;i<right.length;i+=1){
          if(!points[i]){
            continue;
          }
      
          points[i].rx = (right[i].p[0] || points[i].rx)+OffsitWidth; 
          points[i].ry = (right[i].p[1] || points[i].ry)+OffsitHight; 
          points[i].rc.g = getRandomInt(0,100);
          points[i].rc.r = getRandomInt(0,155);
          points[i].rc.b = getRandomInt(155,155);
        }
      },1100);
    }

    if(faceno==1){
      setTimeout(()=>{
        RUNrand = false;
        for(var i=0;i<left.length;i+=1){
      
          if(!points[i]){
            continue;
          }
    
          //((i)=>{
          //  setTimeout(()=>{
              points[i].rx = (left[i].p[0] || points[i].rx)+OffsitWidth
              points[i].ry = (left[i].p[1] || points[i].ry)+OffsitHight
              points[i].rc.g = getRandomInt(155,155);
              points[i].rc.r = getRandomInt(0,0);
              points[i].rc.b = getRandomInt(0,0);
          //  },i)
          //})(i)
        } 
      },1100);
      for(var i=0;i<left.length;i+=1){
      
        if(!points[i]){
          continue;
        }

        //((i)=>{
        //  setTimeout(()=>{
            points[i].rx = (left[i].p[0] || points[i].rx)+OffsitWidth
            points[i].ry = (left[i].p[1] || points[i].ry)+OffsitHight
            points[i].rc.g = getRandomInt(155,155);
            points[i].rc.r = getRandomInt(0,0);
            points[i].rc.b = getRandomInt(0,0);
        //  },i)
        //})(i)
      } 

    }
    if(faceno==5){
      setTimeout(()=>{
        RUNrand = false;
        for(var i=0;i<center.length;i+=1){
          if(!points[i]){
            continue;
          }
          points[i].rx = (center[i].p[0] || points[i].rx)+OffsitWidth
          points[i].ry = (center[i].p[1] || points[i].ry)+OffsitHight
        
          points[i].rc.g = getRandomInt(155,155);
          points[i].rc.r = getRandomInt(155,155);
          points[i].rc.b = getRandomInt(155,155);
    
        }
      },1100);

      
    }
  },19000)

  /////
  window.addEventListener('mousemove', (e)=>{
    
    mx = e.clientX;
    my = e.clientY;

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
  var ara = 90;
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
  function getRandom(min, max) {
    return Math.random() * (max - min ) + min;
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
    if(isLow){
      ctx.fillStyle = "rgba(0,0,0,1)";
    }else{
      ctx.fillStyle = "rgba(0,0,0,0.4)";
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    var inAriaPoints = [];
    if(isClicked){
      ara = 30;
      //isClicedToAdd = true;
    }else{
      ara = 30;
    }


    for(var i=0;i<points.length;i++){
      if(inArea(ara*2,{x:mx,y:my},points[i])){
        points[i].toc   = {r:255,g:255,b:255};
        points[i].tos = getRandomInt(1,30);
       
      }
    
      
      if(inArea(ara,{x:mx,y:my},points[i])){

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
    


    if(showAnimation){
      requestAnimationFrame(loop);
    }

    if(!lastCalledTime) {
      lastCalledTime = Date.now();
      fps = 0;
      return;
    }
    delta = (Date.now() - lastCalledTime)/1000;
    lastCalledTime = Date.now();
    fps = 1/delta;

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
  var splitText = (d3d)=>{
    //---
    
    var text = d3d.innerHTML;
    text = text.split("");
    d3d.innerHTML = "";
    for(var i=0;i<text.length;i++){
      if(text[i]==" ")
        text[i]= "&nbsp;";
      d3d.innerHTML+="<div style='float: left;' class='d3d'><span class='b'>"+text[i]+"</span><span class='r'>"+text[i]+"</span><span>"+text[i]+"</span></div>";
      
    }
  }
  function animation(e){
    if(e.getAttribute("animation")=="write"){
  
      if(e.childNodes.length==1){
        splitText(e);
      }
      e.childNodes.forEach((cn)=>{
        if(cn.classList){
          cn.classList.add("hide");
        }
        
      });
      e.style.display="flex";
      var classlistTime = 0;
      e.childNodes.forEach((cn)=>{
        //add
        if(!cn.classList){
          return;
        }
        classlistTime+=100;
        ((classlistTime)=>{
          setTimeout(()=>{
            if(!cn.classList){
              return;
            }
            cn.classList.remove("hide");
            cn.classList.add("hover");
            cn.classList.add("show");
           
          },classlistTime)
          setTimeout(()=>{
            if(!cn.classList){
              return;
            }
            cn.classList.remove("hover");
          },classlistTime+200)
        })(classlistTime)
      });
      
    }

    if(e.getAttribute("animation")=="show"){
      e.style.opacity="0";
      e.style.display="block";
      setTimeout(()=>{
        e.style.opacity="1";
        
      },400)
    }
    
  }

  function runstage(num){
    stageNum = num;
    var stage = document.querySelector(".stage"+num);
    stage.style.display = "block";
    stage.style.opacity=1;
    //if(num=="1" || 1){
      var elements = stage.querySelectorAll(".element");
      elements.forEach((e)=>{
        setTimeout(()=>{
          animation(e);

        },parseInt(e.getAttribute("after"))*1000);
      })
    //}
    /*if(num=="2" || 2){
      var elements = stage.querySelectorAll(".element");
      elements.forEach((e)=>{
        setTimeout(()=>{
          animation(e);
        },parseInt(e.getAttribute("after"))*1000);
      })
    }*/
  }
  function hideStage(num){
    var stage = document.querySelector(".stage"+num);
    stage.style.opacity=0;
    setTimeout(()=>{
      stage.style.display = "none";
      var elements = stage.querySelectorAll(".element");
      elements.forEach((e)=>{
        if(e.getAttribute("animation")=="show"){
          e.style.opacity=0;
        }
        if(e.getAttribute("animation")=="write"){
          e.childNodes.forEach((cn)=>{
            if(!cn.classList){
              return;
            }
         
            cn.classList.add("hide");
            cn.classList.remove("hover");
            cn.classList.remove("show");
          });
        }
      })
    },500);

  }
  stageNum = 1;
  var lastStage = 1;
  setTimeout(()=>{
    runstage(stageNum);
  },2000);
  showAnimation = true;
  loop();
  // scrolling
  window.addEventListener('wheel', function(event){
    return;
    if(!isDONE)
      return;
    if(stageNum==2){
      isDONE = false;
    }
    if (event.deltaY < 0)
    {
      stageNum--;
      if(stageNum<1)
        stageNum=1;
      if(stageNum==1)
        goup();
      hideStage(stageNum+1);
      setTimeout(()=>{
        runstage(stageNum);
      },1000)
    }
    else if (event.deltaY > 0)
    {
      stageNum++;
      if(stageNum>4)
        stageNum=4;
      hideStage(stageNum-1);
      setTimeout(()=>{
        runstage(stageNum);
      },1000);
      if(stageNum==2)
        godown();
    }
  });
 
 
  // click hamburger
  var isclick = false;
  var ham = document.querySelector(".hamburger");
  var bgs = document.querySelectorAll(".bg");
  var overSTRICK = document.querySelector(".overSTRICK");
  var startButton = document.querySelector("#start"); 
  var projectsButton = document.querySelector("#projects"); 
  var aboutButton = document.querySelector("#about"); 
  var experiencesButton = document.querySelector("#experiences");  
  var contact = document.querySelector("#contact");
  startButton.addEventListener("click",(e)=>{
    HideOut();
    if(lastStage==1){
      return;
    }
    hideStage(lastStage);
    runstage(1);
    lastStage=1;
 
  });

  aboutButton.addEventListener("click",(e)=>{
    HideOut();
    if(lastStage==2){
      return;
    }
    hideStage(lastStage);
    runstage(2);
    lastStage=2;
   
  });

  projectsButton.addEventListener("click",(e)=>{

    HideOut();

    if(lastStage==3){
      return;
    }
    hideStage(lastStage);
    runstage(3);
    lastStage=3;
   
  });
  experiencesButton.addEventListener("click",(e)=>{
    HideOut();
    if(lastStage==4){
      return;
    }
    hideStage(lastStage);
    runstage(4);
    lastStage=4;

  });
  contact.addEventListener("click",(e)=>{
    HideOut();
    document.location.href = "mailto:abdullahaltahery@gmail.com";

    if(lastStage==1){
      return;
    }
    hideStage(lastStage);
    runstage(1);
    lastStage=1;
  });
  function HideOut(){
    
    setTimeout(()=>{
      if(lastStage!=1){
        godown();
      }else{
        goup();
      }
    },200);
    ham.classList.remove("is-active");
    isclick = false;
    bgs.forEach((r)=>{
      r.style.left = "-100%";
      
    });
   
    setTimeout(()=>{
      overSTRICK.style.display="none";
    },500)
   
  }
  ham.addEventListener("click",(e)=>{

    if(!isclick){

      overSTRICK.style.display="block";
      setTimeout(()=>{
        ham.classList.add("is-active");
        isclick = true;
  
        bgs.forEach((r)=>{
          r.style.left = "0%";
          
        });
      },100)
     
      return;
    }
  
    HideOut();
 
  });

}
