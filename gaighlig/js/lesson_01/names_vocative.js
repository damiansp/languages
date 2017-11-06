function address(name, gender) {
  name = lenite(name);
  var vocative = startsWithVowel(name) ? '' : 'a ';

  if (gender == 'm') {
    name = insertPenultimateI(name)
  }

  return vocative + name;
}


function startsWithVowel(word) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];

  if (vowels.indexOf(word[0].toLowerCase()) === -1) {
    return false;
  }

  return true;
}


function lenite(word) {
  var nonLeniters = ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r'];

  if (nonLeniters.indexOf(word[0].toLowerCase()) === -1) {
    word = word[0] + 'h' + word.slice(1, word.length);
  }

  return word;
}


function insertPenultimateI(word) {
  var n = word.length;
  return word.slice(0, n - 1) + 'i' + word[n - 1];
}
