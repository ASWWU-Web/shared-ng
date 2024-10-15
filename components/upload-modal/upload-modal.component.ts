import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import {
  ImageCroppedEvent,
  ImageCropperComponent,
  LoadedImage,
} from "ngx-image-cropper";

import {
  AuthService,
  MaskRequestService,
} from "../../../shared-ng/services/services";
import { User } from "../../interfaces/interfaces";

import { ToastrService } from "ngx-toastr";
import { SafeUrl } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

@Component({
  selector: "upload-modal",
  templateUrl: "./upload-modal.html",
  styleUrl: "./upload-modal.css",
  encapsulation: ViewEncapsulation.None,
  imports: [ImageCropperComponent, CommonModule],
  standalone: true,
})
export class UploadModalComponent implements OnInit {
  closeResult = "";
  fileToUpload: Blob = null;
  profile: User;
  imageChangedEvent: Event | null = null;

  constructor(
    private as: AuthService,
    private mrs: MaskRequestService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.as.getUserInfo().subscribe((data: User) => {
      this.profile = data;
    });
  }

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      // if (target.files[0].size > 5000000) {
      //   this.toastrService.error("File size must be smaller than 5 MB");
      //   return;
      // }
      this.imageChangedEvent = event;
    }
  }

  async postFile() {
    if (!this.fileToUpload) {
      this.toastrService.error("Invalid Input");
      return;
    }
    const $uploadPhoto = await this.mrs.uploadPhoto(this.fileToUpload);
    $uploadPhoto.subscribe({
      next: () => {
        this.toastrService.success(
          "Success: Your photo is awaiting moderation",
        );
        this.fileToUpload = null;
        this.imageChangedEvent = null;
      },
      error: (err) => {
        this.toastrService.error("Invalid Input");
        this.fileToUpload = null;
        console.log("[File Upload]", err);
      },
      complete: () => console.log("[File Upload]", "SUCCESS"),
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.postFile(); // VALIDATE FILE
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
  }
  imageCropped(event: ImageCroppedEvent) {
    this.fileToUpload = event.blob;
  }
  loadImageFailed() {
    // show message
    this.toastrService.error("Invalid Input");
    this.fileToUpload = null;
  }

  private getDismissReason(reason: number): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
