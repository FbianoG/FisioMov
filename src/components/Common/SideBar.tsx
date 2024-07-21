import { useState } from 'react'
import { UserData } from '../../interface/interface'
import './SideBar.css'


interface SideBarProps {
    user: UserData | undefined
}

const SideBar: React.FC<SideBarProps> = ({ user }) => {


    const verifyLinkActive = (href: string) => {
        if (location.pathname === href) return 'active'
    }

    const [show, setShow] = useState<boolean>(false)

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    return (
        <>
            {show && <div className="backdrop" onClick={handleClose}></div>}
            {innerWidth < 1100 && <button title='Mostrar menu' className="sideBar__btn" onClick={handleShow}>☰</button>}
            <div className="sideBar" style={show ? { transform: 'translate(0)' } : {}}>
                <h1>FisioMov</h1>
                {!user?.isPatient &&
                    <nav className="sideBar__list">
                        <a href='/fisio' className={verifyLinkActive('/fisio')}>Pacientes</a >
                        <a href='/activities' className={verifyLinkActive('/activities')}>Atividades</a>
                        <a href='/dashboard' className={verifyLinkActive('/dashboard')}>Dashboard</a>
                        <a href='' className={verifyLinkActive('/')}>Configurações</a>
                        <a href='/'>Sair</a>
                    </nav>
                }
                {user?.isPatient &&
                    <ul className="sideBar__list">
                        <a href='/patient' className={verifyLinkActive('/patient')}>Atividades</a>
                        <a href='' className={verifyLinkActive('/config')}>Configurações</a>
                        <a href='/'>Sair</a>
                    </ul>
                }
                <div className="userItem">
                    <img src={user?.src} alt='foto perfil' />
                    <div className="userItem__data">
                        <p>{user?.name.split(' ').slice(0, 1)} {user?.name.split(' ').slice(1, 2).join('').slice(0, 1)}.</p>
                        <span>{user?.email}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideBar