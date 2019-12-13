import { select, csv, scaleBand } from 'd3';

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
    const xValue = d => d.ageGroup

    const margin = { top: 40, right: 40, bottom: 40, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])
    // console.log(xScale.domain())

}

csv('data.csv').then(data => {
    data.forEach(d => {
        d.total = +d.total
    })
    render(data)
    console.log(data)
})
