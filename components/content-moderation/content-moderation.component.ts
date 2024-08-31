import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService, MaskRequestService } from '../../../shared-ng/services/services'

import { Profile, User } from '../../interfaces/interfaces';

import { CURRENT_YEAR, MEDIA_URI } from '../../config';

@Component({
  selector: 'content-moderation',
  templateUrl: './content-moderation.html',
  styleUrls: [
    'content-moderation.css'
  ]
})

export class ContentModerationComponent implements OnInit {
  closeResult = '';
  fileToUpload: File = null;
  srcString: string = null;
  urlToJudge: string;
  $pendingPhotoList: Subject<{ photos: string[] }>;
  hasModeratorPermissions = false;
  fullName = "";

  constructor(
    private as: AuthService,
    private mrs: MaskRequestService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.as.getUserInfo().subscribe({
      next: (profile: User) => {
        if (!profile) {
          return;
        }
        const permissions = profile.roles.split(",");
        if (permissions.includes("content-moderator") || permissions.includes("administrator")) {
          this.hasModeratorPermissions = true;
        }
      },
      error: () => console.log("ERROR"),
      complete: () => console.log("COMPLETE")
    });
  }

  open(content) {
    this.$pendingPhotoList = this.mrs.listPendingPhotos();
    this.$pendingPhotoList.subscribe({
      next: (data) => {
        if (data.photos && data.photos.length > 0) {
          this.urlToJudge = data.photos[0];
          this.srcString = `${MEDIA_URI}/${this.urlToJudge}`;
          const wwuId = this.urlToJudge.match(/(\d{7})/)[1];
          this.mrs.listProfile(CURRENT_YEAR, `wwuid=${wwuId}`).subscribe((profile: Profile[]) => {
            if (profile && profile.length > 0) {
              this.fullName = profile[0].full_name;
            } else {
              console.log(`NO WWU PROFILE WITH ID: ${wwuId}`);
            }
          })
        } else {
          this.srcString = null;
        }
      }
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  approve() {
    const $approvedPhoto = this.mrs.approvePhoto(this.urlToJudge);
    $approvedPhoto.subscribe({
      next: (data) => {
        this.$pendingPhotoList.next(data);
      }
    })

  }

  dismay() {
    const $dismayPhoto = this.mrs.dismayPhoto(this.urlToJudge);
    $dismayPhoto.subscribe((data) => {
      this.$pendingPhotoList.next(data);
    })
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
