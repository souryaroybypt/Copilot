/**
 * Lightweight shared API helper used by components.
 * Keeps component code minimal and centralizes base URL + error handling.
 *
 * Usage:
 *   import { fetchJSON } from '../utils/api'
 *   const data = await fetchJSON('users')         // calls https://dummyjson.com/users
 *   const raw = await fetchJSON('https://...')    // absolute URL supported
 */

const DEFAULT_BASE = 'https://dummyjson.com'

/**
 * Fetch JSON from the API.
 * - If `endpoint` is a full URL (starts with http) it is used as-is.
 * - Otherwise `DEFAULT_BASE` is prepended.
 *
 * @param {string} endpoint - path (eg. 'users', 'products/1') or full URL
 * @param {RequestInit} [options] - fetch options
 * @returns {Promise<any>} - parsed JSON response
 * @throws {Error} when network or non-2xx response occurs
 */
export async function fetchJSON(endpoint, options) {
  const url = typeof endpoint === 'string' && endpoint.startsWith('http')
    ? endpoint
    : `${DEFAULT_BASE}/${endpoint.replace(/^\/+/, '')}`

  const res = await fetch(url, options)
  if (!res.ok) {
    // expose useful failure message for components/tests
    const text = await res.text().catch(() => '')
    throw new Error(`API error ${res.status} ${res.statusText} - ${text}`)
  }
  return res.json()
}

/**
 * Convenience wrappers (optional)
 */
export const getUsers = () => fetchJSON('users')
export const getProducts = () => fetchJSON('products')
export const getQuotes = () => fetchJSON('quotes')