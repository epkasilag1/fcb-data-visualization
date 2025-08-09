// Get current date
let date = new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});

// Date element
const dateElement = document.getElementById('date');

// Set the date in the element
dateElement.innerHTML = `${date}`;


// Twitter Trends API
const url = 'https://twitter-trends5.p.rapidapi.com/twitter/request.php';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': 'f871a03209mshe39329829fe0e05p10ea79jsn2b66b35f2f35',
		'x-rapidapi-host': 'twitter-trends5.p.rapidapi.com',
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	body: new URLSearchParams({woeid: '23424934'})
};

// fetch() - send a request to an API
fetch(url, options)
.then(res => res.json())
.then(result => {
    console.log(result.trends);
    
    let topTen = [];
    for (let i=0; i<10; i++){
        topTen.push(result.trends[i]);
    }

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
                label: '# of tweets/xeets',
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
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})

