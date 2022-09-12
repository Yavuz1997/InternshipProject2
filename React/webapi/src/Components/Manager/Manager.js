import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {AddEditModal} from './AddEditModal'
import {Button, ButtonToolbar, Container} from 'react-bootstrap';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export class Manager extends Component {
    constructor(props){
        super(props);
        this.state={
            man:[],
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
        fetch('http://localhost:54682/api/manager')
            .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState(
                {
                    man:data
                }
            )
        });

    }
    deleteDep(ManID){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:54682/api/manager/' + ManID,
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
    const{man,ManID,ManName} = this.state;
    return (
        
        <Container>
            <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Manager ID</th>
                        <th>Manager Name</th>
                        <th>Employee Count</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        man.map(man => 
                            <tr key={man.ID}>
                                <td className='align-middle' >{man.ID}</td>
                                <td className='align-middle' >{man.ManagerName}</td>
                                <td className='align-middle' >{man.EmployeeCount}</td>
                                <td className='align-middle' >
                                    <ButtonToolbar className='d-flex justify-content-around'>
                                        <Button variant='success' size='sm' onClick={() => {this.setState(
                                            {
                                                editModalShow:true,
                                                ManID:man.ID,
                                                ManName:man.ManagerName
                                            })}} >
                                            Edit
                                            <ModeEditOutlineOutlinedIcon className='ms-2'/>
                                        </Button>
                                        <Button variant="danger" size='sm' onClick={() => this.deleteDep(man.ID)}>
                                            Delete
                                            <DeleteIcon className='ms-2'/>
                                        </Button>
                                        <AddEditModal
                                        show={this.state.editModalShow}
                                        onHide={() => this.setState({editModalShow:false})}
                                        ManID={ManID}
                                        ManName={ManName}
                                        add={false}   
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
                    Add Manager
                </Button>
            </ButtonToolbar>
            <AddEditModal show={this.state.addModalShow} onHide={() => this.setState({addModalShow:false})} add={true} />
        </Container>
    )
  }
}