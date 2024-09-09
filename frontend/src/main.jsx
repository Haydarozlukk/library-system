import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // CSS dosyasını unutmayın

// React uygulamasını root'a render etme
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
