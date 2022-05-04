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
          <Route exact path="/Nhanvien" component={() => <Stafflist staffs={this.state.staffs} />} />
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