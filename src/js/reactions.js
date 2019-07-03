const gallery = require('./components/gallery.js');
const utils = require('./components/utils.js');

let searchTerm = 'reactions';
let featuredTerm = utils.GetQueryVariable('featured');
let pageTitle = featuredTerm != undefined ? utils.CapitalizeFirstLetter(featuredTerm) : 'Reaction GIFs';

gallery.Init(searchTerm, pageTitle, false, featuredTerm);