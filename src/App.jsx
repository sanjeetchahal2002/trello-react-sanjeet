import { Routes,Route, BrowserRouter } from "react-router-dom"
import Content from "./Components/Content"
import Navbar from "./Components/Navbar"
import BoardList from "./Components/BoardContent/BoardsList"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element = {<Content/>}/>
      <Route path="/boards/:id" element = {<BoardList/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App


