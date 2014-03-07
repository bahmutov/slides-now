/*! slides-now - 0.1.0 built on 2014-03-06
author: Gleb Bahmutov gleb.bahmutov@gmail.com, support: @bahmutov */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var checkFilename, cleanIntroText, createSlides, drop, url, urlParser;

if (typeof angular === "undefined" || angular === null) {
  throw new Error('Missing AngularJs');
}

if (typeof Alertify === "undefined" || Alertify === null) {
  throw new Error('Missing alertify library');
}

if (window.mdToPresentation == null) {
  throw new Error('Missing mdToPresentation function!');
}

cleanIntroText = function() {
  $('div#MainTitle').remove();
  $('div.markdown-dropzone').remove();
  return $('body').removeClass('slides-now-drop');
};

createSlides = function(md, filename) {
  var presentationElement;
  cleanIntroText();
  presentationElement = $('#dropzone');
  return window.mdToPresentation({
    md: md,
    filename: filename,
    element: presentationElement,
    center: false
  });
};

checkFilename = function(filename) {
  var isMarkdownFilename;
  isMarkdownFilename = /\.md|\.md\.txt|\.txt$/i;
  if (!isMarkdownFilename.test(filename)) {
    Alertify.log.error('Cannot drop ' + filename + ', only Markdown documents (.md) can be droppped', 10000);
    return false;
  } else {
    return true;
  }
};


/*
Start presentation if there is url parameter to Markdown
 */

urlParser = $.url();

url = urlParser.param('url') || urlParser.param('md');

if (url) {
  $.get(url, createSlides);
}


/*
Create drop zone using AngularJs
 */

drop = angular.module('markdown-drop', []);

drop.directive('dropzone', function() {
  return {
    restrict: 'A',
    replace: false,
    controller: function($scope) {
      return $scope.tryItNow = function() {
        var md;
        md = $('#explanation')[0].innerHTML;
        return createSlides(md);
      };
    },
    link: function(scope, element, attrs) {
      var onDrop, startDrag, stopDrag;
      startDrag = function(event) {
        element.addClass('dragging');
        if (event.preventDefault) {
          event.preventDefault();
        }
        event.originalEvent.dataTransfer.effectAllowed = 'copy';
        return false;
      };
      stopDrag = function(event) {
        element.removeClass('dragging');
        if (event.preventDefault) {
          event.preventDefault();
        }
        return false;
      };
      onDrop = function(event) {
        var file, reader;
        stopDrag(event);
        if (event.preventDefault) {
          event.preventDefault();
        }
        file = event.originalEvent.dataTransfer.files[0];
        if (checkFilename(file.name)) {
          reader = new FileReader();
          reader.onload = function(evt) {
            return createSlides(evt.target.result, file.name);
          };
          reader.readAsText(file);
        }
        return false;
      };
      element.on('dragenter', startDrag);
      element.on('dragover', startDrag);
      element.on('dragleave', stopDrag);
      return element.on('drop', onDrop);
    }
  };
});


},{}]},{},[1])