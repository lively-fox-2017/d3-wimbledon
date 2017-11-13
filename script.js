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
  .attr('height', height + 20)
  .style('padding-top', '20px')

// Data reloading
let reload = () => {
  d3.tsv('afcw-results.tsv', (rows) => {
    redraw(rows)
  })
  // Your data parsing here...
}

// redraw function
let redraw = (data) => {
  let arrGoal = data.map(d => d.GoalsScored)
  let colorScale = d3.scaleLinear().domain([0, d3.max(arrGoal)]).range(['cyan', 'blue'])
  let yScale = d3.scaleLinear().domain([d3.max(arrGoal), 0]).range([0, height])
  let xScale = d3.scaleLinear().domain([0, arrGoal.length]).range([0, width - 100])

  let yAxis = d3.axisLeft().scale(yScale).ticks(d3.max(arrGoal))
  let yAxisGroup = svg.append('g').attr('transform', 'translate(30, 0)').call(yAxis)

  let xAxis = d3.axisBottom().scale(xScale).ticks(arrGoal.length)
  let xAxisGroup = svg.append('g').attr('transform', 'translate(35, 300)').call(xAxis)
  // Your data to graph here
  svg.selectAll('rect').data(data).enter().append('rect')
    .attr('x', (d, i) => {
      return xScale(i) + 35
    })
    .attr('y', (d, i) => {
      return yScale(0)
    })
    .transition()
    .ease(d3.easeSin)
    .duration(2050)
    .attr('y', (d, i) => {
      return yScale(d.GoalsScored)
    })
    .attr('width', '10px')
    .attr('height', (d, i) => {
      return (yScale(0) - yScale(d.GoalsScored))
    })
    .attr('fill', (d, i) => {
      return colorScale(d.GoalsScored)
    })
}

function reloadWordCloud() {
  d3.tsv('stats.tsv', function(rows) {
    console.log(rows);
    drawWordCloud(rows.map(row => { return {text: row.Name, size: row.G} }))
  })
}

function drawWordCloud(frequency_list) {

  d3.layout.cloud().size([800, 300])
    .words(frequency_list)
    .rotate(0)
    .fontSize(function(d) {
      return d.size;
    })
    .on("end", draw)
    .start();

  function draw(words) {
    var color = d3.scaleLinear().domain([0, d3.max(words.map(word => {return word.size}))])

    d3.select("#top-score").append("svg")
      .attr('class', 'scaling-svg')
      .attr("width", 850)
      .attr("height", 350)
      .append("g")
      .attr("transform", "translate(320,200)")
      .selectAll("text")
      .data(words)
      .enter().append("text")
      .style("font-size", function(d) {
        return d.size + "px";
      })
      .style("fill", function(d, i) {
        return color(i);
      })
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) {
        return d.text;
      });
  }
}

reloadWordCloud()

reload()
