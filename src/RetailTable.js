import React from 'react';
import "./RetailTable.css";
import { currencyFormat } from './Helpers';
 
function RetailTable(props) {
  const [sort, setSort] = React.useState({column: 0, direction: 'desc'});

  const clickHeader = React.useCallback((column) => {
    let direction;
    if (sort.column === column) {
      direction = sort.direction === 'asc' ? 'desc' : 'asc' ;
    } else {
      direction = 'asc';
    }
    setSort({column: column, direction: direction});
  }, [sort]);

  const sortedSales = React.useMemo(() => {
    const sales = [...props.product.sales];
    const columns = ['weekEnding', 'retailSales', 'wholesaleSales', 'unitsSold', 'retailerMargin'];
    sales.sort((a, b) => {
      if (a[columns[sort.column]] < b[columns[sort.column]]) {
        return sort.direction === 'asc' ? -1 : 1;
      } else {
        return sort.direction === 'asc' ? 1 : -1;
      }
    });
    return sales;
  }, [sort, props.product.sales])

  return (<div className="retail-table">
    <table className="retail-row">
      <tbody>
        <tr>
          <th onClick={e => clickHeader(0)}>
            Week Ending {sortArrow(0, sort)}
          </th>
          <th onClick={e => clickHeader(1)}>
            Retail Sales {sortArrow(1, sort)}
          </th>
          <th onClick={e => clickHeader(2)}>
            Wholesale Sales {sortArrow(2, sort)}
          </th>
          <th onClick={e => clickHeader(3)}>
            Units Sold {sortArrow(3, sort)}
          </th>
          <th onClick={e => clickHeader(4)}>
            Retailer Margin {sortArrow(4, sort)}
          </th>
        </tr>
        {sortedSales.map(sale => (
          <tr key={`table-sales-${sale.weekEnding}`}>
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
    {sort.column === column && sort.direction === 'asc' ? '▴' : '▾'}
  </span>
}
export default RetailTable;