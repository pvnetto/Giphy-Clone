import InitGallery from './components/gallery.js';
import { capitalizeFirstLetter } from './components/helpers';

let searchTerm = 'entertainment';
let pageTitle = capitalizeFirstLetter(searchTerm) + ' GIFs';

InitGallery(searchTerm, pageTitle);