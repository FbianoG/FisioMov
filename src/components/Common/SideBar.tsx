import { UserData } from '../../interface/interface'
import './SideBar.css'


interface SideBarProps {
    user: UserData | undefined
}

const SideBar: React.FC<SideBarProps> = ({ user }) => {

    return (
        <div className="sideBar">
            <h1>FisioMov</h1>

            {!user?.isPacient &&
                <ul className="sideBar__list">
                    <a href='' className='active'>Pacientes</a>
                    <a href=''>Atividades</a>
                    <a href=''>Dashboard</a>
                    <a href=''>Configurações</a>
                    <a href='/'>Sair</a>
                </ul>
            }
            {user?.isPacient &&
                <ul className="sideBar__list">
                    <a href='' className='active'>Atividades</a>
                    <a href=''>Configurações</a>
                    <a href='/'>Sair</a>
                </ul>
            }
            <div className="userItem">
                <img src={user?.src} alt='' />
                <div className="userItem__data">
                    <p>{user?.name.split(' ').slice(0, 1)} {user?.name.split(' ').slice(1, 2).join('').slice(0, 1)}.</p>
                    <span>{user?.email}</span>
                </div>
            </div>
        </div>
    )
}

export default SideBar