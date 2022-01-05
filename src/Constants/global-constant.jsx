// export enum Controller{
//     Employee = 'Employee',
// }

class ControllerName {
    Employee = 'Employee/';
    Auth = 'Auth/';
}
export default new ControllerName();


export const GlobalVariable = {
    DecimalOnly: /[0-9]+(\.[0-9][0-9]?)?/,
    DecimalOnlyMsg: "The field should have decimal only",
}