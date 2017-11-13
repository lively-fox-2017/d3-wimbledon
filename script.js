/* global d3 */

// Our canvas
const width = 1000,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width + 40)
  .attr('height', height)

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
    .range([0, height])

  const xScale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width])

  const yScaleAxis = d3.scaleLinear()
    .domain([d3.max(data.map(element => element.GoalsScored)), 0])
    .range([0, 300])

  const xAxis = d3.axisBottom(xScale)

  const yAxis = d3.axisLeft(yScaleAxis)

  // Your data to graph here
  let yAxisGroup = svg.append('g')
      .attr('transform', 'translate(40, -15)')
      .call(yAxis)
  let xAxisGroup = svg.append('g')
      .attr('transform', `translate(40, ${height - 15})`)
      .call(xAxis)

  let bar = svg.selectAll('rect')
    .data(data)
      .enter()
      .append('rect')
      .attr('transform', 'translate(40, -15)')
      .attr('class', 'bar')
      .attr('width', 20)
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => height)
      .attr('height', 0)
      .transition()
        .duration(700)
        .ease(d3.easeLinear)
        .attr('y', (d) => height - yScale(d.GoalsScored))
        .attr('height', d => yScale(d.GoalsScored))
        .attr('fill', d => colorScale(d.GoalsScored))
}

reload()
