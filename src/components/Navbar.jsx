import React, {useContext, useState} from 'react'
import {Modal, Button, Dropdown, Form, Row, Col} from 'react-bootstrap';
import {ThemeContextConsumer} from '../context/themer';
import {AuthContext, AuthProvider} from '../context/auth'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default function NavBar(props) {

    const [authStat, setAuthStat] = useState({
        signedIn: false,
        emailAddr: null
    });
    
    const [showLogIn, setShowLogIn] = useState(false);
    const toggleLogIn = () => setShowLogIn(!showLogIn);

    const [showSignUp, setShowSignUp] = useState(false);
    const toggleSignUp = () => setShowSignUp(!showSignUp);

    const [validated, setValidated] = useState(false);
    const [emailAddr, setEmailAddr] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confpass, setConfPass] = useState("");
    const [job, setJob] = useState("");

    const handleSignInSubmit = (event) => {
        /* const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            setValidated(true);
            setAuthStat({
                signedIn: true,
                emailAddr: emailAddr
            })

            axios({
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type" : "application/json"
                },
                data: {
                    "emailAddr": emailAddr,
                    "password": password
                },
                url: "http://localhost:5000/signin",
            })
            .then((response) => {
                console.log(response);
                localStorage.setItem('usertoken', response.data)
            })
            .catch((err) => console.log(err));

            toggleLogIn();
            
        } */
        event.preventDefault();
    };

    const handleSignUpSubmit = (event) => {
       /*  const form = event.currentTarget;
        const validator = form.checkValidity();
        if(validator && (password === confpass)){
            setValidated(true);
            axios({
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type" : "application/json"
                },
                data: {
                    "email": emailAddr,
                    "name": name,
                    "password": password,
                    "profession": job
                },
                url: "http://localhost:5000/signin",
            })
            .then((response) => {
                console.log(response);
                toggleSignUp();
            })
            .catch((err) => console.log(err));
        } */
        event.preventDefault();
    }

    const logOut = () => {
        setAuthStat({
            signedIn: false,
            emailAddr: null
        })
        setValidated(false);
    }

    return(
        <ThemeContextConsumer>
            {(context)=> (
                <div>
                <nav className={"navbar justify-content-between fixed-top text-" + (context.dark ? 'light' : 'dark')}>
                <span className="navbar-brand mb-0 h1">CLASP</span>
                <Dropdown>
                <Dropdown.Toggle variant={"outline-" + (context.dark ? 'light' : 'dark')} id="dropdown-basic"></Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            authStat.signedIn ? 
                            <>
                            <Dropdown.Item> 
                                <h1 className="display-4">{authStat.emailAddr}</h1>
                            </Dropdown.Item>
                            <Dropdown.Item>My Summaries</Dropdown.Item>
                            <Dropdown.Item>My Queries</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item> 
                            </>
                            :
                            <>
                            <Dropdown.Item onClick={toggleLogIn}>Sign In</Dropdown.Item>
                            <Dropdown.Item onClick={toggleSignUp}>Sign Up</Dropdown.Item>
                            </>
                        }
                        <Dropdown.Divider />
                        
                        <Link to = '/' style={{ textDecoration: 'none', color: 'black' }}>
                        <Dropdown.Item as = "button">
                            Home
                        </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={context.toggleTheme}>
                            Dark Mode <FontAwesomeIcon icon = {(context.dark ? faToggleOn : faToggleOff)}/>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </nav>

            <Modal show={showLogIn} onHide={toggleLogIn} size="sm" centered>
                <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSignInSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control 
                            type="email" 
                            placeholder="Email Address" 
                            onChange={(e)=>{
                                setEmailAddr(e.target.value)
                            }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control 
                        type="password"
                        placeholder="Password" 
                        onChange = {(e) => {
                            setPassword(e.target.value)
                        }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                        Sign In
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>

            <Modal show = {showSignUp} onHide = {toggleSignUp} size="sm" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate onSubmit={handleSignUpSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control 
                                type="email" 
                                placeholder="Email Address"
                                onChange = {(e)=>setEmailAddr(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicText">
                            <Form.Control 
                                type="text" 
                                placeholder="Name"
                                onChange = {(e)=>setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control 
                            type="password"
                            placeholder="Password"
                            onChange = {(e)=>setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Control 
                            type="password"
                            placeholder="Confirm Password"
                            onChange = {(e)=>setConfPass(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Control 
                                as="select" 
                                onChange = {(e)=>setJob(e.target.value)}
                                custom>
                                    <option selected disabled>Select Profession</option>
                                    <option value = "student">Student</option>
                                    <option value = "student">Teacher</option>
                                    <option value = "student">Researcher</option>
                                    <option value = "student">Other</option>
                                </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" block>
                            Sign Up
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            </div>
            )}
        </ThemeContextConsumer>
    );
}
