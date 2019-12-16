import { select, csv, scaleBand, scaleLinear, max, axisLeft, axisBottom } from 'd3';

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {
    const xValue = d => d.ageGroup
    const yValue = d => d.total
    const margin = { top: 40, right: 40, bottom: 40, left: 100 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])

    const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0])
        .nice()

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    g.append('g').call(axisLeft(yScale))
    
    const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(10)
        
    const xAxisG = g.append('g')
        .call(xAxis)
        .attr('transform', `translate(0, ${innerHeight})`)

    g.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
            .attr('cx', d => xScale(xValue(d)))
            .attr('cy', d => yScale(yValue(d)))
            .attr('r', 5)
            .attr("fill", "steelblue")
    }

csv('data.csv').then(data => {
    data.forEach(d => {
        d.total = +d.total
    })
    render(data)
    // console.log(data)
})
