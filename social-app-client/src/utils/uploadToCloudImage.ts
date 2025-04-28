const cloud_name = "dsetkflj8";
const preset_name = "ml_default";

export const uploadToCloudImage = async (
  pics: File,
  fileType: "image" | "video"
) => {
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`;

  if (pics && fileType) {
    const data = new FormData();

    data.append("file", pics);
    data.append("upload_preset", preset_name);
    data.append("cloud_name", cloud_name);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: data,
    });

    const fileData = await res.json();

    console.log("fileData url - ", fileData.url);

    return fileData.url;
  } else {
    console.log("Error");
  }
};
