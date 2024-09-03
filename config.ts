import { environment } from "./environments/environment";

// SAML LINK
export const SAML_URL = "https://saml.aswwumask.com";
export const SAML_LOGIN_URL = SAML_URL + "/?sso&redirect=";
export const SAML_LOGOUT_URL = SAML_URL + "/?slo&redirect=";

// IMAGES
export const MEDIA_URI = environment.BASE_URL + "/media/";
export const MEDIA_XS = MEDIA_URI + "";
export const MEDIA_SM = MEDIA_URI + "";
export const MEDIA_MD = MEDIA_URI + "";
export const MEDIA_LG = MEDIA_URI + "";
export const DEFAULT_PHOTO = "assets/mask/default.jpg";

// YEARS
// TODO: get current year from API
export const CURRENT_YEAR = "2425";
export const ARCHIVE_YEARS = [
  "2021",
  "1920",
  "1819",
  "1718",
  "1617",
  "1516",
  "1415",
  "1314",
  "1213",
  "1112",
  "1011",
  "0910",
  "0809",
  "0708",
  "0607",
];
