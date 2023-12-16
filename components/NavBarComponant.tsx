import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'next/future/image'
import LogoImage from "../images/logo-full.png"




export class NavBarComponant extends Component {
  static propTypes = {}

    
    
    render ()
    {
      	

    return (
        <>
        	{/* <Navbar bg="light" data-bs-theme="light" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
				<Navbar.Text>
					Signed in as: <a href="#login">Mark Otto</a>
				</Navbar.Text>
				</Navbar.Collapse>
			</Container>
			</Navbar> */}
									
							

			{[false, ].map((expand) => (
        <Navbar bg="light" data-bs-theme="light" key={"1"} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
                    <Image className="logo" src={LogoImage} width={205} height={38} alt={process.env.NEXT_PUBLIC_APP_NAME??'EscrowHub'}/>

            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-`}
              aria-labelledby={`offcanvasNavbarLabel-expand-`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav style={{marginLeft:"20px"}} className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

        </>
    )
  }
}

export default NavBarComponant