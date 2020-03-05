import { wrapTry } from './util'

export default class Backend {

  BACKEND_URL;

  constructor() {
    this.BACKEND_URL = "https://raendom-backend.z52da5wt.xyz";
  }

  tipOrder = async () => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/tiporder`);
  });
  tipPreview = async () => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/linkpreview`);
  });
  getLangTips = async (lang = 'en') => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/language/` + lang);
  });
  getTipComments = async (tipId) => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/comment/api/tip/` + encodeURIComponent(tipId));
  });
  sendTipComment = async (postParam) => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/comment/api/`, {
      method: 'post',
      body: JSON.stringify(postParam),
      headers: {"Content-Type": "application/json"}
    });
  });
  getAllComments = async () => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/comment/api/`);
  });
  getProfile = async (address) => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/profile/` + address);
  });
  sendProfileData = async (postParam) => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/profile`, {
      method: 'post',
      body: JSON.stringify(postParam),
      headers: {"Content-Type": "application/json"}
    });
  });
  getProfileImage = async (address) => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/profile/image/` + address);
  });
  setProfileImage = async (address, data, image = true, headers = {'Content-Type': 'application/json'}) => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/profile/image/` + address, {
      method: 'post',
      body: image ? data : JSON.stringify(data),
      headers: headers
    });
  });
  getStats = async () => wrapTry(async () => {
    return fetch(`${this.BACKEND_URL}/static/stats/`);
  })

}
