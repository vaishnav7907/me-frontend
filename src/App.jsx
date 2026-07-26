
import './App.css'
import Signin from './components/authentication/signin/Signin'
import Signup from './components/authentication/signup/Signup'
import Welcomepage from './components/welcomePage/Welcomepage'
import {BrowserRouter, Route, Routes} from "react-router-dom"
function App() {
 

  return (
    <>
     <BrowserRouter>
     
     <Routes>
      <Route path='/' element={<Welcomepage/>}/>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/signin' element={<Signin/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
