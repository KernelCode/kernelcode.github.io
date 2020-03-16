var SCREEN_WIDTH=window.innerWidth;
var SCREEN_HEIGHT=window.innerHeight;
function after1(fun){
	setTimeout(function(){
		
		fun();
	},600);
}
	function color(r,g,b,a){
		this.r=r;
		this.g=g;
		this.b=b;
		this.a=a;
		this.getString=function(){
			return "rgba("+this.r+","+this.g+","+this.b+","+this.a+")";
		}
		this.opacity=function(opa){
			this.a=opa;
			return this;
		}
		this.convertToColor=function(str){
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
			
		}
		
	}
function rands_n(max,min){
	return Math.floor((Math.random()*max))+min;
}
function rands_nf(max,min){
	return (Math.random()*max)+min;
}
time=1000;
first_time=true;
function goToByScroll(id){
      
    $('html,body').animate({
        scrollTop: $(id).offset().top},
        'slow');
}
function displayText(event,text){
	
	rand_id="xx"+(20+event.pageX+event.pageY);
	$("body").prepend("<div class='displayText' id='"+rand_id+"' style='display:none;top:"+(event.pageY-20)+"px;left:"+(event.pageX-20)+"px;'>"+text+"</div>");
	$("#"+rand_id).show(1000);
}
$(document).ready(function () {
	is_done=false;
	is_doneB=false;
	is_done_H=false;
	class_array =  ["box-l","box-r","box-t","box-b"];
	animArray = ['left_to_right','left_to_right2'];
	$(".floting-arraw").css("margin-left",SCREEN_WIDTH-120);
	$(".floting-arraw").css("margin-top",SCREEN_HEIGHT-190);
	if(SCREEN_WIDTH<500 ){

        
    }else if(SCREEN_HEIGHT<720){
        
    }
	$(".full-page-cer").css("margin-top",SCREEN_HEIGHT-18);
	$(".nextBox").css("margin-top",-25);
	$(".nextBox").css("margin-left",SCREEN_WIDTH-123);

	//$(".bottom-fliter-box").css("margin-top",SCREEN_HEIGHT-40);
	//$(".bfb2").css("margin-top",0);
	
	
	//translate arabic
		/*if(IS_ARABIC){
			$("body").attr("dir","ltr");	
			$(".translate").each(
				function(id){

					$(this).html($(this).attr("ar"));
					$(this).css("font-size",$(this).attr("font-size"));
				}
			);
			$(".ltrc").attr("dir","rtl");
			

		}else{
			
			$(".ltrc").attr("dir","ltr");
			
		}*/

		
	//

	
	if(screen.width>720 ){
		/*for(s=0;s<120;s++){
				setTimeout(function(){
					var c = new color(rands_n(250,200),rands_n(250,200),rands_n(250,200),rands_nf(0.2,0.1));
					cc = c.getString();
					$("body").prepend('<div class="star " id="d_'+s+'" style="background:'+cc+';animation:'+animArray[0]+' '+rands_nf(35,31)+'s ease infinite;-webkit-animation:'+animArray[0]+' '+rands_nf(35,31)+'s infinite;" >.</div>');
					//$("#d_"+s).css("left",rands_n(50,20));
					$("#d_"+s).css("top",SCREEN_HEIGHT/2+rands_n(70,10)-145);
				},s*1);
		
		}*/
		/*
		setTimeout(function(){
			for(s=0;s<120;s++){
					setTimeout(function(){
						var c = new color(rands_n(25,200),rands_n(250,200),rands_n(250,200),rands_nf(0.2,0.1));
						cc = c.getString();
						var max=30;
						var min=10;
						$("body").prepend('<div class="star " id="d_'+s+'" style="background:'+cc+';animation:'+animArray[1]+' '+rands_nf(max,min)+'s ease infinite;-webkit-animation:'+animArray[1]+' '+rands_nf(max,min)+'s infinite;" >.</div>');
						
						$("#d_"+s).css("left",rands_n(150,-20));
						$("#d_"+s).css("top",SCREEN_HEIGHT/2+rands_n(270,-10)-200);
					},s*20);
		
			}
			
		},4000);*/
	}
	$(".floting-arraw").click(function(){
		goToByScroll(".full-page2");
	});
	$(".Front").click(function(){
		goToByScroll(".full-page");

	});
	
	$(".About").click(function(){
		goToByScroll(".full-page2");

	});
	$(".EDUCATION").click(function(){
		goToByScroll(".education");

	});
	$(".SKILLS").click(function(){
		goToByScroll(".skills");

	});
	$(".WORKS").click(function(){
		goToByScroll(".works");

	});
	$(".Experience").click(function(){
		goToByScroll(".full-page3");

	});
    if(screen.width>500 ){
        $(".list-button").mouseenter(function(event,id){
            if(IS_ARABIC){
                var text=$(this).attr("arabic");
            }else{
                var text=$(this).attr("text");
            }
            
            
            rand_id=(event.pageX-event.pageY);
            $(this).append("<span class='deleteText' id='"+rand_id+"' style='display:none;font-size:12px;' >"+text+"</span>");
            $("#"+rand_id).show(100);
        });
        $(".list-button").mouseleave(function(event,id){
            
            $(".deleteText").remove();
            
        });
    }
	
	/*for(i=0;i<600;i++)
		$(".boxs").append("<div class='box "+class_array[i%class_array.length]+"'></div>");
		
	$(".boxs").append("<div class='box "+class_array[i%class_array.length]+"'></div>");
*/

	
	setInterval(function(){

		$(".box").each(function(i,id){
			
				setTimeout(function(){
					
					var c = new color(rands_n(180,20),rands_n(180,20),rands_n(180,20),1);
					$(id).css("background",c.getString());
				},rands_n(1000,10));
			
				
		});
		
	},time);

	last=0;
	$(window).scroll(function(d){
			
		if($(this).scrollTop()>=10){
			$(".box-cir").css("opacity","1");
			$(".box-cir").css("transform","scale(1)");
			$(".box-cir").css("position","fixed");
			$(".box-cir").css("top",0);
			if(!is_done){
				if(!IS_ARABIC){
					
					anmatiText(".AL");
				}else{
					$(".AL").css("opacity","1");
				}
				is_done=true;
			}
				
			
			
		}else{
			$(".box-cir").css("opacity","0");
			$(".box-cir").css("transform","scale(1.7)");
			
			$(".box-cir").css("position","absolute");
			
		}
       
		//$(".header-text").text("Who I am?!");
        if(screen.width<500 ){
          
        }else if(screen.width<720){
    
    		if($(this).scrollTop()>=300){
    			
    			$(".floting-arraw").css("opacity","0");
    			$(".star").css("display","none");
    			
    		}else{
    			$(".star").css("display","block");
    		}
    		if($(this).scrollTop()>=900){
    			
    			
    			
    		}
    		if($(this).scrollTop()>=1900){
    			
    			
    		}
    		if($(this).scrollTop()>=2700){
    			
    			
    			
    		}
    		if($(this).scrollTop()<300){
    			
    			
    		}
    		last=$(this).scrollTop();
		   
        }
	});
	
	
	/*function anmatiBox(id){
		if(is_doneB)
			return ;
		is_doneB=true;
		
		$(id).css("width","900px");
		setTimeout(function(){
			
			$(id).css("width","20px");
			$(id).css("transform","translateX(900px)");
			setTimeout(function(){
				resetTime(200);
				$(id).css("transform","translateX(970px) rotate(-180deg)");

			},200);
		},200);
		
		
	}*/

	function resetTime(time){
		$(".anmatied-box").css("transition","transform "+(time/100)+"s ease,width "+(time/100)+"s ease");
		
	}
	function anmatiText(id){
		$(id).css("opacity","1");
		$(id).each(function(id){
			var txt=$(this).text();
			$(this).text("");
			var s=0;
			
			var obj=this;
			for(i=0;i<txt.length;i++){
				$(obj).append("<span  id='s_"+i+"' style='transition: opacity 0.7s ease;opacity:0'>"+txt[i]+"</span>");
			}
			sl=0;
			for(s=0;s<txt.length;s++){
				
				setTimeout(function(){
					$("#s_"+(sl)).css("opacity","1");
					$("#s_"+(sl)).css("animation","animateText "+$(obj).attr("speed")+"s ease ");
					sl++;
				},s*300);


			}

			
		});
	}

	function anmatiTextR(id){
		$(id).each(function(id){
			 txt=$(this).text();
			$(this).text("");
			var s=0;
			
			var obj=this;
			for(i=0;i<txt.length;i++){
				$(obj).append("<span id='s_"+i+"' style='opacity:1'>"+txt[i]+"</span>");
			}
			sl=0;
			for(s=0;s<txt.length;s++){
				
				setTimeout(function(){
					$("#s_"+(sl)).css("opacity","0");
					$("#s_"+(sl)).css("animation","animateTextR "+$(obj).attr("speed")+"s ease ");
					sl++;
				},s*300);


			}

			
		});
	}
	
	setTimeout(function(){
		$("body").css("opacity","1");
	},500);
	$(".work-box-web").mouseenter(function(id){
		$(".work-box-web .info").css("transform","translateX(10px)");
		$(".work-box-web .desc").css("opacity","1");
		$(".work-box-web .header").css("opacity","1");
		$(".work-box-web .desc").css("transform","translateX(0px)");
		$(".work-box-web .header").css("transform","translateX(0px)");
		$(".work-box-web img").css("opacity","0.2");
	});
	$(".work-box-web").mouseleave(function(){
		$(".work-box-web .info").css("transform","translateX(2px)");
		
		$(".work-box-web .desc").css("opacity","0");
		$(".work-box-web .header").css("opacity","0");
		$(".work-box-web .desc").css("transform","translateX(10px)");
		$(".work-box-web .header").css("transform","translateX(-10px)");
		
		$(".work-box-web img").css("opacity","0.9");
	});
	
	
	$(".work-box-andro").mouseenter(function(id){
		$(".work-box-andro .info").css("transform","translateX(10px)");
		
		$(".work-box-andro .desc").css("opacity","1");
		$(".work-box-andro .header").css("opacity","1");
		$(".work-box-andro .desc").css("transform","translateX(0px)");
		$(".work-box-andro .header").css("transform","translateX(0px)");
		
		$(".work-box-andro img").css("opacity","0.2");
	});
	$(".work-box-andro").mouseleave(function(){
		$(".work-box-andro .info").css("transform","translateX(2px)");
		
		$(".work-box-andro .desc").css("opacity","0");
		$(".work-box-andro .header").css("opacity","0");
		$(".work-box-andro .desc").css("transform","translateX(10px)");
		$(".work-box-andro .header").css("transform","translateX(-10px)");
		
		$(".work-box-andro img").css("opacity","0.9");
	});
	
	
	$(".work-box-gra").mouseenter(function(id){
		$(".work-box-gra .info").css("transform","translateX(10px)");
		
		$(".work-box-gra .desc").css("opacity","1");
		$(".work-box-gra .header").css("opacity","1");
		$(".work-box-gra .desc").css("transform","translateX(0px)");
		$(".work-box-gra .header").css("transform","translateX(0px)");
		
		$(".work-box-gra img").css("opacity","0.2");
		player2.playVideo();
	});
	$(".work-box-gra").mouseleave(function(){
		$(".work-box-gra .info").css("transform","translateX(2px)");
		
		$(".work-box-gra .desc").css("opacity","0");
		$(".work-box-gra .header").css("opacity","0");
		$(".work-box-gra .desc").css("transform","translateX(10px)");
		$(".work-box-gra .header").css("transform","translateX(-10px)");
		
		$(".work-box-gra img").css("opacity","0.9");
		player2.pauseVideo();
	});
	$(".work-box-game").mouseenter(function(id){
		$(".work-box-game .info").css("transform","translateX(10px)");
		
		$(".work-box-game .desc").css("opacity","1");
		$(".work-box-game .header").css("opacity","1");
		$(".work-box-game .desc").css("transform","translateX(0px)");
		$(".work-box-game .header").css("transform","translateX(0px)");
		
		$(".work-box-game img").css("opacity","0.2");
		player1.playVideo();
	});
	$(".work-box-game").mouseleave(function(){
		$(".work-box-game .info").css("transform","translateX(2px)");
		
		$(".work-box-game .desc").css("opacity","0");
		$(".work-box-game .header").css("opacity","0");
		$(".work-box-game .desc").css("transform","translateX(10px)");
		$(".work-box-game .header").css("transform","translateX(-10px)");
		
		$(".work-box-game img").css("opacity","0.9");
		player1.pauseVideo();
	});

	if(screen.width<500 ){
		$(".full-page").css("background-size","160% auto");
		$(".full-page").css("background-position","-130px 0px");
		
		$(".mFont").css("font-size","100px");
        $(".mWidth").css("float","none");
        $(".info").css("font-size","10px");
        $(".info").css("width","100px");
        $(".work-box").css("width","90%");
        $(".work-box").css("height","250px");
	}else if(screen.width<720){
        $(".work-box").css("width","100%");
        $(".work-box").css("height","650px");
        $(".info").css("font-size","30px");
        $(".info").css("width","230px");
        $(".mFont").css("font-size","220px");
		$(".full-page").css("background-size","300% ");
		$(".full-page").css("background-position","-900px 0px");
        
        $(".container_16").css("width","91%");
        $(".container_16").css("padding","50px");
	}

	if(screen.width<720 || window.innerWidth<720){
            

			$(".grid_8").addClass("Mobile");
			$(".Mobile").addClass("grid_16");
			$(".Mobile").removeClass("grid_8");
			
			$(".grid_4").addClass("Mobile");
			$(".Mobile").addClass("grid_16");
			$(".Mobile").removeClass("grid_8");
			
			$(".grid_6").addClass("Mobile");
			$(".Mobile").addClass("grid_16");
			$(".Mobile").removeClass("grid_8");
			
			

			$(".center").css("transform","scale(2)");
			
			$(".mFonts").css("font-size","20px");
			$(".mFontss").css("font-size","20px");
			$(".mFontss").css("margin","20px");
			$(".mFontsss").css("font-size","15px");
			$(".grid_2").css("display","none");
			$(".mWidth").css("width","100%");
			$(".mHight").css("padding","50px");
			$(".mHight").css("height","auto");
			$(".mdisplay").css("display","none");
			$("li").css("height","auto");

			$(".Mresum").css("width","400px");
			$(".edu-box").css("width","100%");
			$(".edu-box").css("border-radius","10px");
			
			
			$(".grid_16").css("width","100%");
			$(".mNoMargin").css("margin","5px");
			$(".mNoFloat").css("float","none");
			
			$(".floting-arraw").css("margin-left",window.innerWidth-120);
			$(".floting-arraw").css("margin-top",window.innerHeight-190);
			
			$(".full-page-cer").css("margin-top",window.innerHeight-18);
			$(".nextBox").css("margin-top",-25);
			$(".nextBox").css("margin-left",window.innerWidth-123);
	}

	function addAnimation5(x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,name){
		styleStr="@keyframes "+name+" { 0%   {transform:translateX("+x1+"px) translateY("+y1+"px) ;opacity:0;} 25%  {transform:translateX("+x2+"px) translateY("+y2+"px) ;opacity:0.2;} 50%  {transform:translateX("+x3+"px) translateY("+y3+"px) ;opacity:1;}75%  {transform:translateX("+x4+"px) translateY("+y4+"px) ;opacity:1;} 100% {transform:translateX("+x5+"px) translateY("+y5+"px) ;opacity:0.2;}}";
		$("body").append("<style>"+styleStr+"</style>");
	}
	function addAnimation2(x1,y1,x2,y2,name){
		styleStr="@keyframes "+name+" { 0%   {color:white;transform:translateX("+x1+"px) translateY("+y1+"px)  ;opacity:0.4;} 25%{color:#00f;opacity:0.8;} 50%{color:red;opacity:0.8; } 75%{color:#0f0;opacity:0.8;} 100% {color:black;transform:translateX("+x2+"px) translateY("+y2+"px) ;opacity:0;}}";
		$("body").append("<style>"+styleStr+"</style>");
	}
	function addAnimation3(x1,y1,x2,y2,x3,y3,name){
		styleStr="@keyframes "+name+" { 0%   {color:white;transform:translateX("+x1+"px) translateY("+y1+"px) scale(0.4) ;opacity:0.4;} 25%{color:#00f;opacity:0.8;} 50%{color:red;opacity:0.8;transform:translateX("+x2+"px) translateY("+y2+"px) scale(1.4); } 75%{color:#0f0;opacity:0.8;} 100% {color:black;transform:translateX("+x3+"px) translateY("+y3+"px) scale(0.4);opacity:0;}}";
		$("body").append("<style>"+styleStr+"</style>");
	}
});
