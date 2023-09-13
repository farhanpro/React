import React, { Component } from 'react';


class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {employees: []};
  }

   componentDidMount() {
    // Fetch data from the API when the component mounts
    fetch('https://dummy.restapiexample.com/api/v1/employees')
    .then((response) => response.json())
    .then((data) => {
      this.setState({ employees: data.data });
    })
    .catch((error) => console.error('Error fetching data:', error));
  }


  render() {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.employee_name}</td>
                <td>{employee.employee_salary}</td>
                <td>{employee.employee_age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeTable;
