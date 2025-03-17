import { Schema, model } from "mongoose";
import { ISocialMediaInterface } from "./social.media.interface";

// Social Media Schema
const socialMediaSchema = new Schema<ISocialMediaInterface>(
  {
    media_name: {
      required: true,
      type: String,
    },
    media_image: {
      required: true,
      type: String,
    },
    image_key: {
      required: true,
      type: String,
    },
    media_page_link: [
      {
        link_title: {
          type: String,
          required: true,
        },
        link_url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const SocialMediaModel = model<ISocialMediaInterface>("socialmedias", socialMediaSchema);

export default SocialMediaModel;
