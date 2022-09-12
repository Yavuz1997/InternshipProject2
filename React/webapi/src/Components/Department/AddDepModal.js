import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form, FormControl} from 'react-bootstrap'
import {Snackbar,IconButton} from '@mui/material'

export class AddDepModal extends Component {
  constructor(props){
    super(props);
    this.state=({
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

  handleSubmit(e){
    e.preventDefault();
    fetch('http://localhost:54682/api/department', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        DepartmentID:null,
        DepartmentName:e.target.DepartmentName.value
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
              Add Department
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm="6">
                <Form onSubmit={this.handleSubmit} >
                  <Form.Group>
                    <Form.Label>
                      Department Name
                    </Form.Label>
                    <FormControl type="text" name="DepartmentName" required placeholder='Department Name' />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit" className='mt-3' >
                      Add
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
