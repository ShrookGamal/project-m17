// 1. سحب الهيدر والفوتر
async function loadLayout() {
    try {
        const hRes = await fetch('header.html');
        if (hRes.ok) {
            document.getElementById('header-placeholder').innerHTML = await hRes.text();
            // تشغيل الأكتف لينك فوراً بعد ما الهيدر يركب
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

// 2. تحديد اللينك النشط (Active)
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

// 3. مراقب النقرات (فتح وقفل المنيو + الفيديو)
document.addEventListener('click', function (e) {
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');

    // فتح المنيو
    if (e.target.closest('#openMenu')) {
        sideMenu.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('menu-open');
    }

    // إغلاق المنيو (X أو برا المنيو أو لينك)
    if (e.target.closest('#closeMenu') || e.target.closest('#overlay') || e.target.closest('.side-menu-links a')) {
        if (sideMenu) sideMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
        document.body.classList.remove('menu-open');
    }

    // تشغيل الفيديو
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

// تشغيل عند التحميل
loadLayout();