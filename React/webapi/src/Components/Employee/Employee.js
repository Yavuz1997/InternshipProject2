import React, { Component } from 'react'
import {Table} from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';
import {Button, ButtonToolbar, Container} from 'react-bootstrap';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export class Employee extends Component {
  constructor(props){
    super(props);
    this.state={
        emps:[],
        addModalShow:false,
        editModalShow:false
    }
}
  componentDidMount() { 
    this.refreshlist();
  }
  componentDidUpdate(){
    this.refreshlist();
  }
  refreshlist(){
    fetch('http://localhost:54682/api/employee')
        .then((response) => {
        return response.json();
    })
    .then((data) => {
        this.setState(
            {
                emps:data
            }
        )
    });
  }

  deleteEmp(EmpID){
    if(window.confirm('Are you sure?')){
        fetch('http://localhost:54682/api/employee/' + EmpID,
        {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        });
    }

  }
  render() {
    const{emps,EmpID,EmpName,EmpDep,EmpMail,EmpDOJ} = this.state;
    return (
      <Container>
        <Table className='mt-4' striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Mail</th>
                    <th>DOJ</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    emps.map(emp => 
                        <tr key={emp.EmployeeID}>
                            <td className='align-middle' >{emp.EmployeeID}</td>
                            <td className='align-middle' >{emp.EmployeeName}</td>
                            <td className='align-middle' >{emp.Department}</td>
                            <td className='align-middle' >{emp.MailID}</td>
                            <td className='align-middle' >{emp.DOJ}</td>
                            <td className='align-middle' >
                                <ButtonToolbar className='d-flex justify-content-around'>
                                    <Button variant='success' size='sm' onClick={() => {this.setState(
                                        {
                                            editModalShow:true,
                                            EmpID:emp.EmployeeID,
                                            EmpName:emp.EmployeeName,
                                            EmpDep:emp.Department,
                                            EmpMail:emp.MailID,
                                            EmpDOJ:emp.DOJ
                                        })}} >
                                        Edit
                                        <ModeEditOutlineOutlinedIcon className='ms-2'/>
                                    </Button>
                                    <Button variant="danger" size='sm' onClick={() => this.deleteEmp(emp.EmployeeID)}>
                                        Delete
                                        <DeleteIcon className='ms-2'/>
                                    </Button>
                                    <EditEmpModal
                                    show={this.state.editModalShow}
                                    onHide={() => this.setState({editModalShow:false})}
                                    EmpID={EmpID}
                                    EmpName={EmpName}
                                    EmpDep={EmpDep}
                                    EmpMail={EmpMail}
                                    EmpDOJ={EmpDOJ}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )
                }

            </tbody>

        </Table>
        <ButtonToolbar>
            <Button onClick={() => this.setState({addModalShow:true})} >
                Add Employee
            </Button>
        </ButtonToolbar>
        <AddEmpModal show={this.state.addModalShow} onHide={() => this.setState({addModalShow:false})} />
      </Container>
    )
  }
}
