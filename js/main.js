/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');
var $image = document.querySelector('.image');
$photoURL.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoURL.value);
});

var $entryForm = document.querySelector('.entry-form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var inputs = {};
  inputs.title = $title.value;
  inputs.photoURL = $photoURL.value;
  inputs.notes = $notes.value;
  inputs.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(inputs);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
});

function entryDOMTree(object) {
  var liOut = document.createElement('li');

  var divRow = document.createElement('div');
  divRow.setAttribute('class', 'row');
  liOut.appendChild(divRow);

  var divColImg = document.createElement('div');
  divColImg.setAttribute('class', 'column-half');
  divRow.appendChild(divColImg);

  var divColText = document.createElement('div');
  divColText.setAttribute('class', 'column-half padding-right-0');
  divRow.appendChild(divColText);

  var img = document.createElement('img');
  img.setAttribute('src', object.photoURL);
  img.setAttribute('class', 'image margin-bot-25');
  divColImg.appendChild(img);

  var header = document.createElement('h1');
  header.setAttribute('class', 'font-family margin-none');
  divColText.appendChild(header);

  var paragraph = document.createElement('p');
  divColText.appendChild(paragraph);

  header.textContent = object.title;
  paragraph.textContent = object.notes;

  return liOut;
}

window.addEventListener('DOMContentLoaded', function (event) {
  var $ul = document.querySelector('ul');
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = entryDOMTree(data.entries[i]);
    $ul.insertBefore(newEntry, $ul.childNodes[0]);
  }
});
