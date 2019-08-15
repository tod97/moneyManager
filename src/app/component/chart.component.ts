import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('doughnutCanvas', {static: true}) doughnutCanvas: ElementRef;
  /*@ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('lineCanvas') lineCanvas: ElementRef;*/
  private stats: any;
  @Input('stats')
  set _stats(stats: any) {
     this.stats = stats;
     this.initCharts();
  }

  get _stats(): any { return this.stats; }

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    if (this.stats) {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: 'doughnut',
        data: {
          labels: this.stats.labels,
          datasets: this.stats.datasets
        },
        options: {
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const currentValue = dataset.data[tooltipItem.index];
                return ' ' + currentValue + '%';
              }
            }
          }
        }
      });
    }
    /*
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false
          }
        ]
      }
    });*/
  }
}
