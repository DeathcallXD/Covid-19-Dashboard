import React, { useState } from 'react';
import ModalComponent from './Modal/ModalComponent';
import '../css/styles.css';

function TableComponenet(props) {

  let data = props.data;

  const [modalShow, setModalShow] = useState(false);
  const [currElemState, setCurrElemState] = useState({});

  const ModalShow = (currElem) => {
    if(currElem === {}){
      return;
    }
    setModalShow(true);
    setCurrElemState(currElem);
  }

  return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Country</th>
              <th>Confirmed</th>
              <th>Recovered</th>
              <th>Deceased</th>
            </tr>
          </thead>
          <tbody>

            {
              data.map((currElem, idx) => {
                return(
                  <tr key={idx} onClick={() => ModalShow(currElem)} className="clickable">
                    <td>{currElem.Country}</td>
                    <td>{currElem.TotalConfirmed}</td>
                    <td>{currElem.TotalRecovered}</td>
                    <td>{currElem.TotalDeaths}</td>
                  </tr>
                )
              })
            }

            <ModalComponent show={modalShow} data={currElemState} onHide={() => setModalShow(false)} />

          </tbody>
        </table>
      </div>
  );
}

export default TableComponenet;
