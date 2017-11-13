/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20,
  marginLeft = 40,
  scaleFactor = 100

// Drawing area
// let svg = d3.select('#results')
//   .append('svg')
//   .attr('width', width)
//   .attr('height', height)

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    console.log(JSON.stringify(rows))
    let afcwResult = rows.map(item => {
      return parseInt(item.GoalsScored)
    })
    // let haha = [5,10,12]
    redraw(afcwResult)
    // redraw(haha)
    // alert(JSON.stringify(afcwResult))
  })
}


// redraw function
let redraw = (data) => {
  // Your data to graph here
  var bar = svg.selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function (d, i) {
      return "translate(" + i * width/data.length + ",0)";
    });  

  // alert(JSON.stringify(bar))

  bar.append("rect")
    .attr("y", function(d){return height - d*50})
    .attr("height", function (d) {
      return d * scaleFactor;
    })
    .attr("width", 10);

  var x_axis = d3.axisBottom()
  var y_axis = d3.axisLeft()

  svg.append("g")
    // .attr("transform", "translate(0," + height + ")")
    .call(x_axis)

  // Add the Y Axis
  svg.append("g")
    .call(y_axis)

  // bar.append("text")
  //   .attr("x", function (d) { return (d * 50); })
  //   .attr("y", function(d){return 100})
  //   .attr("dy", ".35em")
  //   .text(function (d) { return d; });
}

reload()
