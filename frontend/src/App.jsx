import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import UpdatePage from './pages/Update';
import CreatePage from './pages/Create';

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/create' element={<CreatePage/>} />
      <Route path='/update/:id' element={<UpdatePage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;