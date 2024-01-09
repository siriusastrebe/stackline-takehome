import React from 'react';
import Linechart from "./Linechart";
import RetailTable from "./RetailTable";
import Sidepanel from "./Sidepanel";
import "./Dashboard.css";
import { fetchDashboardState } from "./Models";

function Dashboard() {
  const [state, setState] = React.useState();
  React.useEffect(() => {
    fetchDashboardState().then(state => {
      setState(state);
    })
  }, []);

  console.log('state', state);

  if (state && state[0]) {
    return (<div className="dashboard">
      <Sidepanel product={state[0]}></Sidepanel>
      <div className="infographics">
        <Linechart></Linechart>
        <RetailTable></RetailTable>
      </div>
    </div>)
  } else {
    <div className="loading">Loading...</div>
  }
}
export default Dashboard;
