import { render, screen, cleanup } from '@testing-library/react'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MockServer from './MockServer'

import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'Bred dummy' }))
  })
)

beforeAll(() => server.listen())

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => server.close())

describe('Mocking API', () => {
  it('fetch success should display fetched data collectry and button disabled', async () => {
    render(<MockServer />)
    await userEvent.click(screen.getByRole('button'))
    expect(await screen.findByRole('heading')).toHaveTextContent('Bred dummy')
    expect(await screen.findByRole('button')).toHaveAttribute('disabled')
  })
  it('fetch failure should display error msg, no render heading and button abled', async () => {
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/users/1', (req, res, ctx) => {
        return res(ctx.status(404))
      })
    )
    render(<MockServer />)
    await userEvent.click(screen.getByRole('button'))
    expect(await screen.findByTestId('error')).toHaveTextContent('Fetching Failed!')
    expect(screen.queryByRole('heading')).toBeNull()
    expect(await screen.findByRole('button')).not.toHaveAttribute('disabled')
  })
})
