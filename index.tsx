
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("IDR Minier: Booting system...");

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
    console.log("IDR Minier: React render initiated");
    
    // Fallback: Jika setelah 3 detik masih blank, coba panggil ready secara manual
    setTimeout(() => {
      if (rootElement.innerHTML === "") {
        console.error("IDR Minier: Root is still empty after 3s!");
      }
    }, 3000);

  } catch (err) {
    console.error("IDR Minier Critical Error:", err);
    rootElement.innerHTML = `
      <div style="height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; background:#0a0a0c; color:#eab308; font-family:sans-serif; text-align:center; padding:20px;">
        <h1 style="font-size:24px; margin-bottom:10px;">BOOT FAILURE</h1>
        <p style="color:#666; font-size:14px;">Terjadi kegagalan pada modul inisialisasi.</p>
        <button onclick="location.reload()" style="margin-top:20px; background:#eab308; color:black; border:none; padding:15px 30px; border-radius:12px; font-weight:bold; cursor:pointer;">REPAIR & RELOAD</button>
      </div>
    `;
  }
}
