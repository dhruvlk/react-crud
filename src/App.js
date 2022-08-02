import './App.css'
import Create from './components/create/create'
import Read from './components/read/read'
import { Routes, Route } from 'react-router-dom'
import Update from './components/update/update'

function App() {
    return (
        <>
            <div className='main'>
                <h3>React Crud Operations</h3>
                <Routes>
                    <Route path='/' element={<Create />} />
                    <Route path='/read' element={<Read />} />
                    <Route path='/update' element={<Update />} />
                </Routes>
            </div>
        </>
    )
}

export default App
