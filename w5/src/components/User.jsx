import React, { useEffect, useState } from 'react'
import { fetchJSON } from '../utils/api' // centralized API helper

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // use shared helper; it returns parsed JSON
        const data = await fetchJSON('users')
        setUsers(data.users || [])
      } catch (err) {
        console.error('Failed to fetch users', err)
      }
    }

    fetchUsers()
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
      {users.length > 0 ? (
        users.map(user => (
          <div
            key={user.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              width: '250px',
              padding: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: '#fdfdfd'
            }}
          >
            <img
              src={user.image}
              alt={user.firstName}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '10px'
              }}
            />
            <h3 style={{ fontSize: '18px', margin: '5px 0' }}>
              {user.firstName} {user.lastName}
            </h3>
            <p style={{ margin: '2px 0', color: '#555' }}>{user.gender}</p>
            <p style={{ margin: '2px 0', fontWeight: 'bold' }}>{user.age} years old</p>
            <p style={{ margin: '2px 0', color: '#777', fontSize: '14px' }}>
              {user.email}
            </p>
            <p style={{ margin: '2px 0', color: '#777', fontSize: '14px' }}>
              {user.phone}
            </p>
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
              {user.company.title} at {user.company.name}
            </p>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
              {user.address.address}, {user.address.city}, {user.address.state}
            </p>
          </div>
        ))
      ) : (
        'Loading users...'
      )}
    </div>
  )
}

export default Users