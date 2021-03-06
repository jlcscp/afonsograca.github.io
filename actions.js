$(document).ready(function(event) {
	var antePenultimateDelta = 0, penultimateDelta = 0, currentDelta = 0, lastScrollEvent = 0;
	var isAnimated = false, currentSection = 1, initialSection;
	var isMobile = false;
	var verticalTouchStart = 0, horizontalTouchStart = 0;

	/*INITIALISING FUNCTIONS*/
	var highlightSection = function(location){
		if(window.innerHeight < window.innerWidth && window.innerWidth < 1025){
			$('a[href="'+location+'"]').css("border-left","thin solid rgba(255,255,255,0.8)");
		}
		else {
			$('a[href="'+location+'"]').css("border-bottom","thin solid rgba(255,255,255,0.8)");
		}
	};
	var selectedMenuButton = function(){
		currentSection = getMenuIndex(location.hash);

		$("#header ul li a").css({"border-bottom":"","border-left":""});
		if(location.hash !== ""){
			highlightSection(location.hash);
		}
	};

	var menuStyleSetter = function(current){
		$("#header ul li a").css({"border-bottom":"","border-left":""});
		if(current != 1){
			highlightSection('#'+getMenuHash(current));
			$("#home-button a").fadeIn({ duration: 'slow', queue: false }).css("display","inline-block");;
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
		$("#background section").each(function(){
			var offset = (currentSection-parseInt($(this).attr("tabindex")))*100*(-1);
			$(this).css({top : offset +'vh'});
		});
	};
	$(window).on('resize', function(){
		$("body").hide().show(0);
   		setViewportSizes();
		selectedMenuButton();
	});

	$(window).on('orientationchange', function(event){
		$("body").hide().show(0);
		selectedMenuButton();
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
		if(!isAnimated){
			isAnimated = true;
			currentSection--;

			menuStyleSetter(currentSection);
			$("#background section").animate({top: "+=100vh"},700,"swing",function(){
				isAnimated = false;
				location.hash = getMenuHash(currentSection);
			});
		}
		event.preventDefault();
	});

	$(".action-arrow-down").click(function(event){
		if(!isAnimated){
			isAnimated = true;
			currentSection++;

			menuStyleSetter(currentSection);
			$("#background section").animate({top: "-=100vh"},700,"swing",function(){
				isAnimated = false;
				location.hash = getMenuHash(currentSection);
			});
		}
		event.preventDefault();
	});

	/*SCROLLING*/
	var verticalScroll = function(delta){
		antePenultimateDelta = penultimateDelta;
		penultimateDelta = currentDelta;
		currentDelta = delta;
		if(!isAnimated){
			isAnimated = true;

			if(currentDelta > 0 && (penultimateDelta < 0 ||
				(currentDelta > penultimateDelta && penultimateDelta == antePenultimateDelta) ||
				(currentDelta > penultimateDelta && penultimateDelta < antePenultimateDelta))){
				scrollUp();
			}
			else if(currentDelta < 0 && (penultimateDelta > 0 ||
					(currentDelta < penultimateDelta && penultimateDelta == antePenultimateDelta) ||
					(currentDelta < penultimateDelta && penultimateDelta > antePenultimateDelta))){
				scrollDown();
			}
			else{
				isAnimated = false;
			}
		}
	}

	var scrollUp = function(){

		if (currentSection > 1) {
			currentSection--;
			menuStyleSetter(currentSection);
		    $("#background section").animate({top: "+=100vh"},700,"swing").promise().done(function() {
				location.hash = getMenuHash(currentSection);
				isAnimated = false;
			});
		}
		else {
			isAnimated = false;
		}
	};

	var scrollDown = function(){
		if(currentSection < 4){
			currentSection++;
			menuStyleSetter(currentSection);
			$("#background section").animate({top: "-=100vh"},700,"swing").promise().done(function() {
				location.hash = getMenuHash(currentSection);
				isAnimated = false;
			});
		}
		else {
			isAnimated = false;
		}
	};

	var sleep = function(mili){
		var start = new Date().getTime();
		  for (var i = 0; i < 1e7; i++) {
		    if ((new Date().getTime() - start) > mili){
		      break;
		    }
		}
	};


	/*DETECT SCROLL IN DESKTOPS*/
	$(window).on('wheel mousewheel DOMMouseScroll MozMousePixelScroll', function(event){
		event.preventDefault();
		var time = new Date().getTime();
		if((time - lastScrollEvent) > 700){
			penultimateDelta = 0;
			currentDelta = 0;
		}
		lastScrollEvent = time;
		var delta = event.originalEvent.wheelDeltaX !== undefined? event.originalEvent.wheelDeltaX : -event.originalEvent.deltaX;
		if(delta != 0){

		}
		else{
			delta = event.originalEvent.wheelDeltaY !== undefined? event.originalEvent.wheelDeltaY :
					event.originalEvent.deltaY !== undefined? -event.originalEvent.deltaY : -event.originalEvent.detail;
			verticalScroll(delta);
		}
	});

	/*DETECT SCROLL IN MOBILE*/
	$(window).on('touchstart', function(event){
		if(!isAnimated){
			horizontalTouchStart = event.originalEvent.touches[0].clientX;
			verticalTouchStart = event.originalEvent.touches[0].clientY;
		}
	});

	$(window).on('touchmove', function(event){
		event.preventDefault();
	});

	$(window).on('touchend', function(event){
		if(!isAnimated){
			isAnimated = true;
			if(Math.abs(event.originalEvent.changedTouches[0].clientY - verticalTouchStart) > Math.abs(event.originalEvent.changedTouches[0].clientX - horizontalTouchStart)){
				if(Math.abs(event.originalEvent.changedTouches[0].clientY - verticalTouchStart) > 10){
					if(event.originalEvent.changedTouches[0].clientY < verticalTouchStart){
						scrollDown();
					}
					else {
						scrollUp();
					}
					event.preventDefault();
				}
				else{
					isAnimated = false;
				}
			}
			else{
				if(Math.abs(event.originalEvent.changedTouches[0].clientX - horizontalTouchStart) > 10){
					if(event.originalEvent.changedTouches[0].clientX < horizontalTouchStart){
						scrollRight();
					}
					else {
						scrollLeft();
					}
					event.preventDefault();
				}
				else{
					isAnimated = false;
				}
			}
		}
	});

	/*CAROUSEL NAVIGATION*/

	var scrollLeft = function(){
		var slider = '';
		if(currentSection == 2){
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
	};

	var scrollRight = function(){
		var slider = '';
		if(currentSection == 2){
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
	};

	$('.action-arrow-left').click(function(event){
		if(!isAnimated){
			isAnimated = true;
			scrollLeft();
		}
		event.preventDefault();
	});

	$('.action-arrow-right').click(function(event){
		if(!isAnimated){
			isAnimated = true;
			scrollRight();
		}
		event.preventDefault();
	});

	/*INITIAL STATE OF THE MENU BAR*/
	$("#background").css({overflow : "hidden"});
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		isMobile = true;
	}
	selectedMenuButton();
	menuStyleSetter(currentSection);
	setCarousels();
	setViewportSizes();
});