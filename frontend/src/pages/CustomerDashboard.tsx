import { io } from 'socket.io-client'
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
  business: { businessName: string; city: string; address: string }
}

interface Booking {
  _id: string
  service: { title: string; price: number; category: string }
  business: { businessName: string; phone: string; city: string }
  bookingDate: string
  status: string
  totalPrice: number
}

const STATUS_STEPS = ['Pending', 'Confirmed', 'In Progress', 'Completed']

function CustomerDashboard() {
  const navigate = useNavigate()
  const [view, setView] = useState<'services' | 'bookings'>('services')
  const [services, setServices] = useState<Service[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [name] = useState(localStorage.getItem('name') || '')

  useEffect(() => {
  const token = localStorage.getItem('token')
  if (!token || localStorage.getItem('role') !== 'customer') {
    navigate('/customer/login')
    return
  }

  // get userId from JWT token
  const payload = JSON.parse(atob(token.split('.')[1]))
  const userId = payload.userId

  // connect to socket and register
  const socket = io('http://localhost:5000')
  socket.on('connect', () => {
    socket.emit('register', userId)
  })

  // listen for real-time booking status updates
  socket.on('booking_status_update', (data: { bookingId: string; status: string }) => {
    setBookings(prev => prev.map(b =>
      b._id === data.bookingId ? { ...b, status: data.status } : b
    ))
  })

  loadServices()

  return () => {
    socket.disconnect()
  }
}, [])


  const loadServices = async () => {
    const res = await api.get('/services')
    setServices(res.data)
  }

  const loadBookings = async () => {
    const token = localStorage.getItem('token')
    const res = await api.get('/bookings/my/customer', { headers: { Authorization: `Bearer ${token}` } })
    setBookings(res.data)
  }

  const handleViewChange = (v: 'services' | 'bookings') => {
    setView(v)
    if (v === 'bookings') loadBookings()
  }

  const bookService = async (serviceId: string) => {
    const token = localStorage.getItem('token')
    try {
      await api.post('/bookings', {
        serviceId,
        bookingDate: new Date(Date.now() + 86400000).toISOString()
      }, { headers: { Authorization: `Bearer ${token}` } })
      handleViewChange('bookings')
    } catch (err: any) {
      alert(err.response?.data?.message || 'Booking failed')
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
          <span style={{ fontSize: '14px', color: theme.colors.muted }}>Hi, {name}</span>
          <button onClick={logout} style={{
            background: 'transparent', border: `1px solid ${theme.colors.sandDark}`, color: theme.colors.muted,
            padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontFamily: theme.font.body
          }}>Logout</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '8px', padding: '24px 48px 0' }}>
        <Tab label="Browse services" active={view === 'services'} onClick={() => handleViewChange('services')} />
        <Tab label="My bookings" active={view === 'bookings'} onClick={() => handleViewChange('bookings')} />
      </div>

      {/* CONTENT */}
      <div style={{ padding: '32px 48px 48px' }}>
        {view === 'services' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {services.map(s => <ServiceCard key={s._id} service={s} onBook={() => bookService(s._id)} />)}
            {services.length === 0 && <EmptyState text="No services available in your area yet." />}
          </div>
        )}

        {view === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '640px' }}>
            {bookings.map(b => <BookingCard key={b._id} booking={b} />)}
            {bookings.length === 0 && <EmptyState text="No bookings yet — browse services to get started." />}
          </div>
        )}
      </div>
    </div>
  )
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 4px', marginRight: '24px', background: 'transparent', border: 'none',
      borderBottom: active ? `2px solid ${theme.colors.terracotta}` : '2px solid transparent',
      color: active ? theme.colors.ink : theme.colors.muted,
      fontWeight: active ? 600 : 400, fontSize: '14px', cursor: 'pointer', fontFamily: theme.font.body
    }}>
      {label}
    </button>
  )
}

function ServiceCard({ service, onBook }: { service: Service; onBook: () => void }) {
  return (
    <div style={{
      background: theme.colors.white, border: `1px solid ${theme.colors.sandDark}`,
      borderRadius: '4px', padding: '24px', display: 'flex', flexDirection: 'column'
    }}>
      <span style={{
        fontSize: '11px', fontWeight: 600, color: theme.colors.terracotta, letterSpacing: '0.5px',
        textTransform: 'uppercase', marginBottom: '12px'
      }}>
        {service.category}
      </span>
      <h3 style={{ fontFamily: theme.font.display, fontSize: '19px', fontWeight: 600, marginBottom: '8px' }}>
        {service.title}
      </h3>
      <p style={{ fontSize: '13px', color: theme.colors.muted, lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>
        {service.description}
      </p>
      <div style={{ borderTop: `1px solid ${theme.colors.sand}`, paddingTop: '14px', marginBottom: '14px' }}>
        <p style={{ fontSize: '13px', fontWeight: 600 }}>{service.business?.businessName}</p>
        <p style={{ fontSize: '12px', color: theme.colors.muted }}>{service.business?.city}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: theme.font.display, fontSize: '20px', fontWeight: 600 }}>₹{service.price}</span>
        <button onClick={onBook} style={{
          padding: '10px 18px', background: theme.colors.terracotta, color: theme.colors.white,
          border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
          fontFamily: theme.font.body
        }}>
          Book now
        </button>
      </div>
    </div>
  )
}

function BookingCard({ booking }: { booking: Booking }) {
  const isCancelled = booking.status === 'Cancelled'
  const currentStep = STATUS_STEPS.indexOf(booking.status)

  return (
    <div style={{ background: theme.colors.white, border: `1px solid ${theme.colors.sandDark}`, borderRadius: '4px', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
            {booking.service?.title}
          </h3>
          <p style={{ fontSize: '13px', color: theme.colors.muted }}>
            {booking.business?.businessName} · {booking.business?.phone}
          </p>
        </div>
        <span style={{ fontFamily: theme.font.display, fontSize: '18px', fontWeight: 600 }}>₹{booking.totalPrice}</span>
      </div>

      {!isCancelled ? (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          {STATUS_STEPS.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 0 }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%',
                background: i <= currentStep ? theme.colors.moss : theme.colors.sandDark,
                flexShrink: 0
              }} />
              {i < STATUS_STEPS.length - 1 && (
                <div style={{
                  flex: 1, height: '1px',
                  background: i < currentStep ? theme.colors.moss : theme.colors.sandDark
                }} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '13px', color: theme.colors.terracotta, fontWeight: 600, marginTop: '16px' }}>Cancelled</p>
      )}

      {!isCancelled && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
          {STATUS_STEPS.map((step, i) => (
            <span key={step} style={{
              fontSize: '11px', color: i <= currentStep ? theme.colors.moss : theme.colors.muted,
              fontWeight: i === currentStep ? 600 : 400, width: '60px',
              textAlign: i === 0 ? 'left' : i === STATUS_STEPS.length - 1 ? 'right' : 'center'
            }}>
              {step}
            </span>
          ))}
        </div>
      )}
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

export default CustomerDashboard