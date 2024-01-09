import React from 'react';
import "./Linechart.css";
import * as d3 from "d3";

function Linechart(props) {
  const data = props.lineData;

  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const ref = React.useRef();
  console.log('data', data)
  
  const svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map((d) => d.x))
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybar")
    .data(data)
    .join("rect")
    .attr("x", (d) => x(d.x))
    .attr("y", (d) => y(d.y[0]))
    .attr("width", x.bandwidth())
    .attr("height", (d) => height - y(d.y[0]))
    .attr("fill", "#5f0f40");

  return (<div className="linechart">
    <svg width={460} height={400} id="linechart" ref={ref} />;
  </div>)
}
export default Linechart;