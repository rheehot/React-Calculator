import React from 'react';
import PropTypes from 'prop-types';

const Tr = ({ cols, handler }) => {

  return (
    <div className="calculator__panel-row">
      {cols.map((data, idx) => 
        <div 
        className="calculator__panel-button" 
        onClick={() => handler(data)} 
        key={cols.toString() + idx}>
          {data}
        </div>)}
    </div>
  )
};

Tr.propTypes = {
  cols: PropTypes.array.isRequired,
  handler: PropTypes.func.isRequired,
};

export default Tr;