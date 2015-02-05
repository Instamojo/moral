/*
 * immoral
 * https://github.com/Instamojo/moral
*/


(function() {
  (function($) {
    var applyStyles, closeModal, emptyModal, eventHandler, modalContainerInit, modalInit, openModal;
    $.fn.immoral = function(options) {
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
          'opacity': 0,
          '-webkit-backface-visibility: hidden': '-webkit-backface-visibility: hidden',
          '-moz-backface-visibility: hidden': '-moz-backface-visibility: hidden',
          'backface-visibility: hidden': 'backface-visibility: hidden',
          'transform': 'translateX(-50%) translateY(-50%)',
          'background': 'white',
          'text-align': 'left'
        },
        modalContainerStyle: {
          'width': '100%',
          'height': '100%',
          'margin': '0px',
          'position': 'fixed',
          'top': '0',
          'left': '0',
          'right': '0',
          'bottom': '0',
          'visibility': 'hidden',
          'z-index': '10000001',
          'background': 'rgba(0,0,0,.8)',
          'text-align': 'center',
          'overflow-y': 'auto',
          '-webkit-overflow-scrolling': 'touch',
          'opacity': 0,
          '-webkit-transition': 'all 0.3s',
          '-moz-transition': 'all 0.3s',
          'transition': 'all 0.3s'
        },
        modalContentStyle: {
          'width': '100%',
          'height': '100%',
          '-webkit-transform': 'scale(0.7)',
          '-moz-transform': 'scale(0.7)',
          '-ms-transform': 'scale(0.7)',
          'transform': 'scale(0.7)',
          'opacity': 0,
          '-webkit-transition': 'all 0.3s',
          '-moz-transition': 'all 0.3s',
          'transition': 'all 0.3s'
        }
      };
      return this.each(function() {
        this.settings = $.extend(true, {}, globals, options);
        modalContainerInit(this);
        return eventHandler(this);
      });
    };
    eventHandler = function(element) {
      $(element).bind('click', function(e) {
        e.preventDefault();
        return openModal(element);
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
      return true;
    };
    modalContainerInit = function(element) {
      var options;
      options = element.settings;
      if (!$('.' + options.modalContainerClass).length) {
        $('body').append('<div class="' + options.modalContainerClass + '"><div class="' + options.modalClass + '"><div class="' + options.modalContentClass + '"></div></div></div>');
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
          content = '<iframe src="' + link + '" seamless></iframe>';
        } else if (/#+/.test(link)) {
          content = $(link).html();
        }
      }
      $modalContent.html(content);
      $modalContent.prepend(options.modalCloseButton);
      return applyStyles(element);
    };
    openModal = function(element) {
      var $modalContainer, options;
      options = element.settings;
      $modalContainer = $(options.modalContainer);
      modalInit(element);
      $modalContainer.css({
        visibility: 'visible',
        opacity: 1
      });
      $('.' + options.modalClass).css({
        opacity: 1
      });
      return $('.' + options.modalContentClass).css({
        '-webkit-transform': 'scale(1)',
        '-moz-transform': 'scale(1)',
        '-ms-transform': 'scale(1)',
        'transform': 'scale(1)',
        'opacity': 1
      });
    };
    closeModal = function(element) {
      var $modalContainer, options;
      options = element.settings;
      $modalContainer = $(options.modalContainer);
      $modalContainer.fadeOut();
      return emptyModal(element);
    };
    emptyModal = function(element) {
      var $modalContainer, options;
      options = element.settings;
      $modalContainer = options.modalContainer;
      return $modalContainer.find('.' + options.modalContentClass).empty();
    };
    applyStyles = function(element) {
      var $modalContainer, options;
      options = element.settings;
      $modalContainer = options.modalContainer;
      $modalContainer.css(options.modalContainerStyle);
      $modalContainer.find('.' + options.modalContentClass).css(options.modalContentStyle);
      return $modalContainer.find('.' + options.modalClass).css(options.modalStyle);
    };
    $.fn.open = function() {
      return openModal(this);
    };
    $.fn.close = function() {
      return closeModal(this);
    };
    return $.immoral = function(element, options) {
      element.settings = $.extend(true, {}, element.settings, options);
      return 'immoralized';
    };
  })(jQuery);

}).call(this);
