import styles from "./styles.module.css"
import Navbar from "../Navbar"
import axios from "axios"
import React, { useState, useEffect } from "react"
import Select from 'react-select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { createNotification } from "../notifications"
import { Button } from 'react-bootstrap';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const Dane = () => {

    // 2002 - 2021
    // małżeństwa na 1 tys. ludności
    const [malzenstwa,setMalzenstwa] = useState({
        data: '',
        loaded: false
    })

    // 2002 - 2021
    // rozwody na 10 tys. ludności
    const [rozwody,setRozwody] = useState({
        data: '',
        loaded: false
    })

    // 2002 - 2021
    // ludność na 1 km2
    const [gestosc,setGestosc] = useState({
        data: '',
        loaded: false
    })




    const [statystyki,setStatystyki] = useState({ })

    const [selectOptions,setSelectOptions] = useState([])
    const [selectWojewodztwoList,setSelectWojewodztwoList] = useState([])

    const [daneWykresu, setDaneWykresu] = useState([])

    const [showWykres,setShowWykres] = useState(false)

    const [select1, setSelect1] = useState('')
    const [select2, setSelect2] = useState('')
    const [select3, setSelect3] = useState('')

    function handleSelect1(selected) {
        setSelect1(selected)
    }

    function handleSelect2(selected) {
        setSelect2(selected)

    }
    function handleSelect3(selected) {
        setSelect3(selected)

    }

    

    async function pobierzDane()  {

        try {

        
        const resMalzenstwa = await fetch('https://bdl.stat.gov.pl/api/v1/data/by-variable/450543?format=json&unit-level=2&page-size=16')
        const dataMalzenstwa = await resMalzenstwa.json();

        const resRozwody = await fetch('https://bdl.stat.gov.pl/api/v1/data/by-variable/1616556?format=json&unit-level=2&page-size=16')
        const dataRozwody = await resRozwody.json();

        const resGestosc = await fetch('https://bdl.stat.gov.pl/api/v1/data/by-variable/60559?format=json&unit-level=2&page-size=16')
        const dataGestosc = await resGestosc.json();


        setMalzenstwa({
            data: dataMalzenstwa,
            loaded: true
        }) 

        setRozwody({
            data: dataRozwody,
            loaded: true
        }) 

        setGestosc({
            data: dataGestosc,
            loaded: true
        }) 

        createNotification('success',"Pobrano dane", "Pomyślnie pobrano dane")
        
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
                createNotification("warning","Błąd pobierania danych", "Ponawiam próbę")
                pobierzDane()
                
            }
        }


       
        


    }








    const ZapiszWykres = async () => {
        try {
            const url = "https://expressapp.azurewebsites.net/api/saveChart"
            const daneToSave = {
                token: localStorage.getItem("token"),
                chartTitle: select1.value + " - " + select2.value + ", " + select3.value,
                chartData: daneWykresu,
            }

            await axios.post(url, daneToSave)
            createNotification("success","Zapisano wykres", "Pomyślnie zapisano wykres")
            
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) 
            {
                createNotification("error","Błąd", "Nie udało się zapisać wykresu")
            }
        }
    }


    const PobierzWykres = () => {
        // Wymaganie funkcjonalne 2

        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(daneWykresu))}`;

        const link = document.createElement("a");
        
        link.href = jsonString;
        link.download = select1.value + " - " + select2.value + ", " + select3.value + ".json";
      
        link.click();
        
    }


    useEffect(() => {
        if (select1.value && select2.value && select3.value )
        {
            if (select1.value > select2.value)
            {
                createNotification("warning","Błąd", "Data startu musi być przed datą drugą")
            }
            else
            {
                createNotification("success","Stworzono wykres", "Pomyślnie stworzono wykres")
                let arr = []
                for (let i=parseInt(select1.value); i<= select2.value; i++)
                {
                    let el = {}
                    el['name'] =  i
                    el['malzenstwa'] = statystyki[select3.value].malzenstwa[i]
                    el['rozwody'] =  statystyki[select3.value].rozwody[i]    
                    el['gestosc'] =  statystyki[select3.value].gestosc[i]
                    arr.push(el)

                }


                setDaneWykresu(arr)
                setShowWykres(true)

            }
        }

    },[select1,select2,select3,statystyki])

    useEffect(() => {
        if (malzenstwa.loaded && rozwody.loaded && gestosc.loaded)
        {
            let options = []

            malzenstwa.data.results[0].values.forEach(element => {
                let el = {}
                el['value'] =  element.year
                el['label'] =  element.year
                options.push(el)
                
            });
            setSelectOptions(options)

            let woj = []

            malzenstwa.data.results.forEach(element => {
                let el = {}
                el['value'] =  element.name
                el['label'] =  element.name
                woj.push(el)
                
            });
            setSelectWojewodztwoList(woj)


            for (let i=0; i<16; i++)
            {
                let m = {}
                malzenstwa.data.results[i].values.forEach(element => {
                    m[element.year] = element.val
                });
               
                let r = {}
                rozwody.data.results[i].values.forEach(element => {
                    r[element.year] = element.val/10
                });
                
                let g = {}
                gestosc.data.results[i].values.forEach(element => {
                    g[element.year] = element.val
                });

                
                let newElement = 
                {
                    wojewodztwo : malzenstwa.data.results[i].name,
                    malzenstwa : m,
                    rozwody : r,
                    gestosc : g
                }

                setStatystyki(prevState => ({ ...prevState, [malzenstwa.data.results[i].name]: newElement}));

            }

            

        }
    },[malzenstwa,rozwody,gestosc]) 






    



    return (
        <>
        <Navbar/>


        {(malzenstwa.loaded && rozwody.loaded && gestosc.loaded)  ? 
        <>
        <div className={styles.zapisane_container}>
        <div className={styles.left}>

        <table className={styles.buttons}>
        <thead>
        <tr>
            <td>
            Data początku wykresu
            </td>
            <td>
            Data końca wykresu
            </td>
            <td>
            Województwo
            </td>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
            <Select className="col-offset-4"
            onChange={handleSelect1}
            options={selectOptions}
            />


            </td>
            <td>
            <Select className="col-offset-4"
            onChange={handleSelect2}
            options={selectOptions}
            />
            </td>
            <td>
            <Select className="col-offset-4"
            onChange={handleSelect3}
            options={selectWojewodztwoList}
            />
            </td>
        </tr>
        </tbody>
        </table>
        </div>
        </div>
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



    <br/><br/>
        
        <Button variant="outline-primary" onClick={ZapiszWykres}> Zapisz wykres w ulubionych </Button> 
		 <br/><br/>
        <Button variant="outline-primary" onClick={PobierzWykres}> Pobierz wykres </Button> 
        </>
        :
        null
        }
        </div>


        </>
        : 
        <>
        <div className={styles.centerButton}>
        <button className={styles.loadButton} onClick={pobierzDane}> Pobierz dane </button>
        </div>


        </> 
        }
        <NotificationContainer/>
        </>
    )

}
export default Dane
