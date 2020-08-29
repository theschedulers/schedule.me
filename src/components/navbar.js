import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './navbar.css';

export default function SiteNavbar(props) {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  return (
    <div>
      <Navbar color="dark" dark>
        <NavbarBrand href="/" className="mr-auto">
          <div className="title-text">page-title</div>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">
                <div className="list-text">Home</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/other-page/">
                <div className="list-text">Other Page</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/blog-page/">
                <div className="list-text">Blog Page</div>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
