import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.scss'
import { store } from './store/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
);
