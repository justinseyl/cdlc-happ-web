$.ajax({
    url: environmentConfig + '/buildChart_admin',
    type: 'POST',
    contentType: "application/json",
    data: JSON.stringify(
      {
        roletype: sessionStorage.getItem('cdlc-role')
      }),
    success: function(response) {
      renderChart(response);
    },
    error: function(err){
      console.log(err);
    }
});

function renderChart(resdata) {
	Highcharts.chart('chartContainer', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: 'HAPPINESS INDEX',
					align: 'left',
					margin: 50
	    },
	    xAxis: {
	        categories: [
	            '1',
							'2',
							'3',
							'4',
							'5'

	        ],
					labels: {
	                useHTML: true,
	                formatter: function(){
										if (this.value == 1) return '<img src="../assets/terr-smile.png"></img>';
										if (this.value == 2) return '<img src="../assets/bad-smile.png"></img>';
										if (this.value == 3) return '<img src="../assets/ok-smile.png"></img>';
										if (this.value == 4) return '<img src="../assets/good-smile.png"></img>';
										if (this.value == 5) return '<img src="../assets/awe-smile.png"></img>';
	                }
	            }
	    },
	    yAxis: {
	        min: 0,
					title: {
	            enabled: false,
	            text: undefined
	        },
					labels: {
						align: 'left',
						style: {
								'text-align': 'left',
							  'font-family': "'MontserratRegular', sans-serif",
							  'font-size': '16px',
							  'color': 'rgba(153, 161, 176, 0.6)'
						},
						y: -10,
						x: 0
					}
	    },
			legend: {
				enabled: false
			},
      tooltip: {
        enabled: false
      },
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			plotOptions: {
	        series: {
						borderRadius: 2,
						pointWidth: 40,
	          dataLabels: {
	                enabled: true,
	                crop: false,
	                overflow: 'none',
									borderRadius: '2px',
									style: {
										fontSize: '20px',
										fontWeight: '600',
										color: '#111816'
									},
									format: '{y}%'
	          }
	        }
	    },
	    series:[
			{
					color: '#197858',
	        data: resdata
	    }]
	});
}
