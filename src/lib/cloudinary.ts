import { v2 as cloudinary } from "cloudinary";

// Validate Cloudinary environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn(
    "⚠️  Cloudinary environment variables are missing. Image uploads will not work."
  );
}

// Configure Cloudinary
if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export { cloudinary };

export const extractPublicId = (url: string) => {
  try {
    const parts = url.split("/");
    const filenameWithExtension = parts[parts.length - 1];
    const folderPath = parts.slice(parts.indexOf("upload") + 2, parts.length - 1).join("/");
    const filename = filenameWithExtension.split(".")[0];
    return folderPath ? `${folderPath}/${filename}` : filename;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};

