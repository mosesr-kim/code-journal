/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');
var $image = document.querySelector('.image');
var $entryForm = document.querySelector('.entry-form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $ul = document.querySelector('ul');
var $noEntries = document.getElementById('noEntries');
var $newButton = document.querySelector('.newButton');
var $entries = document.querySelector('.entries');
var $view = document.querySelectorAll('.view');

function viewSwap(viewName) {
  data.view = viewName;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === data.view) {
      $view[i].setAttribute('class', 'container');
    } else {
      $view[i].setAttribute('class', 'hidden');
    }
  }
}

function addEntry(object) {
  var newEntry = entryDOMTree(object);
  $ul.prepend(newEntry);
}

function entryDOMTree(object) {
  var liOut = document.createElement('li');
  liOut.setAttribute('data-entry-id', object.entryID);

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

  var divHeaderRow = document.createElement('div');
  divHeaderRow.setAttribute('class', 'row');
  divColText.appendChild(divHeaderRow);

  var divColHeader = document.createElement('div');
  divColHeader.setAttribute('class', 'column-half');
  divHeaderRow.appendChild(divColHeader);

  var divColIcon = document.createElement('div');
  divColIcon.setAttribute('class', 'column-half');
  divHeaderRow.appendChild(divColIcon);

  var header = document.createElement('h1');
  header.setAttribute('class', 'font-family margin-none');
  divColHeader.appendChild(header);

  var icon = document.createElement('h2');
  icon.setAttribute('class', 'fas fa-pen justify-end margin-none purple');
  divColIcon.appendChild(icon);

  var paragraph = document.createElement('p');
  divColText.appendChild(paragraph);

  header.textContent = object.title;
  paragraph.textContent = object.notes;

  return liOut;
}

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length === 0) {
    $noEntries.setAttribute('class', 'row font-family justify-center');
  }
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = entryDOMTree(data.entries[i]);
    $ul.prepend(newEntry);
  }
  viewSwap(data.view);
});

$photoURL.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoURL.value);
});

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
  addEntry(data.entries[data.entries.length - 1]);
  viewSwap('entries');
});

$newButton.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

$entries.addEventListener('click', function (event) {
  viewSwap('entries');
});

$ul.addEventListener('click', function (event) {
});
