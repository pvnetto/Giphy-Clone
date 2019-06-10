// Fixed nav parameters
const nav = document.querySelector('nav');
const nav_search = nav.querySelector('.navbar-search');
const dist_to_top = nav_search.offsetTop;

window.addEventListener('scroll', FixNavBar);

// Hovering window parameters
const dropdown_trigger = document.querySelector('.nav-item-trigger');
const dropdown_window = document.querySelector('.menu-dropdown');

dropdown_trigger.addEventListener('mouseenter', HandleTriggerEnter);
dropdown_trigger.addEventListener('mouseleave', HandleTriggerLeave);


function FixNavBar() {
    if (window.scrollY >= dist_to_top) {
        document.body.style['padding-top'] = `${nav.offsetHeight - dist_to_top}px`;
        nav.classList.add('fixed-nav');
    }
    else {
        document.body.style['padding-top'] = `0px`;
        nav.classList.remove('fixed-nav');
    }
}

function HandleTriggerEnter(e) {
    dropdown_window.classList.add('active');

    let trigger_coords = this.getBoundingClientRect();
    let nav_coords = nav.getBoundingClientRect();

    let coords = {
        top: (dropdown_window.clientHeight / 2) + 10,
        left: trigger_coords.left - nav_coords.left - (dropdown_window.clientWidth / 2) + (trigger_coords.width / 2)
    };

    dropdown_window.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function HandleTriggerLeave(e) {
    dropdown_window.classList.remove('active');
}