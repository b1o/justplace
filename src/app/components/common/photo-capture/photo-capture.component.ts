import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-photo-capture',
    templateUrl: 'photo-capture.component.html'
})

export class PhotoCaptureComponent implements AfterViewInit {
    @ViewChild('video') videoElementRef;
    @ViewChild('image') imageElementRef;
    @ViewChild('canvas') canvasElementRef;

    private video: HTMLVideoElement;
    private image: HTMLImageElement;
    private canvas: HTMLCanvasElement;

    private width = 320;
    private height = 0;
    private streaming = false;

    constructor() { }

    public takePhoto() {
        console.log(this.width, this.height)
        const context = this.canvas.getContext('2d');
        if (this.width && this.height) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            context.drawImage(this.video, 0, 0, this.width, this.height);

            const data = this.canvas.toDataURL('image/png');
            this.image.setAttribute('src', data);
        } else {
            this.clearPhoto();
        }
    }

    private clearPhoto() {
        const context = this.canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const data = this.canvas.toDataURL('image/png');
        this.image.setAttribute('src', data);
    }

    private init() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                this.video.srcObject = stream;
                this.video.play();
            })
            .catch(err => {
                console.error(err)
            })
    }

    ngAfterViewInit() {
        console.log(this.videoElementRef, this.imageElementRef, this.canvasElementRef)

        this.video = this.videoElementRef.nativeElement;
        this.image = this.imageElementRef.nativeElement;
        this.canvas = this.canvasElementRef.nativeElement;

        this.video.addEventListener('canplay', (ev) => {
            this.height = this.video.videoHeight / (this.video.videoWidth / this.width);
            this.video.setAttribute('width', this.width.toString());
            this.video.setAttribute('height', this.height.toString());
            this.canvas.setAttribute('width', this.width.toString());
            this.canvas.setAttribute('height', this.height.toString());
            this.streaming = true;
        }, false)

        this.init()
    }

}