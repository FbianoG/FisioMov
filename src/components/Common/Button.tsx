import './Button.css'


interface ButtonProps {
    text: string
    onclick?: () => void
    outline?: any
    type: 'button' | 'submit'
    disabled?: any
}

const Button: React.FC<ButtonProps> = ({ text, onclick, outline, type, disabled }) => {

    console.log(outline)

    return (
        <>
            {outline && <button id='outline__button' type={type} onClick={onclick}>{text}</button>}
            {!outline && !disabled && <button className='main__button' type={type} onClick={onclick}>{text}</button>}
            {disabled && <button className='disabled' disabled>{text}</button>}
        </>
    )
}

export default Button