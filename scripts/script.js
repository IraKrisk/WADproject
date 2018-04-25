$(document).ready(function(){
 
// front page images fade out and in on hover
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
  
// Students contact info 
    $("#Ira").click(function(){
      $("#IraInfo").slideToggle(1000);
  });
    $("#Matheus").click(function(){
      $("#MatheusInfo").slideToggle(1000);
  });
    $("#Eddy").click(function(){
      $("#EddyInfo").slideToggle(1000);
  });



  
  
  
  
  
});


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


