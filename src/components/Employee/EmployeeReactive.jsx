import React, { useState, useEffect} from 'react';
import EmployeeService from '../../Services/EmployeeService';
import DataTable from 'react-data-table-component';
import CommonLoaderIcon from '../../CommonComponent/CommonLoader';
import Button from "@material-ui/core/Button";


function EmployeeReactive(props) {

    // const [state, setState] = useState({
    //     EmployeeList: [],
    //     modal: false,
    // });

    const [columns, setColumns] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getList();
        getColumns();
    }, []);

    const getColumns = () => {
        setColumns(EmployeeService.getEmployeeColumns());
    }

    const getList = () => {
        EmployeeService.getEmployeeList()
            .then(response => {
                setEmployeeList(response.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            })
    }

    // const addEmployee = (e) => {
    //     setState({ modal: true });
    // }


    return (
        <div>

            <DataTable
                title=""
                columns={columns}
                data={employeeList}
                pagination
                highlightOnHover
                progressPending={loading ? 'true' : false}
                progressComponent={<CommonLoaderIcon />}
                persistTableHead
            />

            <Button variant="contained">Add Employee</Button>


        </div>
    );

}
export default EmployeeReactive;