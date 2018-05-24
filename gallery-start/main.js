var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

for(var i=1;i<=5;i++){
  var newImage = document.createElement('img');
  newImage.setAttribute('src','images/pic'+i+'.jpg');
  thumbBar.appendChild(newImage);
  newImage.onclick = function(e) {
    var imgSrc = e.target.getAttribute('src');
    displayImage(imgSrc);
  }
}
function displayImage(imgSrc) {
  displayedImage.setAttribute('src', imgSrc);
}



