
$(document).ready(function(){

  $('select').material_select();
  $('.collapsible').collapsible();

  $(".button-collapse").sideNav();
  $('.slider').slider();

  $('.carousel').carousel();
  $('.carousel.carousel-slider').carousel({fullWidth: true});

  $('.datepicker').pickadate({
   selectMonths: true, // Creates a dropdown to control month
   selectYears: 12 // Creates a dropdown of 15 years to control year
 });

  $('.modal').modal();
  Materialize.updateTextFields();

  $('.dropdown-button').dropdown({
     inDuration: 300,
     outDuration: 225,
     constrainWidth: false, // Does not change width of dropdown to that of the activator
     hover: false, // Activate on hover
     gutter: 0, // Spacing from edge
     belowOrigin: true, // Displays dropdown below the button
     alignment: 'left', // Displays dropdown with edge aligned to the left of button
     stopPropagation: false // Stops event propagation
  });

    paceOptions = {
    ajax: true, // Monitors all ajax requests on the page
    document: false, // Checks for the existance of specific elements on the page
    eventLag: false, // Checks the document readyState
  };

});
