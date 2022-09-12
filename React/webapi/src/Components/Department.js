import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';
import {Button, ButtonToolbar, Container} from 'react-bootstrap';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export class Department extends Component {
    constructor(props){
        super(props);
        this.state={
            deps:[],
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
    deleteDep(DepID){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:54682/api/department/' + DepID,
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
    const{deps,DepID,DepName} = this.state;
    return (
        
        <Container>
            <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Department Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        deps.map(dep => 
                            <tr key={dep.DepartmentID}>
                                <td className='align-middle' >{dep.DepartmentID}</td>
                                <td className='align-middle' >{dep.DepartmentName}</td>
                                <td className='align-middle' >
                                    <ButtonToolbar className='d-flex justify-content-around'>
                                        <Button variant='success' size='sm' onClick={() => {this.setState(
                                            {
                                                editModalShow:true,
                                                DepID:dep.DepartmentID,
                                                DepName:dep.DepartmentName
                                            })}} >
                                            Edit
                                            <ModeEditOutlineOutlinedIcon className='ms-2'/>
                                        </Button>
                                        <Button variant="danger" size='sm' onClick={() => this.deleteDep(dep.DepartmentID)}>
                                            Delete
                                            <DeleteIcon className='ms-2'/>
                                        </Button>
                                        <EditDepModal
                                        show={this.state.editModalShow}
                                        onHide={() => this.setState({editModalShow:false})}
                                        DepID={DepID}
                                        DepName={DepName}
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
                    Add Department
                </Button>
            </ButtonToolbar>
            <AddDepModal show={this.state.addModalShow} onHide={() => this.setState({addModalShow:false})} />
        </Container>
    )
  }
}
