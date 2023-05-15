import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import ReduxAsync from './ReduxAsync'
import customCounterReducer from '../src/features/customCounter/customCounterSlice'

describe('Redux Async Test', () => {
  let store

  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterReducer
      }
    })
  })

  it('should display value with 100 + payload per click', async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    )
    await userEvent.click(screen.getByText('FetchDummy'))
    expect(await screen.findByTestId('count-value')).toHaveTextContent('105')
  })
})
