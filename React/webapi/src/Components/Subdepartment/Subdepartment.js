import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {AddEditModal} from './AddEditModal'
import {Button, ButtonToolbar, Container} from 'react-bootstrap';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export class Subdepartment extends Component {
    constructor(props){
        super(props);
        this.state={
            subs:[],
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
    deleteSub(SubID){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:54682/api/subdepartment/' + SubID,
            {
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            });
        }

    }
    getDepartment(deps,DepartmentID){
        if (DepartmentID === 0){
            return "No Department";
        }
       var department = deps.find(dep => dep.DepartmentID === DepartmentID);
       if( department !== undefined)
        return department.DepartmentName;
    }
  render() {
    const{subs,deps,SubID,SubName,DepID} = this.state;
    return (
        
        <Container>
            <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department</th>
                        <th>Subdepartment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subs.map(sub => 
                            <tr key={sub.ID}>
                                <td className='align-middle' >{sub.ID}</td>
                                <td className='align-middle' >{this.getDepartment(deps,sub.DepartmentID)}</td>
                                <td className='align-middle' >{sub.SubName}</td>
                                <td className='align-middle' >
                                    <ButtonToolbar className='d-flex justify-content-around'>
                                        <Button variant='success' size='sm' onClick={() => {this.setState(
                                            {
                                                editModalShow:true,
                                                SubID:sub.ID,
                                                SubName:sub.SubName,
                                                DepID:sub.DepartmentID
                                            })}} >
                                            Edit
                                            <ModeEditOutlineOutlinedIcon className='ms-2'/>
                                        </Button>
                                        <Button variant="danger" size='sm' onClick={() => this.deleteSub(sub.ID)}>
                                            Delete
                                            <DeleteIcon className='ms-2'/>
                                        </Button>
                                        <AddEditModal
                                        show={this.state.editModalShow}
                                        onHide={() => this.setState({editModalShow:false})}
                                        subid={SubID}
                                        subname={SubName}
                                        depid={DepID}
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
                    Add Subdepartment
                </Button>
            </ButtonToolbar>
            <AddEditModal show={this.state.addModalShow} onHide={() => this.setState({addModalShow:false})} add={true} />
        </Container>
    )
  }
}
