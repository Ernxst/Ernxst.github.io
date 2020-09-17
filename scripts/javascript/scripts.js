window.onload = function () {
    let url = window.location.href.toString()
    const header = document.getElementById("nav-buttons");

    let activeBtn = header.getElementsByClassName("active-item")[0];
    if (activeBtn && ! url.includes(activeBtn.id)) {
        activeBtn.className = "nav-item";
    }

    let btns = header.getElementsByClassName("nav-item");
    let activated = false

    for (let button of btns) {
        if (url.includes(button.id.toString())) {
            button.classList.add("active-item")
            activated = true
        }
        else {
            button.classList.remove("active-item")
        }
    }

    if (! activated) {
        let btn = document.getElementById("index.html");
        btn.className = "active-item"
    }
};