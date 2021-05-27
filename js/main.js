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
var $newEntry = document.querySelector('.newEntry');

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
  divHeaderRow.setAttribute('class', 'row no-wrap');
  divColText.appendChild(divHeaderRow);

  var divColHeader = document.createElement('div');
  divColHeader.setAttribute('class', 'column-half');
  divHeaderRow.appendChild(divColHeader);

  var divColIcon = document.createElement('div');
  divColIcon.setAttribute('class', 'column-half align-end');
  divHeaderRow.appendChild(divColIcon);

  var header = document.createElement('h1');
  header.setAttribute('class', 'font-family margin-none');
  divColHeader.appendChild(header);

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fas fa-pen purple');
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
  var $liEntryId = document.querySelectorAll('[data-entry-id]');
  if (data.editing !== null) {
    for (var i = 0; i < $liEntryId.length; i++) {
      if (data.editing.entryID.toString() ===
        $liEntryId[i].getAttribute('data-entry-id')) {
        data.editing.title = $title.value;
        data.editing.photoURL = $photoURL.value;
        data.editing.notes = $notes.value;
        $liEntryId[i].replaceWith(entryDOMTree(data.editing));
        data.editing = null;
        $image.setAttribute('src', 'images/placeholder-image-square.jpg');
        $entryForm.reset();
        $noEntries.setAttribute('class', 'hidden');
        viewSwap('entries');
        return;
      }
    }
  }
  var inputs = {};
  inputs.title = $title.value;
  inputs.photoURL = $photoURL.value;
  inputs.notes = $notes.value;
  inputs.entryID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(inputs);
  addEntry(data.entries[data.entries.length - 1]);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.reset();
  $noEntries.setAttribute('class', 'hidden');
  viewSwap('entries');
});

$newButton.addEventListener('click', function (event) {
  $entryForm.reset();
  data.editing = null;
  viewSwap('entry-form');
});

$entries.addEventListener('click', function (event) {
  viewSwap('entries');
});

$ul.addEventListener('click', function (event) {
  if (event.target.className.includes('fas')) {
    viewSwap('entry-form');
    $newEntry.textContent = 'Edit Entry';
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID.toString() ===
      event.target.closest('li').getAttribute('data-entry-id')) {
        data.editing = data.entries[i];
        $title.setAttribute('value', data.editing.title);
        $photoURL.setAttribute('value', data.editing.photoURL);
        $image.setAttribute('src', data.editing.photoURL);
        $notes.textContent = data.editing.notes;
      }
    }
  }
});
