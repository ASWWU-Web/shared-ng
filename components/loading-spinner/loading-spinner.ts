import { NgxSpinnerService } from 'ngx-spinner';

export class AppComponent {
    constructor(private spinner: NgxSpinnerService) { }

    showSpinner() {
        this.spinner.show();
        setTimeout(() => {
        this.spinner.hide();
    }, 5000);
    }
}