import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Profil from "./components/Profil"
import Dane from "./components/Dane"
import Zapisane from "./components/Zapisane"

function App() {
const user = localStorage.getItem("token")
return (
<Routes>
{user && <Route path="/ReactWebClientApp/" exact element={<Main />} />}
<Route path="/ReactWebClientApp/signup" exact element={<Signup />} />
<Route path="/ReactWebClientApp/login" exact element={<Login />} />
{user && <Route path="/ReactWebClientApp/profil" exact element={<Profil />} />}
{user && <Route path="/ReactWebClientApp/dane" exact element={<Dane />} />}
{user && <Route path="/ReactWebClientApp/zapisane" exact element={<Zapisane />} />}
<Route path="/ReactWebClientApp/" element={<Navigate replace to="/ReactWebClientApp/login" />} />
</Routes>


)
}
export default App
