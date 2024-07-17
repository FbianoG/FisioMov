import { useEffect } from 'react'
import './Toast.css'

interface ToastProps {
    text: string
    type: 'success' | 'error' | 'alert'
    onClick: () => void
}

const Toast: React.FC<ToastProps> = ({ text, type, onClick }) => {


    useEffect(() => {
        setTimeout(() => {
            onClick()
        }, 5000);
    }, [])


    return (
        <>
            <div className={`toast ${type}`}>
                {type === 'success' && <span>✅</span>}
                {type === 'error' && <span>⛔</span>}
                {/* {type === 'success' && <span></span>} */}
                <p>{text}</p>
                <button onClick={onClick}>❌</button>
            </div>
        </>

    )
}

export default Toast