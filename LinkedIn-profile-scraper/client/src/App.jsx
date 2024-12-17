import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';

function App() {
  const [type, setType] = useState()
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setType(event.target.value)
  }
  function handleClick() {
    setLoading(true)
    axios.post(`http://localhost:3000/user-data?id=${type}`)
      .then(() => {
        setLoading(false)
        setData("Please go to the link to find all the linkedIn users -  http://localhost:3000/fetch-all")
      })
      .catch(() => {
        setLoading(false)
        setData("error while fetching profile description");
      })
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>LinkedIn Profile Scraper</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }} className="card">
        <input onChange={handleChange} ></input>
        <Button style={{ width: "100px", alignSelf: "center" }} onClick={handleClick} startDecorator={loading ? <CircularProgress variant="solid" /> : null}>Fetch</Button>
      </div >
      <p className="read-the-docs">
        {data && <a>{JSON.stringify(data)}</a>}
      </p>
    </>
  )
}

export default App
