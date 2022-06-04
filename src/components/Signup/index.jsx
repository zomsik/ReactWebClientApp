import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import { createNotification } from "../notifications"
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Signup = () => {
    const [data, setData] = useState({
        login: "",
        email: "",
        password: "",
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "https://expressapp.azurewebsites.net/api/users"
            await axios.post(url, data)
            createNotification('success',"Utworzono konto", "Pomyślnie utworzono konto")
            navigate("/login")
            
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
                setError(error.response.data.message)
                createNotification("warning","Błąd", "Błąd przy tworzeniu konta")
            }
        }
    }

    return (
        <>
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    
                    <h1>Masz już konto?</h1>
                    <Link to="/login">
                        <button type="button" className={styles.link_btn}> Zaloguj się </button>
                    </Link>
                </div>

                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>

                        <h1>Rejestracja</h1>
                        <input type="text" placeholder="Login" name="login" onChange={handleChange} value={data.login} required className={styles.input} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} value={data.email} required className={styles.input} />
                        <input type="password" placeholder="Hasło" name="password" onChange={handleChange} value={data.password} required className={styles.input} />

                        {error && <div className={styles.error_msg}>{error}</div>}

                        <button type="submit" className={styles.register_btn}> Zarejestruj się </button>

                    </form>
                </div>
            </div>
        </div>
        <NotificationContainer/>
        </>
    )
}
export default Signup