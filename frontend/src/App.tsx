import { useEffect, useState } from 'react'
import { fetchCount, increaseCount, resetCount } from './lib/api'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleIncrement = async () => {
    try {
      setLoading(true)
      const nextCount = await increaseCount()
      setCount(nextCount)
    } catch (err) {
      console.error('Error fetching count:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    try {
      setLoading(true)
      const newCount = await resetCount()
      setCount(newCount)
    } catch (err) {
      console.error('Error resetting count:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function loadInitialCount() {
      try {
        setLoading(true)
        const initialCount = await fetchCount()
        setCount(initialCount)
      } catch (err) {
        console.error('Error fetching initial count on mount:', err)
      } finally {
        setLoading(false)
      }
    }

    loadInitialCount()
  }, [])

  return (
    <>
      <header className="foundry-header">
        <pre className="foundry-ascii">
{`███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ ██████╗ ██╗   ██╗
██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗██╔══██╗╚██╗ ██╔╝
█████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║██████╔╝ ╚████╔╝ 
██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║██╔══██╗  ╚██╔╝  
██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝██║  ██║   ██║   
╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   `}
        </pre>
        <p className="foundry-subtitle">─── Polyglot Full-Stack Scaffolder ───</p>
      </header>

      <section id="center">
        <div>
          <h1>Get started</h1>
          <p>Edit <code>frontend/src/App.tsx</code> for frontend or <code>backend/main.py</code> for backend also </p>
          <p>Edit for front-back connection <code>frontend/lib/api.ts</code></p>
          
          <br></br>
      
          <p className="connection-badge">
            ⚡ Backend (FastAPI) and Frontend (React) are already connected!
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            className="counter"
            onClick={handleIncrement}
            disabled={loading}
          >
            {loading ? 'Updating from backend...' : `Count is ${count}`}
          </button>
          <button
            type="button"
            className="counter"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </button>
        </div>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
    </>
  )
}

export default App