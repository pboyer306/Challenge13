import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Nav /> {/* Nav will render once, at the top of the layout */}
      <main>
        <Outlet /> {/* Children routes will render here */}
      </main>
    </>
  );
}

export default App;
