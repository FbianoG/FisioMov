import { useState } from 'react'
import Button from '../Common/Button'
import './Header.css'

export default function Header() {

    const [showSlider, setShowSlider] = useState(false)




    return (
        <header>
            <h1 className='header__logo'>FisioMov</h1>
            <nav>
                <ul className="nav__list">
                    <li className="nav__item"><a href=''>Início</a></li>
                    <li className="nav__item"><a href=''>Sobre</a></li>
                    <li className="nav__item"><a href=''>Team</a></li>
                </ul>
            </nav>
            <div className="group__buttons">
                <Button data={{ title: 'Login' }} func={setShowSlider} />
                <Button data={{ title: 'Registrar' }} />
            </div>
            {showSlider &&
                <div div className="slider">
                    <form className='slider__form'>
                        <label htmlFor="email" className="slider__form-label">Email</label>
                        <input className="slider__form-input" type='text' id='email' />
                        <label htmlFor="password" className="slider__form-label">Senha</label>
                        <input className="slider__form-input" type='password' id='password' />
                        <a href="">Esqueceu sua senha ?</a>
                        <Button data={{ title: 'Entrar' }} />
                        <span onClick={() => setShowSlider(false)}><i className="fa-solid fa-chevron-up"></i></span>
                    </form>
                </div>
            }
        </header >
    )
}