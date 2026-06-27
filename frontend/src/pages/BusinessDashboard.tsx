import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { theme } from '../theme'

interface Service {
  _id: string
  title: string
  description: string
  category: string
  price: number
}

interface Booking {
  _id: string
  service: { title: string; price: number }
  customer: { name: string; phone: string; email: string }
  bookingDate: string
  status: string
  totalPrice: number
}

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled']

function BusinessDashboard() {
  const navigate = useNavigate()
  const [view, setView] = useState<'services' | 'bookings'>('bookings')
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [businessName] = useState(localStorage.getItem('businessName') || '')
  const [showAddService, setShowAddService] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token || localStorage.getItem('role') !== 'business') {
      navigate('/business/login')
      return
    }
    loadBookings()
  }, [navigate])

  const loadServices = async () => {
    const token = localStorage.getItem('token')
    const res = await api.get('/services/my/services', { headers: { Authorization: `Bearer ${token}` } })
    setServices(res.data)
  }

  const loadBookings = async () => {
    const token = localStorage.getItem('token')
    const res = await api.get('/bookings/my/business', { headers: { Authorization: `Bearer ${token}` } })
    setBookings(res.data)
  }

  const handleViewChange = (v: 'services' | 'bookings') => {
    setView(v)
    if (v === 'services') loadServices()
    if (v === 'bookings') loadBookings()
  }

  const addService = async () => {
    const token = localStorage.getItem('token')
    try {
      await api.post('/services', { title, description, category, price: Number(price) }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTitle(''); setDescription(''); setCategory(''); setPrice('')
      setShowAddService(false)
      loadServices()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add service')
    }
  }

  const updateStatus = async (bookingId: string, status: string) => {
    const token = localStorage.getItem('token')
    try {
      await api.put(`/bookings/${bookingId}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      loadBookings()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status')
    }
  }

  const deleteService = async (serviceId: string) => {
    const token = localStorage.getItem('token')
    try {
      await api.delete(`/services/${serviceId}`, { headers: { Authorization: `Bearer ${token}` } })
      loadServices()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete service')
    }
  }

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.paper, fontFamily: theme.font.body, color: theme.colors.ink }}>
      {/* HEADER */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 48px', borderBottom: `1px solid ${theme.colors.sandDark}`
      }}>
        <span style={{ fontFamily: theme.font.display, fontSize: '20px', fontWeight: 600 }}>Local Connect</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '14px', color: theme.colors.muted }}>{businessName}</span>
          <button onClick={logout} style={{
            background: 'transparent', border: `1px solid ${theme.colors.sandDark}`,
            color: theme.colors.muted, padding: '8px 16px', borderRadius: '4px',
            cursor: 'pointer', fontSize: '13px', fontFamily: theme.font.body
          }}>Logout</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', padding: '24px 48px 0' }}>
        <Tab label="Incoming bookings" active={view === 'bookings'} onClick={() => handleViewChange('bookings')} />
        <Tab label="My services" active={view === 'services'} onClick={() => handleViewChange('services')} />
      </div>

      {/* CONTENT */}
      <div style={{ padding: '32px 48px 48px' }}>

        {/* BOOKINGS VIEW */}
        {view === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '680px' }}>
            {bookings.map(b => (
              <div key={b._id} style={{
                background: theme.colors.white, border: `1px solid ${theme.colors.sandDark}`,
                borderRadius: '4px', padding: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                      {b.service?.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: theme.colors.muted }}>
                      {b.customer?.name} · {b.customer?.phone}
                    </p>
                    <p style={{ fontSize: '12px', color: theme.colors.muted, marginTop: '2px' }}>
                      {new Date(b.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600 }}>₹{b.totalPrice}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '13px', color: theme.colors.muted }}>Status:</span>
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b._id, e.target.value)}
                    style={{
                      padding: '8px 12px', border: `1px solid ${theme.colors.sandDark}`,
                      borderRadius: '4px', fontSize: '13px', background: theme.colors.white,
                      fontFamily: theme.font.body, color: theme.colors.ink, cursor: 'pointer'
                    }}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            ))}
            {bookings.length === 0 && <EmptyState text="No bookings yet — share your services to get started." />}
          </div>
        )}

        {/* SERVICES VIEW */}
        {view === 'services' && (
          <>
            <button
              onClick={() => setShowAddService(!showAddService)}
              style={{
                padding: '10px 20px', background: theme.colors.moss, color: theme.colors.white,
                border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', marginBottom: '24px', fontFamily: theme.font.body
              }}
            >
              {showAddService ? 'Cancel' : '+ Add new service'}
            </button>

            {showAddService && (
              <div style={{
                background: theme.colors.white, border: `1px solid ${theme.colors.sandDark}`,
                borderRadius: '4px', padding: '24px', marginBottom: '24px', maxWidth: '480px'
              }}>
                <h3 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>
                  New service
                </h3>
                <Field label="Title" value={title} onChange={setTitle} />
                <Field label="Description" value={description} onChange={setDescription} />
                <Field label="Category" value={category} onChange={setCategory} />
                <Field label="Price (₹)" value={price} onChange={setPrice} type="number" />
                {error && <p style={{ color: theme.colors.terracotta, fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
                <button onClick={addService} style={{
                  padding: '12px 24px', background: theme.colors.moss, color: theme.colors.white,
                  border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', fontFamily: theme.font.body
                }}>
                  Save service
                </button>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {services.map(s => (
                <div key={s._id} style={{
                  background: theme.colors.white, border: `1px solid ${theme.colors.sandDark}`,
                  borderRadius: '4px', padding: '20px'
                }}>
                  <span style={{
                    fontSize: '11px', fontWeight: 600, color: theme.colors.moss,
                    letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '10px', display: 'block'
                  }}>
                    {s.category}
                  </span>
                  <h3 style={{ fontFamily: theme.font.display, fontSize: '17px', fontWeight: 600, marginBottom: '8px' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: theme.colors.muted, lineHeight: 1.5, marginBottom: '16px' }}>
                    {s.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600 }}>₹{s.price}</span>
                    <button onClick={() => deleteService(s._id)} style={{
                      background: 'transparent', border: `1px solid ${theme.colors.sandDark}`,
                      color: theme.colors.muted, padding: '6px 12px', borderRadius: '4px',
                      fontSize: '12px', cursor: 'pointer', fontFamily: theme.font.body
                    }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {services.length === 0 && <EmptyState text="No services yet — add your first one above." />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 4px', marginRight: '24px', background: 'transparent', border: 'none',
      borderBottom: active ? `2px solid ${theme.colors.moss}` : '2px solid transparent',
      color: active ? theme.colors.ink : theme.colors.muted,
      fontWeight: active ? 600 : 400, fontSize: '14px', cursor: 'pointer', fontFamily: theme.font.body
    }}>
      {label}
    </button>
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

function EmptyState({ text }: { text: string }) {
  return (
    <div style={{
      padding: '48px 24px', textAlign: 'center', color: theme.colors.muted,
      border: `1px dashed ${theme.colors.sandDark}`, borderRadius: '4px', gridColumn: '1 / -1'
    }}>
      {text}
    </div>
  )
}

export default BusinessDashboard