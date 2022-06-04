import Navbar from "../Navbar"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import { createNotification } from "../notifications"
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const Zapisane = () => {
    const [loadedData, setLoadedData] = useState([])

    const [showWykres, setShowWykres] = useState(false)

    const [daneWykresu, setDaneWykresu] = useState([])

    const [showedWykresTitle, setShowedWykresTitle] = useState("")

    const [isFetched, setIsFetched] = useState(false)


    const showDanyWykres = (TitleOfChart) => {

        setShowedWykresTitle(loadedData[TitleOfChart].chartTitle)
        setDaneWykresu(loadedData[TitleOfChart].chartData)
        setShowWykres(true)
        createNotification('success',"Wyświetlono wykres", "Pomyślnie wyświetlono wykres")
    }

    const makePrzyciski = () => {
        const array = []

        loadedData.forEach((element, index)=> {
            array.push(<Button key={index} variant="outline-secondary" onClick={function() {showDanyWykres(index)}}>{element.chartTitle}</Button>)
            array.push(<br key={index+0.5}></br>)

        });


    
        return array
      }

    const usunWykres = async  () => {
        
        setShowWykres(false)
        await deleteData()
        setShowedWykresTitle('')
        await fetchData()
      }


    const deleteData = async () => {
        try {
            const url = "https://expressapp.azurewebsites.net/api/deleteChart"
            const daneToDelete = {
                token: localStorage.getItem("token"),
                chartTitle: showedWykresTitle
            }
            
            await axios.post(url, daneToDelete)
            createNotification('success',"Usunięto wykres", "Pomyślnie usunięto wykres")
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
                createNotification("warning","Błąd przy usuwaniu danych", "Ponawiam próbę")
            }
        }
    }

    const fetchData = async () => {
        try {
            const url = "https://expressapp.azurewebsites.net/api/loadCharts"
            const daneToLoad = {
                token: localStorage.getItem("token")
            }
            
            const { data: res } = await axios.post(url, daneToLoad)
            setLoadedData(res.data)
            setIsFetched(true)

            

        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
                createNotification("warning","Błąd pobierania danych", "Ponawiam próbę")
            }
        }
    }

    useEffect(() => {
          fetchData()
            .catch(console.error);
    },[])



    return (
        <>
        <Navbar/>

        {(!loadedData.length && isFetched)  ?
        <div className={styles.centerButton}>
            <Link to="/ReactWebClientApp/dane">
            <Button className={styles.loadButton}>Zapisz jakiś wykres, aby go wyświetlić w tej sekcji</Button>
            </Link>
        </div>
        :null}

        <div className={styles.zapisane_container}>
        <div className={styles.left}>
        <div className="btn-group-vertical" role="group">
        {makePrzyciski()}
        </div></div>



        <div className={styles.right}>
        {(showWykres)  ? 
        <>
        
    <BarChart
      width={1000}
      height={600}
      data={daneWykresu}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" label={{ value: "Rok", position: "insideBottomLeft", dy: 10}} />
      <YAxis yAxisId="left" orientation="left" label={{ value: "Ilość małżeństw i rozwodów na 1 tys. ludzi", position: "insideLeft", angle: -90,   dy: 100}} stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" label={{ value: "Gestość zaludnienia na kilometr kwadratowy", position: "insideRight", angle: 90,   dy: 100}} stroke="#82ca9d" />

      <Tooltip />
      <Legend />
      <Bar yAxisId="left" dataKey="malzenstwa" fill="#8AE981" />
      <Bar yAxisId="left" dataKey="rozwody" fill="#E11845" />
      <Bar yAxisId="right" dataKey="gestosc" fill="#808080" />
    </BarChart>
         

        <br></br><br></br>
        <Button variant="outline-danger" onClick={usunWykres}>Usuń wykres</Button> 
        
        </>
        :
        <div></div>
        }
</div>
</div>
    <NotificationContainer/>
        </>
    )

}
export default Zapisane
