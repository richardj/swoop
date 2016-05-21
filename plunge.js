/*
 * Plunge.js
 */

;(function() {
  'use strict';

  var assignHandlers = function() {
    document.querySelector('body').addEventListener('click', dropdown.open, false);
  };

  var findAncestor = function(el, cls) {
    if (el.classList.contains(cls)) {
      return el;
    }
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  };

  var findDropElement = function(el) {
    var element = document.querySelectorAll('[data-pl-id="' + el + '"]');
    element[0].classList.add('pl-active');
  };
  
  var dropdown = {
    open: function(event) {
      var root = document.documentElement;
      var clicked = findAncestor(event.target, 'dropdown');
      var dropElement = event.target.nextElementSibling;

      if (event.target.dataset.plTrigger && !event.target.classList.contains('pl-trigger-active')) {
        // close all the dropdowns that might be open still
        dropdown.closeAll();

        // add the classes to the html element
        root.classList.add('pl-active');
        // add an active class to the trigger
        event.target.classList.add('pl-trigger-active');
        // find the element that needs to plunge based on the indentifier in the data-pl-trigger attribute
        findDropElement(event.target.dataset.plTrigger);

        //dropdown.position(dropElement);
      }
      else if (root.classList.contains('pl-active') && clicked === null) {
        dropdown.closeAll();
      }
      else {
        return;
      }
    },
    position: function(el) {
      var posLeft = event.target.offsetLeft;
      var posTop = event.target.offsetTop + event.target.clientHeight + 10;

      el.style.top = posTop + "px";
      el.style.left = posLeft + "px";
    },
    content: function(event) {
      var posLeft = event.target.offsetLeft;
      var posTop = event.target.offsetTop + event.target.clientHeight + 10;

      var el = document.createElement('div');
      el.classList.add('dropdown');
      el.innerHTML = '<h3>lorem ipsum</h3>';
      el.style.top = posTop + "px";
      el.style.left = posLeft + "px";
    
      document.body.insertBefore(el, document.body.childNodes[0]); 
    },

    close: function(element) {
      element.parentNode.removeChild(element);  
    },

    hide: function(element) {
      element.classList.remove('pl-active');
      element.classList.remove('pl-trigger-active');
    },

    closeAll: function() {
      var elements = document.querySelectorAll('.dropdown, .pl-trigger-active');
    
      for (var i = 0; i < elements.length; i++) {
        dropdown.hide(elements[i]);
      }
      document.documentElement.classList.remove('pl-active');
    }
  };
  
  assignHandlers();
})();
