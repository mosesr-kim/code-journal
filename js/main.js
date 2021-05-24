/* global data */
/* exported data */
var $photoURL = document.querySelector('.photoURL');
var $image = document.querySelector('.image');
$photoURL.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoURL.value);
});
