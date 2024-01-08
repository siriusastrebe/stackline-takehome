import Linechart from "./Linechart";
import RetailTable from "./RetailTable";
import Sidepanel from "./Sidepanel";

function Dashboard() {
  return (<div>
    <Sidepanel></Sidepanel>
    <Linechart></Linechart>
    <RetailTable></RetailTable>
  </div>)
}
export default Dashboard;
