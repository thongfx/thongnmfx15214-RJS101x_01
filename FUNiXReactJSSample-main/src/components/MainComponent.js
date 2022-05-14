import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Stafflist from './Stafflist';
import Staffdetail from './Staffdetail';
import Department from './Department';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: ""
    }

    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    var department = this.props.departments.find((item) => item.id == staff.department);
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff, department};
    this.setState({
      staffs: [...this.props.staffs, newStaff]
    });
  }

  render() {
    const StaffWithId = ({match}) => {
      return(
        <Staffdetail staff={this.props.staffs.filter((staff) => staff.id === parseInt(match.params.staffId))[0]}
        department = {this.props.departments.filter((department) => department.staddId === parseInt(match.params.staffId,10))}  
        />
      );
    };
    
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/Nhanvien" component={() => <Stafflist onAdd={this.addStaff} staffs={this.props.staffs} />} />
          <Route path="/Nhanvien/:staffId" component={StaffWithId} />
          <Route path="/Phongban" component={() => <Department dept={this.props.departments} />} />
          <Route path="/Bangluong" component={() => <Salary staffs={this.props.staffs} />} />
          <Redirect to="/Nhanvien"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));