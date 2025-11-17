import React, { useMemo, useState } from 'react'

function getBmiCategory(bmi) {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Healthy'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

const bmiRanges = [
  { label: 'Underweight', range: '0 - 18.4', min: 0, max: 18.5, color: '#38bdf8' },
  { label: 'Healthy', range: '18.5 - 24.9', min: 18.5, max: 25, color: '#22c55e' },
  { label: 'Overweight', range: '25 - 29.9', min: 25, max: 30, color: '#facc15' },
  { label: 'Obese', range: '30+', min: 30, max: 40, color: '#ef4444' }
]

export default function App() {
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(65)

  const bmi = useMemo(() => {
    if (!height || !weight) return null
    const value = weight / Math.pow(height / 100, 2)
    return Number.isFinite(value) ? value : null
  }, [height, weight])

  const category = bmi ? getBmiCategory(bmi) : ''
  const bmiPos = bmi ? Math.min(40, Math.max(0, bmi)) : null

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#e0f2ff,#f5f3ff)', padding: 32 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))' }}>
        <div style={{ background: '#0f172a', color: '#f8fafc', borderRadius: 20, padding: 32, boxShadow: '0 20px 60px #0f172a33' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: 4, fontSize: 12, margin: 0, color: '#94a3b8' }}>Wellness Toolkit</p>
          <h1 style={{ margin: '8px 0 16px', fontSize: 36 }}>Body Mass Index</h1>
          <p style={{ color: '#cbd5f5', lineHeight: 1.6 }}>
            Track your BMI in real time. Adjust the sliders and the dashboard instantly shows where you fall on the health spectrum.
          </p>
          <div style={{ marginTop: 32, display: 'grid', gap: 20 }}>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8' }}>Height (cm)</label>
              <input
                type="number"
                min={120}
                max={220}
                step={1}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: 12,
                  borderRadius: 12,
                  border: '1px solid #1e293b',
                  background: '#0b1220',
                  color: '#f8fafc',
                  fontSize: 16
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 14, color: '#94a3b8' }}>Weight (kg)</label>
              <input
                type="number"
                min={35}
                max={160}
                step={1}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  marginTop: 6,
                  padding: 12,
                  borderRadius: 12,
                  border: '1px solid #1e293b',
                  background: '#0b1220',
                  color: '#f8fafc',
                  fontSize: 16
                }}
              />
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 6 }}>Use whole numbers for quick adjustments. The dashboard updates automatically.</p>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 20, padding: 28, boxShadow: '0 20px 60px #0f172a22' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>Current BMI</p>
              <h2 style={{ margin: '8px 0 0', fontSize: 48, color: '#0f172a' }}>{bmi ? bmi.toFixed(1) : '--'}</h2>
            </div>
            <span style={{ background: '#e0f2ff', color: '#0369a1', padding: '8px 16px', borderRadius: 999, fontWeight: 600 }}>{category || 'Awaiting data'}</span>
          </div>

          <div style={{ marginTop: 32 }}>
            <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: 10 }}>BMI Spectrum</p>
            <div style={{ position: 'relative', height: 36, borderRadius: 999, overflow: 'hidden', display: 'flex' }}>
              {bmiRanges.map((range, idx) => (
                <div
                  key={range.label}
                  style={{
                    flex: range.max - range.min,
                    background: range.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 600,
                    borderRight: idx < bmiRanges.length - 1 ? '1px solid rgba(255,255,255,0.4)' : 'none'
                  }}
                >
                  {range.label}
                </div>
              ))}
              {bmiPos !== null && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${(bmiPos / 40) * 100}%`,
                    top: -6,
                    height: 48,
                    width: 3,
                    background: '#0f172a',
                    borderRadius: 999,
                    boxShadow: '0 0 12px rgba(15,23,42,0.4)'
                  }}
                />
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94a3b8', marginTop: 6 }}>
              <span>0</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40+</span>
            </div>
          </div>

          <div style={{ marginTop: 28, borderTop: '1px solid #e2e8f0', paddingTop: 20, display: 'grid', gap: 12 }}>
            {bmiRanges.map((range) => (
              <div key={range.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 4, background: range.color }} />
                  <strong style={{ color: '#0f172a' }}>{range.label}</strong>
                </div>
                <span style={{ color: '#64748b' }}>{range.range}</span>
              </div>
            ))}
          </div>

          <footer style={{ marginTop: 32, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            © {new Date().getFullYear()} tommyngx · React BMI Dashboard
          </footer>
        </div>
      </div>
    </div>
  )
}
