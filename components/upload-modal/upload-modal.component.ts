import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService, MaskRequestService } from '../../../shared-ng/services/services'
import { User } from '../../interfaces/interfaces';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'upload-modal',
  templateUrl: './upload-modal.html',
  styleUrl: './upload-modal.css',
  encapsulation: ViewEncapsulation.None
})

export class UploadModalComponent implements OnInit {
  closeResult = '';
  fileToUpload: File = null;
  srcString: string | ArrayBuffer | null = null;
  profile: User;

  constructor(
    private as: AuthService,
    private mrs: MaskRequestService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.as.getUserInfo().subscribe(
      (data: User) => {
        this.profile = data;
      });
  }

  handleFileInput(event: Event): void {
    // unfortunate cast.
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];

      if (file.size > 5242880) {
        this.toastrService.error("File size must be smaller than 5 MB");
        // unfortunate cast.
        (event.target as HTMLInputElement).value = '';
        this.fileToUpload = null;
        this.srcString = null;
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        this.srcString = reader.result;
        this.fileToUpload = target.files.item(0);
      }

      reader.readAsDataURL(file);
    }
  }

  async postFile(fileToUpload: File) {
    if (!fileToUpload) {
      this.toastrService.error("Invalid Input");
      return;
    }
    const $uploadPhoto = await this.mrs.uploadPhoto(fileToUpload);
    $uploadPhoto.subscribe({
      next: () => {
        this.toastrService.success("Success: Your photo is awaiting moderation");
        this.fileToUpload = null;
        this.srcString = null;
      },
      error: (err) => {
        this.toastrService.error("Invalid Input");
        this.fileToUpload = null;
        this.srcString = null;
        console.log("[File Upload]", err)
      },
      complete: () => console.log("[File Upload]", "SUCCESS")
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.postFile(this.fileToUpload) // VALIDATE FILE
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: number): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
