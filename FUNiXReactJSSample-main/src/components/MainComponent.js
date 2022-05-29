import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Stafflist from './Stafflist';
import Staffdetail from './Staffdetail';
import Department from './Department';
import Departmentdetail from './Departmentdetail';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, patchStaff, deleteStaff, fetchStaffs, fetchDepartment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    department: state.department
  }
}
const mapDispatchToProps = dispatch => ({
    fetchStaffs: () => {dispatch(fetchStaffs())},
    fetchDepartment: () => dispatch(fetchDepartment()),  
    postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),
    patchStaff: (staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(patchStaff(staffId, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),
    deleteStaff: (staffid) => dispatch(deleteStaff(staffid)),
});
  
class Main extends Component {
  
    componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartment();
  }

  render() {
    const StaffWithId = ({ match }) => {
      return(
        <Staffdetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
          department={this.props.department.department}
          patchStaff={this.props.patchStaff}
          deleteStaff={this.props.deleteStaff}
        />
      );
    };
    const DepartmentWithId = ({ match }) => {
      return( 
        <Departmentdetail department={this.props.department.department.find((department) => department.id === match.params.departmentId)}
          staffs={this.props.staffs.staffs}
        />
      );
    };
    
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/Nhanvien" component={() =>
            <Stafflist
              staffs={this.props.staffs} 
              isLoading={this.props.staffs.isLoading}
              errMess={this.props.staffs.errMess}
              postStaff={this.props.postStaff}
          />} />
          <Route path="/Nhanvien/:staffId" component={StaffWithId} />
          <Route exact path="/Phongban" component={() =>
            <Department
              department={this.props.department}
              isLoading={this.props.department.isLoading}
              errMess={this.props.department.errMess}
          />} />
          <Route path="/Phongban/:departmentId" component={DepartmentWithId} />
          <Route path="/Bangluong" component={() => <Salary
            staffs={this.props.staffs}
            isLoading={this.props.staffs.isLoading}
            errMess={this.props.staffs.errMess}/>} />
          <Redirect to="/Nhanvien"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));