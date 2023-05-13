import React from 'react';
import PropTypes from 'prop-types';
import {Table} from "reactstrap";

const TableConsumption = ({
    consumption
  }) => {
    console.log('consumption: ', consumption);
    return (
        <div className="table-responsive">
            <Table className="table mb-0">
                <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                </tr>
                </thead>
                <tbody>
                {
                    consumption.map((c, i) => (
                        <tr key={c.id} className={` ${c.hasReservation ? "text-black" : "text-white"}`} style={{
                            backgroundColor: c.hasReservation ? '#00e65c' : '#ff4d4d'
                        }}>
                            <th scope="row"><b>{i+1}</b></th>
                            <td><b>{c.EmployeeName}</b></td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    );
};

TableConsumption.propTypes = {
    consumption: PropTypes.any
};

export default TableConsumption;
