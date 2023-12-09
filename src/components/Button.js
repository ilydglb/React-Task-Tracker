import PropTypes from 'prop-types'

const Button = ({colr,txt, onClick}) => {
  return (
  
  <button className='btn' 

  onClick={onClick}
  >
    {txt}
  </button>
)
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
  //  onClick: PropTypes.func,
 }

export default Button
