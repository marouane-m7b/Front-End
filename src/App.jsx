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

axios.defaults.baseURL = "https://ofpptecomtest.infinityfreeapp.com/"
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.defaults.withCredentials = true
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('login_token')
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
})

function App() {





  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}



export default App;
