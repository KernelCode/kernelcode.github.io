function onLoadScroll(){
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var canvasD = document.getElementById("imagecanvas");
  canvasD.width = 400;
  canvasD.height = window.innerHeight;
  var isMobile = false;
  if(window.innerWidth<950){
    isMobile=true;
  }

  var ctx = canvasD.getContext("2d");
  
  function learpFunc(imagg){
  
    imagg.x += (imagg.tox - imagg.x)*imagg.learp;
    imagg.y += (imagg.toy - imagg.y)*imagg.learp;
    return imagg;
  }
  function drawLearp(imgg){
 
    for(var i=0;i<imgg.imageData.data.length;i+=4){
      if((i/4)%30 > 15)imgg.imageData.data[i+3] = getRandomInt(0,255);
    }
    ctx.putImageData(imgg.imageData, imgg.x, imgg.y);

  }

  var images = [];

  function addImage(src,xy){
    var img = new Image();
    img.src = src;
    img.onload = function(){
      ctx.fillStyle = "#000";
      ctx.fillRect(0,0,canvasD.width,canvasD.height);
      ctx.drawImage(img, 2, 2);
      var myImageData  = ctx.getImageData(0, 0, 100, 300);
      var myImageData2 = ctx.getImageData(100, 0, 100, 300);
      var myImageData3 = ctx.getImageData(200, 0, 100, 300);

      images.push({src:src,secs:[
          {isUp:true,opacity:1,imageData:myImageData,x:0+xy.x,y:50+xy.y,tox:0+xy.x,toy:50+xy.y,learp:0.091,size:[100,300]},
          {isUp:true,opacity:1,imageData:myImageData2,x:120+xy.x,y:150+xy.y,tox:120+xy.x,toy:150+xy.y,learp:0.071,size:[100,300]},
          {isUp:true,opacity:1,imageData:myImageData3,x:240+xy.x,y:50+xy.y,tox:240+xy.x,toy:50+xy.y,learp:0.056,size:[100,300]}
        ]}
      )
    };
    return img;

  }
  function IsImageOk(img) {
    if (!img.complete) {
        return false;
    }
    if (img.naturalWidth === 0) {
        return false;
    }

    return true;
}
  var image1 = addImage("../imgs/project1.png",{x:0,y:(canvasD.height)*-1});
  var image2 = addImage("../imgs/project2.png",{x:0,y:(canvasD.height)*-1});
  var image3 = addImage("../imgs/project3.png",{x:0,y:(canvasD.height)*-1});
 
  var lastImageId = -1;
  var up = (canvasD.height)*-1;
  var down = (canvasD.height)+100;
  if(isMobile){
    down = (canvasD.height)+150;
  }
  
  function goUp(imgID){
 

    
    toY(images[imgID],{x:0,y:up});
    
    if(lastImageId!=-1){
      toYNow(images[lastImageId],{x:0,y:down});
      toY(images[lastImageId],{x:0,y:(up)+100});
    }
    lastImageId = imgID;
   
  
  }
  function Slide(imgID){
    var project = document.querySelector(".project"+imgID);
    var projects = document.querySelectorAll(".projects");
    projects.forEach((p)=>{
      p.style.display="none";
    });
    project.style.display="block";
    toY(images[imgID],{x:0,y:down});
  
    
    if(lastImageId!=-1){
      ((lastImageId)=>{
      
        toY(images[lastImageId],{x:0,y:(down)});
        setTimeout(()=>{
        
          toYNow(images[lastImageId],{x:0,y:up});
        },600);
      })(lastImageId);
    }

  
    lastImageId = imgID;
    
 
  }
  var next = document.querySelector("#next");
  next.addEventListener("click",(e)=>{
    a++;
    if(a==3){
      a=0;
    }
    Slide(a);
  });
  function goDown(imgID){
   
    toY(images[imgID],{x:0,y:down});
    setTimeout(()=>{
      images[imgID].isUp = true;
      toYNow(images[imgID],{x:0,y:up});
    },1000);
    
    if(lastImageId!=-1){
      toY(images[lastImageId],{x:0,y:(down)+100});
    }
    lastImageId = imgID;
  
 
  }

  var a = 0;
  var ii=setInterval(()=>{
    if(IsImageOk(image1)){
      Slide(a);
      clearInterval(ii);
    }
    
  },600);

  window.addEventListener('wheel', function(event){

    if(stageNum==3){
      a++;
      if(a==3){
        a=0;
      }
      if (event.deltaY < 0){
        Slide(a);
  
      }else{
        Slide(a)
         
      }
    }

  });

  function doAnimation(){
    var long = 6000;
    setTimeout(()=>{
      toY(images[0],{x:0,y:500});
      setTimeout(()=>{
        toY(images[0],{x:0,y:900});
 
        setTimeout(()=>{
          toY(images[0],{x:0,y:-1400,opacity:0});
        },long)
      },long);
    },1000);
    setTimeout(()=>{
      toY(images[1],{x:0,y:500});
      setTimeout(()=>{
        toY(images[1],{x:0,y:900});
        setTimeout(()=>{
          toY(images[1],{x:0,y:-1400,opacity:0});
        },long)
      },long);
    },7000);
    setTimeout(()=>{
      toY(images[2],{x:0,y:500});
      setTimeout(()=>{
        toY(images[2],{x:0,y:900});
        setTimeout(()=>{
          toY(images[2],{x:0,y:-1400,opacity:0});
        },long)
      },long);
    },10000);
  }

  function toYNow(img,xy){

    img.secs[0].tox=xy.x;
    img.secs[0].toy=xy.y+50;
    img.secs[0].x  =xy.x;
    img.secs[0].y  =xy.y+50;

 
    img.secs[1].tox=xy.x+120;
    img.secs[1].toy=xy.y+150;
    img.secs[1].x  =xy.x+120;
    img.secs[1].y  =xy.y+150;

    img.secs[2].tox=xy.x+240;
    img.secs[2].toy=xy.y+50;
    img.secs[2].x  =xy.x+240;
    img.secs[2].y  =xy.y+50;

    
  }
  function toY(img,xy){
    img.secs[0].tox=xy.x+img.secs[0].x;
    img.secs[0].toy=xy.y+img.secs[0].y;
    img.secs[1].tox=xy.x+img.secs[1].x;
    img.secs[1].toy=xy.y+img.secs[1].y;
    img.secs[2].tox=xy.x+img.secs[2].x;
    img.secs[2].toy=xy.y+img.secs[2].y;
    img.secs[0].opacity=xy.opacity || "1";
  }
  function animateImages() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvasD.width,canvasD.height);
    var imgDD = ctx.getImageData(0, 0,canvasD.width,canvasD.height);;
    for(var i=0;i<imgDD.data.length;i+=4){
      imgDD.data[i+3] = 0;
    }
    ctx.putImageData(imgDD, 0,0);


    for(var i=0;i<images.length;i++){
      drawLearp(learpFunc(images[i].secs[0]))
      drawLearp(learpFunc(images[i].secs[1]))
      drawLearp(learpFunc(images[i].secs[2]))
    }
   

    requestAnimationFrame(animateImages);
  }
  animateImages();
}

