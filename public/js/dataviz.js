
const genderChart = document.getElementById("gender");


const genderLabels = ["Male","Female"];
const genderDatas = [genderChart.dataset.male,genderChart.dataset.female];

new Chart(genderChart, {
    type: "bar",
    data: {
        labels: genderLabels,
        datasets: [{
            label : "number of user per gender" ,
            data: genderDatas,
            backgroundColor: ['#007CD3','#FF4D4D']
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const messagesChart = document.getElementById("messages");

const messagesLabels = ["Read", "NonRead"];
const messagesDatas = [messagesChart.dataset.read,messagesChart.dataset.nonread];

new Chart(messagesChart, {
    type: "doughnut",
    data: {
        labels: messagesLabels,
        datasets: [{
            data: messagesDatas,
            backgroundColor: ['#D0D81F','#0EA4B6']
        }]
    }
})

const ordersChart = document.getElementById("orders");

const ordersLabels = ["Shipped","NonShipped"];
const ordersDatas = [ordersChart.dataset.shipped,ordersChart.dataset.nonshipped]

new Chart(ordersChart, {
    type: "pie",
    data: {
        labels: ordersLabels,
        datasets: [{
            data: ordersDatas,
            backgroundColor: ['#007CD3','#FF4D4D']
        }]
    }
})

const caChart = document.getElementById("ca");

const caLabels = [];
const caDatas = [];

const caArray = JSON.parse(caChart.dataset.caset);

caArray.forEach((e) => {
    caLabels.push(e._id.month_payment + e._id.year_payment);
    caDatas.push(e.totalSum);
}) 

const caDataMain = {
    labels: caLabels,
    datasets: [{
        label: "CA",
        data: caDatas,
        backgroundColor: "#80b6f4",
        borderColor: "#004048 "
    }]
}

console.log(caDataMain);

new Chart(caChart, {
    type: "line",
    data: caDataMain,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})

