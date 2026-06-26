import { useNavigate } from 'react-router-dom'
import { theme } from '../theme'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.paper,
      color: theme.colors.ink,
      fontFamily: theme.font.body,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* NAV */}
      <div style={{
        padding: '28px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${theme.colors.sandDark}`
      }}>
        <span style={{ fontFamily: theme.font.display, fontSize: '22px', fontWeight: 600 }}>
          Local Connect
        </span>
        <span style={{ fontSize: '13px', color: theme.colors.muted, letterSpacing: '0.5px' }}>
          TRUSTED HELP, FROM YOUR NEIGHBOURHOOD
        </span>
      </div>

      {/* HERO */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '13px',
          letterSpacing: '2px',
          color: theme.colors.terracotta,
          marginBottom: '16px',
          fontWeight: 600
        }}>
          PLUMBERS · ELECTRICIANS · CLEANERS · AND MORE
        </p>
        <h1 style={{
          fontFamily: theme.font.display,
          fontSize: '56px',
          fontWeight: 600,
          lineHeight: 1.1,
          maxWidth: '700px',
          marginBottom: '20px'
        }}>
          The trusted way to get things fixed nearby
        </h1>
        <p style={{ fontSize: '17px', color: theme.colors.muted, maxWidth: '480px', marginBottom: '56px' }}>
          Book verified local professionals, or list your own services and grow your business.
        </p>

        {/* TWO PATHS */}
        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <PathCard
            label="I need a service"
            description="Book trusted help for your home, fast"
            accent={theme.colors.terracotta}
            onClick={() => navigate('/customer/login')}
          />
          <PathCard
            label="I offer a service"
            description="List your business and start getting bookings"
            accent={theme.colors.moss}
            onClick={() => navigate('/business/login')}
          />
        </div>
      </div>
    </div>
  )
}

function PathCard({ label, description, accent, onClick }: {
  label: string; description: string; accent: string; onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: theme.colors.white,
        border: `1px solid ${theme.colors.sandDark}`,
        borderRadius: '4px',
        padding: '36px 32px',
        width: '280px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'transform 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.borderColor = accent
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = theme.colors.sandDark
      }}
    >
      <div style={{ width: '32px', height: '3px', background: accent, marginBottom: '20px' }} />
      <h2 style={{ fontFamily: theme.font.display, fontSize: '22px', fontWeight: 600, marginBottom: '8px' }}>
        {label}
      </h2>
      <p style={{ fontSize: '14px', color: theme.colors.muted, lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  )
}

export default Home