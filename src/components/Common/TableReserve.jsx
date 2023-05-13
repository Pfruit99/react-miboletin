import React from 'react';
import PropTypes from 'prop-types';
import {Table} from "reactstrap";
const TableReserve = ({
    reserves
  }) => {
    return (
        <div className="table-responsive">
            <Table className="table mb-0">
                <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Casino</th>
                    <th>Tipo de comida</th>
                    <th>Plato</th>
                </tr>
                </thead>
                <tbody>
                {
                    reserves.map((r, i) => (
                        <tr key={r.id} className={` ${r.guestId ? 'table-warning' : ''} `}>
                            <th scope="row">{i+1}</th>
                            <td>{r.casinoName}</td>
                            <td>{r.foodTypeName}</td>
                            <td>{r.menuName}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    );
};

TableReserve.propTypes = {
    reserves: PropTypes.any
};

export default TableReserve;
