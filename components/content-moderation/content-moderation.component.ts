import { Component } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MaskRequestService } from '../../../shared-ng/services/services'

@Component({
	selector: 'content-moderation',
	templateUrl: './content-moderation.html',
	styleUrls: [
		'content-moderation.css'
	]
})

export class ContentModerationComponent {
	closeResult = '';
	fileToUpload: File = null;
	srcString: any = null;

	constructor(private mrs: MaskRequestService, private modalService: NgbModal) {}

	handleFileInput(event: any): void {
    if (event.target.files && event.target.files[0]) {
		const file = event.target.files[0];

		const reader = new FileReader();

		reader.onload = e => {
			this.srcString = reader.result;
			this.fileToUpload = event.target.files.item(0);
		}

      	reader.readAsDataURL(file);
    }
}

  	async postFile(fileToUpload: File) {
		var $uploadPhoto = await this.mrs.uploadPhoto(fileToUpload);
		$uploadPhoto.subscribe(() => {
			this.fileToUpload = null;
			this.srcString = null;
		});
 	 }

	open(content) {
		const $photoList = this.mrs.listPhotos();
		$photoList.subscribe((data: any) => {
			console.log(data);
			this.srcString = `http://localhost:8888/pages/media/static/${data.photos[0]}`;
		}, undefined);
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			console.log(this.closeResult);
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			console.log(this.closeResult);
		});
	}	

	approve() {
		console.log("APPROVE")
	}

	dismay() {
		console.log("DISMAY")
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
