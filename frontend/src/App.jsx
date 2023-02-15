import {Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import ReviewDetails from './pages/ReviewDetails';
import Category from './pages/Category';
import Header from './components/Header'

import './index.less';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/"element={<Homepage />} />
        <Route path="/details/:id" element={<ReviewDetails />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </div>
  )
}

export default App
