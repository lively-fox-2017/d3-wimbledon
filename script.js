/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40,
  scaleFactor = 100

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    // console.log(JSON.stringify(rows))
    let afcwResult = rows.map(item => {
      return parseInt(item.GoalsScored)
    })
    console.log(afcwResult)
    redraw(afcwResult)
    // alert(JSON.stringify(afcwResult))
  })
}


// redraw function
let redraw = (data) => {
  // Your data to graph here
  var linearScale = d3.scaleLinear()
      .domain([d3.min(data), d3.max(data)])
      .range([0, 280])

  // var vertiLinearScale = d3.scaleLinear()
  //     .domain([0,46])
  //     .range([0,width])

  var verticalScale = d3.scaleLinear()
    .domain([d3.max(data), d3.min(data)])
    .range([0, 280])

  var horizontalScale = d3.scaleLinear()
      .domain([0, data.length])
      .range([30, width])

  var bar = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + horizontalScale(i) + ",0)";
    });  

  bar.append("rect")
    .attr("y", function(d){return 280 - linearScale(d)})
    // .attr("x", function(d,i){
    //   return horizontalScale(i)
    // })
    .attr("height", function (d) {
      // return (d * 70)
      // return d *100
      return linearScale(d)
    })
    .attr("width",10)

  var x_scale = d3.axisBottom()
                .scale(horizontalScale)
  
  var y_scale = d3.axisLeft()
                .scale(verticalScale)

  svg.append("g")
    .attr("transform", "translate(0,280)")
    .call(x_scale)

  svg.append("g")
    .attr("transform", "translate(30,0)")
    // .tick()
    .call(y_scale)

  var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear)
  d3.selectAll("g").transition(t)
    .style("stroke", "teal")
    .style("fill", "teal")
    .duration(function (d, i) {
      return i * 100
    })
    .delay(function(d,i){
      return i *100
    })
}

reload()
