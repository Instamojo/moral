/*
 * immoral
 * https://github.com/Instamojo/moral
*/

(function() {
  (function($) {
    var applyStyles, closeModal, emptyModal, eventHandler, modalContainerInit, modalInit, openModal;
    $.fn.immoral = function(options) {
      // Global Settings
      var globals;
      globals = {
        content: '',
        modalClass: 'immoral-modal',
        modalContainerClass: 'immoral-modal-container',
        modalCloseButton: '<a href="#" rel="modal:close">Close</a>',
        modalContentClass: 'immoral-modal-content',
        modalContainer: false,
        modalStyle: {
          'position': 'absolute',
          'left': '50%',
          'top': '50%',
          'width': '50%',
          'height': '50%',
          'transform': 'translate(-50%, -50%)',
          'background': 'white',
          'text-align': 'left'
        },
        modalContainerStyle: {
          'width': '100%',
          'margin': '0px',
          'position': 'fixed',
          'top': '0',
          'left': '0',
          'right': '0',
          'bottom': '0',
          'height': '100%',
          'display': 'none',
          'z-index': '10000001',
          'background': 'rgba(0,0,0,.8)',
          'text-align': 'center',
          'overflow-y': 'auto',
          '-webkit-overflow-scrolling': 'touch'
        },
        modalContentStyle: {
          'width': '100%',
          'height': '100%'
        }
      };
      return this.each(function() {
        this.settings = $.extend(true, {}, globals, options); // Set each element
        modalContainerInit(this); // Initialize modal container
        return eventHandler(this); // Handle the events
      });
    };

    // Handles the click events
    eventHandler = function(element) {
      var eventMethod, eventer, messageEvent;
      $(element).bind('click', function(e) {
        e.preventDefault();
        return openModal(element); // Open modal

      });
      $(element).keydown(function(e) {
        if (e.keyCode === 27) {
          return closeModal(element);
        }
      });
      $(element.settings.modalContainer).click(function(e) {
        if ($(e.target).attr('rel') === 'modal:close') {
          return closeModal(element);
        } else if (e.target === e.currentTarget) {
          return closeModal(element);
        }
      });

      // http://stackoverflow.com/a/8849807/721084
      eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
      eventer = window[eventMethod];
      messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
      
      // Listen to message from child window
      eventer(messageEvent, function(e) {
        var data, key;
        key = e.message ? 'message' : 'data';
        data = e[key];
        if (data === 'onRequestClose') {
          return closeModal(element);
        }
      }, false);
      return true;
    };

    // Initialize modal container
    modalContainerInit = function(element) {
      var options;
      options = element.settings; // Get options

      if (!$('.' + options.modalContainerClass).length) {
        $('body').append('<div class="' + options.modalContainerClass + '" style="display: none"><div class="' + options.modalClass + '"><div class="' + options.modalContentClass + '"></div></div></div>');
      }
      return $.immoral(element, {
        'modalContainer': $('.' + options.modalContainerClass)
      });
    };
    modalInit = function(element) {
      var $modalContainer, $modalContent, content, link, options;
      options = element.settings;
      $modalContainer = $(options.modalContainer);
      $modalContent = $modalContainer.find('.' + options.modalContentClass);
      link = $(element).attr('href');
      if (options.content) {
        content = options.content;
      } else {
        if (/https*:\/\//.test(link)) {
          content = '<iframe src="' + link + '" seamless></iframe>'; // iframe

        } else if (/#+/.test(link)) {
          content = $(link).html();
        }
      }
      $modalContent.html(content); // Put content inside
      $modalContent.prepend(options.modalCloseButton); // Attach close button
      return applyStyles(element); // Apply styles
    };

    // Private function for opening modal
    openModal = function(element) {
      var $modalContainer, options;
      options = element.settings;
      $modalContainer = $(options.modalContainer);
      modalInit(element); // Initialize modal
      return $modalContainer.fadeIn();
    };

    // Private function for closing modal
    closeModal = function(element) {
      var $modalContainer, options;
      options = element.settings; // Get options
      $modalContainer = $(options.modalContainer);
      $modalContainer.fadeOut();
      return emptyModal(element); // time to clear the modal

    };

    // Empty the modal
    emptyModal = function(element) {
      var $modalContainer, options;
      options = element.settings;
      $modalContainer = options.modalContainer;
      return $modalContainer.find('.' + options.modalContentClass).empty();
    };

    // Private function to apply default styles
    applyStyles = function(element) {
      var $modalContainer, options;
      options = element.settings;
      $modalContainer = options.modalContainer;
      $modalContainer.css(options.modalContainerStyle);
      $modalContainer.find('.' + options.modalContentClass).css(options.modalContentStyle);
      return $modalContainer.find('.' + options.modalClass).css(options.modalStyle);
    };

    // Method for opening a modal
    $.fn.open = function() {
      return openModal(this);
    };

    // Method for closing a modal
    $.fn.close = function() {
      return closeModal(this);
    };

    // Static method for updating settings
    return $.immoral = function(element, options) {
      // Override default options with passed-in options.
      element.settings = $.extend(true, {}, element.settings, options);
      return 'immoralized';
    };
  })(jQuery);
}).call(this);
