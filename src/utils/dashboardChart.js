
import Chart from "chart.js/auto"

let chart

export const setDashboardChart = (labels , datapoints)=>{
    chart && chart.destroy();
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Sale of the Month",
                data: datapoints,
                borderColor: "#0062ff",
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }
        ]
    }

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Sales chart of the past year"
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        // text: 'زمان'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: "Million Tomans"
                    },
                    // suggestedMin: -10,
                    // suggestedMax: 200
                }
            }
        },
    }
    const ctx = document.getElementById('myChart').getContext('2d')
   chart = new Chart(ctx , config)
    
}
