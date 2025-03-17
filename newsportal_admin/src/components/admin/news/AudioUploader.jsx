import axios from "axios";
import { BASE_URL } from "../../../utils/baseURL";
const AudioUploader = async (file) => {
  const formData = new FormData();
  formData.append("audio", file);

  try {
    const response = await axios.post(
      // Endpoint URL of your server where the file will be uploaded to DigitalOcean Spaces
      `${BASE_URL}/audio_upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const audioUrl = response?.data?.data?.Location;
    const audioKey = response?.data?.data?.Key;
    return [audioUrl, audioKey, response?.data?.success];
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export default AudioUploader;
