import { csv } from 'd3';

csv('data.csv').then(data => {
    data.forEach(d => {
        d.total = +d.total
    })
    // render(data)
    console.log(data)
})
