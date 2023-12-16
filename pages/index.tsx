import type { NextPage } from "next";
import Head from "next/head";
import Skeleton from "react-loading-skeleton";
import { useWeb3App } from "../hooks/web3";
import { appChain, getAddChainParameters } from "../chains";
import { Profile } from "../components/Profile";
import { SelectWallet } from "../components/SelectWallet";
import { SignIn } from "../components/SignIn";
import { EscrowCardLoader } from "../components/EscrowItem";
import { EscrowContext } from "../contexts/EscrowContext";
import { AllEscrows } from "../components/AllEscrows";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'next/future/image'
import LogoImage from "../images/logo-full.png"
import Container from 'react-bootstrap/Container';
import '@particle-network/connect-react-ui/dist/index.css';
import { ConnectButton } from '@particle-network/connect-react-ui';

const Index: NextPage = () => {
	const chain = getAddChainParameters(appChain);
	
	const { provider, address, ensName, ensAvatar, loading, isActive, escrowContract, tokenContract, logIn, logOut } = useWeb3App();

	return (
		<>
			<div>
				{isActive && (
						<div>
							{address ? (
								<>
									<EscrowContext.Provider value={{
											signerAddress: address,
											escrowContract,
											tokenContract,
											provider,
											ensName,
											ensAvatar
										}}>
											
											

										{[false, ].map((expand) => (
        <Navbar bg="light" data-bs-theme="light" key={"1"} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
			<Navbar.Brand style={{marginLeft:"10px"}} href="#">
					
						<Image className="logo" src={LogoImage} width={205} height={38} alt={process.env.NEXT_PUBLIC_APP_NAME??'EscrowHub'}/>
			
					
			</Navbar.Brand>
					<div style={{display:"flex"}}>
                
							<NavDropdown
								style={{marginTop:"5px", marginRight:"20px"}}							
								title="Account Details"
								id={`offcanvasNavbarDropdown-expand`}
							>
								<Profile logOut={ logOut } />

							</NavDropdown>
							<Navbar.Toggle aria-controls={ `offcanvasNavbar-expand-` } />
					</div>	
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
                
               
						 
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
     									 ))}
										
									</EscrowContext.Provider>
								</>
							) : <SignIn logIn={logIn}/>}
						</div>
					)}
			</div>
		<div className="container main" style={{maxWidth:'80%'}}>
			<Head>
				<title>{isActive ? "Your Escrows" : "Connect Wallet"}</title>
			</Head>
			
			{loading ? (
				<div className="row vh-100 justify-content-center align-items-center">
					<div className="col">
						<Skeleton className="mb-3"/>
						<div className="row justify-content-center align-items-center mt-4">
							{[...Array(4)].map((_, i) => (<div key={i} className="col-lg-3 col-md-4"><EscrowCardLoader/></div>))}
						</div>
					</div>
				</div>
			) : (
				<>
					{isActive || <SelectWallet/>}
					{isActive && (
						<div>
							{address ? (
								<>
									<EscrowContext.Provider value={{
											signerAddress: address,
											escrowContract,
											tokenContract,
											provider,
											ensName,
											ensAvatar
										}}>
										<div style={{marginTop:"50px"}}>
													
										</div>
										<AllEscrows/>
									</EscrowContext.Provider>
								</>
							) : <SignIn logIn={logIn}/>}
						</div>
					)}
				</>
			)}
		</div>
		</>
	);
};

export default Index;
