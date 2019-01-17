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


});

  
