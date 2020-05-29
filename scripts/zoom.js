//ZOOM SCRIPT

//upon clicking -- add div to that section overlaying half the screen

//new div class = zoomView

//, button changes from "+" to "-" or "x"

//new div has background set of images 

//




	//project.toggle class of existing html object in index.html 
	//one class shows display: block; other class shows display: none;
/*$(document).ready(function(){

	$("a.zoom").click(function(){

		var indexNum = $("a.zoom").index(this);

		$("div.gray:eq(" + indexNum + ")").toggleClass("view");

		console.log(indexNum);

	});

});*/

$(document).ready(function(){

	$("a.zoom").click(function(){
		var indexNum = $("a.zoom").index(this);

		$("div.gray:eq(" + indexNum + ")").toggleClass("view");

		var siblin = $("div.gray:eq(" + indexNum + ")").siblings(".imgContainer"); 

		var sibIndex = $(".imgContainer").index(siblin);

		$(this).toggleClass("out");

		//$("a.zoom:eq(" + indexNum + ")").toggleClass("out");

		//$("a.zoom:eq(" + indexNum + ")").css("background-position","0 62px");

		
		//console.log(sibIndex);

	});

	$("div.gray, img.graphic").click(function(event){

		if($(event.target).hasClass("graphic")) {

			$(this).siblings("a.zoom").removeClass("out");
			$(this).parent("div.imgContainer").siblings("div.gray").removeClass("view");
		} else if(!$(event.target).closest("div.55").length) {
			$(this).removeClass("view");

			$(this).siblings("div.imgContainer").children("a.zoom").removeClass("out");

		}

	});


	//$("div.gray").click(function(){
		//$(this).removeClass("view");
	//});


});

