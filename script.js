/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20 ,
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background','#eaeaea')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv',(rows)=>{
    redraw(rows)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  let GoalsScored  = data.map(a => a.GoalsScored)
  var maxValue = d3.max(GoalsScored);

  var yScale = d3.scaleLinear()
  .domain([0, maxValue])
  .range([0, height])

  var xScale = d3.scaleLinear()
  .domain([0, GoalsScored.length])
  .range([0, width])




  svg.selectAll('rect')
    .data(GoalsScored)
    .enter()
    .append('rect')
    .attr('class','bar')
    .attr('x', (d,i)=>{
      return i * 16
    })
    .attr('y', (d)=>{
      return height - yScale(d)
    })
    .attr('width',(d)=>{
      return 15
    })
    .attr('height', (d)=>{
      return yScale(d)
    })

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")

    svg.append("g")
          .call(xAxis);



}

reload()
