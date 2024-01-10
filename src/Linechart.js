import React from 'react';
import "./Linechart.css";
import * as d3 from "d3";
import { getStartOfNextMonth, monthAbbreviation } from './Helpers';

function LineChartSVG(props) {
  const data = props.lineData;
  const chartConfiguration = props.chartConfiguration;

  const margin = { top: 30, right: 30, bottom: 70, left: 60 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  const xScale = d3.scaleTime().domain(chartConfiguration.xDomain).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, chartConfiguration.yDomain[1]]).range([height, 0]);

  const linePaths = [];
  for (let i=0; i<chartConfiguration.count; i++) {
    linePaths.push(d3.line()
      .curve(d3.curveBumpX)
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
  }, [chartConfiguration.xDomain[0], chartConfiguration.xDomain[1]])

  return (
    <svg style={{width: '100%', height: 400}} id="linechart">
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {linePaths.map((linePath, i) => <path
          key={`line-path-${chartConfiguration.labels[i]}`}
          d={linePath(data)}
          stroke={chartConfiguration.colors[i]}
          fill="none"
          strokeWidth={2.5}
        />)}
        {months.map((month, i) => {
          return (
            <text x={xScale(month)} y={height + margin.bottom/2} textAnchor="middle" opacity={.4} fontSize={'smaller'}>{monthAbbreviation(month)}</text>
          )
        })}
      </g>
    </svg>
  )
}

function Linechart(props) {
  const data = props.lineData;
  const chartConfiguration = props.chartConfiguration;

  const ref = React.useRef();

  const [width, setWidth] = React.useState(0);
  React.useLayoutEffect(() => {
    function updateSize() {
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [ref.current]);

  return (<div className="linechart" ref={ref}>
    <div className="chart-title">Retail Sales</div>
    <LineChartSVG width={width} height={400} chartConfiguration={chartConfiguration} lineData={data} />
  </div>)
}
export default Linechart;