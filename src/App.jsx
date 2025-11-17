import React from 'react'

function Feature({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <h3 style={{ margin: '6px 0' }}>{title}</h3>
      <p style={{ margin: 0 }}>{children}</p>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 24, maxWidth: 860, margin: '0 auto' }}>
      <header>
        <h1 style={{ marginBottom: 6 }}>React101</h1>
        <p style={{ marginTop: 0, color: '#374151' }}>Ứng dụng React nhỏ để demo deploy lên GitHub Pages.</p>
      </header>

      <main style={{ marginTop: 20 }}>
        <section style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 8 }}>Giới thiệu</h2>
          <p style={{ marginTop: 0 }}>
            Đây là một project khởi tạo bằng Vite + React. Mục tiêu là một ví dụ đơn giản để triển khai lên
            GitHub Pages tại đường dẫn <strong>https://tommyngx.github.io/react101</strong>.
          </p>
        </section>

        <section style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 8 }}>Tính năng</h2>
          <Feature title="Khởi động nhanh">Sử dụng Vite để dev server rất nhanh và build tối ưu cho production.</Feature>
          <Feature title="Cấu trúc rõ ràng">File nhỏ, dễ chỉnh sửa: mở `src/App.jsx` để sửa nội dung.</Feature>
          <Feature title="Sẵn sàng deploy">Workflow Actions đã được thêm sẵn để deploy lên GitHub Pages tự động.</Feature>
        </section>

        <section style={{ marginBottom: 18 }}>
          <h2 style={{ marginBottom: 8 }}>Hướng dẫn nhanh</h2>
          <ol>
            <li>Chạy `npm install` để cài dependencies.</li>
            <li>Chạy `npm run dev` để xem bản dev.</li>
            <li>Push lên repo `main` — Actions sẽ build và deploy vào vài phút.</li>
          </ol>
        </section>

        <section>
          <h2 style={{ marginBottom: 8 }}>Liên kết</h2>
          <ul>
            <li><a href="https://github.com/tommyngx/react101" target="_blank" rel="noreferrer">Repo trên GitHub</a></li>
            <li><a href="https://tommyngx.github.io/react101" target="_blank" rel="noreferrer">Trang GitHub Pages (sau khi deploy)</a></li>
          </ul>
        </section>
      </main>

      <footer style={{ marginTop: 30, borderTop: '1px solid #e5e7eb', paddingTop: 12, color: '#6b7280' }}>
        © {new Date().getFullYear()} tommyngx — React101 (v1.0)
      </footer>
    </div>
  )
}
