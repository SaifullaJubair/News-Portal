
interface media_page_linkArray {
  link_title: string;
  link_url: string;
}

export interface ISocialMediaInterface {
  _id?: any;
  media_name: string;
  image_key: string;
  media_image: string;
  media_page_link: media_page_linkArray[];
}
