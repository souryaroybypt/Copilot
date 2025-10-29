import React, { useEffect, useState } from 'react'
import { fetchJSON } from '../utils/api'

const Quotes = () => {
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        // Some projects use a 'quotes' endpoint or a remote JSON file.
        // We call the shared helper to keep error handling consistent.
        const data = await fetchJSON('quotes')
        setQuotes(data.quotes || [])
      } catch (err) {
        console.error('Failed to load quotes', err)
      }
    }
    load()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px',
        justifyContent: 'center'
      }}
    >
      {quotes.length > 0 ? (
        quotes.map(q => (
          <div
            key={q.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              width: '300px',
              padding: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            //   backgroundColor: '#fdfdfd'
            }}
          >
            <p style={{ fontSize: '16px', fontStyle: 'italic', marginBottom: '10px' }}>
              "{q.quote}"
            </p>
            <p style={{ fontWeight: 'bold', color: '#555', fontSize: '14px' }}>
              — {q.author}
            </p>
          </div>
        ))
      ) : (
        'Loading quotes...'
      )}
    </div>
  )
}

export default Quotes