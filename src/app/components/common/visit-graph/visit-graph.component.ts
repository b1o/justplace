import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

import { BaseChartDirective } from './../../../typescripts/free/charts/chart.directive';

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
                    callback: (v) => { return this.epoch_to_hh_mm_ss(v) },
                    stepSize: 300
                }
            }]
        },

    };

    constructor(private cd: ChangeDetectorRef) { }

    public epoch_to_hh_mm_ss(time) {
        console.log(time)
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        return `${minutes}:${seconds}`
    }

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
                return moment(s.startTime).startOf('day')
            }).map((o, key) => {
                let total = 0;
                for (let s of o) {
                    total += (s.endTime - s.startTime);
                }

                return {
                    day: key,
                    total: total / (1000 * 60)
                }
            }).sortBy(s => new Date(s.day)).toArray().value()
    }

    ngOnInit() {
        console.log('parsed', this.parseSessions(this.sessions))
        // this.graph = this.graphRef.nativeElement;
        this.chartDatasets[0].data = this.parseSessions(this.sessions).map(s => s.total);


        this.chartLabels = this.parseSessions(this.sessions).map(s => moment(s.day).format('dddd'))
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