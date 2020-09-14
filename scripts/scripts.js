function setActiveBtn() {
    let splitURL = window.location.href.split("/")
    let activePage = splitURL[splitURL.length - 1];
    const header = document.getElementById("nav");
    const btns = header.getElementsByClassName("nav-item");
    for (let btn of btns) {
        btn.className = "nav-item"
    }
    document.getElementById(activePage).className = "active-item";
}

window.onload = function () {
    setActiveBtn();
};