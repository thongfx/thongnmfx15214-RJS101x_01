import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Stafflist from './StafflistComponent';
import Staffdetail from './StaffdetailComponent';
import Department from './Department';
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
    const StaffWithId = ({ match }) => {
      return(
        <Staffdetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}   
        />
      );
    };
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/Nhanvien" component={() => <Stafflist staffs={this.state.staffs} />} />
        <Route path="/Nhanvien/:staffID" component={StaffWithId} />
        <Route path="/Phongban" component={() => <Department dept={this.state.departments} />} />
        <Redirect to="/Nhanvien"/>
      </Switch>
      <Footer />
    </div>
  );
}
}

export default Main;