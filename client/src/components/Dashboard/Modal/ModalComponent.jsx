import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Container, Col, Row, Modal } from 'react-bootstrap';
import Line_Chart from './../Charts/lineChart';
import Pie_Chart from './../Charts/PieChart';
import './../../css/styles.css';

function ModalComponent(props) {

  let data = props.data;

  const [monthCountrydata, setMonthCountrydata] = useState([]);

  const getMonthCountryData = async () => {
    let curr_date = new Date();
    let prior_date = new Date().setDate(curr_date.getDate() - 30);
    prior_date = new Date(prior_date);
    prior_date = prior_date.toISOString();
    curr_date = curr_date.toISOString();

    try{
      let response = await axios.get(`https://api.covid19api.com/country/${data.Slug}?from=${prior_date}&to=${curr_date}`);
      setMonthCountrydata(response.data);
    }
    catch(error){
      console.error(error.message);
    }
  }

  useEffect(() => {
    if(data !== {}){
      getMonthCountryData();
    }
  },[data])

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {data.Country} COVID-19 Data
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={4} lg={4}>
              <span className="make-bold"> Confirmed: </span> <span style={{color: '#0088FE'}}> {data.TotalConfirmed} </span>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <span className="make-bold"> Deceased: </span> <span style={{color: '#FF8042'}}> {data.TotalDeaths} </span>
            </Col>
            <Col xs={12} md={4} lg={4}>
              <span className="make-bold"> Recovered: </span> <span style={{color: '#00C49F'}}> {data.TotalRecovered} </span>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row>
            <Col xs={12} md={12} lg={12}>
              <Line_Chart data={monthCountrydata} />
            </Col>
            <Col xs={12} md={12} lg={12}>
              <Pie_Chart data={monthCountrydata} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ModalComponent;
