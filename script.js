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
  .style('background','#cacaca')

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv("afcw-results.tsv", (rows) => {
    let data = rows.map(x => {
      return x.GoalsScored
    })
    redraw(data)
    // console.log('asdfasd', rows);
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  // const g
  const yScale = d3.scaleLinear()
    .domain([0,10])
    .range([0, 800])

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['peru', 'teal'])

  // console.log('asdfasdfas', d3.max(data));

  var y_scale = d3.scaleLinear() // v4
  .domain([d3.max(data),0])
  .range([5, 280]); // clipped

  var x_scale = d3.scaleLinear() // v4
  .domain([0, data.length+1])
  .range([0, width-25]); // clipped



  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .transition().duration(700).ease(d3.easeLinear)
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return i * 25+25
    // return i
  })
  .attr('y', (d) => {
    // return 300 - d * 50
    return 280 - yScale(d)
  })
  .attr('width', 20)
  .attr('height', (d) => {
    // return d * 50
    return yScale(d)
  })
  .attr('fill', colorScale)

  //axis
  const y_axis = d3.axisLeft()
    .scale(y_scale)
  const x_axis = d3.axisBottom()
    .scale(x_scale)
  svg.append("g")
       .attr("transform", "translate(25, 0)")
       .call(y_axis);
  svg.append("g")
      .attr("transform", "translate(25, 280)")
      .call(x_axis);
}

reload()
