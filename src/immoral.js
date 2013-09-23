/*
 * immoral
 * https://github.com/aniketpant/immoral
 *
 * Copyright (c) 2013 Aniket Pant
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.immoral = function() {
    return this.each(function() {
      // Do something immoral to each selected element.
      init(this);

      // Initialize Modal Shadow
      modalShadowInit();

      $('body').on('click', 'a[rel="modal"]', function(e) {
        e.preventDefault();
        var element = $(this).attr('href');

        // Open
        openModal(element);
      });
      $('.modal').on('click', 'a[rel="modal:close"]', function(e) {
        e.preventDefault();
        var element = $(this).attr('id');

        // Close
        closeModal(element);
      });
    });
  };

  // Initialize modal shadow
  function modalShadowInit() {
    // Get Options
    var options = $.immoral.options;

    var modalShadow = options.modalShadow;

    if(!modalShadow) {
      $('body').append(options.modalShadowDiv);
      options.modalShadow = $('#modal_shadow');
    }
  }

  function init(element) {
    // Get Options
    var options = $.immoral.options;

    var modalObj = $(element);
    var modalObjName = modalObj.attr('id');

    if (modalObj.parent('.modal-wrapper').attr('class') !== 'modal-wrapper') {
      modalObj.wrap(options.modalWrapper);

      $('#' + modalObjName + ' .modal--content').append(options.content);

      // apply styles
      modalObj.css(options.modalStyle).show();

      // Add close Button
      $(options.modalCloseButton).attr('id', modalObjName + '_close');
      modalObj.prepend(options.modalCloseButton);
    }

    var modalWhole = modalObj.parent('.modal-wrapper');

    // Hide the whole thing.
    modalWhole.hide().attr('id', modalObjName + '-wrapper');
  }

  // Private function for opening modal
  function openModal(element) {
    // Get Options
    var options = $.immoral.options;

    var modalWhole = $(element).parent('.modal-wrapper');
    var modalShadow = options.modalShadow;

    modalShadow.fadeIn();
    modalWhole.fadeIn();
  }

  // Private function for closing modal
  function closeModal(element) {
    // Get Options
    var options = $.immoral.options;

    if (element) {
      var modalWhole = $(element).parent('.modal-wrapper');
      modalWhole.fadeOut();
    } else {
      $('.modal').parent().fadeOut();
    }

    var modalShadow = options.modalShadow;
    modalShadow.fadeOut();
  }

  // Method for opening a modal
  $.fn.open = function() {
    openModal(this);
  };

  // Method for closing a modal
  $.fn.close = function() {
    closeModal(this);
  };

  // Static method.
  $.immoral = function(options) {
    // Override default options with passed-in options.
    $.immoral.options = $.extend({}, $.immoral.options, options);
    // Return something immoral.
    return 'immoralized';
  };

  // Static method default options.
  $.immoral.options = {
    content: '',
    modalShadowDiv: '<div id="modal_shadow" style="display:none;"></div>',
    modalWrapper: '<div class="modal-wrapper" />',
    modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
    modalShadow: false,
    modalStyle: {
      width: '50%',
      height: '50%',
      margin: '0 auto'
    }
  };

}(jQuery));