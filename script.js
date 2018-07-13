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
  // let goalOnly = data.filter(a=> a.GoalsScored>0)
  let GoalsScored  = data.map(a => a.GoalsScored)
  var maxValue = d3.max(GoalsScored);

  var yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([margin, height-margin])


  var yScale2 = d3.scaleLinear()
      .domain([0, maxValue])
      .range([height-margin,margin])


  var xScale = d3.scaleLinear()
      .domain([0, GoalsScored.length])
      .range([0, width - marginLeft*2])

  let yAxis = d3.axisLeft(yScale2)
      .tickArguments([4, "s"]);

  let xAxis = d3.axisBottom(xScale)
      .tickArguments([20, "s"])

  svg.append("g")
      .attr("transform", "translate(40,0)")
      .call(yAxis)

  svg.append("g")
      .attr("transform", "translate(40,280)")
      .call(xAxis)

  svg.selectAll('rect')
      .data(GoalsScored)
      .enter()
      .append('rect')
      .attr('class','bar')
      .attr('x', (d,i)=>{
        return ( xScale(i))+marginLeft
      })
      .attr('y',height-margin)
      .transition().delay(500)
      .attr('y', (d)=>{
        return height - yScale(d) - margin + yScale(0)
      })
      .attr('width',(d,i)=>{
        return 12
      })
      .attr('height', (d)=>{
        return yScale(d)-yScale(0)
      })
      .attr('fill','darkgreen')


}

reload()
