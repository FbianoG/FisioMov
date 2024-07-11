import { UserData } from '../../interface/interface'
import './SideBar.css'


interface SideBarProps {
    user: UserData | undefined
}

const SideBar: React.FC<SideBarProps> = ({ user }) => {


    const verifyLinkActive = (href: string) => {
        if (location.pathname === href) return 'active'
    }



    return (
        <div className="sideBar">
            <h1>FisioMov</h1>

            {!user?.isPacient &&
                <ul className="sideBar__list">
                    <a href='/fisio' className={verifyLinkActive('/fisio')}>Pacientes</a >
                    <a href='/activities' className={verifyLinkActive('/activities')}>Atividades</a>
                    <a href='/dashboard' className={verifyLinkActive('/dashboard')}>Dashboard</a>
                    <a href='' className={verifyLinkActive('/')}>Configurações</a>
                    <a href='/'>Sair</a>
                </ul>
            }
            {user?.isPacient &&
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
            {innerWidth < 1100 &&
                <button title='Mostrar barra lateral' className="sideBar__btn">
                    ☰
                </button>
            }
        </div>
    )
}

export default SideBar