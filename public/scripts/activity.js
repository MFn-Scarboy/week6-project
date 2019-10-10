const userInput = document.getElementsByClassName("user-activity");
const graphCalories = document.getElementsByClassName("graph-calories")
const graphDays = document.getElementsByClassName("graph-days");

if(userInput.length > 0){
    
    let horizontalAxis = [];

        for(let i = 0; i < graphDays.length; i++){
            horizontalAxis.push(graphDays[i].value)
        }

        let verticalAxis = [];
        for(let i = 0; i < userInput.length; i++){
            verticalAxis.push((userInput[i].value * graphCalories[i].value) / 100);
        }

        var ctx = document.getElementById('myChart').getContext('2d');
                        var chart = new Chart(ctx, {
                            type: 'bar',    
                            data: {
                                labels: horizontalAxis,
                                datasets: [{
                                    label: 'My First dataset',
                                    backgroundColor: "lightblue",
                                    hoverBackgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgb(255, 255, 255)',
                                    hoverBorderColor: "black",
                                    borderWidth: 2,
                                    data: verticalAxis
                                }]
                            },
                            options: {
                                scales: {
                                    barThickness: 30,
                                    barPercentage: 0.2
                                },
                                title: {
                                    display: true,
                                    text: 'My Calory Consumption',
                                    fontSize: 22,
                                    fontColor: "#ffffff"
                                }
                            }
                        });
}