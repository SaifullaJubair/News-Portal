export interface IAdsInterface {
  _id?: any;
  ads_image: string;
  image_key: string;
  ads_link: string;
  ads_serial: number;
  ads_status: "active" | "in-active";
}

export const adsSearchableField = ["ads_title", "ads_link", "ads_status"];
