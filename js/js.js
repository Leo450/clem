(function() {

  var clement = document.getElementById('clement');

  var classHome = 'home';
  var classRandom = 'random';
  var classAll = 'all';

  // clement.addEventListener('click', displayRandomQuote);

  function displayRandomQuote() {
    document.body.className = classRandom;

    // some code to xhr a random query
    // (try not to make it too random, we don't want to get the same quote twice)
    // getRandomQuote();
  };

  document.getElementById('dev-menu-home').onclick = function() { document.body.className = classHome; };
  document.getElementById('dev-menu-random').addEventListener('click', displayRandomQuote);
  document.getElementById('dev-menu-all').onclick = function() { document.body.className = classAll; };

})();

(function () {

  var clement = new StateMachine({
    init: 'idle',
    transitions: [
      { name: 'troll',    from: 'idle',   to: 'tilt'  },
      { name: 'joke',     from: 'tilt',   to: 'cooldown' }
    ],
    methods: {
      onTroll: function() { console.log('putain là') },
      onJoke:  function() { console.log('hé ça va')  }
    }
  });

  var clementImage = document.getElementById('clement');
  clementImage.addEventListener('click', function() {
    if (clement.state == 'idle') {
      clement.troll();
      console.log('clic');
    }
    else if (clement.state == 'tilt') {
      clement.joke();
      document.body.className = 'random';
      console.log('clic clic');
    };
  });

  console.log(clement.state);

})();
