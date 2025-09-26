import React from 'react'
import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState('')

  const handleClick = (value) => {
    // If value is '.', clamp decimals to 6 places for the current number
    if (value === '.') {
      // Find the last number in the input
      const match = input.match(/(\d*\.\d*)$/)
      if (match) {
        // Already has a decimal point in the current number
        return
      }
      // Prevent starting with a decimal
      if (input === '' || /[+\-*/]$/.test(input)) {
        setInput((prev) => prev + '0.')
        return
      }
    } else {
      // If last number has a decimal, clamp to 6 places
      const parts = input.split(/([+\-*/])/)
      const last = parts[parts.length - 1]
      if (last.includes('.')) {
        const decimals = last.split('.')[1]
        if (decimals && decimals.length >= 6 && !/[+\-*/]/.test(value)) {
          return
        }
      }
    }
    setInput((prev) => prev + value)
  }

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    setInput('')
  }

  const handleEqual = () => {
    try {
      // Check for division by zero
      if (/\/0+(\.0*)?(?!\d)/.test(input.replace(/\s+/g, ''))) {
        setInput('Cannot divide by 0')
        setTimeout(() => setInput(''), 1200)
        return
      }
      // eslint-disable-next-line no-eval
      const result = eval(input)
      const clamped = typeof result === 'number'
        ? Number(result.toFixed(6))
        : result
      setInput(clamped.toString())
      setTimeout(() => setInput(''), 1200)
    } catch {
      setInput('Error')
      setTimeout(() => setInput(''), 1200)
    }
  }

  return (
    <div className="calculator-container">
      <div className="display" data-testid="display">{input || '0'}</div>
      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handleDelete}>DEL</button>
        <button onClick={() => handleClick('/')}>÷</button>
        <button onClick={() => handleClick('*')}>×</button>
        {[7,8,9].map(n => (
          <button key={n} onClick={() => handleClick(n.toString())}>{n}</button>
        ))}
        <button onClick={() => handleClick('-')}>−</button>
        {[4,5,6].map(n => (
          <button key={n} onClick={() => handleClick(n.toString())}>{n}</button>
        ))}
        <button onClick={() => handleClick('+')}>+</button>
        {[1,2,3].map(n => (
          <button key={n} onClick={() => handleClick(n.toString())}>{n}</button>
        ))}
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button> {/* Decimal button */}
        <button onClick={handleEqual}>=</button>
      </div>
    </div>
  )
}

export default App
