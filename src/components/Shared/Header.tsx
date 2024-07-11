import React, { useState } from 'react'
import Button from '../Common/Button'
import './Header.css'
import axios from 'axios'
import { UrlBack } from '../../api/api'

import { useForm, SubmitHandler } from "react-hook-form";
import { FormLoginData, login } from '../../api/user'
import Slider from './Slider'


const Header: React.FC = () => {


    const [showSlider, setShowSlider] = useState(false)
    const [typeSlider, settypeSlider] = useState<'access' | 'register'>('access')


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
                <Button text='Acessar' onclick={() => { setShowSlider(true), settypeSlider('access') }} />
                <Button text='Registrar' onclick={() => { setShowSlider(true), settypeSlider('register') }} />
                {/* <button className='main__button' onclick={() => { setShowSlider(true), settypeSlider('register') }}>Registar</button> */}
            </div>
            <button title='Menu' className='header__btn-menu' onClick={() => setShowSlider(true)}><i className="fa-solid fa-bars"></i></button>
            {showSlider && <Slider type={typeSlider} onClick={() => setShowSlider(false)} />}
        </header>
    )
}

export default Header
