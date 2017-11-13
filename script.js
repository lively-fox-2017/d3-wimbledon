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

// Data reloading
let reload = () => {
  let data = []  
  d3.tsv('afcw-results.tsv', (rows) => {
    console.log(rows)
    for(var i = 0; i < rows.length; i++) {
      data.push(rows[i].GoalsScored)
    }

    redraw(data)
  })

  // Your data parsing here...
}

// redraw function
let redraw = (data) => {
  // Your data to graph here
  var linearScale = d3.scaleLinear()
                    .domain([d3.min(data), d3.max(data)])
                    .range([0,300])

  var verticalScale = d3.scaleLinear()
                    .domain([d3.max(data), d3.min(data)])
                    .range([0,280])

  var horizontalScale = d3.scaleLinear()
                    .domain([0, data.length])
                    .range([0,750])

  var bar = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(" + i * 750/data.length + ", 0)";
            });
  
  bar.append("rect")
      .attr("y", function(d) { return 280 - linearScale(d); })
      .attr("height", function(d) {
          return linearScale(d);
      })
      .attr("width", function(d, i) {
          return 13
      });

  var x_axis = d3.axisBottom()
              .scale(horizontalScale);

  var y_axis = d3.axisLeft()
              .scale(verticalScale);
  
  svg.append("g")
     .attr("transform", "translate(30, 0)")
     .call(y_axis);

  svg.append("g")
      .attr("transform", "translate(0, 280)")
      .call(x_axis)


  var t = d3.transition()
          .duration(750)
          .ease(d3.easeLinear);
  
  d3.selectAll("g").transition(t).style("fill","blue");
           
}

reload()
