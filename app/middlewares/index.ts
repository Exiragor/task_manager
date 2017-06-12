import { allowCrossDomain} from './crossDomain';
import {registration} from './registration';
import {checkToken} from './checkToken';

export let crossDomainMiddleware = allowCrossDomain;
export let registrationMiddleware = registration;
export let checkTokenMiddleware = checkToken;