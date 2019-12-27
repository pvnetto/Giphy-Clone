import InitGallery from './gallery';
import { capitalizeFirstLetter } from '../../helpers';

let searchTerm = 'sports';
let pageTitle = capitalizeFirstLetter(searchTerm) + ' GIFs';

InitGallery(searchTerm, pageTitle);