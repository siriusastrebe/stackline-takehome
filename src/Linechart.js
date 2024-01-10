import React from 'react';
import "./Linechart.css";
import * as d3 from "d3";
import { getFirstDayOfMonth, getStartOfNextMonth, monthAbbreviation } from './Helpers';

function Linechart(props) {
  const data = props.lineData;
  const chartConfiguration = props.chartConfiguration;

  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const xScale = d3.scaleTime().domain(chartConfiguration.xDomain).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, chartConfiguration.yDomain[1]]).range([height, 0]);

  const ref = React.useRef();
  
//   const svg = d3
//     .select(ref.current)
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// 
//   svg
//     .append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(d3.axisBottom(xScale))
//     .selectAll("text")
//     .attr("transform", "translate(-10,0)")
//     //.attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");
// 
//   svg.append("g").call(d3.axisLeft(yScale));
// 
//   for (let i=0; i<chartConfiguration.count; i++) {
// 
//     svg
//       .selectAll("mybar")
//       .data(data)
//       .join("rect")
//       .attr("x", (d) => xScale(d.x))
//       .attr("y", (d) => yScale(d.y[0]))
//       .attr("width", 9)
//       .attr("height", (d) => height - yScale(d.y[0]))
//       .attr("fill", "#5f0f40");
//   }

  const linePaths = [];
  for (let i=0; i<chartConfiguration.count; i++) {
    linePaths.push(d3.line()
      .curve(d3.curveMonotoneX)
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y[i])))
  }

  const months = React.useMemo(() => {
    // This creates x-axis labels that may not be inclusive of the start or end dates
    const m = [];
    let current = chartConfiguration.xDomain[0];
    while (current < chartConfiguration.xDomain[1]) {
      current = getStartOfNextMonth(current);
      m.push(current);
    }
    return m;
  }, chartConfiguration.xDomain[0], chartConfiguration.xDomain[1])

  return (<div className="linechart">
    <svg width={460} height={400} id="linechart" ref={ref}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {linePaths.map((linePath, i) => <path
          key={`line-path-${chartConfiguration.labels[i]}`}
          d={linePath(data)}
          stroke={chartConfiguration.colors[i]}
          fill="none"
          strokeWidth={1}
        />)}
        {months.map((month, i) => {
          return (
            <text x={xScale(month)} y={height + margin.bottom/2} textAnchor="middle">{monthAbbreviation(month)}</text>
          )
        })}
      </g>
    </svg>
  </div>)
}
export default Linechart;