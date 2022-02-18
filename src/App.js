import { Route, Routes, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import PageNotFound from './pages/PageNotFound';

import HomePage from './pages/HomePage'


function App() {

  const location = useLocation()

  return (

    <div className="App">

      <AnimatePresence exitBeforeEnter>

        <Routes location={location} key={location.pathname}>

          <Route path={'/'} element={<HomePage />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>

      </AnimatePresence>

    </div>

  );

}


export default App;
