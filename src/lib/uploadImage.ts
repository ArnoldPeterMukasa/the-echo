export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "unsigned_upload"); 
  // 👆 you will create this in Cloudinary

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dv1sjsyr5/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.secure_url;
}