import { useState } from 'react';
import { Bug, Lock, LogIn, User } from 'lucide-react';
import { C } from '../../constants/colors';
import Card from '../ui/Card';
import Tag from '../ui/Tag';

const DEMO_CREDENTIALS = {
  username: 'admin@aedescapella.com',
  password: 'AedesCapellaAdmin123',
};

export default function LoginPage({ theme, onToggleTheme, onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (key) => (event) => {
    setForm(current => ({ ...current, [key]: event.target.value }));
    if (error) setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = form.username.trim();
    const password = form.password;

    if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
      onLogin({ username });
      return;
    }

    setError('Invalid credentials. Please try again.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      placeItems: 'center',
      padding: '32px',
      background: `radial-gradient(circle at top left, ${C.amberDim}, transparent 34%), radial-gradient(circle at bottom right, ${C.blue}22, transparent 28%), ${C.bg}`,
      fontFamily: 'Syne, sans-serif',
    }}>
      <div style={{
        width: 'min(1040px, 100%)',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: '24px',
        alignItems: 'stretch',
      }}>
        <Card style={{
          padding: '32px',
          background: `linear-gradient(160deg, ${C.surface}, ${C.surface2})`,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: '-80px auto auto -80px',
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: `${C.amber}14`,
            filter: 'blur(10px)',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${C.amberDim}, ${C.redDim})`,
                border: `1px solid ${C.amber}33`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Bug size={22} color={C.amber} />
              </div>
              <div>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: C.text,
                }}>
                  AedesCapella
                </div>
                <div style={{
                  marginTop: '6px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: C.amber,
                }}>
                  AIOT VECTOR SURVEILLANCE
                </div>
              </div>
            </div>

            <Tag color="amber">Secure Operator Access</Tag>

            <div style={{
              marginTop: '22px',
              fontSize: '38px',
              fontWeight: 700,
              lineHeight: 1.05,
              color: C.text,
              maxWidth: '12ch',
            }}>
              Monitor Sabang operations from one control room.
            </div>

            <div style={{
              marginTop: '16px',
              maxWidth: '58ch',
              color: C.textDim,
              fontSize: '15px',
              lineHeight: 1.6,
            }}>
              Sign in to review detections, inspect hotspot zones, manage nodes, and track fogging activity across the barangay network.
            </div>

            <div style={{
              marginTop: '28px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '14px',
            }}>
              {[
                ['Live detection monitoring', 'Real-time stream of mosquito detections and automated responses.'],
                ['Map-based prioritization', 'Hotspot map tuned for rapid sitio-level risk review.'],
                ['Node health visibility', 'Battery, uptime, and signal quality in one dashboard.'],
                ['Protected operator session', 'Simple login gate for local access control in demos.'],
              ].map(([title, text]) => (
                <div
                  key={title}
                  style={{
                    border: `1px solid ${C.border}`,
                    background: `${C.surface2}`,
                    borderRadius: '14px',
                    padding: '16px',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 700, color: C.text }}>{title}</div>
                  <div style={{ marginTop: '6px', fontSize: '12px', lineHeight: 1.5, color: C.textDim }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card style={{
          padding: '32px',
          alignSelf: 'center',
          background: C.surface,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: C.text }}>Login</div>
              <div style={{ marginTop: '8px', color: C.textDim, fontSize: '14px', lineHeight: 1.5 }}>
                Enter your operator credentials to open the dashboard.
              </div>
            </div>
            <button
              onClick={onToggleTheme}
              style={{
                border: `1px solid ${C.border}`,
                background: C.surface2,
                color: C.text,
                borderRadius: '999px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', marginBottom: '14px' }}>
              <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 700, color: C.textDim, letterSpacing: '0.04em' }}>
                USERNAME
              </div>
              <div style={{ position: 'relative' }}>
                <User size={16} color={C.textDim} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  value={form.username}
                  onChange={handleChange('username')}
                  placeholder="Enter username"
                  autoComplete="username"
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px 0 42px',
                    borderRadius: '12px',
                    border: `1px solid ${error ? C.red : C.border}`,
                    background: C.surface2,
                    color: C.text,
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            </label>

            <label style={{ display: 'block', marginBottom: '16px' }}>
              <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 700, color: C.textDim, letterSpacing: '0.04em' }}>
                PASSWORD
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={C.textDim} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    height: '46px',
                    padding: '0 14px 0 42px',
                    borderRadius: '12px',
                    border: `1px solid ${error ? C.red : C.border}`,
                    background: C.surface2,
                    color: C.text,
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
              </div>
            </label>

            {error && (
              <div style={{
                marginBottom: '16px',
                border: `1px solid ${C.red}55`,
                background: `${C.red}12`,
                color: C.red,
                borderRadius: '10px',
                padding: '10px 12px',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '11px',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '12px',
                border: `1px solid ${C.amber}44`,
                background: `linear-gradient(135deg, ${C.amber}, #d97706)`,
                color: '#fffaf2',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: `0 18px 30px ${C.amber}22`,
              }}
            >
              <LogIn size={16} />
              Sign In
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
