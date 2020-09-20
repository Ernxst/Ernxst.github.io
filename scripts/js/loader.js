function onReady(callback) {
    let intervalId = window.setInterval(function () {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalId);
            callback.call(this);
        }
    }, 250);
}

function setVisible() {
    let loader = document.getElementById('loading');
    loader.parentNode.removeChild(loader);
    let nav = document.getElementById('nav');
    nav.style.visibility = 'visible';
    nav.classList.add('nav-animated');
    document.getElementById('rain').style.visibility = 'visible';
    let page = document.querySelector('.content');
    page.style.visibility = 'visible'
    document.querySelector('.' + page.id).classList.add('content-animated');
    document.querySelector('.media').classList.add('media-animated');
}

onReady(
    function () {
        let text = document.getElementById("loader-text")
        if (text !== null)
            text.innerHTML = "Ready";
        setTimeout(setVisible, 1000);
    });
