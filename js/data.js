/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var inputs = {};
var $entryForm = document.querySelector('.entry-form');
var $title = document.querySelector('.title');
var $photoURL = document.querySelector('.photoURL');
var $notes = document.querySelector('.notes');
var $image = document.querySelector('.image');
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  inputs.title = $title.value;
  inputs.photoURL = $photoURL.value;
  inputs.notes = $notes.value;
  inputs.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(inputs);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
