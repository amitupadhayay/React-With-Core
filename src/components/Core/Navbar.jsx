import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './Navbar.css'
import '../../App.css'
import { IconContext } from 'react-icons';
import { Router, Switch, Route, withRouter, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';

import EmployeeList from '../Employee/EmployeeList';
import EmployeeServer from '../Employee/EmployeeServer';
import EmployeeReactive from '../Employee/EmployeeReactive';
import Login from './Login';
import { createBrowserHistory } from 'history';
import CoreService from './CoreService';
import RouteService from '../../Services/RouteService';



function Navbar(props) {

    //const location = useLocation();
    const [sidebar, setSidebar] = useState(true);
    const [appList, setAppList] = useState([]);
    const [pageName, setPageName] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const history = createBrowserHistory();
    const location = useLocation();

    useEffect(() => {
        getAappMenuList();
        checkAuthenticated();
        console.log('handle route change here', location);
        getPageName(location.pathname);
    }, [location]);

    const checkAuthenticated = () => {
        let token = localStorage.getItem('token');
        setAuthenticated(CoreService.checkToken());
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
        setSidebar(!sidebar);
    }

    function setNavActive(url) {
        url = url.replace('/', '');
        let str = window.location.pathname.split('/');
        if (str[1] == url) {
            return 'nav-text nav-active';
        }
        else {
            return 'nav-text';
        }
    }

    const getPageName = (name) => {
        if (name == "/" || name == "/employee") {
            name = "Employee"
        }
        else if (name == "/employeeserver") {
            name = "Employee Server"
        }
        else if (name == "/employeereactive") {
            name = "Employee Reactive"
        }
        else {
            name = name.replace('/', '');
        }
        setPageName(name);
    }

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileClose = (event) => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        RouteService.navigate('login');
    };

    history.listen((location, action) => {
        //console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
        //console.log(`The last navigation action was ${action}`);
        //getPageName(location.pathname);
    })

    const RedirectToPage = (url) => {
        RouteService.navigateByHistory(history, url);
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
                                <li key={index} className={setNavActive(item.url)}>
                                    {/* <Link to={item.url}>
                                        {item.icon}
                                        <span>{item.AppName}</span>
                                    </Link> */}
                                    {item.icon}
                                    <span className='white-color pointer' onClick={() => RedirectToPage(item.url)}> {item.AppName} </span>
                                </li>
                            ))}

                        </ul>
                    </nav>

                    <main className={sidebar ? 'main-page ml-200' : 'main-page'}>
                        <Router history={history}>
                            <Switch>
                                <Route exact path='/' component={EmployeeList}></Route>
                                <Route exact path='/employee' component={EmployeeList}></Route>
                                <Route exact path='/employeeserver' component={EmployeeServer}></Route>
                                <Route exact path='/employeereactive' component={EmployeeReactive}></Route>
                            </Switch>
                        </Router>
                    </main>

                </IconContext.Provider>

                :
                <Router history={history}>
                    <Switch>
                        <Route exact path='/' component={Login}></Route>
                        <Route exact path='/login' component={Login}></Route>
                    </Switch>
                </Router>
            }
        </div>
    )
}

export default withRouter(Navbar);
