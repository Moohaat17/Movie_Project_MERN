import {BrowserRouter as Routers, Routes, Route} from 'react-router-dom'
import Header from './layout/Header'
import MovieForm from './pages/MovieForm'


const App = () => {
  return (
    <>
      <Routers>
        <Header />
        <Routes>
          <Route path="/movieimg" element={<MovieForm />} />
        </Routes>
      </Routers>
    </>
  );
}

export default App