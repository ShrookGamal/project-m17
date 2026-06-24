const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');
const body = document.body;

// وظيفة الفتح
openMenu.onclick = function() {
    sideMenu.classList.add('open');
    overlay.classList.add('show');
    body.classList.add('menu-open'); // منع التمرير في الخلفية
}

// وظيفة الإغلاق
function closeAll() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('show');
    body.classList.remove('menu-open'); // إعادة التمرير
}

closeMenu.onclick = closeAll;
overlay.onclick = closeAll;

// إغلاق المنيو عند الضغط على أي رابط بداخلها
const navLinks = document.querySelectorAll('.side-menu-links a');
navLinks.forEach(link => {
    link.onclick = closeAll;
});