// Fixed nav parameters
let navbarCollapseWidth = 1170;    // Lg
const nav = document.querySelector('nav');
const navSearch = nav.querySelector('.navbar-search');
const distToTop = navSearch.offsetTop;

window.addEventListener('scroll', stickNavbarToTop);

// Hovering window parameters
const dropdownTrigger = document.querySelector('.nav-item-trigger');
const dropdownWindow = document.querySelector('.menu-dropdown');

dropdownTrigger.addEventListener('mouseenter', handleTriggerEnter);
dropdownTrigger.addEventListener('mouseleave', handleTriggerLeave);


function stickNavbarToTop() {
    let offsetFromTop = 0;
    if (window.scrollY >= distToTop + offsetFromTop) {
        if (window.innerWidth >= navbarCollapseWidth) {
            document.body.style['padding-top'] = `${nav.offsetHeight - distToTop}px`;
        }
        else {
            document.body.style['padding-top'] = `0px`;
        }

        nav.classList.add('fixed-nav');
    }
    else {
        document.body.style['padding-top'] = `0px`;
        nav.classList.remove('fixed-nav');
    }
}

function handleTriggerEnter(e) {
    dropdownWindow.classList.add('active');

    let arrowXPos = (this.offsetLeft - dropdownWindow.clientWidth / 2) + (this.clientWidth / 2) - 13;
    let arrow = dropdownWindow.querySelector('.arrow');
    arrow.style.setProperty('transform', `translate(${arrowXPos}px, -50%) rotate(45deg)`);
}

function handleTriggerLeave(e) {
    dropdownWindow.classList.remove('active');
}