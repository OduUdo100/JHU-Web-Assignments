
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

  function getGreeting(name) {
    var firstLetter = name.charAt(0).toLowerCase();
    if(firstLetter === 'j') {
      return byeSpeaker.speakSimple(name); 
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }

  var greetingsArray = names.map(getGreeting);

  console.log("______Output using map(). ______")
  greetingsArray.forEach(function(greeting){
    console.log(greeting);
  });
})(); 
