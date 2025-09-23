//Name: Odudu Udo-Inyang
//Assignment 4 Module 4

// (function(window) {
  

//   window.helloSpeaker = helloSpeaker;
// }) (window); 

var helloSpeaker = {};

  var speakWord = "Hello";

  helloSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  }

  helloSpeaker.speakSmile = function(name) {
    return speakWord + " " + name
  }