import React from 'react'
import './Footer.css'
import instagram from './instagram.png'
import facebook from './facebook.png'
import tiktok from './tik-tok.png'
import youtube from './youtube.png'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo"></h1>
        <div className='copy'>
            <p>Copyright &copy; #</p>
        </div>
      </div>
      <ul className="footer__nav">
        <li className="nav__item">
          <ul className="nav__ul">
            <li>
              <a href="#">Email: #</a>
            </li>
            <li>
              <a href="#">Tel.: #</a>
            </li>
          </ul>
        </li>
        <li className="nav__item">
          <ul className="nav__ul">
            <li className='icons'>
              <img src={instagram} alt='Instagram'/>
              <img src={facebook} alt='Facebook'/>
              <img src={tiktok} alt='TikTok'/>
              <img src={youtube} alt='Youtube'/>
            </li>
          </ul>
        </li>
      </ul>
</footer>
  )
}

export default Footer