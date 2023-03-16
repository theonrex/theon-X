import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Spinner from "react-bootstrap/Spinner";
import { BiCloudUpload } from "react-icons/bi";
import { FaBeer } from "react-icons/fa";

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="avatar_upload">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image">
          <img src="https://img.icons8.com/fluency/48/null/vertcoin.png" />
        </div>
      )}
      <div style={{ width: size, height: 12 }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            <div>
              Upload.. <i className="bi bi-cloud-upload-fill"></i>
            </div>
          )}
        </label>
        <input
          style={{
            visibility: "hidden",
          }}
          type="file"
          id="single"
          className="avatar_file_upload"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
