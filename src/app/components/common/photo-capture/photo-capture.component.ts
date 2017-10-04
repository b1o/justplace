import { AfterViewInit, Component, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';

import { UploadFile } from '../../../typescripts/pro/file-input/index';

@Component({
    selector: 'app-photo-capture',
    templateUrl: 'photo-capture.component.html'
})

export class PhotoCaptureComponent implements AfterViewInit, OnDestroy {

    @Output() photoTaken = new EventEmitter()

    @ViewChild('video') videoElementRef;
    @ViewChild('image') imageElementRef;
    @ViewChild('canvas') canvasElementRef;

    private video: HTMLVideoElement;
    private image: HTMLImageElement;
    private canvas: HTMLCanvasElement;

    private width = 720;
    private height = 0;
    private streaming = false;
    private stream;
    private photoBlob: Blob;
    private uploadedImage;

    public hasCamera = false;
    public loading = false;
    public output;
    public uploadInput = new EventEmitter<UploadFile>()

    constructor() {
    }

    public takePhoto() {
        console.log(this.width, this.height)
        const context = this.canvas.getContext('2d');
        if (this.width && this.height) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            context.drawImage(this.video, 0, 0, this.width, this.height);

            const data = this.canvas.toDataURL('image/png');
            this.output = data;
            this.image.setAttribute('src', data);
            this.stream.getTracks()[0].stop();
            this.streaming = false;
            this.canvas.toBlob(blob => {
                this.photoBlob = blob;
                this.photoTaken.emit({ photo: this.photoBlob });
            })
        } else {
            this.clearPhoto();
        }
    }


    private clearPhoto() {
        this.output = null;
        this.photoBlob = null;
        const context = this.canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const data = this.canvas.toDataURL('image/png');
        this.image.setAttribute('src', data);
    }

    public onUploadOutput(event) {
        this.output = event.target.files[0];
        const reader = new FileReader();
        console.log(this.uploadedImage)

        reader.onload = (e: any) => {
            this.image.setAttribute('src', e.target.result);
            this.photoTaken.emit({ photo: this.output });
        };

        reader.readAsDataURL(event.target.files[0])
    }

    public init() {
        this.loading = true;
        this.clearPhoto()
        navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false })
            .then(stream => {
                this.stream = stream;
                this.hasCamera = true;
                this.video.srcObject = stream;
                this.video.play();
            })
            .catch(err => {
                this.hasCamera = false;
                this.loading = false;
                console.log(err)
            })
    }

    ngAfterViewInit() {
        console.log(this.videoElementRef, this.imageElementRef, this.canvasElementRef)

        this.video = this.videoElementRef.nativeElement;
        this.image = this.imageElementRef.nativeElement;
        this.canvas = this.canvasElementRef.nativeElement;

        this.video.addEventListener('canplay', (ev) => {
            this.loading = false;
            this.height = this.video.videoHeight / (this.video.videoWidth / this.width);
            this.video.setAttribute('width', this.width.toString());
            this.video.setAttribute('height', this.height.toString());
            this.canvas.setAttribute('width', this.width.toString());
            this.canvas.setAttribute('height', this.height.toString());
            this.streaming = true;
        }, false)

        this.init()
    }

    ngOnDestroy() {
        if (this.stream) {
            this.stream.getTracks()[0].stop();

        }
    }

}