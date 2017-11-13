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
  .attr('height', height + margin)

// Data reloading
let reload = () => {
  // Your data parsing here...
  let data = []
  d3.tsv('afcw-results.tsv', function(rows){
    console.log(rows)
    let goals = rows.map(data=>{
      return data.GoalsScored
    })
    redraw(goals)
  })
}

// redraw function
colorScale = d3.scaleLinear()
yScale = d3.scaleLinear()
transition = d3.transition()

let redraw = (data) => {
  // Your data to graph here  
  // console.log(data)
  colorScale.domain([0, d3.max(data)]).range(['read','green'])
  yScale.domain([0, d3.max(data)]).range([0, height-margin])

  let X_Axis = d3.scaleLinear().domain([0, data.length]).range([0, width])
  let Y_Axis = d3.scaleLinear().domain([0, d3.max(data)]).range([height - margin, 0])
  
  let BarChart = width/data.length

  svg.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('fill', colorScale)
     .attr('class', 'bar')
     .attr('x', (d,i) => {return i * BarChart + marginLeft - 10})
     .attr('y', (d) => {return - yScale([0]) - margin})
     .attr('width', BarChart - 4)
     .transition()
     .duration(1500)
     .attr('height',(d) => {return yScale(d)})

  svg.append('g')
     .attr('class', 'axisSteelBlue')
     .attr('transform', `translate(${marginLeft - 10})`)
     .call(d3.axisLeft(X_Axis).ticks(d3.max(data)))
  
  svg.append('g')
     .attr('class', 'axisSteelBlue')
     .attr('transform', `translate(${marginLeft - 10}, ${height - margin})`)
     .call(d3.axisBottom(X_Axis).ticks(data.length))

}

reload()
