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
  // .style('background', '#cacaca')

// Data reloading
let reload = () => {
  // Your data parsing here...

  d3.tsv('afcw-results.tsv', (rows) => {
    let data = []
    for(let i= 0; i <= rows.length-1; i++) {
      console.log(rows[i]);
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
  console.log('test data yang di dapat', data)

  let yscale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 800])

  // let dataScore
  // data.forEach((dataKumpul) => {
  //   console.log('iki data kumpul', dataKumpul.GoalsScored)
  //   dataScore = dataKumpul.GoalsScored
  // })
  let colorScale =  d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['peru', 'teal'])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => {
      console.log('---->', d)
      return i * 25
    })
    .attr('y', (d) => {
      return 300 - yscale(d)
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yscale(d)
    })
    .attr('fill', colorScale)
}

reload()
