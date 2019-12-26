import InitGallery from './components/gallery.js';
import { capitalizeFirstLetter } from './components/helpers';

let searchTerm = 'sports';
let pageTitle = capitalizeFirstLetter(searchTerm) + ' GIFs';

InitGallery(searchTerm, pageTitle);