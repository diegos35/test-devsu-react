import { BrowserRouter, Routes, Route } from 'react-router-dom'

import '../App.css'
import Home from '../Pages/Home/Home'
import Form from '../Pages/Form/Form'
import NotFound from '../Pages/NotFound/NotFound'

const App = () => {
 
  return (
    <BrowserRouter>
     <Routes>
        <Route exact path='/' element={ <Home /> }/>
        <Route exact path="/form" element={ <Form /> } />
        <Route path="*" element={ < NotFound />} /> 
        </Routes>
    </BrowserRouter>
  )
}

export default App
