import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Map from './pages/Map'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </Router>
  )
}

export default App
