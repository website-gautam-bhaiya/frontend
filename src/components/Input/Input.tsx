import { ReactNode, useState } from "react"   
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import './Input.css'

const Input = ({ children, isPassword, isDisabled }: {children: ReactNode, isPassword?: boolean, isDisabled?: boolean }) => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const [value, setValue] = useState<string>(''); 
    const [isRevealed, setIsRevealed] = useState<boolean>(false)

    const handleReveal = () => { 
        setIsRevealed(!isRevealed)
    }

    const icon = isRevealed ? <AiOutlineEyeInvisible /> : <AiOutlineEye/>

    return (    
        <div className="input--container">
            <input disabled = {isDisabled} type={`${isPassword && !isRevealed? 'password': ''}`} value={value} onChange={(e) => setValue(e.target.value)} className={isActive ? 'change-placeholder' : '' } onFocus={() => setIsActive(true)} onBlur={() => setIsActive(false)} placeholder = {`${children}`} />
            <label onClick={handleReveal}> {isPassword ? icon : ''} </label>
        </div>
    )
}

export default Input