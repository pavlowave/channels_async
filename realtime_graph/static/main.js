let ctx = document.querySelector('#myChart').getContext('2d'); // Исправлено

let graphData = {
    type: 'line',
    data:{
        labels: ['Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
}

let myChart = new Chart(ctx, graphData);

let socket = new WebSocket('ws://localhost:8000/ws/graph/');

socket.onmessage = function (event) {
    let djangoData = JSON.parse(event.data);
    console.log(djangoData);

    let newGraphData = graphData.data.datasets[0].data;
    let newLabels = graphData.data.labels

    newGraphData.shift(); // Удалить первый элемент
    newLabels.shift();
    newGraphData.push(djangoData.value); // Добавить новое значение
    newLabels.push(djangoData.day);

    graphData.data.datasets[0].data = newGraphData;
    graphData.data.labels = newLabels
    myChart.update(); // Обновить график
}