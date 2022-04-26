import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  render() {
    return (
      <React.Fragment>
         <div>
          <Navbar dark expand="md">
            <div className="container">
              <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                  <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav navbar>
                      <NavItem>
                        <NavLink className="nav-link"  to='/Nhanvien'><span className="fa fa-users fa-lg"></span> Nhân Viên </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className="nav-link" to='/Phongban'><span className="fa fa-address-card fa-lg"></span> Phòng Ban</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink className="nav-link"  to='/Bangluong'><span className="fa fa-money fa-lg"></span> Bảng Lương</NavLink>
                      </NavItem>
                    </Nav>
                 </Collapse>
                </div>
            </Navbar>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;