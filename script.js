/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = [];
  d3.tsv('afcw-results.tsv', (games) => {
    for (game of games) {
      data.push(game.GoalsScored);
    }

    // console.log(data);
    redraw(data);
  });
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yScale = d3.scaleLinear()
    .domain([0, Math.max(...data)])
    .range([0, height-20]);

  const axisYScale = d3.scaleLinear()
    .domain([0, Math.max(...data)])
    .range([height-20, 0]);

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width]);

  const xAxis = d3.axisBottom(xScale).ticks(data.length);

  const yAxis = d3.axisRight(axisYScale).ticks(4)

  const t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return xScale(i);
  })
  .attr('y', (d) => {
    return 300 - yScale(d);
  })
  .attr('transform', 'translate(0,' + (height-20) + ')')
  .transition(t)
  .attr('width', 7)
  .attr('height', (d) =>{
    return yScale(d);
  })
  .attr('transform', 'translate(0,' + (-20) + ')')

  svg.selectAll('rect').transition(t).style("fill", "teal");

  svg.append('g').attr('transform', 'translate(0,' + (height-20) + ')').call(xAxis)

  svg.append('g').attr('transform', 'translate(0,' + (0) + ')').call(yAxis)
}

reload()
