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
{user && <Route path="/" exact element={<Main />} />}
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
<Route path="/profil" exact element={<Profil />} />
<Route path="/dane" exact element={<Dane />} />
<Route path="/zapisane" exact element={<Zapisane />} />
<Route path="/" element={<Navigate replace to="/login" />} />
</Routes>


)
}
export default App
