import React, { useMemo, useState } from 'react'

function getBmiCategory(bmi, reference) {
  if (reference === 'asian') {
    if (bmi < 18.5) return { name: 'Underweight', color: '#38bdf8', bg: '#e0f2fe' }
    if (bmi < 23) return { name: 'Healthy', color: '#22c55e', bg: '#dcfce7' }
    if (bmi < 27.5) return { name: 'Overweight', color: '#f59e0b', bg: '#fef3c7' }
    return { name: 'Obese', color: '#ef4444', bg: '#fee2e2' }
  } else {
    if (bmi < 18.5) return { name: 'Underweight', color: '#38bdf8', bg: '#e0f2fe' }
    if (bmi < 25) return { name: 'Healthy', color: '#22c55e', bg: '#dcfce7' }
    if (bmi < 30) return { name: 'Overweight', color: '#f59e0b', bg: '#fef3c7' }
    return { name: 'Obese', color: '#ef4444', bg: '#fee2e2' }
  }
}

const bmiRangesData = {
  caucasian: [
    { label: 'Under\nweight', range: '< 18.5', min: 0, max: 18.5, color: '#38bdf8' },
    { label: 'Healthy', range: '18.5 - 24.9', min: 18.5, max: 25, color: '#22c55e' },
    { label: 'Over\nweight', range: '25 - 29.9', min: 25, max: 30, color: '#f59e0b' },
    { label: 'Obese', range: '≥ 30', min: 30, max: 40, color: '#ef4444' }
  ],
  asian: [
    { label: 'Under\nweight', range: '< 18.5', min: 0, max: 18.5, color: '#38bdf8' },
    { label: 'Healthy', range: '18.5 - 22.9', min: 18.5, max: 23, color: '#22c55e' },
    { label: 'Over\nweight', range: '23 - 27.4', min: 23, max: 27.5, color: '#f59e0b' },
    { label: 'Obese', range: '≥ 27.5', min: 27.5, max: 40, color: '#ef4444' }
  ]
}

