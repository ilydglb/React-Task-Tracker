import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button';


//const deneme='DFKDDFFDS';



const Header = ({title, onAddBtn, showAdd}) => {
  return (
   
    <header className='header'> 
  
        <h1>{title}</h1>
        <Button  txt={showAdd?'Close':'Add'}  onClick={onAddBtn}/>
    </header>
  )
}
// Header.defaultProps = {
//     title:'Task Tracker',
  //bunun yerine App den Header içinde title gelirse o bunu override eder
//}

// Header.PropTypes = {    //App da Header a title olarak title={1} falan göndersek hata verir cünkü string bekliyor
//     title: PropTypes.string, //title: PropTypes.string.isRequired,

// }


   
// CSS in JS // tagler içine style={headingStyle}
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }
export default Header
