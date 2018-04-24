$(document).ready(function(){
 
// front page image fade out and in on hover
  $(".apImage").hover(function(){
    $(this).fadeTo(1000, 0.7);
  }, function(){
    $(this).fadeTo(1000, 1);
  });

});