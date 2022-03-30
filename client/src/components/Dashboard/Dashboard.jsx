import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import NavBar from './Navbar';
import TableComponent from './TableComponent';
import ModalComponent from './Modal/ModalComponent';

function Dashboard(){

  const [tableData, setTableData] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [currElemState, setCurrElemState] = useState({});

  const user = useSelector((state) => state.userReducers);

  const getCountries = async () => {
    try{
      let response = await axios.get(`https://api.covid19api.com/summary`);
      setTableData(response.data.Countries);
    }
    catch(error){
      console.error(error.message);
    }
  }

  useEffect(() => {
    getCountries();
  },[])

  const toastError = () => toast.error("Oops!!! Country not found.");

  const handleSearch = () => {
    let result = tableData.filter(data => data.Country.toLowerCase() === searchCountry.toLowerCase());
    if(result.length !== 0){
      setCurrElemState(result[0]);
      setModalShow(true);
    }
    if(result.length === 0){
      setCurrElemState({});
      toastError();
    }
  }

  return (
    <>
      <NavBar />
      <Container fluid>
        <Row>
          <Col className="adjust-intro">
            <span className='make-bold'>Welcome, {user.name} to our Covid 19 Dashboard.</span>
          </Col>
        </Row>
        <Row>
          <Col className="adjust-graphs">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Country Name"
                aria-label="Country Name"
                aria-describedby="country-name"
                onChange={(event) => setSearchCountry(event.target.value)}
              />
            <Button variant="outline-secondary" onClick={handleSearch}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <TableComponent data={tableData}/>
        <ModalComponent show={modalShow} data={currElemState} onHide={() => setModalShow(false)} />
        <ToastContainer />
      </Container>
    </>
  )
}

export default Dashboard;
