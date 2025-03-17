export const getYouTubeVideoId = (urlOrId) => {
  if (!urlOrId) return null;

  // If the input is already a valid video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }

  // Extract ID from YouTube URL
  const regExp =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = urlOrId.match(regExp);
  return match ? match[1] : null;
};
