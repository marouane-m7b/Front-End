import './App.css';
import './css/master.css'
import './css/framework.css'
import './css/all.min.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import AppRoutes from './AppRoutes';
// Import necessary dependencies
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faPlus);

/* axios.defaults.baseURL = "https://ofpptecomtest.000webhostapp.com/"
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.defaults.withCredentials = true
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('login_token')
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
}) */

// Set base URL for your Laravel API
axios.defaults.baseURL = "https://ofpptecomtest.000webhostapp.com/";

// Set default headers for POST requests
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

// Allow sending cookies with cross-origin requests
axios.defaults.withCredentials = true;

// Intercept requests and add Authorization header with token if available
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('login_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  
  // Laravel CSRF Protection
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken.content;
  }

  // Laravel Sanctum API Token (optional)
  // If you're using Laravel Sanctum for API token authentication
  // const apiToken = localStorage.getItem('api_token');
  // config.headers['Authorization'] = apiToken ? `Bearer ${apiToken}` : '';

  return config;
});

// Intercept responses and handle unauthorized errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);



function App() {





  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}



export default App;
