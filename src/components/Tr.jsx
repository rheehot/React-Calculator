import React from 'react';
import PropTypes from 'prop-types';

const Tr = ({ cols, handler }) => {

  return (
    <tr>
      {cols.map((data, idx) => 
        <td onClick={() => handler(data)} key={cols.toString() + idx}>{data}</td>)}
    </tr>
  )
};

Tr.propTypes = {
  cols: PropTypes.array.isRequired
};

export default Tr;