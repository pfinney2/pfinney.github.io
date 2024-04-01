$(document).ready(function(){
  

  $(".infoI").click(function(){


    $(".projInfo").toggle();
    console.log("Clicked!");

  });

});


(function($) {
  $.fn.slideOver = function(options) {
    // Establish our default settings
    var settings = $.extend({
      orientation: 'right',
      animationSpeed: 200,
      overlayColor: null,
      afterOpen: null,
      afterClose: null
    }, options);
    // Append the needed HTML elements to the DOM
    $('body').append(
        "<div class='slide-over'>"
      + "<div class='infoI'><a href='#'><img src='images/i.svg' width='24px'</a></div>"
      + "<a data-slideover='close' class='close-x'><img src='images/close.svg' width='24px' /></a>"
      + "</div>"
      + "<div class='overlay' data-slideover='close'>"
      + "</div>"

    );



    var panel = $(".slide-over");
    var panelWidth = panel.width();

    const widthOutput = document.querySelector("#width");


    // Add proper classes for settings
    if (settings.orientation) {
      if (settings.orientation == 'left') {
        $('.slide-over').addClass('left');
      }
    }
    if (settings.overlayColor) {
      $('.overlay').css('background', settings.overlayColor);
    }

    // Trigger the slideout on click
    this.each(function() {
      $(this).click(function(event) {
        var contentId = $(this).attr('href')
        var currentContent = $('.slide-over div.slideover-content');
        var currentContentId = "#" + currentContent.attr('id');
        // Swap out the content if a different button was clicked
        if(contentId != currentContentId) {
          currentContent.remove();
          $(contentId).clone().appendTo('.slide-over');
        }
        event.preventDefault();
        // Toggle open class
        panel.addClass("open");
        // Slide functionality
        panel.show().animate({
          right: (settings.orientation == 'right' ? '0px' : "auto"),
          left: (settings.orientation == 'left' ? '0px' : 'auto')
        }, settings.animationSpeed, function() {
          if ( $.isFunction( settings.onOpen ) ) {
              settings.onOpen.call( this );
          }
        });
        // Append content inside the panel
        $(".overlay").fadeIn(settings.animationSpeed);
        $("body").css("overflow", "hidden");
        $("body").addClass('scrollAdj');
      });
    });

    // Close the slideout when clicking X or outside panel
    $('*[data-slideover="close"]').click(function() {
      var currentContent = $('.slide-over div.slideover-content');
      closeSlider();
    });

    function closeSlider() {
      $('.overlay').fadeOut(settings.animationSpeed);
      // Remove the content inside the panel

      panel.animate({
        right: (settings.orientation == 'right' ? -window.innerWidth : "auto"),
        left:  (settings.orientation == 'left' ? -window.innerWidth : "auto")
      }, settings.animationSpeed, function() {
        panel.removeClass("open");
        $("body").css("overflow","auto");
        $("body").removeClass('scrollAdj');
        if ( $.isFunction( settings.onClose ) ) {
            settings.onClose.call( this );
        }
      });


    }
  }
}(jQuery));
