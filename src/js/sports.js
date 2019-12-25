import InitGallery from './components/gallery.js';
const utils = require('./components/utils.js');

let searchTerm = 'sports';
let pageTitle = utils.CapitalizeFirstLetter(searchTerm) + ' GIFs';

InitGallery(searchTerm, pageTitle);