export default function App() {
  const [height, setHeight] = useState(177)
  const [weight, setWeight] = useState(79)
  const [reference, setReference] = useState('caucasian')

  const bmi = useMemo(() => {
    if (!height || !weight) return null
    const value = weight / Math.pow(height / 100, 2)
    return Number.isFinite(value) ? value : null
  }, [height, weight])

  const category = bmi ? getBmiCategory(bmi, reference) : null
  const bmiPos = bmi ? Math.min(39.9, Math.max(0, bmi)) : null
  const bmiRanges = bmiRangesData[reference]

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)', padding: 32, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gap: 28, gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))' }}>
        <div style={{ background: 'rgba(255,255,255,0.98)', borderRadius: 24, padding: 36, boxShadow: '0 25px 70px rgba(0,0,0,0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg,#667eea,#764ba2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
              ⚖️
            </div>
            <div>
              <p style={{ textTransform: 'uppercase', letterSpacing: 3, fontSize: 11, margin: 0, color: '#9ca3af', fontWeight: 600 }}>Health Monitor</p>
              <h1 style={{ margin: '4px 0 0', fontSize: 28, color: '#111827', fontWeight: 700 }}>BMI Calculator</h1>
            </div>
          </div>
          <p style={{ color: '#6b7280', lineHeight: 1.7, marginTop: 16 }}>
            Enter your measurements below. Your BMI updates automatically as you type.
          </p>
          
          <div style={{ marginTop: 24, padding: 16, background: '#f9fafb', borderRadius: 12, border: '2px solid #e5e7eb' }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 10 }}>Reference Standard</label>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setReference('caucasian')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 10,
                  border: reference === 'caucasian' ? '2px solid #667eea' : '2px solid #e5e7eb',
                  background: reference === 'caucasian' ? '#667eea' : '#fff',
                  color: reference === 'caucasian' ? '#fff' : '#374151',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Caucasian
              </button>
              <button
                onClick={() => setReference('asian')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 10,
                  border: reference === 'asian' ? '2px solid #667eea' : '2px solid #e5e7eb',
                  background: reference === 'asian' ? '#667eea' : '#fff',
                  color: reference === 'asian' ? '#fff' : '#374151',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Asian
              </button>
            </div>
          </div>

          <div style={{ marginTop: 28, display: 'grid', gap: 22 }}>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Height (cm)</label>
              <input
                type="number"
                min={120}
                max={220}
                step={1}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 12,
                  border: '2px solid #e5e7eb',
                  background: '#f9fafb',
                  color: '#111827',
                  fontSize: 16,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div>
              <label style={{ fontSize: 14, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>Weight (kg)</label>
              <input
                type="number"
                min={35}
                max={160}
                step={1}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: 14,
                  borderRadius: 12,
                  border: '2px solid #e5e7eb',
                  background: '#f9fafb',
                  color: '#111827',
                  fontSize: 16,
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.98)', borderRadius: 24, padding: 36, boxShadow: '0 25px 70px rgba(0,0,0,0.25)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ margin: 0, color: '#6b7280', fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 2 }}>Your BMI Score</p>
            <h2 style={{ margin: '12px 0 16px', fontSize: 64, color: category ? category.color : '#9ca3af', fontWeight: 700, lineHeight: 1 }}>
              {bmi ? bmi.toFixed(1) : '--'}
            </h2>
            {category && (
              <span style={{ 
                background: category.bg, 
                color: category.color, 
                padding: '10px 24px', 
                borderRadius: 999, 
                fontWeight: 700, 
                fontSize: 16,
                display: 'inline-block',
                border: `2px solid ${category.color}`
              }}>
                {category.name}
              </span>
            )}
          </div>

          <div>
            <p style={{ fontWeight: 700, color: '#111827', marginBottom: 14, fontSize: 15 }}>Health Spectrum</p>
            <div style={{ position: 'relative', height: 56, borderRadius: 16, overflow: 'visible', display: 'flex', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              {bmiRanges.map((range, idx) => (
                <div
                  key={range.label}
                  style={{
                    flex: range.max - range.min,
                    background: range.color,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    borderRight: idx < bmiRanges.length - 1 ? '2px solid rgba(255,255,255,0.3)' : 'none',
                    borderRadius: idx === 0 ? '16px 0 0 16px' : idx === bmiRanges.length - 1 ? '0 16px 16px 0' : '0',
                    padding: '4px 2px',
                    lineHeight: 1.2,
                    whiteSpace: 'pre-line',
                    textAlign: 'center'
                  }}
                >
                  {range.label}
                </div>
              ))}
              {bmiPos !== null && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      left: `${(bmiPos / 40) * 100}%`,
                      top: -8,
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '12px solid #111827',
                      transform: 'translateX(-50%)',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      zIndex: 10
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: `${(bmiPos / 40) * 100}%`,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: '#111827',
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 16px rgba(17,24,39,0.6)',
                      zIndex: 10
                    }}
                  />
                </>
              )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b7280', marginTop: 12, fontWeight: 600 }}>
              <span>0</span>
              <span>18.5</span>
              {reference === 'caucasian' ? (
                <>
                  <span>25</span>
                  <span>30</span>
                </>
              ) : (
                <>
                  <span>23</span>
                  <span>27.5</span>
                </>
              )}
              <span>40</span>
            </div>
          </div>

          <div style={{ marginTop: 32, borderTop: '2px solid #f3f4f6', paddingTop: 24, display: 'grid', gap: 14 }}>
            {bmiRanges.map((range) => (
              <div key={range.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 6, background: range.color, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
                  <strong style={{ color: '#111827', fontSize: 15 }}>{range.label.replace('\n', '')}</strong>
                </div>
                <span style={{ color: '#6b7280', fontWeight: 600, fontSize: 14 }}>{range.range}</span>
              </div>
            ))}
          </div>

          <footer style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid #f3f4f6', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>
            © {new Date().getFullYear()} tommyngx · BMI Health Dashboard
          </footer>
        </div>
      </div>
    </div>
  )
}
