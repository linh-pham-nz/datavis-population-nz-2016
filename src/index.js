import { select, csv } from 'd3';

const svg = select('svg')

const width = +svg.attr('width')
const height = +svg.attr('height')

csv('data.csv').then(data => {
    data.forEach(d => {
        d.total = +d.total
    })
    // render(data)
    console.log(data)
})
