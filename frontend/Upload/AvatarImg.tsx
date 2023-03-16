import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

interface AvatarProps {
  uid: string;
  url: string;
  size: number;
  onUpload: (filePath: string) => void;
}

export default function AvatarImg({ uid, url, size, onUpload }: AvatarProps) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null > (null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
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

  return (
    <div>
      <div style={{ width: size }}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="avatar_header_image"
            style={{ height: size, width: size }}
          />
        ) : (
          <img
            alt="Avatar"
            style={{ height: size, width: size }}
            className="avatar_header_image"
            src="https://img.icons8.com/fluency/598/null/vertcoin.png"
          />
        )}
      </div>
    </div>
  );
}
