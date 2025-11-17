import React, { useState } from 'react'

function getBmiCategory(bmi) {
  if (bmi < 18.5) return 'Gầy'
  if (bmi < 25) return 'Bình thường'
  if (bmi < 30) return 'Thừa cân'
  return 'Béo phì'
}

export default function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [category, setCategory] = useState('')

  const bmiRanges = [
    { label: 'Gầy', min: 0, max: 18.5, color: '#38bdf8' },
    { label: 'Bình thường', min: 18.5, max: 25, color: '#22c55e' },
    { label: 'Thừa cân', min: 25, max: 30, color: '#facc15' },
    { label: 'Béo phì', min: 30, max: 40, color: '#ef4444' }
  ]

  const handleSubmit = (event) => {
    event.preventDefault()
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)

    if (!h || !w) {
      setBmi(null)
      setCategory('')
      return
    }

    const bmiValue = w / (h * h)
    setBmi(bmiValue)
    setCategory(getBmiCategory(bmiValue))
  }

  const bmiPos = bmi && bmi > 0 ? Math.min(40, Math.max(0, bmi)) : null

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 24, maxWidth: 420, margin: '0 auto', background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 12px #0001' }}>
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ margin: 0, color: '#2563eb' }}>BMI Calculator</h1>
        <p style={{ color: '#64748b', margin: 0 }}>Tính chỉ số khối cơ thể (Body Mass Index)</p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label>
          Chiều cao (cm):
          <input
            type="number"
            min="80"
            max="250"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #cbd5e1' }}
            required
          />
        </label>
        <label>
          Cân nặng (kg):
          <input
            type="number"
            min="20"
            max="250"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #cbd5e1' }}
            required
          />
        </label>
        <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: 10, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
          Tính BMI
        </button>
      </form>

      <div style={{ marginTop: 32, marginBottom: 8 }}>
        <div style={{ fontWeight: 600, color: '#334155', marginBottom: 6 }}>Biểu đồ vùng BMI</div>
        <div style={{ position: 'relative', height: 32, background: '#e5e7eb', borderRadius: 8, display: 'flex', overflow: 'hidden' }}>
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
                fontSize: 13,
                fontWeight: 600,
                opacity: 0.85,
                borderRight: idx < bmiRanges.length - 1 ? '2px solid #f1f5f9' : 'none'
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
                top: 0,
                bottom: 0,
                width: 3,
                background: '#0ea5e9',
                borderRadius: 2,
                boxShadow: '0 0 6px #0ea5e9',
                zIndex: 2,
                transition: 'left 0.3s'
              }}
            />
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginTop: 2 }}>
          <span>0</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>40+</span>
        </div>
      </div>

      {bmi && (
        <div style={{ marginTop: 24, textAlign: 'center', background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#2563eb' }}>BMI: {bmi.toFixed(2)}</div>
          <div style={{ fontSize: 18, marginTop: 8, color: '#0f172a' }}>
            Phân loại: <strong>{category}</strong>
          </div>
        </div>
      )}

      <footer style={{ marginTop: 32, textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
        © {new Date().getFullYear()} tommyngx — BMI App
      </footer>
    </div>
  )
}
