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
  let datascore = []

  d3.tsv('afcw-results.tsv', (rows) => {
    let datascore = rows
    // rows.forEach((roll) => {
    //   datascore.push(roll.GoalsScored)
    // })
    // datascore = rows

    redraw(datascore)
  })
}

// redraw function
let redraw = (data) => {
  let datascore = data.map((d) => {
    return d.GoalsScored
  })
  // Your data to graph here
  const yScale = d3.scaleLinear()
  .domain([0, d3.max(datascore)])
  .range([0, height])

  const xScale = d3.scaleLinear()
  .domain([0, datascore.length])
  .range([0, width])

  const colorScale = d3.scaleLinear()
  .domain([0, d3.max(datascore)])
  .range(['black', 'red'])

  const yAxisScale = d3.scaleLinear()
  .domain([0, d3.max(datascore)])
  .range([height - 20, 0])

  svg.selectAll('rect')
  .data(datascore)
  .enter()
  .append('rect')
  .transition().delay(100)
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return i * 25 + 25
  })
  .attr('y', (d) => {
    return height - yScale(d) - 20
  })
  .attr('width', 20)
  .attr('height', (d) => {
    return yScale(d)
  })
  .attr('fill', colorScale)

  let yAxis = d3.axisLeft().scale(yAxisScale)
  let xAxis = d3.axisBottom().scale(xScale)
  svg.append('g')
  .attr('transform', 'translate(25, 0)')
  .call(yAxis)
  svg.append('g')
  .attr('transform', 'translate(27, 280)')
  .call(xAxis)
}

reload()
