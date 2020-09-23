import { Component } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { MaskRequestService } from '../../../shared-ng/services/services'

@Component({
  selector: 'upload-modal',
  templateUrl: './upload-modal.html',
  styleUrls: [
	  'upload-modal.css'
  ]
})

export class UploadModalComponent {
  closeResult = '';
  fileToUpload: File = null;

  constructor(private mrs: MaskRequestService, private modalService: NgbModal) {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  async postFile(fileToUpload: File) {
    var $uploadPhoto = await this.mrs.uploadPhoto(fileToUpload);
    $uploadPhoto.subscribe(() => {});
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.postFile(this.fileToUpload) // VALIDATE FILE
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
