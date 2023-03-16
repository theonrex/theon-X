import React from "react";
import Account from "../Auth/Account";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import HomeAuth from "../Auth/HomeAuth";
export default function Profile() {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <div className="" >
      <HomeAuth />
    </div>
  );
}
