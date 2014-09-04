$(document).ready(function(event) {
	var previousDelta = 0, isAnimated = false, currentSection = 1, initialSection;

	/*ANITIALISING FUNCTIONS*/
	var selectedMenuButton = function(){
		currentSection = getMenuIndex(location.hash);

		$("#header ul li a").css("border-bottom","");
		if(location.hash !== ""){
			$('a[href="'+location.hash+'"]').css("border-bottom","thin solid rgba(255,255,255,0.8)");
		}
	};

	var menuStyleSetter = function(current){
		$("#header ul li a").css("border-bottom","");

		if(current != 1){
			$('a[href="#'+getMenuHash(current)+'"]').css("border-bottom","thin solid rgba(255,255,255,0.8)");
			$("#home-button a").fadeIn({ duration: 'slow', queue: false });
		}
		else{
			$("#home-button a").fadeOut({ duration: 'slow', queue: false });
		}
	};

	var setCarousels = function(){
   		$('.skills-main-container .carousel-main-container-li:first').before($('.skills-main-container .carousel-main-container-li:last'));
    	$('.skills-main-container').css({'left' : $('.skills-main-container .carousel-main-container-li').outerWidth()*(-1)});
    	$('.work-main-container .carousel-main-container-li:first').before($('.work-main-container .carousel-main-container-li:last'));
    	$('.work-main-container').css({'left' : $('.work-main-container .carousel-main-container-li').outerWidth()*(-1)});
	};

	/*WINDOW RESIZE*/
	var setViewportSizes = function(){
		$('.skills-main-container').css({'left' : $('.skills-main-container li').outerWidth()*(-1)});
    	$('.work-main-container').css({'left' : $('.work-main-container li').outerWidth()*(-1)});
    	$("#background section").css({'top': (currentSection-1)*100*(-1) +"vh"});
	};

	$(window).on('resize', function(){
   		setViewportSizes();
	});

	/*HASH CATCHING DEFINITION*/
	$(window).on('hashchange', function(event){
		event.preventDefault();
	});

	/*MENU BUTTONS*/
	var getMenuIndex = function(button){
		switch(button){
			case "":
				return 1;
			case "#whois":
				return 2;
			case "#work":
				return 3;
			case "#contact":
				return 4;
		}
	};

	var getMenuHash = function(index){
		switch(index){
			case 1:
				return "";
			case 2:
				return "whois";
			case 3:
				return "work";
			case 4:
				return "contact";
		}
	};

	$("#home-button-label").click(function(event){
		if(!isAnimated){
			isAnimated = true;

			menuStyleSetter(1);
			$("#background section").animate({top: "+="+(currentSection-1)*100+"vh"},700,"swing",function(){
					currentSection = 1;
					isAnimated = false;
					location.hash = "";
			});
		}
		event.preventDefault();
	});

	$(".menu-buttons").click(function(event){
		if(!isAnimated){
			isAnimated = true;

			var target = event.target.hash;

			if(target == "#whois"){
				if(currentSection < 2){

					menuStyleSetter(2);
					$("#background section").animate({top: "-=100vh"},700,"swing",function(){
						currentSection = 2;
						isAnimated = false;
						location.hash = "whois";
					});
				}
				else if(currentSection > 2){

					menuStyleSetter(2);
					$("#background section").animate({top: "+="+(currentSection-getMenuIndex(target))*100+"vh"},700,"swing",function(){
						currentSection = 2;
						isAnimated = false;
						location.hash = "whois";
					});
				}
			}
			else if(target == "#work"){
				if(currentSection < 3){

					menuStyleSetter(3);
					$("#background section").animate({top: "-="+(getMenuIndex(target)-currentSection)*100+"vh"},700,"swing",function(){
						currentSection = 3;
						isAnimated = false;
						location.hash = "work";
					});
				}
				else if(currentSection > 3){

					menuStyleSetter(3);
					$("#background section").animate({top: "+="+(currentSection-getMenuIndex(target))*100+"vh"},700,"swing",function(){
						currentSection = 3;
						isAnimated = false;
						location.hash = "work";
					});
				}
			}
			else if(target == "#contact"){
				if(currentSection < 4){

					menuStyleSetter(4);
					$("#background section").animate({top: "-="+(getMenuIndex(target)-currentSection)*100+"vh"},700,"swing",function(){
						currentSection = 4;
						isAnimated = false;
						location.hash = "contact";
					});
				}
			}
		}
		event.preventDefault();
	});

	/*ARROW BUTTONS*/
	$(".action-arrow-up").click(function(event){
		if(!isAnimated)
			isAnimated =true;
			currentSection--;

			menuStyleSetter(currentSection);
			$("#background section").animate({top: "+=100vh"},700,"swing",function(){
				isAnimated = false;
				location.hash = getMenuHash(currentSection);
			});
		event.preventDefault();
	});

	$(".action-arrow-down").click(function(event){
		if(!isAnimated)
			isAnimated =true;
			currentSection++;

			menuStyleSetter(currentSection);
			$("#background section").animate({top: "-=100vh"},700,"swing",function(){
				isAnimated = false;
				location.hash = getMenuHash(currentSection);
			});
		event.preventDefault();
	});

	/*SCROLLING*/
	var scrollUp = function(object, delta){
		var sectionIndex = parseInt(object.closest("section").attr("tabindex"));

		if (sectionIndex != 1) {
		    $("#background section").animate({top: "+=100vh"},700,"swing", function() {
				var sectionId = $("section.main[tabindex='"+(sectionIndex-1)+"']").attr("id");
				sleep(300);
				isAnimated = false;
			});
		}
		previousDelta = delta;
	};
	var scrollDown = function(object, delta){
		var sectionIndex = parseInt(object.closest("section").attr("tabindex"));

		if(sectionIndex != 4){
			$("#background section").animate({top: "-=100vh"},700,"swing", function() {
				var sectionId = $("section.main[tabindex='"+(sectionIndex+1)+"']").attr("id");
				sleep(400);
				previousDelta = delta;
				isAnimated = false;
			});
		}
		previousDelta = delta;
	};

	var sleep = function(mili){
		var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
		    if ((new Date().getTime() - start) > mili){
		      break;
		    }
		}
	};

	/*CAROUSEL NAVIGATION*/
	$('.action-arrow-left').click(function(event){
		if(!isAnimated){
			isAnimated = true;
			var slider = '';
			if($(this).closest('section').attr('id') === "whois"){
				slider = '.skills-main-container';
			}
			else {
				slider = '.work-main-container';
			}
			$(slider).animate({"left": "0"}, 350, "swing", function(){
				$(slider + ' .carousel-main-container-li:first').before($(slider + ' .carousel-main-container-li:last'));
    			$(slider).css({'left' : $(slider + ' li').outerWidth()*(-1)});
				isAnimated = false;
			});
		}
		event.preventDefault();
	});

	$('.action-arrow-right').click(function(event){
		if(!isAnimated){
			isAnimated = true;
			var slider = '';
			if($(this).closest('section').attr('id') === "whois"){
				slider = '.skills-main-container';
			}
			else {
				slider = '.work-main-container';
			}
			$(slider).animate({"left": "-="+$(slider + ' .carousel-main-container-li').outerWidth()}, 350, "swing", function(){
				$(slider + ' .carousel-main-container-li:last').after($(slider + ' .carousel-main-container-li:first'));
    			$(slider).css({'left' : $(slider + ' .carousel-main-container-li').outerWidth()*(-1)});
				isAnimated = false;
			});
		}
		event.preventDefault();
	});

	/*INITIAL STATE OF THE MENU BAR*/
	selectedMenuButton();
	menuStyleSetter(currentSection);
	setCarousels();
	setViewportSizes();
});