import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Core/Navbar';
import { Router, useRoutes } from 'react-router-dom';
import history from './history';
import { useSelector } from 'react-redux';
import Login from './components/Core/Login';
import { getAuthentication } from './redux/slice/commonSlice';
import CoreService from './components/Core/CoreService';
import { Routes, Link, Route } from 'react-router-dom';
import ProtectedRoute from './protected-route';
import EmployeeList from './components/Employee/EmployeeList';
import { element } from 'prop-types';
import { EmojiPeople } from '@material-ui/icons';
import EmployeeServer from './components/Employee/EmployeeServer';
import EmployeeReactive from './components/Employee/EmployeeReactive';
import EmployeeDetails from './components/Employee/EmployeeDetails';

function App() {
  // let authenticated = useSelector(getAuthentication);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthenticated();
  }, [authenticated]);

  const checkAuthenticated = () => {
    setAuthenticated(CoreService.checkToken());
  }

  return (
    <Router history={history}>

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path='/' element={<ProtectedRoute><Navbar /></ProtectedRoute>} >
          <Route path='/employee' element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
          <Route path='/employeeserver' element={<ProtectedRoute><EmployeeServer /></ProtectedRoute>} />
          <Route path='/employeereactive' element={<ProtectedRoute><EmployeeReactive /></ProtectedRoute>} />
          <Route path='/employee-detail/:employeeId' element={<ProtectedRoute><EmployeeDetails /></ProtectedRoute>} />
        </Route>

      </Routes>
    </Router>
  );

  // const routes = useRoutes([
  //   {
  //     path: "/login",
  //     element: <Login></Login>
  //   },
  //   {
  //     path: "",
  //     element: <Navbar></Navbar>,
  //     children: [
  //       {
  //         path: "/employee",
  //         element: <EmployeeList></EmployeeList>
  //       },
  //     ]
  //   }
  // ])
}

export default App;
