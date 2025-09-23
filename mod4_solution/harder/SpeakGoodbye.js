//Name: Odudu Udo-Inyang
//Assignment 4 Module 4

// (function (window) {
  

//   window.byeSpeaker = byeSpeaker; 
  
// })(window);

var byeSpeaker = {};

var speakWord = "Good Bye";

byeSpeaker.speak = function (name) {
  console.log(speakWord + " " + name);
}

byeSpeaker.speakSimple = function(name) {
  return speakWord + " " + name; 
}