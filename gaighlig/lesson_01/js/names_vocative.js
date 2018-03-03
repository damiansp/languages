const nameDict = {
  'Calum': {'gender': "m"},
  'Catrìona': {'gender': "f"},
  'Dòmhnall': {'gender': "m"},
  'Iseabail': {'gender': "f"},
  'Mairead': {'gender': "f"},
  'Sandra': {'gender': "f"},
  'Seumas': {'gender': "m"},
  'Sìne': {'gender': "f"},
  'Tormod': {'gender': "m"}
};

const DISPLAY_TIME = 1500, // ms
  RIGHT_COLOR = '#00AA00',
  WRONG_COLOR = '#AA0000';
let remainingNames = initRemaining(),
  currentName = remainingNames.shift(),
  currentGender = nameDict[currentName].gender,
  correctAnswer = address(currentName, currentGender);

askNextQuestion(currentName, currentGender);

$('#answerButton').on('click', function(e) {
    e.preventDefault();
    let answerGiven = $('#response').val();
    if (answerGiven == correctAnswer) {
      displayCorrect();
    } else {
      displayIncorrect(answerGiven);
      remainingNames.push(currentName)
    }
    if (remainingNames.length === 0) {
      showComplete();
    } else {
      currentName = remainingNames.shift();
      currentGender = nameDict[currentName].gender;
      correctAnswer = address(currentName, currentGender);
      askNextQuestion(currentName, currentGender);
    }
});

                      
function initRemaining() {
  let remainingNames = [];
  for (let name in nameDict) {
    remainingNames.push(name);
  }
  return shuffle(remainingNames);
}

function shuffle(array) {
  let currentIndex = array.length,
    tempVal,
    randIndex;
  while (0 !== currentIndex) {
    randIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    tempVal = array[currentIndex];
    array[currentIndex] = array[randIndex];
    array[randIndex] = tempVal;
  }
  return array;
}

function askNextQuestion(currentName, currentGender) {
  $('#name').html('&nbsp;' + currentName + ' (' + currentGender + ')');
  $('#response').val('');
}

// TODO: move html and css logic into html/css files 
function displayCorrect() {
  $('#evaluate')
    .text('Correct!')
    .css({'color': RIGHT_COLOR})
    .show()
    .delay(DISPLAY_TIME)
    .fadeOut();
  console.log('Correct!');
}

// TODO: move html and css logic into html/css files 
function displayIncorrect(answerGiven) {
  $('#evaluate')
    .html('Incorrect.<br/>Your answer: ' + answerGiven +
          '<br/>The correct answer is: ' + correctAnswer + '.')
    .css({'color': WRONG_COLOR})
    .show();
  console.log('Wrong! You answered: "' + answerGiven +
              '". The correct answer is: "' + correctAnswer + '".');
}

// TODO: move html and css logic into html/css files 
function showComplete() {
  $('#complete').html('All done! Great Job!');
  console.log('All done!  Great job');
  $('#retry').show(ANIMATION_TIME);
}

function promptRetry() {
  $('#retry').show(ANIMATION_TIME);
}

$('#retry').on('click', function(e) {
    e.preventDefault();
    $('#retry').hide(ANIMATION_TIME);
    remainingNames = initRemaining();
    currentName = remainingNames.shift();
    currentGender = nameDict[currentName].gender;
    correctAnswer = address(currentName, currentGender);
    askNextQuestion(currentName, currentGender);
});


// TODO: move grammatical logic into external/reusable modules 
/* Grammatical logic */
function address(name, gender) {
  name = lenite(name);
  let vocative = startsWithVowel(name) ? '' : 'a ';
  if (gender == 'm') {
    name = insertAfterLastNonFinalVowel('i', name)
  }
  return vocative + name;
}

function startsWithVowel(word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  if (vowels.indexOf(word[0].toLowerCase()) === -1) {
    return false;
  }
  return true;
}

function lenite(word) {
  const nonLeniters = ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r'];
  if (nonLeniters.indexOf(word[0].toLowerCase()) === -1) {
    word = word[0] + 'h' + word.slice(1, word.length);
  }
  return word;
}

function insertAfterLastNonFinalVowel(insert, word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'],
    n = word.length;
  let currentIndex = n - 1,
    currentLetter = word[currentIndex];
  while (vowels.indexOf(currentLetter) === -1) {
    currentIndex--;
    currentLetter = word[currentIndex];
  }
  return (word.slice(0, currentIndex + 1) + insert +
          word.slice(currentIndex + 1, n));
}
