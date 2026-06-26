async function loadLayout() {
    try {
        const hRes = await fetch('header.html');
        if (hRes.ok) {
            document.getElementById('header-placeholder').innerHTML = await hRes.text();
            setActiveLink();
        }

        const fRes = await fetch('footer.html');
        if (fRes.ok) {
            document.getElementById('footer-placeholder').innerHTML = await fRes.text();
        }
    } catch (e) {
        console.error("Layout Load Error: ", e);
    }
}
function setActiveLink() {
    let path = window.location.pathname.split("/").pop();
    if (path === "" || path === "/") path = "index.html";

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
document.addEventListener('click', function (e) {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    if (e.target.closest('#openMenu')) {
        sideMenu.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('menu-open');
    }
    if (e.target.closest('#closeMenu') || e.target.closest('#overlay') || e.target.closest('.side-menu-links a')) {
        if (sideMenu) sideMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        document.body.classList.remove('menu-open');
    }
    if (e.target.closest('#videoWrapper')) {
        const video = document.getElementById('mainVideo');
        const wrapper = document.getElementById('videoWrapper');
        if (video.paused) {
            video.play();
            video.controls = true;
            wrapper.classList.add('playing');
        } else {
            video.pause();
        }
    }
});
loadLayout();