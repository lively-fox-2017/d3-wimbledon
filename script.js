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
  .style('background', '#eaeaea')

// Data reloading
let reload = () => {
  // Your data parsing here...
  const tes = d3.tsv('afcw-results.tsv', function (text) {
    redraw(text)
  })
}

// redraw function
let redraw = (data) => {
  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(element => element.GoalsScored))])
    .range(['red', 'green'])
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data.map(element => element.GoalsScored))])
    .range([0, 300])
  // Your data to graph here
  svg.selectAll('rect')
    .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => i * 22)
      .attr('y', (d) => 300 - d.GoalsScored * 70)
      .attr('width', 20)
      .attr('height', d => yScale(d.GoalsScored * 70))
      .attr('fill', d => colorScale(d.GoalsScored))
}

reload()
