function setActiveBtn() {
    let url = window.location.href
    const header = document.getElementById("nav");
    let activeBtn = header.getElementsByClassName("active-item")[0];
    if (activeBtn) {
        activeBtn.className = "nav-item";
    }
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
        for (let btn of btns) {
            if (btn.id === "index.html") {
                btn.className = "active-item"
            }
        }
    }
}

window.onload = function () {
    setActiveBtn();
};