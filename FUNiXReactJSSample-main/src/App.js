import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Dsnhanvien from './components/Dsnhanvien';
import Thongtinnv from './components/Thongtinnv';
import './App.css';
class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <Menu />
      </div>
    );
  }
}

export default App;