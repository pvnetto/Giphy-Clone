import InitGallery from './gallery';
import { getQueryVariable, capitalizeFirstLetter } from '../../helpers';

let searchTerm = 'reactions';
let featuredTerm = getQueryVariable('featured');
let pageTitle = featuredTerm != undefined ? capitalizeFirstLetter(featuredTerm) : 'Reaction GIFs';

InitGallery(searchTerm, pageTitle, false, featuredTerm);