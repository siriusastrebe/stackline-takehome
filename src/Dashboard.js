import React from 'react';
import Linechart from "./Linechart";
import RetailTable from "./RetailTable";
import Sidepanel from "./Sidepanel";
import "./Dashboard.css";
import { fetchDashboardState } from "./Models";
import * as d3 from "d3";

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
  }, [state]);

  const chartConfiguration = React.useMemo(() => {
    return {
      count: 2,
      labels: ['Retail Sales', 'Wholesale Sales'],
      colors: ['#44a7f6', '#9aa5be'],
      xDomain: d3.extent(lineData.map((d) => d.x)),
      yDomain: d3.extent(lineData.map(d => Math.max(...d.y))),
    }
  }, [lineData]);

  if (state && state[0]) {
    return (<div className="dashboard">
      <Sidepanel product={state[0]}></Sidepanel>
      <div className="infographics">
        <Linechart product={state[0]} lineData={lineData} chartConfiguration={chartConfiguration}></Linechart>
        <RetailTable product={state[0]}></RetailTable>
      </div>
    </div>)
  } else {
    <div className="loading">Loading...</div>
  }
}
export default Dashboard;
