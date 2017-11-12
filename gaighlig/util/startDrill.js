const ANIMATION_TIME = 600;
let drillStatus = false;

$('#drill').hide(0);
$('#retry').hide(0);


$('#toggleButton').on('click', function(e) {
    e.preventDefault();
    if (!drillStatus) {
      $('#drill').show(ANIMATION_TIME);
      $('#lesson').hide(ANIMATION_TIME);
      $('#toggleButton').text('Show Lesson');
      drillStatus = true;
    } else {
      $('#drill').hide(ANIMATION_TIME);
      $('#lesson').show(ANIMATION_TIME);
      $('#toggleButton').text('Show Drill');
      drillStatus = false;
    }
});
