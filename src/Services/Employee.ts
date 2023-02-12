import APIConfiguration from '../Services/APIService';
import { toast } from 'react-toastify';


export const getAllEmployeeList = async () => {
    return await APIConfiguration.get("GetEmployeeList()");
}

export const fetchEmployees = async () => {
    return await APIConfiguration.get("GetEmployeeList()");
}

// export const crudEmployee = async (values: any) => {
//     return APIConfiguration.post("AddEditEmployee", values);
// }

export const crudEmployee = async (formData: any) => {
    const response = await APIConfiguration.post("AddEditEmployee", formData);
    toast.success(`Employee ${formData.Id === null ? 'added' : 'updated'} successfully`);
    return response;
}