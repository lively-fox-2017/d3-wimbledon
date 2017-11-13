/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width + marginLeft)
  .attr('height', height)
  .style('background', '#eaeaea')
  .style('margin', '20px')

// Data reloading
let reload = () => {
  // Your data parsing here...
  let dataset = d3.tsv('afcw-results.tsv', function(rows) {
    // console.log(rows);

    redraw(rows)
  })
}

// redraw function
let redraw = (dataset) => {
  // Your data to graph here
  // console.log(dataset)

  let arrGoalsScored = dataset.map((goal) => {
    return goal.GoalsScored
  })

  console.log(arrGoalsScored);

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(arrGoalsScored)])
                   .range([0, (height - margin)]);

  const yAxis = d3.axisLeft().scale(yScale)
  svg.append('g').attr('class', 'yaxis').attr('transform', 'translate(30, 0)').call(yAxis)

  const xScale = d3.scaleLinear()
                   .domain([0, arrGoalsScored.length])
                   .range([0, width])

  const xAxis = d3.axisBottom().scale(xScale)
  svg.append('g').attr('class', 'xaxis').attr('transform', 'translate(30,'+ (height - 20) +')').call(xAxis)

  const bgcolor = d3.scaleLinear()
                  .domain([0, d3.max(arrGoalsScored)])
                  .range(['red', 'black'])

  svg.selectAll('rect')
      .data(arrGoalsScored)
      .enter()
      .append('rect')
      .attr('class', 'wresults')
      .attr('x', function(d, index) {
        return xScale(index) + 30
      })
      .attr('y', function(d) {
        return height - yScale(d) - 20
      })
      .attr('width', '10')
      .attr('height', function(d) {
        return yScale(d)
      })
      .attr('fill', bgcolor)
      .transition()
      .duration(1000)
      .ease()
}

reload()
