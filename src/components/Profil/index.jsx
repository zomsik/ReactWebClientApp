import Navbar from "../Navbar"
import styles from "./styles.module.css"
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import React from 'react';
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { createNotification } from "../notifications"
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


  const ZmianaHasla = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const [data, setData] = useState({ 
        token: localStorage.getItem("token"), 
        password: "",
        newPassword: ""

    })
    
    const [error, setError] = useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(data.password==="")
        {
          createNotification('warning',"Błąd", "Nie zmieniono hasła")
          setError("Hasło nie może być puste")
          return
        }
        if(data.newPassword==="")
        {
          createNotification('warning',"Błąd", "Nie zmieniono hasła")
          setError("Nowe hasło nie może być puste")
          return
        }

        try {
            const url = "https://expressapp.azurewebsites.net/api/changePassword"
            const { data: res} = await axios.post(url, data)
            if (res.status === 200)
            {
                hideModal()
                createNotification('success',"Zmieniono hasło", "Pomyślnie zmieniono hasło")
                setError("")
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
              createNotification('warning',"Błąd", "Nie zmieniono hasła")
              setError(error.response.data.message)
            }
        }
    }



    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
      setError("")
      setData({
      token: localStorage.getItem("token"), 
      password: "",
      newPassword: ""})
    };
  
    return (
      <>
        <Button  variant="outline-success" onClick={showModal}>Zmiana hasła</Button>
        <Modal show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Zmiana hasła</Modal.Title>
          </Modal.Header>
          <form className={styles.form_container} >
          <Modal.Body>

          
        <input type="password" placeholder="Stare hasło" name="password" onChange={handleChange} value={data.password} required className={styles.input} /> <br/>
        <input type="password" placeholder="Nowe hasło" name="newPassword" onChange={handleChange} value={data.newPassword} required className={styles.input} />
        {error && <div className={styles.error_msg}>{error}</div>}



          </Modal.Body>
          <Modal.Footer>
          <Button  variant="outline-secondary" onClick={hideModal}>Anuluj</Button>
          <Button  variant="outline-success" onClick={handleSubmit}>Zapisz</Button>
          </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  };

  const UsuniecieKonta = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const data = {token: localStorage.getItem("token")}
    const navigate = useNavigate()

    
    const handleLogout = () => {
      localStorage.removeItem("token")
      navigate("/")
      window.location.reload()
  }

    const handleSubmit = async () => {
        try {
            const url1 = "https://expressapp.azurewebsites.net/api/deleteAllCharts"
            const url2 = "https://expressapp.azurewebsites.net/api/deleteAccount"

            const { data : res1} = await axios.post(url1, data)

            if (res1.status === 200)
            {
              const { data: res2} = await axios.post(url2, data)
              if (res2.status === 200)
              {
                hideModal()
                handleLogout()
              }
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
              createNotification('warning',"Błąd", "Nie zmieniono hasła")
            }
        }
    }



    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
    };
  
    return (
      <>
        <Button  variant="outline-danger" onClick={showModal}>Usunięcie konta</Button>
        <Modal show={isOpen} onHide={hideModal}>
          <Modal.Header>
            <Modal.Title>Usunięcie konta</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          Czy na pewno chcesz usunąć konto?
          </Modal.Body>
          <Modal.Footer>
          <Button  variant="outline-secondary" onClick={hideModal}>Anuluj</Button>
          <Button  variant="outline-danger" onClick={handleSubmit}>USUŃ KONTO</Button>
          </Modal.Footer>

        </Modal>
      </>
    );
  };


const Profil = () => {

  const parseJwt = (token) => {
  
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

  const getLogin = () => {
    const token = localStorage.getItem("token")
    return parseJwt(token).login
  }
  

    const login = getLogin()

    return (
        <>
        <Navbar/>
        <div className={styles.shadowBox}>
            <div className={styles.rainbow_text_animated }>
                <div className={styles.rainbow }>
                <h1> Witaj {login} </h1>
                </div>
            </div>
        </div>
        

        <h2 className={styles.question}>
        Co chcesz zrobić:
        </h2>

    <table className={styles.buttons}>
        <tbody>
        <tr>
            <td>
            <ZmianaHasla/>
            </td>
        </tr>
        <tr>
            <td>
            <UsuniecieKonta/>
            </td>
        </tr>
        </tbody>
    </table>


    <NotificationContainer/>
        </>
    )

}
export default Profil
