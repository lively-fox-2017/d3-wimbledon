/* global d3 */

// Our canvas
const canvasMargin = 20
      canvasMarginLeft = 40
      canvasWidth = 750,
      canvasHeight = 300,

// Drawing area
d3.select('#results')
  .append('svg')
  .attr('width', canvasWidth + canvasMarginLeft)
  .attr('height', canvasHeight + canvasMargin)
  .append('g')
  .attr('transform', `translate(${canvasMarginLeft}, ${canvasMargin})`)

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
                   .domain([0, games.length + 1])
                   .range([0, canvasWidth - canvasMargin])

  const yScale = d3.scaleLinear()
                   .domain([0, Math.max(...goals)])
                   .range([(canvasHeight - (canvasMargin / 2)) - (canvasMarginLeft + 10), 0])

  svg.selectAll('rect')
     .data(games)
     .enter()
     .append('rect')
     .attr('height', 0)
     .attr('y', yScale(-(canvasMargin / 100)))
     .attr('width', canvasMargin / 2)
     .attr('x', (game, index) => {
       return xScale(index) + canvasMarginLeft
     })
     .transition()
     .duration(600)
     .delay((game, index) => { return index * 100 })
     .attr('height', (game) => {
       return yScale(0) - yScale(game.GoalsScored)
     })
     .attr('y', (game) => {
       return yScale(game.GoalsScored) + (canvasMargin / 2)
     })
     .attr('fill', 'teal')

  svg.append('g')
     .attr('transform', 'translate('+ canvasMarginLeft +','+ (canvasHeight - ((canvasMarginLeft + 10))) +')')
     .call(d3.axisBottom(xScale).tickValues(d3.range(0, games.length + 1)))

  svg.append('g')
     .attr('transform', 'translate(40, 10)')
     .call(d3.axisLeft(yScale).tickValues(d3.range(0, Math.max(...goals) + 1)))
}

reload()
