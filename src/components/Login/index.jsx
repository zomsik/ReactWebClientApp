import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"
import { createNotification } from "../notifications"
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Login = () => {
    const [data, setData] = useState({ 
        login: "", 
        password: "" 
    })
    
    const [error, setError] = useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "https://expressapp.azurewebsites.net/api/auth"
            const { data: res } = await axios.post(url, data)
            createNotification('success',"Zalogowano", "Pomyślnie zalagowano na konto")
            localStorage.setItem("token", res.data)
            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
                setError(error.response.data.message)
                createNotification("warning","Błąd", "Błąd przy logowaniu na konto")
            }
        }
    }

    return (
        <>
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>

                        <h1>Logowanie</h1>
                        <input type="text" placeholder="Login" name="login" onChange={handleChange} value={data.login} required className={styles.input} />
                        <input type="password" placeholder="Hasło" name="password" onChange={handleChange} value={data.password} required className={styles.input} />
                        
                        {error && <div className={styles.error_msg}>{error}</div>}

                        <button type="submit" className={styles.login_btn}> Zaloguj się </button>

                    </form>
                </div>

                <div className={styles.right}>

                    <h1>Nie masz konta?</h1>
                    <Link to="/signup">
                        <button type="button" className={styles.link_btn}> Zarejestruj się </button>
                    </Link>
                </div>
            </div>
        </div>
        <NotificationContainer/>
        </>
    )
}
export default Login;
