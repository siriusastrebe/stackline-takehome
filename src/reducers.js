import { configureStore } from '@reduxjs/toolkit'

function DashboardState(state = {}, action) {
  switch (action.type) {
    case 'SET':
      return action.state;
    default:
      return state;
  }
}

export default configureStore({reducer: DashboardState});