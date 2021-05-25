/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var inputsJSON = JSON.stringify(data);
  window.localStorage.setItem('entry-storage', inputsJSON);
});

var previousInputsJSON = localStorage.getItem('entry-storage');
if (previousInputsJSON !== null) {
  data = (JSON.parse(previousInputsJSON));
}
