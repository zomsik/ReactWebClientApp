import Navbar from "../Navbar"
import { Link } from "react-router-dom"
import { Image } from 'react-bootstrap';

const Main = () => {

    return (
        <>
        <Navbar/>

        <div className="container">
        <br></br>
        <div className="row">
            <div className="col-lg-6 mb-5 col-sm-12">
                <div className="card h-100">
                    <div className="embed-responsive embed-responsive-16by9">
                        <Link to="/dane"> <Image src={require('../../assets/save-data.png')} className="card-img-top " /></Link>
                    </div>
                    <div className="card-block">
                        <br></br>
                        <h4 className="card-title">Pobierz dane</h4>

                        <p className="card-text">Zakładka umożliwiająca pobranie danych odnośnie ilości małżeństw i rozwodów na 1 tys. mieszkańców, a także gęstości zaludnienia w poszczególnych województwach ze strony bdl.stat.gov.pl. Pobrane dane można wyświetlić z podziałem na lata i województa, a także zapisać. </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 mb-5 col-sm-12">
                <div className="card h-100">
                    <div className="embed-responsive embed-responsive-16by9">
                        <Link to="/zapisane"> <Image src={require('../../assets/view-data.png')}  className="card-img-top " /></Link>
                    </div>
                    <div className="card-block">
                        <br></br>
                        <h4 className="card-title">Zapisane wykresy</h4>

                        <p className="card-text">Zakładka, która umożliwia wyświetlenie zapisanych przez użytkownika wykresów. Może je tu ze sobą porównać lub usunąć</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>
    )

}
export default Main
