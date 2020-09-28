import { Component } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AuthService, MaskRequestService } from '../../../shared-ng/services/services'
import { User } from '../../interfaces/interfaces';

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
  srcString: any = null;
  profile: User;

  constructor(
    private as: AuthService, 
    private mrs: MaskRequestService, 
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.as.getUserInfo().subscribe(
      (data: User) => {
        this.profile = data;
      });
  }
  
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
    var d = new Date();
    var name = `${d.getMonth()}_${d.getDate()}_${d.getFullYear()}-${this.profile.wwuid}.jpeg`;
    var $uploadPhoto = await this.mrs.uploadPhoto(fileToUpload, name);
    $uploadPhoto.subscribe(() => {
      this.fileToUpload = null;
      this.srcString = null;
    });
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
