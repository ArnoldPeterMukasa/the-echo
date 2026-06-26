export async function uploadImage(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "echo_upload");

  const cloudName = "dv1sjsyr5"; // 🔴 cloudinary name

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data.secure_url;
}