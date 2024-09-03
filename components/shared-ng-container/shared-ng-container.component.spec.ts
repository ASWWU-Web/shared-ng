import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedNgContainerComponent } from "./shared-ng-container.component";

describe("AppComponent", () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SharedNgContainerComponent],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(SharedNgContainerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'elections'`, () => {
    const fixture = TestBed.createComponent(SharedNgContainerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("elections");
  });

  it("should render title in a h1 tag", () => {
    const fixture = TestBed.createComponent(SharedNgContainerComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to elections!",
    );
  });
});
