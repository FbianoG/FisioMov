import './Button.css'


interface ButtonProps {
    text: string
    onclick: any
}

const Button: React.FC<ButtonProps> = ({ text, onclick }) => {

    return (
        <button className='main__button' onClick={onclick}>{text}</button>
    )
}

export default Button