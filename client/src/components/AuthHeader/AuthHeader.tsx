import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  link: string;
  link_text: string;
}

const AuthHeader = ({link, link_text}: Props) => {
  return (
    <header className="text-center">
        <div className="container d-flex justify-content-between align-items-center">
        <div className="logo lh-1">UTODO</div>
        <div>
            <Link to={link} className="btn btn-sm theme-button">{link_text}</Link>
        </div>
        </div>
  </header>
  )
}

export default AuthHeader