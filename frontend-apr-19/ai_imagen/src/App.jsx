import './App.css'
import Uploads from "./components/uploads/page"
import Output from "./components/output/page"
import Footer from "./components/footer/page"
import { Link } from 'react-router-dom'

function App() {

  return (
    <>
      <header className='w-screen flex justify-around items-center h-20'>
        <div>
          <h1 className='text-4xl font-extrabold'>AI ImageGen</h1>
        </div>
        <div className='flex'>
          <p className=''>User:</p>
          <p>Miranda</p>
        </div>
      </header>
      <nav className='w-screen h-10 flex items-center justify-center'>
        <ul className='w-full flex justify-around items-center'>
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>
          
          <Link to="/contacts">
            <li>Contacts</li>
          </Link>
        </ul>
      </nav>
      <Uploads />
      <Output />
      <Footer />
    </>
  )
}

export default App
