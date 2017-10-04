import { BaseChartDirective } from './../../../typescripts/free/charts/chart.directive';
import { MDBChartsModule } from './../../../typescripts/free/charts/chart.module';
import { AfterViewInit, Component, Input, ViewChild, ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as moment from 'moment';
import * as _ from 'lodash';

export const months: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
export const days: Array<string> = ['Mon', 'Tue', 'Wen', 'Thur', 'Fri', 'Sat', 'Sun'];

@Component({
    selector: 'visit-graph',
    templateUrl: 'visit-graph.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class VisitGraphComponent implements OnInit {
    @Input() sessions;
    @ViewChild('graph') graphRef;
    private graph: BaseChartDirective;

    public ready = false;
    public chartType: string = 'bar';

    public chartDatasets: Array<any> = [
        { data: [], label: 'Time' },
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
        responsive: true,
        legend: {
            labels: {
                fontColor: "white",
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    callback: (v) => {
                        return v + 'm'
                    }
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                }
            }]
        }
    };

    constructor(private cd: ChangeDetectorRef) { }


    public chartClicked(e: any): void {
        console.log(e)
        if (e.active) {
            console.log(e.active[0]._view.label)
        }
    }

    public chartHovered(e: any): void {
    }

    private parseSessions(sessions) {
        return _(sessions)
            .filter((s: any) => s.endTime != null)
            .groupBy((s: any) => {
                return moment(s.startTime).startOf('day').format()
            }).map((o, key) => {
                let total = 0;
                for (let s of o) {
                    total += (s.endTime - s.startTime) / (1000 * 60);
                }

                return {
                    day: key,
                    total: total.toFixed(2)
                }
            }).sortBy(s => s.day).toArray().value()
    }

    ngOnInit() {
        console.log(this.sessions)

        // this.graph = this.graphRef.nativeElement;
        this.chartDatasets[0].data = this.parseSessions(this.sessions).map(s => s.total);


        this.chartLabels = this.parseSessions(this.sessions).map(s => moment(s.day).format('dddd'));
        console.log(this.chartLabels)

        console.log(this.chartDatasets)
        this.ready = true;
        this.cd.detectChanges()
    }

    ngOnDestroy() {
        console.log('destroying graph')
        this.chartDatasets = [];
        this.chartLabels = []
    }
}