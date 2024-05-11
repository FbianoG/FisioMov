import './Button.css'

export default function Button({ data, func }) {

    return (
        <button className='main__button' onClick={() => func(true)}>{data.title}</button>
    )
}