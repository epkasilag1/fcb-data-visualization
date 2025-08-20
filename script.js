// Get current date
let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

// Date element
const dateElement = document.getElementById('date');

// Set the date in the element
dateElement.innerHTML = `${date}`;

// fetch() - send a request to an API
fetch('/.api/trends', options)
.then(res => res.json())
.then(result => {
    console.log(result.trends);

    // Convert object to array
    const trendsArray = Object.values(result.trends);

    // Sort by volume descending
    // trendsArray.sort((a, b) => (b.volume || 0) - (a.volume || 0));

    // Get top 10
    const topTen = trendsArray.slice(0, 10);

    let topics = topTen.map(topic => topic.name);
    console.log(topics);

    let volumes = topTen.map(topic => topic.volume);
    console.log(volumes);

    const myChart = document.getElementById('myChart');

    let barChart = new Chart(myChart, {
        type: 'bar',
        data: {
            labels: topics,
            datasets: [{
                label: 'Tweet Volume',
                data: volumes,
                borderWidth: 2,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',  
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                hoverBackgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ]
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x:{
                    title: {
                        display: true,
                        text: 'Number of Tweets',
                        // color: 'white',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    ticks:{
                        // color: 'white'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Topics',
                        // color: 'white',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true,
                    ticks:{
                        // color: 'white'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        // color: 'white', // Legend label color
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });

    myChart.onclick = function(evt) {
        const points = barChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
        if (points.length) {
            const index = points[0].index;
            const topic = topics[index];
            window.open(`https://twitter.com/search?q=${encodeURIComponent(topic)}`, '_blank');
        }
    };
})

