function setActiveBtn() {
    const header = document.getElementById("nav");
    let activeBtn = header.getElementsByClassName("active-item")[0];
    if (activeBtn) {
        activeBtn.className = "nav-item";
    }
    let url = window.location.href
    const btns = header.getElementsByClassName("nav-item");
    for (let btn of btns) {
        let className;
        if (url.includes(btn.id)) {
            className = "active-item";
        }
        else {
            className = "nav-item"
        }
        btn.className = className
    }
    if (! (url.includes("html"))) {
        let btn = document.getElementById("index.html");
        btn.className = "active-item"
    }
}

window.onload = function () {
    setActiveBtn();
};