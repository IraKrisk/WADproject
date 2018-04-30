$(document).ready(function(){
 
// images fade out and in on hover
  $(".apImage").hover(function(){
    $(this).fadeTo(1000, 0.7);
  }, function(){
    $(this).fadeTo(1000, 1);
  });
  
// reveals hidden form fields
  $("#proceed").focus(function(){
      $("#hidden-formfields").fadeIn(1000);
  });

// enlarged map
  $("#map").hover(function(){
      $(this).animate({height:"530px"}, 2000);
  },
  function(){
      $(this).animate({height:"250px"}, 2000);
  });
  
// students' contact info 
    $("#Ira").click(function(){
      $("#IraInfo").slideToggle(1000);
  });
    $("#Matheus").click(function(){
      $("#MatheusInfo").slideToggle(1000);
  });
    $("#Eddy").click(function(){
      $("#EddyInfo").slideToggle(1000);
  });
  
// dropdown
  $(".dropdown").hover(function(){
    $(".dropdownNav").slideToggle();
  });
  
  
  // dropdown
  $(".dropdow").hover(function(){
    $(".dropdowNav").slideToggle();
  });
  
// reveal category display
  $("#revealCat").click(function(){
    $("#menuCat").slideToggle(500);
  });
  
}); 





// slide show
// images taken from https://pixabay.com/

function changeImage() {
document.getElementById("imx").setAttribute("src", "/gallery/apartment1.jpg");
}
function changeImage2() {
document.getElementById("imx").setAttribute("src", "/gallery/apartment2.jpg");
}
function changeImage3() {
document.getElementById("imx").setAttribute("src", "/gallery/apartment3.jpg");
}
function changeImage4() {
document.getElementById("imx").setAttribute("src", "/gallery/apartment4.jpg");
}
function changeImage5() {
document.getElementById("imx").setAttribute("src", "/gallery/apartment5.jpg");
}
function changeImage6() {
document.getElementById("imx").setAttribute("src", "/gallery/apartment6.jpg");
}

//SOURCE https://jsfiddle.net/bradtraversy/74owmd01/
var i = 0; 			// Start Point
var img = [];	// Images Array
var time = 100;	// Time Between Switch
	 
// Image List
img[0] = "/gallery/apartment1.jpg";
img[1] = "/gallery/apartment2.jpg";
img[2] = "/gallery/apartment3.jpg";
img[3] = "/gallery/apartment4.jpg";
img[4] = "/gallery/apartment5.jpg";
img[5] = "/gallery/apartment6.jpg";

// Change Image
function changeImg(){
	document.slide.src = img[i];

	// Check If Index Is Under Max
	if(i < img.length - 1){
	  // Add 1 to Index
	  i++; 
	} else { 
		// Reset Back To O
		i = 0;
	}

	// Run function every x seconds
	setTimeout(changeImg(), 100);
}

// Run function when page loads
window.onload=changeImg;







// contact form validation

function contactFormValidation() {

	a = document.getElementById("contname").value;

	if (a === "") {
		alert("Please enter your name");
	} 

	b = document.getElementById("contemail").value;
  
  // source: WAD module, validation using HTML5 tutoria, lecturer Liam McCabe
  // ^ beginning of line,  character a-z, 0-9, ._%+-   has to contain @ followed by any character a-z, 0-9,.-    . is the next character   ends with any 2-3 characters from a-z $ represents end of line
	yourEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(b);    

	if (yourEmail === false) {
		alert("Please enter a valid email");
	} 

	c = document.getElementById("contmessage").value;

	if (c === "") {
		alert("Please enter a message");
	} 

	d = document.getElementById("contcaptcha").value;

	if (d != 17) {
		alert("Your math is bad");
	} 
}


