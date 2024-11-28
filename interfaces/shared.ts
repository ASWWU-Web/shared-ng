import { Params } from "@angular/router";

export interface HeaderButton {
  buttonText: string;
  buttonLink: string;
  buttonRouterLink: boolean;
  buttonAdmin: boolean;
}

export interface SubNavbarLink {
  linkText: string;
  linkURI: string;
  queryParams?: Params;
}
