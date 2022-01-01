import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './Navbar.css';
import '../../App.css'
import { IconContext } from 'react-icons';
import { Routes, Link, Route } from 'react-router-dom'
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//import Button from '@material-ui/core/Button';

import EmployeeList from '../Employee/EmployeeList';
import EmployeeServer from '../Employee/EmployeeServer';
import EmployeeReactive from '../Employee/EmployeeReactive';
import Login from './Login';
import { createBrowserHistory } from 'history';
import CoreService from './CoreService';
import RouteService from '../../Services/RouteService';
import EmployeeDetails from '../Employee/EmployeeDetails';
import { useNavigate } from 'react-router-dom';
import { getAuthentication, setAuthentication } from '../../redux/slice/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';


function Navbar(props) {

    const [sidebar, setSidebar] = useState(true);
    const [appList, setAppList] = useState([]);
    const [pageName, setPageName] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentUrl, setCurrentUrl] = useState('');

    const history = createBrowserHistory();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let authenticated = useSelector(getAuthentication);

    useEffect(() => {
        getAappMenuList();
        checkAuthenticated();
    }, []);

    useEffect(() => {
        getPageName(history.location.pathname);
    }, [history]);

    const checkAuthenticated = () => {
        authenticated = CoreService.checkToken();
        if (authenticated) {
            dispatch(setAuthentication(true));
        }
    }

    const getAappMenuList = () => {
        let menuList = [];
        menuList.push({ AppCode: "Dashboard", AppName: "Dashboard", url: "/dashboard", icon: <AiIcons.AiFillDashboard></AiIcons.AiFillDashboard> });
        menuList.push({ AppCode: "Employee", AppName: "Employee", url: "/employee", icon: <FaIcons.FaUserAlt></FaIcons.FaUserAlt> });
        menuList.push({ AppCode: "EmployeeServer", AppName: "Employee Server", url: "/employeeserver", icon: <FaIcons.FaUserShield></FaIcons.FaUserShield> });
        menuList.push({ AppCode: "EmployeeReactive", AppName: "Employee Reactive", url: "/employeereactive", icon: <FaIcons.FaUserGraduate></FaIcons.FaUserGraduate> });
        setAppList(menuList);
    }

    const showSidebar = () => {
        setSidebar(sidebar ? false : true);
    }

    const getPageName = (navUrl) => {
        // if (name === "/" || name === "/employee") {
        //     name = "Employee"
        // }
        // else if (name === "/employeeserver") {
        //     name = "Employee Server"
        // }
        // else if (name === "/employeereactive") {
        //     name = "Employee Reactive"
        // }
        // else {
        //     name = name.replace('/', '');
        // }
        let split = navUrl.split('/');
        let text = split.length > 0 ? '/' + split[1] : '';
        setCurrentUrl(text);
        let result = appList.find(x => x.url == text);
        setPageName(result != undefined ? result.AppName : '');;
    }

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = (event) => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        dispatch(setAuthentication(false));
        //RouteService.navigateByHistory(history, '/login');
        navigate('/login');
    };

    //history.listen((location, action) => {
    //console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
    //console.log(`The last navigation action was ${action}`);
    //getPageName(location.pathname);        
    //})

    const RedirectToPage = (url) => {
        navigate(url);
    }

    return (
        <div>
            {authenticated ?
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className="navbar full-width">
                        <div className='width-50'>
                            <Link to="#" className="menu-bars">
                                <FaIcons.FaBars onClick={showSidebar}></FaIcons.FaBars>
                                <span className='white-color'>REACT-DEMO</span>
                            </Link>
                        </div>
                        <div className='width-25'>
                            <span className='white-color toolbar-spacer text-center'>{pageName}</span>
                        </div>
                        <div className='width-25 text-right pr-16'>
                            <AiIcons.AiFillAccountBook onClick={handleProfileClick}></AiIcons.AiFillAccountBook>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
                                <MenuItem onClick={handleProfileClose}>
                                    <AiIcons.AiFillProfile></AiIcons.AiFillProfile>Profile
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <AiIcons.AiOutlineLogout></AiIcons.AiOutlineLogout>Logout
                                </MenuItem>
                            </Menu>

                        </div>

                    </div>

                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items'>
                            <li className='navbar-toggle' onClick={showSidebar}>
                                <Link to="#" className='menu-bars'>
                                    {/* <AiIcons.AiOutlineClose></AiIcons.AiOutlineClose> */}
                                    <FaIcons.FaBars onClick={showSidebar}></FaIcons.FaBars>
                                    <span className='white-color'>REACT-DEMO</span>
                                </Link>
                            </li>

                            {appList.map((item, index) => (
                                <li key={index} className={currentUrl === item.url ? 'nav-text nav-active' : 'nav-text'}
                                    onClick={() => RedirectToPage(item.url)}>
                                    {item.icon}
                                    <span className='white-color pointer'> {item.AppName} </span>
                                </li>
                            ))}

                        </ul>
                    </nav>

                    <main className={sidebar ? 'main-page ml-200' : 'main-page'}>
                        <Routes>
                            <Route exact path='/' element={<EmployeeList />}></Route>
                            <Route path='/employee' element={<EmployeeList />}></Route>
                            <Route path='/employeeserver' element={<EmployeeServer />}></Route>
                            <Route path='/employeereactive' element={<EmployeeReactive />}></Route>
                            <Route path='/employee/:employeeId' element={<EmployeeDetails />}></Route>
                        </Routes>

                    </main>

                </IconContext.Provider>
                :
                <Routes>
                    <Route exact path='/' element={<Login />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
            }
        </div>
    )
}

export default Navbar;

