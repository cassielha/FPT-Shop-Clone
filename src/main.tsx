import { scan } from 'react-scan';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


// React scan
scan({
  enabled: true,
});


import App from './App.tsx'

import './assets/css/tailwind_output.css'
import './assets/css/style.css';
import './assets/css/scroll_top.css';
import './assets/css/badge.css';
import './assets/css/categories.css';
import './assets/css/header_web.css';
import './assets/css/slider.css';
import './assets/css/custom_slider.css';

import './assets/css/feature.css';
import './assets/css/article.css';
import './assets/css/accordion.css';
import './assets/css/carousel_arrow.css';
import './assets/css/footer.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
