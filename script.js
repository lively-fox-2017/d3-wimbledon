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
  let state = []
  d3.tsv('afcw-results.tsv', (rows) => {
  console.log(rows)
    state = rows
    redraw(state)
  })
}

// redraw function
let redraw = (state) => {
  // Your data to graph here
  let dataGoals = state.map((data) => {
    return data.GoalsScored
  })
  console.log('ini state data goals', dataGoals)

const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataGoals)])
    .range([0, height])

const xScale = d3.scaleLinear()
    .range([0, width])

    svg.selectAll('rect')
    .data(dataGoals)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      return i * 25
    })
    .attr('y', (d) => {
      return height - yScale(d)
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yScale(d)
    })
    .attr('fill', yScale)
}

reload()
