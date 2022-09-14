import React, { Component } from 'react'
import {Table} from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import { EditEmpModal } from './EditEmpModal';
import {Button, ButtonToolbar, Container} from 'react-bootstrap';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import {Form, FormControl} from 'react-bootstrap';

export class Employee extends Component {
  constructor(props){
    super(props);
    this.state={
        emps:[],
        mans:[],
        subs:[],
        deps:[],
        filteredSubs:[],
        addModalShow:false,
        editModalShow:false,
        depSelect:false
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.hasDepartment=this.hasDepartment.bind(this);
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
    fetch('http://localhost:54682/api/manager')
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        this.setState(
            {
                mans:data
            }
        )
    });
    fetch('http://localhost:54682/api/subdepartment')
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        this.setState(
            {
                subs:data
            }
        )
    });
    fetch('http://localhost:54682/api/department')
    .then((response) => {
    return response.json();
    })
    .then((data) => {
        this.setState(
            {
                deps:data
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

  getManagerNameFromID(mans,ManagerID){
    if (ManagerID === 0){
        return "No Manager";
    }
   var manager = mans.find(man => man.ID === ManagerID);
   if( manager !== undefined)
    return manager.ManagerName;
  }

  getSubNameFromID(subs,SubID){
    if (SubID === 0){
        return "";
    }
   var subdep = subs.find(sub => sub.ID === SubID);
   if( subdep !== undefined)
    return "/"+subdep.SubName;
  }

  handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:54682/api/employee', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        EmployeeID:null,
        EmployeeName:e.target.EmployeeName.value,
        Department:e.target.Department.value,
        MailID:e.target.MailID.value,
        SubID:e.target.Subdepartment.value,
        DOJ:e.target.DOJ.value,
        ManagerID:e.target.Manager.value

      })
    })
  }

  hasDepartment(e){
    if(e.target.value !== "0"){
      this.setState({depSelect:true});
    }
      
    if(e.target.value === "0"){
      this.setState({depSelect:false});
    }
    var depID = this.state.deps.find(dep => dep.DepartmentName === e.target.value).DepartmentID;
    this.setState({filteredSubs:this.state.subs.filter(sub => sub.DepartmentID === depID)})
    console.log(this.state.filteredSubs)
    
  }
  
  render() {
    const{emps,subs,mans,EmpID,EmpName,EmpDep,EmpMail,EmpDOJ,EmpMan} = this.state;
    return (
      <Container class="container-fluid">
        <Table className='mt-4' striped bordered hover size='   '>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Mail</th>
                    <th>Manager</th>
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
                            <td className='align-middle' >{emp.Department}{this.getSubNameFromID(subs,emp.SubID)}</td>
                            <td className='align-middle' >{emp.MailID}</td>
                            <td className='align-middle' >{this.getManagerNameFromID(mans,emp.ManagerID)}</td>
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
                                            EmpDOJ:emp.DOJ,
                                            EmpMan:emp.ManagerID
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
                                    empid={EmpID}
                                    empname={EmpName}
                                    empdep={EmpDep}
                                    empmail={EmpMail}
                                    empdoj={EmpDOJ}
                                    empman={EmpMan}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )
                }
                <tr>
                    <td className='align-middle' >
                        +
                    </td>
                    <td className='align-middle' >
                        <Form id="addEmp" onSubmit={this.handleSubmit}></Form>
                        <Form.Group >
                            <FormControl type="text" name="EmployeeName" required placeholder='Employee Name' form="addEmp"/>
                        </Form.Group>
                    </td>
                    <td className='align-middle d-flex justify-content-around' style={{"width" : "290px"}} >
                        <Form.Group className='me-1'>
                            <FormControl as="select" className='form-select' name="Department" defaultValue={"0"} form="addEmp"  onChange={this.hasDepartment}>
                            <option key={0} value={"0"} >No Department</option>  
                            {this.state.deps.map(dep => 
                                <option key={dep.DepartmentID} value={dep.DepartmentName} >{dep.DepartmentName}</option>  
                            )}
                            </FormControl>
                        </Form.Group>
                        <Form.Group  hidden={this.state.depSelect === false}>
                            <FormControl as="select" className='form-select' name="Subdepartment" defaultValue={0} form="addEmp">
                            <option key={0} value={0} >No Sub-department</option>  
                            {this.state.filteredSubs.map(sub => 
                                <option key={sub.ID} value={sub.ID} >{sub.SubName}</option>  
                            )}
                            </FormControl>
                        </Form.Group>
                    </td>
                    <td className='align-middle' >
                        <Form.Group >
                            <FormControl type="text" name="MailID" required placeholder='Mail' form="addEmp" />
                        </Form.Group>          
                    </td>
                    <td className='align-middle' >
                        <Form.Group >
                            <FormControl as="select" className='form-select' name="Manager" form="addEmp">
                            <option key={0} value={0} >No Manager</option>
                            {this.state.mans.map(man => 
                                <option key={man.ID} value={man.ID} >{man.ManagerName}</option>  
                            )}
                            </FormControl>
                        </Form.Group>          
                    </td>
                    <td className='align-middle' >
                        <Form.Group >
                            <FormControl type="date" name="DOJ" required form="addEmp"/>
                        </Form.Group>
                    </td>
                    <td className='align-middle' >
                        <Form.Group>
                            <Button variant="primary" type="submit" form="addEmp" >
                            Add
                            </Button>
                        </Form.Group>
                    </td>
                </tr>
            </tbody>

        </Table>
      </Container>
    )
  }
}
