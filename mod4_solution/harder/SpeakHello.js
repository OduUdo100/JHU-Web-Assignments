//Name: Odudu Udo-Inyang
//Assignment 4 Module 4

(function(window) {

  var helloSpeaker = {};

  var speakWord = "Hello";

  helloSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  }

  helloSpeaker.speakSimple = function(name) {
    return speakWord + " " + name
  }

  window.helloSpeaker = helloSpeaker;
})(window); 