import React, { useState, useEffect } from 'react';
import './Navbar.css'
import '../../App.css'
import { useLocation } from 'react-router-dom';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from '@material-ui/core/Button';

// import EmployeeList from '../Employee/EmployeeList';
// import EmployeeServer from '../Employee/EmployeeServer';
// import EmployeeReactive from '../Employee/EmployeeReactive';
// import Login from './Login';
import { createBrowserHistory } from 'history';
import CoreService from './CoreService';
import RouteService from '../../Services/RouteService';

import { People, PeopleAlt,PeopleAltOutlined,PeopleAltRounded } from '@material-ui/icons';



function Sidenav(props) {

    const [sidebar, setSidebar] = useState(true);
    const [appList, setAppList] = useState([]);
    const [pageName, setPageName] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const history = createBrowserHistory();
    //const location = useLocation();

    useEffect(() => {
        getAappMenuList();
        checkAuthenticated();
        console.log('handle route change here', location);
        //getPageName(location.pathname);
    }, []);

    const checkAuthenticated = () => {
        let token = localStorage.getItem('token');
        setAuthenticated(CoreService.checkToken());
    }

    const getAappMenuList = () => {
        let menuList = [];
        menuList.push({ AppCode: "Dashboard", AppName: "Dashboard", url: "/dashboard", icon: <People></People> });
        menuList.push({ AppCode: "Employee", AppName: "Employee", url: "/employee", icon: <PeopleAlt></PeopleAlt> });
        menuList.push({ AppCode: "EmployeeServer", AppName: "Employee Server", url: "/employeeserver", icon: <PeopleAltRounded></PeopleAltRounded> });
        menuList.push({ AppCode: "EmployeeReactive", AppName: "Employee Reactive", url: "/employeereactive", icon: <PeopleAltOutlined></PeopleAltOutlined> });
        setAppList(menuList);
    }

    const showSidebar = () => {
        setSidebar(!sidebar);
    }

    function setNavActive(url) {
        // url = url.replace('/', '');
        // let str = window.location.pathname.split('/');
        // if (str[1] == url) {
        //     return 'nav-text nav-active';
        // }
        // else {
        //     return 'nav-text';
        //}
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

    const RedirectToPage = (url) => {
        debugger;
        RouteService.navigateByHistory(props, url);
    }

    return (
        <div style={{ width: 240 }}>
            {/* <Toggle
                onChange={setExpanded}
                checked={expanded}
                checkedChildren="Expand"
                unCheckedChildren="Collapse"
            />
            <hr />
            <Sidenav
                expanded={expanded}
                defaultOpenKeys={['3', '4']}
                activeKey={activeKey}
                onSelect={setActiveKey}>

                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" icon={<Dashboard />}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<Group />}>
                            User Group
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav> */}
        </div>
    )
}

export default Sidenav;
