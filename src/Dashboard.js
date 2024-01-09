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

  console.log('state', setState);

  return (<div className="dashboard">
    <Sidepanel></Sidepanel>
    <div className="infographics">
      <Linechart></Linechart>
      <RetailTable></RetailTable>
    </div>
  </div>)
}
export default Dashboard;
