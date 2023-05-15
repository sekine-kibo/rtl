import axios from 'axios'
import React, { useState } from 'react'

const MockServer = () => {
  const [clicked, setClicked] = useState(false)
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const fetchUsername = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => {
        const { username } = res.data
        setUsername(username)
        setClicked(true)
      })
      .catch(() => {
        setError('Fetching Failed!')
      })
  }
  const buttonText = clicked ? 'Loaded' : 'Start Fetch'

  return (
    <div>
      <button onClick={fetchUsername} disabled={clicked}>
        {buttonText}
      </button>
      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  )
}

export default MockServer
