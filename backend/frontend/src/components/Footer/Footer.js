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
              <a href="mailto:smt@email.com">Email: smt@email.com</a>
            </li>
            <li>
              <a href="tel:123456789">Tel.: 123456789</a>
            </li>
          </ul>
        </li>
        <li className="nav__item">
          <ul className="nav__ul">
            <li className='icons'>
              <a href='https://instagram.com/'><img src={instagram} alt='Instagram'/></a>
              <a href='https://facebook.com/'><img src={facebook} alt='Facebook'/></a>
              <a href='https://tiktok.com/'><img src={tiktok} alt='TikTok'/></a>
              <a href='https://youtube.com/'><img src={youtube} alt='Youtube'/></a>
            </li>
          </ul>
        </li>
      </ul>
</footer>
  )
}

export default Footer