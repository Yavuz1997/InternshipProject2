import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form, FormControl} from 'react-bootstrap'
import {Snackbar,IconButton} from '@mui/material'

export class AddEditModal extends Component {
    constructor(props){
        super(props);
        this.state=({
          snackbaropen:false,
          snackbarmsg:'',
          addEdit:0
        })
        this.handleSubmitAdd=this.handleSubmitAdd.bind(this);
        this.handleSubmitEdit=this.handleSubmitEdit.bind(this);
        this.getModal=this.getModal.bind(this);
      }
    
      snackbarClose = () => 
      {
        this.setState({
          snackbaropen:false
        });
      }
      getModal(){
        if(this.props.add === true){
            return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Manager
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm="6">
                    <Form onSubmit={this.handleSubmitAdd} >
                      <Form.Group>
                        <Form.Label>
                          Manager Name
                        </Form.Label>
                        <FormControl type="text" name="ManagerName" required placeholder='Manager Name' />
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
            );
        }else{
            return(
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Update Manager
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                    <Col sm="6">
                        <Form onSubmit={this.handleSubmitEdit} >
                        <Form.Group>
                            <Form.Label>
                            Manager ID
                            </Form.Label>
                            <FormControl 
                            type="text" 
                            name="ID" 
                            required 
                            disabled
                            defaultValue={this.props.ManID}
                            placeholder='Manager ID' 
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                            Manager Name
                            </Form.Label>
                            <Form.Control 
                            type="text" 
                            name="ManagerName" 
                            required 
                            defaultValue={this.props.ManName}
                            placeholder='Manager Name' 
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
            )
        }
      }
    
      handleSubmitAdd(e){
        e.preventDefault();
        fetch('http://localhost:54682/api/manager', {
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            ManagerID:null,
            ManagerName:e.target.ManagerName.value,
            EmployeeCount:null
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

      handleSubmitEdit(e){
        e.preventDefault();
        fetch('http://localhost:54682/api/manager', {
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            ID:e.target.ID.value,
            ManagerName:e.target.ManagerName.value
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
            {this.getModal()}
          </div>
        )
      }
}
