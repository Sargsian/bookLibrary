import { Route, Routes, useLocation } from 'react-router-dom';
import Modal from './components/Modal';
import HomePage from './screens/HomePage';

function App() {
  const location = useLocation();

  

  let state = location.state as { background?: Location };
  return (
    <>
      <Routes location={state?.background || location}>
        <Route path='/' element={<HomePage />}>
          <Route path='/:bookId' element={<Modal />} />
        </Route>
      </Routes>
      {state?.background && (
        <Routes>
          <Route path='/:bookId' element={<Modal />} />
        </Routes>
      )}
    </>
  );
}

export default App;
