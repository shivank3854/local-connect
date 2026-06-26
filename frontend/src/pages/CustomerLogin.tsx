import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'
import { theme } from '../theme'

function CustomerLogin() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/customer/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', 'customer')
      localStorage.setItem('name', res.data.name)
      navigate('/customer/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  const handleRegister = async () => {
    try {
      await api.post('/auth/customer/register', { name, email, password, phone })
      setIsRegister(false)
      setError('')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: theme.colors.paper, fontFamily: theme.font.body,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
    }}>
      <div style={{ width: '380px' }}>
        <Link to="/" style={{ fontSize: '13px', color: theme.colors.muted, textDecoration: 'none' }}>
          ← Back
        </Link>

        <div style={{ width: '32px', height: '3px', background: theme.colors.terracotta, margin: '24px 0 16px' }} />

        <h1 style={{ fontFamily: theme.font.display, fontSize: '30px', fontWeight: 600, marginBottom: '6px' }}>
          {isRegister ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={{ fontSize: '14px', color: theme.colors.muted, marginBottom: '32px' }}>
          {isRegister ? 'Book trusted help in minutes' : 'Login to book your next service'}
        </p>

        {isRegister && (
          <>
            <Field label="Full name" value={name} onChange={setName} />
            <Field label="Phone number" value={phone} onChange={setPhone} />
          </>
        )}
        <Field label="Email" value={email} onChange={setEmail} type="email" />
        <Field label="Password" value={password} onChange={setPassword} type="password" />

        <button
          onClick={isRegister ? handleRegister : handleLogin}
          style={{
            width: '100%', padding: '14px', background: theme.colors.terracotta,
            color: theme.colors.white, border: 'none', borderRadius: '4px',
            fontSize: '15px', fontWeight: 600, cursor: 'pointer', marginTop: '8px'
          }}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        {error && (
          <p style={{ color: theme.colors.terracotta, fontSize: '13px', marginTop: '14px' }}>{error}</p>
        )}

        <p style={{ marginTop: '24px', fontSize: '13px', color: theme.colors.muted }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => { setIsRegister(!isRegister); setError('') }}
            style={{ color: theme.colors.terracotta, cursor: 'pointer', fontWeight: 600 }}
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '12px', color: theme.colors.muted, marginBottom: '6px', fontWeight: 600 }}>
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '12px 14px', border: `1px solid ${theme.colors.sandDark}`,
          borderRadius: '4px', fontSize: '14px', outline: 'none', background: theme.colors.white,
          fontFamily: theme.font.body
        }}
      />
    </div>
  )
}

export default CustomerLogin