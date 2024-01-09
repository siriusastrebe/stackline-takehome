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

  const lineData = React.useMemo(() => {
    if (state) {
      return state[0].sales.map(sale => {
        return {
          x: new Date(sale.weekEnding),
          y: [sale.retailSales, sale.wholesaleSales],
        }
      });
    } else {
      return [];
    }
  }, [state])

  const chartConfiguration = React.useMemo(() => {

  }, [state]);

  if (state && state[0]) {
    return (<div className="dashboard">
      <Sidepanel product={state[0]}></Sidepanel>
      <div className="infographics">
        <Linechart product={state[0]}></Linechart>
        <RetailTable product={state[0]}></RetailTable>
      </div>
    </div>)
  } else {
    <div className="loading">Loading...</div>
  }
}
export default Dashboard;
