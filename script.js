/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', rows => {
    const goalsScoredData = rows.map(row => row.GoalsScored)
    redraw(goalsScoredData)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yScale = 
  d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([height - 50, 0])

  const xScale =
  d3.scaleLinear()
  .domain([0, data.length])
  .range([50, width - 50])

  const bottomAxis = 
  d3.axisBottom(xScale)
  .ticks(data.length)

  const leftAxis = 
  d3.axisLeft(yScale)
  .ticks(d3.max(data))

  svg
  .selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('transform', 'translate(0, -25)')
  .attr('x', (d, idx) => xScale(idx))
  .attr('y', d => 300 - (yScale(0) - yScale(d)))
  .attr('width', 12)
  .attr('height', d => yScale(0) - yScale(d))
  .attr('fill', 'teal')

  svg.append('g')
  .attr('transform', 'translate(0, 275)')
  .call(bottomAxis)

  svg.append('g')
  .attr('height', 200)
  .attr('transform', 'translate(50, 25)')
  .call(leftAxis)
}

reload()
