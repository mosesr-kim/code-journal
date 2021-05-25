/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');
var $image = document.querySelector('.image');
$photoURL.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoURL.value);
});

var inputs = {};
var $entryForm = document.querySelector('.entry-form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  inputs.title = $title.value;
  inputs.photoURL = $photoURL.value;
  inputs.notes = $notes.value;
  inputs.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(inputs);
  inputs = {};
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});
