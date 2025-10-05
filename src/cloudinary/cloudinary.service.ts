import cloudinary from "./cloudinaryConfig";

export const uploadImage = async (base64Image: any) => {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "images",
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};
