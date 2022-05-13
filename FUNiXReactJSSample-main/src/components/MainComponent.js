import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Stafflist from './Stafflist';
import Staffdetail from './Staffdetail';
import Department from './Department';
import Salary from './Salary';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS
    };
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    var department = this.state.departments.find((item) => item.id == staff.department);
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff, department};
    this.setState({
      staffs: [...this.state.staffs, newStaff]
    });
  }

  render() {
    const StaffWithId = ({match}) => {
      return(
        <Staffdetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId))[0]}
        department = {this.state.departments.filter((department) => department.staddId === parseInt(match.params.staffId,10))}  
        />
      );
    };
    
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/Nhanvien" component={() => <Stafflist onAdd={this.addStaff} staffs={this.state.staffs} />} />
          <Route path="/Nhanvien/:staffId" component={StaffWithId} />
          <Route path="/Phongban" component={() => <Department dept={this.state.departments} />} />
          <Route path="/Bangluong" component={() => <Salary staffs={this.state.staffs} />} />
          <Redirect to="/Nhanvien"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;