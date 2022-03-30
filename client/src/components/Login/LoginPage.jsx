import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFailure = (result) => {
    alert(result);
  }

  const handleLogin = async (googleData) => {
    let token = {
      token: googleData.tokenId
    }
    try{
      const response = await axios.post('https://covid-19-dashboard-mern.herokuapp.com/api/google-login', token);

      dispatch({type: 'ADD_USER_VIA_GOOGLE', payload: response.data});

      navigate('/dashboard');
    }
    catch(error){
      console.error(error.message);
    }

  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <img src={window.location.origin + '/opslyftLoginPageLogo.png'} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
