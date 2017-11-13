/* global d3 width height */
let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

let svgScore = d3.select('#top-score')
  .append('svg')
  .attr('width', width + 100)
  .attr('height', height)

const draw = (words) => {
  // Draw your data here...
  let g = svgScore.append('g')
  g.attr('transform', 'translate(320,200)')
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("fill", function(d, i) { return fill(i); })
    .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; })
}


const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', function (data) {
    let words = data.map(element => { return {text: element.Name, size: element.G}})

    d3.layout.cloud().size([width - 100, height - 100])
        .words(words)
        .rotate(0)
        .fontSize(function(d) { return leaderScale(d.size) })
        .on("end", draw)
        .start()
  })
}

load()
