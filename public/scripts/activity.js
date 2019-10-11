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

        let sumOfCalories = 0;
        for(i =0; i < verticalAxis.length; i++){
                
        }

        var ctx = document.getElementById('myChart').getContext('2d');
                        var chart = new Chart(ctx, {
                            type: 'bar',    
                            data: {
                                labels: horizontalAxis,
                                datasets: [{
                                    label: 'My First dataset',
                                    backgroundColor: 'rgb(255, 99, 132)',
                                    borderColor: 'rgb(255, 99, 132)',
                                    data: verticalAxis
                                }]
                            },
                            options: {
                                scales: {
                                    barThickness: 50,
                                    barPercentage: 0.2
                                }
                            }
                        });
}