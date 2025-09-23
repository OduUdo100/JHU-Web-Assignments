
// Module 4 Assignment Instructions.
// Name: Odudu Udo-Inyang 

(function () {

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase(); 

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]); 
    }
  }

  function getGreetings(name) {
    var firstLetter = name.charAt(0).toLowerCase();
    if(firstLetter === 'j') {
      return byeSpeaker.speakSimple(name); 
    } else {
      return helloSpeaker.speakSmile(name);
    }
  }

  var greetingsArray = names.map(getGreetings);

  console.log("______Output using map______")
  greetingsArray.forEach(function(greeting){
    console.log(greeting);
  });

}) (); 
