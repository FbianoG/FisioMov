import { useState } from 'react'
import Button from '../Common/Button'
import './Header.css'
import axios from 'axios'
import { UrlBack } from '../../api/api'

interface FormLogin {
    email: string
    password: string
}

const Header = () => {

    const [showSlider, setShowSlider] = useState(false)


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const field = e.currentTarget as HTMLFormElement;
        const email = field.email.value
        const password = field.password.value
        try {
            const response = await axios.post(`${UrlBack}/login`, { email, password })
            sessionStorage.setItem('Token', response.data.token)
            if (response.data.patient) location.href = '/patient'
            else location.href = '/fisio'
        } catch (error: any) {
            if (error.response) console.log(error.response.data.message) // qualquer erro que volte com resposta do servidor
            else if (error.request) console.log('error de rede') // error de rede ou link inativo
            else console.log(error) // erro que não bata uma condição ex: sem token
        }
    }

    return (
        <header>
            <a href='/' className='header__logo'>FisioMov</a>
            <nav>
                <ul className="nav__list">
                    <li className="nav__item"><a href=''>Início</a></li>
                    <li className="nav__item"><a href=''>Sobre</a></li>
                    <li className="nav__item"><a href=''>Team</a></li>
                </ul>
            </nav>
            <div className="group__buttons">
                <Button text='Acessar' onclick={() => setShowSlider(!showSlider)} />
                <button className='main__button'>Registrar</button>
            </div>
            {showSlider &&
                <div className="slider">
                    <form className='slider__form' onSubmit={(e) => handleLogin(e)}>
                        <label htmlFor="email" className="slider__form-label">Email</label>
                        <input className="slider__form-input" type='text' name='email' id='email' />
                        <label htmlFor="password" className="slider__form-label">Senha</label>
                        <input className="slider__form-input" type='password' id='password' />
                        <a href="">Esqueceu sua senha ?</a>
                        <button type='submit'>Entrar</button>
                        <span title='Esconder menu' onClick={() => setShowSlider(false)}><i className="fa-solid fa-chevron-up"></i></span>
                    </form>
                </div>
            }

            <button title='Menu' className='header__btn-menu' onClick={() => setShowSlider(true)}><i className="fa-solid fa-bars"></i></button>
        </header >
    )
}

export default Header