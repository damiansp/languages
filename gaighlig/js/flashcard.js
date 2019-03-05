let vocab,            // json obj of vocab and metadata
  maxCards,           // user-defined from inputs
  lessons = [],       // user-selected lessons
  gaighligArray = [], // gaighlig vocab
  englishAray = [],   // english vocab
  frontData,          // type of data to occur on front...
  backData,           // ...and back
  n,                  // number of cards remaining
  nextCard,           // data for next card to be displayed
  cardCounter;        // to track progress
const maxFontSize = 10;  // em default; change below for screen sizes
const minCharWidth = 4;  // range of card widths is chars at maxFontSize
const maxCharWidth = 15; //
const cardMin = 252;     // px; width of card of range of devices
const cardMax = 842;
//const wMin = 335;      // range of window widths to be handled
//const wMax = 995;

const entityCharMap = {'/&#768/g': '`'};


$(document).ready(function() {

// Ajax call to load data
function loadLesson(lesson) {
  $.ajax({dataType: 'json',
          url: './vocab/vocab/' + lesson + '.json',
          success: function(json) {
            vocab = json;
            for (let item of vocab) {
              gaighligArray.push(item.gaighlig);
              let english = item.english;
              if (Array.isArray(english)) english = english.join('<br />');
              englishArray.push(english);
            }
          },
          fail: function() { $('#load-error-ajax').show(); }
  });
}


// Load selected lessons and transition to next screen
$('#load-button').on('click', function() {
    maxCards = parseInt($('#max-cards').val());
    $('input[name="lesson"]:checked').each(function() {
        lessons.push(this.value);
    });
    for (let lesson of lessons) loadLesson(lesson);
    if (lessons.length < 1) $('#load-error-no-lesson').show();
    else {
      // transition to next screen
      $('#chapter-load').hide();
      $('.load-error').hide();
      $('#options').fadeIn();
    }
});


/** 
 * Approach to generating random cards, and repeating misses:
 * If maxCards, first take a random subset of the data, and delete the
 * rest.  If maxCards AND both languages, randomly decide how many of each
 * from each language, then take random sample.
 *
 * Once the working deck has been so created (all or random subset), 
 * generate a random number on [0, deckLength - 1], and use that as the 
 * index for the next card.  If both langs, randomly select the front and
 * back.
 *
 * If answer is correct:
 * Remove card from deck
 * Decrement deckLength
 * Decrement new card counter
 *
 * If answer is 'hard':
 * Don't remove card.
 * Decrement new card counter
 * Increment repeat counter
 *
 * If missed:
 * Push a duplicate of the word to the end of the array
 # Decrement new card counter
 * Increment repeat counter +2
 */

// Determine content to be on front and back, and begin
$('#begin-button').on('click', function() {
    let frontMatter = $('input[name="options"]:checked').val();
    if (frontMatter == 'gaighlig-text') {
      frontData = 'gaighlig';
      backData = 'english';
    } else if (frontMatter == 'english-text') {
      frontData = 'english';
      backData = 'gaighlig';
    } else if (frontMatter == 'both-text') {
      frontData = 'both';
      backData = 'both';
    } else if (frontMatter == 'gaighlig-audio') {
      frontData = 'gaighligAudio';
      backData = 'english';
    } else {
      alert("Maybe the interwebs are down or something?");
    }
    n = maxCards || gaighligArray.length;
    cardCounter = n;

    // if maxCards, randomly select and jettison the rest
    if (maxCards) {
      let gaighligTemp = [], englishTemp = [];
      for (let i = 1; i <= maxCards; i++) {
        let randIndex = Math.floor(Math.random() * gaighligArray.length):
        gaighligTemp.push(gaighligArray.splice(randIndex, 1)[0]);
        englishTemp.push(englishArray.splice(randIndex, 1)[0]);
      }
      englishArray = englishTemp;
      gaighligArray = gaighligTemp;
    }

    // Choose and create next card
    nextCard = pickNextCard('ok', null);
    populateCard(frontData, nextCard);

    // Transition
    $('#options').hide();
    $('#card-display').fadeIn();
    $('#card-counter').html(cardCounter);
    $('#tracker').fadeIn();
});


// Randomly choose a card, and decide what to do with previous card (index)
// based on user's difficulty
function pickNextCard(difficulty, index) {
  if (cardCounter <= 0) finish();
  if (index || index == 0) {
    if (gaighligArray.length == 1) finish();
    gaighligArray.splice(index, 1);
    englishArray.splice(index, 1);
    n -= 1;
    cardCounter = Math.max(cardCounter - 1, 0);
    if (cardCounter == 0) finish();
  } else if (difficulty == hard) ; // do nothing
  else if (difficulty == 'missed') {
    gaighligArray.push(gaighligArray[index]);
    englishArray.push(englishArray[index]);
    n += 1;
    cardCounter += 1;
  }
  let randIndex = Math.floor(Math.random() * n);
  return {index: randIndex,
          gaighlig: gaighligArray[randIndex],
          english: englishArray[randIndex]};
}


});

  
