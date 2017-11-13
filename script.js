/* global d3 */

// Our canvas
const canvasWidth = 750,
      canvasHeight = 300,
      canvasMargin = 20
      canvasMarginLeft = 40

// Drawing area
d3.select('#results')
  .append('svg')
  .attr('width', canvasWidth)
  .attr('height', canvasHeight)

let svg = d3.select('svg')

// Data reloading
let reload = () => {
  d3.tsv('afcw-results.tsv', (games) => {

    const goals = [];

    games.forEach((game) => {
      goals.push(parseInt(game.GoalsScored))
    })

    const yScale = d3.scaleLinear()
                     .domain([0, Math.max(...goals)])
                     .range([0, canvasHeight])

    svg.selectAll('rect')
       .data(games)
       .enter()
       .append('rect')
       .attr('width', canvasMargin)
       .attr('height', (game) => {
          return game.GoalsScored * 60
       })
       .attr('x', (game, index) => {
          return index * 22
       })
       .attr('y', (game) => {
          return canvasHeight - game.GoalsScored * 60
       })
       .attr('fill', 'teal')
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

}

reload()
