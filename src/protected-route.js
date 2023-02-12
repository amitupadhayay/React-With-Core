import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom";
import { getAuthentication } from '../src/redux/slice/commonSlice';
import CoreService from "./components/Core/CoreService";

const ProtectedRoute = ({children}) => {
    //let authenticated = useSelector(getAuthentication);
    let authenticated = CoreService.checkToken();
    let location = useLocation();

    if(!authenticated) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

 return children;

};

export default ProtectedRoute;