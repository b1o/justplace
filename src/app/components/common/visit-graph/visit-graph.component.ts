import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
    selector: 'visit-graph',
    templateUrl: 'visit-graph.component.html'
})

export class VisitGraphComponent implements AfterViewInit {
    @Input() sessions;

    public ready = false;
    public chartType: string = 'bar';

    public chartDatasets: Array<any> = [
        { data: [], label: 'Visits' },
    ];

    public chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

    public chartColors: Array<any> = [
        {
            backgroundColor: 'rgba(220,220,220,0.2)',
            borderColor: 'rgba(220,220,220,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(220,220,220,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(220,220,220,1)'
        },
        {
            backgroundColor: 'rgba(151,187,205,0.2)',
            borderColor: 'rgba(151,187,205,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(151,187,205,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(151,187,205,1)'
        }
    ];

    public chartOptions: any = {
        responsive: true
    };

    public chartClicked(e: any): void {

    }

    public chartHovered(e: any): void {

    }
    constructor() { }

    ngAfterViewInit() {

        this.chartDatasets[0].data = this.sessions.map(s => s.endTime - s.startTime)
        console.log(this.chartDatasets)
        this.ready = true;

    }
}