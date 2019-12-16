import { select, csv, scaleBand, scaleLinear, max } from 'd3';

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
    const xValue = d => d.ageGroup
    const yValue = d => d.total
    const margin = { top: 40, right: 40, bottom: 40, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])
        .padding(0.1)

    const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([0, innerHeight])

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => xScale(xValue(d)))
        .attr('height', d => yScale(yValue(d)))
        .attr('width', xScale.bandwidth())
        .attr("fill", "steelblue")
}

csv('data.csv').then(data => {
    data.forEach(d => {
        d.total = +d.total
    })
    render(data)
    // console.log(data)
})
