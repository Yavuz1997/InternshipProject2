import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form, FormControl} from 'react-bootstrap'
import {Snackbar,IconButton} from '@mui/material'

export class EditEmpModal extends Component {
  constructor(props){
    super(props);
    this.state=({
      deps:[],
      mans:[],
      snackbaropen:false,
      snackbarmsg:''
    })
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  snackbarClose = () => 
  {
    this.setState({
      snackbaropen:false
    });
  }

  componentDidMount() { 
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
   }

  handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:54682/api/employee', {
      method:'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        EmployeeID:e.target.EmployeeID.value,
        EmployeeName:e.target.EmployeeName.value,
        Department:e.target.Department.value,
        MailID:e.target.MailID.value,
        DOJ:e.target.DOJ.value,
        ManagerID:e.target.Manager.value
      })
    })
    .then(res => res.json())
      .then((result) => 
      {
        this.setState({
          snackbaropen:true,
          snackbarmsg:result
        });
      },
      (error) =>
      {
        this.setState({
          snackbaropen:true,
          snackbarmsg:'Failed'
        });
      }
      );
    
  }
  render() {
    return (
      <div className='container'>
        <Snackbar
        anchorOrigin={{vertical:'top',horizontal:'center'}}
        open={this.state.snackbaropen}
        autoHideDuration={3000}
        onClose={this.snackbarClose}
        message= {<span id="message-id">{this.state.snackbarmsg}</span>}
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose} >x</IconButton>
        ]}
        />
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm="6">
                <Form onSubmit={this.handleSubmit} >
                  <Form.Group>
                    <Form.Label>
                      Employee ID
                    </Form.Label>
                    <FormControl 
                    type="text" 
                    name="EmployeeID" 
                    required 
                    disabled
                    defaultValue={this.props.empid}
                    placeholder='Employee ID' 
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Employee Name
                    </Form.Label>
                    <Form.Control 
                    type="text" 
                    name="EmployeeName" 
                    required 
                    defaultValue={this.props.empname}
                    placeholder='Employee Name' 
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>
                      Department
                    </Form.Label>
                    <FormControl as="select" className='form-select' name="Department"  defaultValue={this.props.empdep}>
                      {this.state.deps.map(dep => 
                        <option key={dep.DepartmentID} value={dep.DepartmentName} >{dep.DepartmentName}</option>  
                      )}
                    </FormControl>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      Mail
                    </Form.Label>
                    <Form.Control 
                    type="text" 
                    name="MailID" 
                    required 
                    defaultValue={this.props.empmail}
                    placeholder='Mail' 
                    />
                  </Form.Group>
                  <Form.Group className='mb-2'>
                    <Form.Label>
                      Manager
                    </Form.Label>
                    <FormControl as="select" className='form-select' name="Manager" defaultValue={this.props.empman} >
                    <option key={0} value={0} >No Manager</option>
                      {this.state.mans.map(man => 
                        <option key={man.ID} value={man.ID} >{man.ManagerName}</option>  
                      )}
                    </FormControl>
                  </Form.Group>
                  
                  {console.log(this.props.empman)}
                  <Form.Group>
                    <Form.Label>
                      Join Date
                    </Form.Label>
                    <Form.Control 
                    type="date" 
                    name="DOJ" 
                    required 
                    defaultValue={this.props.empdoj}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit" className='mt-3' >
                      Update
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
