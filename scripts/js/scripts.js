function ready () {
    let url = document.location.href;

    let btns = document.querySelectorAll('.nav-item');
    let activated = false;

    for (let button of btns) {
        if (url.includes(button.id.toString())) {
            button.classList.add("active-item");
            activated = true;
        } else
            button.classList.remove("active-item");
    }

    if (!activated) {
        let btn = document.getElementById("index.html");
        btn.classList.add("active-item");
    }
}

window.onload = ready;
// window.addEventListener('load', ready, false)