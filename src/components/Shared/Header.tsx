import React, { useState } from 'react'
import Button from '../Common/Button'
import './Header.css'
import axios from 'axios'
import { UrlBack } from '../../api/api'

import { useForm, SubmitHandler } from "react-hook-form";
import { FormLoginData, login } from '../../api/user'


const Header: React.FC = () => {
    const [showSlider, setShowSlider] = useState(false)

    const { register, handleSubmit, reset } = useForm<FormLoginData>();

    const handleLogin = async (data: FormLoginData) => {
        try {
            const response = await login(data)
            reset()
            sessionStorage.setItem('Token', response.token)
            if (response.patient) location.href = '/patient'
            else location.href = '/fisio'
        } catch (error) {
            console.log(error)
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
                    <form className='slider__form' onSubmit={handleSubmit(handleLogin)}>
                        <label htmlFor="email" className="slider__form-label">Email</label>
                        <input className="slider__form-input" type='text' id='email' {...register('email')} />
                        <label htmlFor="password" className="slider__form-label">Senha</label>
                        <input className="slider__form-input" type='password' id='password' {...register('password')} />
                        <a href="">Esqueceu sua senha ?</a>
                        <button type='submit'>Entrar</button>
                        <span title='Esconder menu' onClick={() => setShowSlider(false)}><i className="fa-solid fa-chevron-up"></i></span>
                    </form>
                </div>
            }
            <button title='Menu' className='header__btn-menu' onClick={() => setShowSlider(true)}><i className="fa-solid fa-bars"></i></button>
        </header>
    )
}

export default Header
