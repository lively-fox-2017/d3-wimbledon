/* global d3 width height */

let fill = d3.scaleOrdinal(d3.schemeCategory20)
let leaderScale = d3.scaleLinear()
  .range([5, 40])

const draw = (words) => {
  // Draw your data here...
  d3.select('#top-score')
  .append('svg')
  .attr('width', 1700)
  .attr('height', 700)
  .attr("class", "wordcloud")
  .append('g')
  .attr('transform', 'translate(640, 200) scale(1.5)')
  .selectAll('text')
  .data(words)
  .enter()
  .append('text')
  .style('font-size', d => d.goals + 'px')
  .style('fill', (d, i) => fill(i))
  .attr('text-anchor', 'middle')
  .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ') scale(1.5)')
  .text(d => d.name)

}

const load = () => {
  // Load your data here...
  d3.tsv('stats.tsv', rows => {
    let words = rows.map(row => ({name: row.Name, goals: row.G})).sort((a, b) => b.goals - a.goals)

    d3.layout.cloud()
    .size([1600, 600])
    .words(words)
    .rotate(0)
    .fontSize(d => d.goals)
    .on('end', draw)
    .start();
  })
}

load()
