// src/lib/uploadService.js

// 👇 Fungu zako za Cloudinary
const CLOUD_NAME = "dvvcrg3dq"; 
const UPLOAD_PRESET = "portfolio_preset"; 

export const uploadFile = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  
  // URL ya Cloudinary
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error.message || "Upload failed");
    }

    const data = await res.json();
    return data.secure_url; // Hii inarudisha link kamili ya picha
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw error;
  }
};

// Functions zinazotumiwa na Admin Dashboard
export const uploadImage = (file) => uploadFile(file);
export const uploadPDF = (file) => uploadFile(file);