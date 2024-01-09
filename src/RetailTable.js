import React from 'react';
import "./RetailTable.css";
import { currencyFormat } from './Helpers';
 
function RetailTable(props) {
  const [sort, setSort] = React.useState({column: 0, direction: 'asc'});

  return (<div className="retail-table">
    <table className="retail-row">
      <tbody>
        <tr>
          <th>
            Week Ending {sortArrow(0, sort)}
          </th>
          <th>
            Retail Sales {sortArrow(1, sort)}
          </th>
          <th>
            Wholesale Sales {sortArrow(2, sort)}
          </th>

          <th>
            Units Sold {sortArrow(3, sort)}
          </th>

          <th>
            Retailer Margin {sortArrow(4, sort)}
          </th>
        </tr>
        {props.product.sales.map(sale => (
          <tr>
            <td>{sale.weekEnding}</td>
            <td>{currencyFormat(sale.retailSales)}</td>
            <td>{currencyFormat(sale.wholesaleSales)}</td>
            <td>{sale.unitsSold}</td>
            <td>{currencyFormat(sale.retailerMargin)}</td>
          </tr>
        ))}
      </tbody> 
    </table>

  </div>)
}
function sortArrow(column, sort) {
  return <span className={`sortArrow ${sort.column === column ? 'active' : ''}`}>
    {sort.column === column && sort.direction === 'asc' ? '▾' : '▴'}
  </span>
}
export default RetailTable;