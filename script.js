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
  console.log(rows)
    svg
    .selectAll('rect')
    .data(rows)
    .enter()
    .append('rect')
    .attr('width', 20)
    .attr('height', 201)
    .attr('fill', '#0000')
    .attr('x', (d, i) => {
      return i * 25
    })
    .attr('y', (d, i) => {
      return i
    })
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

}

reload()
