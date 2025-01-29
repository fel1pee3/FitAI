import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RxEyeOpen } from "react-icons/rx";
import { LuEyeClosed } from "react-icons/lu";
import style from "./Register.module.css"

const Register = () => {

    const [values, setVAlues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    
    const navigate = useNavigate()
    
    const handleChanges = (e) => {
        setVAlues({...values, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await axios.post('http://localhost:3000/auth/register', values)
        if(response.status === 201){
        navigate('/login')
        }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={style.register}>
            <div className={style.registerContainer}>
                <form onSubmit={handleSubmit} className={style.registerForm}>
                    <div className={style.caixaInput}>
                        <label className={style.label}>Email</label>
                        <input required className={style.registerInput} type="email" placeholder='email@gmail.com' name='email' autoComplete="username" onChange={handleChanges}/>
                    </div>
                    <div className={style.caixaInput}>
                        <label className={style.label}>Senha</label>
                        <div className={style.containerInput}>
                            <input required className={style.registerInput} type={showPassword ? "text" : "password"} placeholder='Senha123@' name='password' autoComplete="new-password" onChange={handleChanges}/>
                            <button className={style.btnEye} type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? <RxEyeOpen /> : <LuEyeClosed /> }
                            </button>
                        </div>
                    </div>
                    <div className={style.caixaInput}>
                        <label className={style.label}>Nome de Usuário</label>
                        <input required className={style.registerInput} type="text" placeholder='Felipe Maia' name='username' onChange={handleChanges}/>
                    </div>
                    <button className={style.btnCad}>Cadastrar</button>
                </form>
                <div className={style.registerLogin}>
                    <p>Já tem conta?</p>
                    <Link to='/Login' className={style.link}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register