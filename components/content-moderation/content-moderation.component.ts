import { Component } from '@angular/core';

import { Subject } from 'rxjs';

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
	urlToJudge: string;
	$pendingPhotoList: Subject<{photos: string[]}>;

	constructor(private mrs: MaskRequestService, private modalService: NgbModal) {}

	open(content) {
		this.$pendingPhotoList = this.mrs.listPendingPhotos();
		this.$pendingPhotoList.subscribe((data: any) => {
			if (data.photos && data.photos.length > 0) {
				this.urlToJudge = data.photos[0];
				this.srcString = `http://localhost:8888/pages/media/static/${this.urlToJudge}`;
			} else {
				this.srcString = null;
			}
		}, undefined);
		this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}	

	approve() {
		const $approvedPhoto = this.mrs.approvePhoto(this.urlToJudge);
		$approvedPhoto.subscribe((data: any) => {
			this.$pendingPhotoList.next(data);
		})
	}

	dismay() {
		const $dismayPhoto = this.mrs.dismayPhoto(this.urlToJudge);
		$dismayPhoto.subscribe((data: any) => {
			this.$pendingPhotoList.next(data);
		})
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
