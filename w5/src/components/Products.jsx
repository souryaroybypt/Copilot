import React, { useEffect, useState } from 'react'
import { fetchJSON } from '../utils/api'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchJSON('products')
        setProducts(data.products || [])
      } catch (err) {
        console.error('Failed to load products', err)
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
      {products.length > 0 ? (
        products.map(p => (
          <div
            key={p.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '250px',
              padding: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '5px',
                marginBottom: '10px'
              }}
            />
            <h3 style={{ fontSize: '18px', margin: '5px 0' }}>{p.title}</h3>
            <p style={{ margin: '2px 0', color: '#555' }}>{p.brand}</p>
            <p style={{ margin: '2px 0', fontWeight: 'bold' }}>${p.price}</p>
            <p style={{ margin: '2px 0', color: p.stock > 0 ? 'green' : 'red' }}>
              {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <p style={{ fontSize: '14px', color: '#777', marginTop: '10px' }}>
              {p.description.length > 60
                ? p.description.slice(0, 60) + '...'
                : p.description}
            </p>
          </div>
        ))
      ) : (
        'Loading products...'
      )}
    </div>
  )
}

export default Products