document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var elems = document.querySelectorAll('.slider');
    var instances = M.Sidenav.init(elems);
    var instances = M.Slider.init(elems);
});
function drag(img, dragevent) {
    dragevent.dataTransfer.setData('Data', img.id);
}
var result;
function droped(elem, ev) {
    var box = event.dataTransfer.getData('Data');
    console.log(box);
    var xhr = new XMLHttpRequest;
    xhr.open('GET','api/recognition/'+box ,true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            result = JSON.parse(this.responseText);
            console.log(result.images[0].classifiers[0].classes);
            viewResult(result);
        }
    };
    xhr.send(null);
}

function viewResult(res) {
    var ul = document.getElementById('results');
    var long = Object.keys(res.images[0].classifiers[0].classes).length;
    for (var i = 0; i < long; i++) {
        var content = document.createElement('LI');
        var text = document.createTextNode(res.images[0].classifiers[0].classes[i].class);
        content.appendChild(text);
        ul.appendChild(content);
    }
    ul.appendChild(document.createElement('HR'));
}
