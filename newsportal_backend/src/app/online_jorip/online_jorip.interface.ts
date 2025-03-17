
interface allQuestion {
  online_jorip_question: string;
  online_jorip_question_click: number;
}

export interface IOnlineJoripInterface {
  _id?: any;
  online_jorip_image: string;
  image_key: string;
  social_image?: string;
  social_image_key?: string;
  online_jorip_status: "active" | "in-active";
  online_jorip_title: string;
  online_jorip_all_question: allQuestion[]
}

export const onlineJoripSearchableField = ["online_jorip_title", "online_jorip_status"];
