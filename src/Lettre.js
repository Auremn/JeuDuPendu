import React from 'react'
import PropTypes from 'prop-types'
import './Lettre.css'

const Lettre = ({ letter, onClick, index }) => (
    <div className="Clavar" onClick={ () => onClick(index)}>
        <span className="letter">
            {letter}
        </span>
    </div>

)

Lettre.propTypes = {
    letter: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
}

export default Lettre