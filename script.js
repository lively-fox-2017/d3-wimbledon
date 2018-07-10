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
  d3.tsv('afcw-results.tsv', (rows) => {
    let dataMap = rows.map(row => {
      return row.GoalsScored
    })
    redraw(dataMap)    
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(data)])
                   .range([0, height])
  const xScale = d3.scaleLinear()
                   .domain([0, data.length])
                   .range([0, width])
  let rect = svg.selectAll('rect')
                .data(data)
                .enter()
                .append("rect")
                .attr('class', 'bar')
                .attr('x', (d, i) => { return 25 * (i + 1.2) })
                .attr('y', (d) => { return (height - 20) - yScale(d)})
                .attr('width', 20 + 'px')
                .attr('height', (d) => { return yScale(d) })
                .attr('')
                let yAxis = d3.axisLeft().scale(yScale)
                let xAxis = d3.axisBottom().scale(xScale)            
                svg.append('g')
                .attr('transform', 'translate(30, 5)')
                .call(yAxis)
                svg.append('g')
                .attr('transform', 'translate(5, 280)')
                .call(xAxis)
}
reload()