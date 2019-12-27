import InitGallery from './gallery.js';
import { capitalizeFirstLetter } from '../../helpers';

let searchTerm = 'entertainment';
let pageTitle = capitalizeFirstLetter(searchTerm) + ' GIFs';

InitGallery(searchTerm, pageTitle);