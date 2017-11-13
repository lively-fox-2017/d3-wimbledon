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
  // .style('padding', '0px 0px 20px 30px')
  // .style('background', '#cacaca')

// Data reloading
let reload = () => {
  // Your data parsing here...

  d3.tsv('afcw-results.tsv', (rows) => {
    let data = []
    for(let i= 0; i <= rows.length-1; i++) {

      data.push(rows[i].GoalsScored)
    }
    // redraw(rows)
    console.log('ini data', data)
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  console.log('test data yang di dapat', data.length)

  let yscale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 800])

  let colorScale =  d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['peru', 'teal'])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      // console.log('---->', d)
      return i * 25 + 25
    })
    .attr('y', (d) => {
      return 300 - yscale(d) -20
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yscale(d)
    })
    .attr('fill', colorScale)

  var scale = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([270, -5]);

  var y_axis = d3.axisLeft()
    .scale(scale);

  svg.append("g")
    .attr("transform", "translate(23, 10)")
    .call(y_axis);

  // bottom
  var xscale = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, width - 13]);

  var x_axis = d3.axisBottom()
    .scale(xscale);

  var xAxisTranslate = height + 10;

  svg.append("g")
    .attr("transform", "translate(22, 280)")
    .call(x_axis)

}

reload()
