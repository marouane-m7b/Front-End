import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

// css blue
import '../public/assets/blue/css/LineIcons.3.0.css'
import '../public/assets/blue/css/tiny-slider.css'
import '../public/assets/blue/css/glightbox.min.css'
import '../public/assets/blue/css/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
//  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
//  </React.StrictMode>,
)
