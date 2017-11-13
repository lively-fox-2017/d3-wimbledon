/* global d3 */

// Our canvas
const canvasMargin = 20
      canvasMarginLeft = 40
      canvasWidth = 750,
      canvasHeight = 300,

// Drawing area
d3.select('#results')
  .append('svg')
  .attr('width', canvasWidth)
  .attr('height', canvasHeight)

let svg = d3.select('svg')

// Data reloading
let reload = () => {
  d3.tsv('afcw-results.tsv', (games) => {
    redraw(games)
  })
}

// redraw function
let redraw = (games) => {
  // Your data to graph here
  const goals = [];

  games.forEach((game) => {
    goals.push(parseInt(game.GoalsScored))
  })

  const xScale = d3.scaleLinear()
                   .domain([0, games.length])
                   .range([0, canvasWidth - canvasMargin])

  const yScale = d3.scaleLinear()
                   .domain([0, Math.max(...goals)])
                   .range([canvasHeight - canvasMargin, 0])

  svg.selectAll('rect')
     .data(games)
     .enter()
     .append('rect')
     .attr('width', canvasMargin / 2)
     .attr('height', (game) => {
       return yScale(0) - yScale(game.GoalsScored)
     })
     .attr('x', (game, index) => {
       return xScale(index)
     })
     .attr('y', (game) => {
       return yScale(game.GoalsScored)
     })
     .attr('fill', 'teal')
}

reload()
