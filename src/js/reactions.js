import InitGallery from './components/gallery';
import { getQueryVariable, capitalizeFirstLetter } from './components/helpers';

let searchTerm = 'reactions';
let featuredTerm = getQueryVariable('featured');
let pageTitle = featuredTerm != undefined ? capitalizeFirstLetter(featuredTerm) : 'Reaction GIFs';

InitGallery(searchTerm, pageTitle, false, featuredTerm);