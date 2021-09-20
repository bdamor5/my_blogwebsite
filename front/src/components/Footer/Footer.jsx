import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div>
         <footer className='ftr'>
            <p className='cpy mx-auto my-auto'>Copyright &copy; <span style={{color:"#2AA2F9"}}>Kangaes</span> </p>
            <i className="far fa-arrow-alt-circle-up top my-auto" onClick={() => document.documentElement.scrollTop = 0}></i>
            <span className='top-text my-auto'>Top</span>
         </footer>   
        </div>
    )
}

export default Footer
