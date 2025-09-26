import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('Calculator UI', () => {
  test('renders calculator display', () => {
    render(<App />)
    expect(screen.getByTestId('display')).toHaveTextContent('0')
  })

  test('number buttons update display', () => {
    render(<App />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('2'))
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  test('operator buttons update display', () => {
    render(<App />)
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('3'))
    expect(screen.getByText('7+3')).toBeInTheDocument()
  })

  test('calculates addition', () => {
    render(<App />)
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('7')
  })

  test('calculates subtraction', () => {
    render(<App />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('−'))
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('5')
  })

  test('calculates multiplication', () => {
    render(<App />)
    fireEvent.click(screen.getByText('6'))
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  test('calculates division', () => {
    render(<App />)
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('4')
  })

  test('clamps decimal input to 6 places', () => {
    render(<App />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('.'))
    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByText('2'))
    }
    expect(screen.getByText('1.222222')).toBeInTheDocument()
  })

  test('clamps result to 6 decimal places', () => {
    render(<App />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('0.333333')).toBeInTheDocument()
  })

  test('clear button resets input', () => {
    render(<App />)
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('C'))
    expect(screen.getByTestId('display')).toHaveTextContent('0')
  })

  test('delete button removes last character', () => {
    render(<App />)
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('DEL'))
    expect(screen.getByTestId('display')).toHaveTextContent('1')
  })

  test('shows Error for invalid expression', () => {
    render(<App />)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  test('shows Error for division by zero', () => {
    render(<App />)
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('Error')
  })
})