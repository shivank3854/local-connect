import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CustomerLogin from './pages/CustomerLogin'
import BusinessLogin from './pages/BusinessLogin'
import CustomerDashboard from './pages/CustomerDashboard'
import BusinessDashboard from './pages/BusinessDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/business/dashboard" element={<BusinessDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App