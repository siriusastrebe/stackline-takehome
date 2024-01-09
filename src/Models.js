import DashboardState from './reducers';

export async function fetchDashboardState() {
  // Stubbed out, using local JSON data while backend is being developed
  // const response = await fetch('/api/dashboard');
  const response = await fetch(process.env.PUBLIC_URL + '/data.json');

  console.log('a', response);

  const json = await response.json();
  console.log('b', json);

  DashboardState.dispatch({
    type: 'SET',
    state: json
  });

  return DashboardState.getState();
}