/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $view = document.querySelectorAll('.view');

window.addEventListener('beforeunload', function (event) {
  for (var i = 0; i < $view.length; i++) {
    if (!$view[i].classList.value.includes('hidden')) {
      data.view = $view[i].getAttribute('data-view');
    }
  }
  var inputsJSON = JSON.stringify(data);
  window.localStorage.setItem('entry-storage', inputsJSON);
});

var previousInputsJSON = localStorage.getItem('entry-storage');
if (previousInputsJSON !== null) {
  data = (JSON.parse(previousInputsJSON));
}
