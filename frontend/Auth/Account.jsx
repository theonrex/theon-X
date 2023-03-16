import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatar from "../Upload/Avatar";
import AvatarImg from "../Upload/AvatarImg";
export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, bio, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setBio(data.bio);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, bio, avatar_url }) {
    try {
      setLoading(true);
      setProfileUpdated(false);

      const updates = {
        id: user.id,
        username,
        bio,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      setProfileUpdated(true);
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" form-widget Profile_Auth container-xxl">
      <div className="profile_header"></div>

      <div className="profile_img_header container">
        <AvatarImg
          uid={user.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ username, bio, avatar_url: url });
          }}
        />
        <section>
          <header> Edit Profile</header>

          <p>Update your photo and personal details</p>
        </section>{" "}
      </div>

      <div className="container">
        <div className="Profile_Auth_Info">
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>

        <div className="Profile_Auth_Info">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="Profile_Auth_Info">
          <label htmlFor="username">Your Photo</label>

          <Avatar
            uid={user.id}
            url={avatar_url}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ username, bio, avatar_url: url });
            }}
          />
        </div>
        <div className="Profile_Auth_Info">
          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            type="bio"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <button
          className="update_account_btn "
          onClick={() => updateProfile({ username, bio, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
        {profileUpdated == true ? "Profile Updated Succesfully" : null}
      </div>

      <div className="container">
        <button
          className="sign_out_btn"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
