import React, { useState } from 'react';
import APIConfiguration from '../Services/APIService'
import ControllerName from '../Constants/global-constant';
import Button from "@material-ui/core/Button";

class EmployeeService {

    getEmployeeList() {
        return APIConfiguration.get("GetEmployeeListReact()", ControllerName.Employee);
    }

    saveEmployee(values) {
        return APIConfiguration.post("AddEditEmployee", ControllerName.Employee, values);
    }

    deleteEmployee(id) {
        return APIConfiguration.delete("DeleteEmployee(employeeId=" + id + ")", ControllerName.Employee);
    }


    getColumns = () => {
        let columnList = [];
        columnList = [
            { name: 'First Name', selector: 'FirstName', sortable: true, width:'150px', },
            { name: 'Last Name', selector: 'LastName', sortable: true, width:'150px', },
            { name: 'Age', selector: 'Age', sortable: true, width:'100px', },
            { name: 'Salary', selector: 'Salary', sortable: true, width:'150px', },
            { name: 'Address1', selector: 'Address1', sortable: true, width:'200px', },
            { name: 'Address2', selector: 'Address2', sortable: true, width:'200px', },
        ];
        return columnList;
    }


}
export default new EmployeeService();