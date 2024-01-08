import Linechart from "./Linechart";
import RetailTable from "./RetailTable";
import Sidepanel from "./Sidepanel";
import "./Dashboard.css";

function Dashboard() {
  return (<div className="dashboard">
    <Sidepanel></Sidepanel>
    <div className="infographics">
      <Linechart></Linechart>
      <RetailTable></RetailTable>
    </div>
  </div>)
}
export default Dashboard;
