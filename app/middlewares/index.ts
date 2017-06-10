import { allowCrossDomain} from './crossDomain';
import {registration} from './registration';

export let crossDomainMiddleware = allowCrossDomain;
export let registrationMiddleware = registration;
