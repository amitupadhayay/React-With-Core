//import history from '../history';
import { createBrowserHistory } from 'history';

class RouterService {
     history = createBrowserHistory();
    navigateByUrl = (url) => {
        history.push(url);
    }
}

export default new RouterService();