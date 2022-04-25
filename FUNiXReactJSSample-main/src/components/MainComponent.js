import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Stafflist from './StafflistComponent';
import Staffdetail from './StaffdetailComponent';
import Salary from './SalaryComponent';
import { STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
    };
  }


  render() {
     const HomePage = () => {
       return (
         <Stafflist/>
      );
    }
    const StaffWithId = ({match}) => {
      return(
          <Staffdetail dish= {this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments = {this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact path='/menu' component={() => <Stafflist staffs={this.state.staffs} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;