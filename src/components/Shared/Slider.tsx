import { useState } from 'react';
import './Slider.css'
import { useForm, SubmitHandler } from "react-hook-form";
import { createUser, FormLoginData, FormRegisterData, login } from '../../api/user';


interface SliderProps {
    type: 'access' | 'register'
    onClick: () => void
}

const Slider: React.FC<SliderProps> = ({ type, onClick }) => {

    const { register, handleSubmit, reset } = useForm<FormRegisterData | FormLoginData>();
    const [access, setAccess] = useState<boolean>(false)


    const handleLogin = async (data: FormLoginData) => {
        setAccess(true)
        try {
            const response = await login(data)
            reset()
            sessionStorage.setItem('Token', response.token)
            if (response.patient) location.href = '/patient'
            else location.href = '/fisio'
        } catch (error) {
            console.log(error)
        } finally {
            setAccess(false)
        }
    }

    const handleRegister = async (data) => {
        setAccess(true)
        try {
            const response = await createUser(data)
            reset()
        } catch (error) {
            console.log(error)
        } finally {
            setAccess(false)
        }
    }

    return (
        <div className="slider">
            {type === 'access' &&
                <form className='slider__form' onSubmit={handleSubmit(handleLogin)}>
                    <h3>Login</h3>
                    <label htmlFor="email" className="slider__form-label">Email</label>
                    <input className="slider__form-input" type='email' id='email' placeholder='babi@gmail.com' {...register('email', { required: true })} required />
                    <label htmlFor="password" className="slider__form-label">Senha</label>
                    <input className="slider__form-input" type='password' id='password' placeholder='123' {...register('password', { required: true })} required />
                    <a href="">Esqueceu sua senha?</a>
                    {access ? <button type='submit' disabled>
                        Acessando
                        <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </button>
                        :
                        <button type='submit'>Entrar</button>
                    }
                    <span title='Esconder menu' onClick={onClick}><i className="fa-solid fa-chevron-up"></i></span>
                </form>
            }

            {type === 'register' &&
                <form className='slider__form' onSubmit={handleSubmit(handleRegister)}>
                    <h3>Registro</h3>
                    <label htmlFor="email" className="slider__form-label">Email</label>
                    <input className="slider__form-input" type='email' id='email' {...register('email', { required: true })} required />
                    <label htmlFor="name" className="slider__form-label">Nome Completo</label>
                    <input className="slider__form-input" type='text' id='name' {...register('name', { required: true })} required />
                    <label htmlFor="password" className="slider__form-label">Senha</label>
                    <input className="slider__form-input" type='password' id='password' {...register('password', { required: true })} required />
                    <label htmlFor="nasc" className="slider__form-label">Data de Nascimento</label>
                    <input className="slider__form-input" type='date' id='nasc' {...register('nasc', { required: true })} required />
                    {/* <label htmlFor="src" className="slider__form-label">Foto de Perfil</label> */}
                    {/* <input className="slider__form-input" type='file' id='src' {...register('src')} /> */}
                    <br />
                    {access ? <button type='submit' disabled>
                        Cadastrando
                        <div className="loading">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </button>
                        :
                        <button type='submit'>Criar Cadastro</button>
                    }
                    <span title='Esconder menu' onClick={onClick}><i className="fa-solid fa-chevron-up"></i></span>
                </form>
            }
        </div>
    )
}

export default Slider