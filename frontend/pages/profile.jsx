import React from 'react'
import Account from "../Auth/Account";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
export default function Profile() {
     const session = useSession();
     const supabase = useSupabaseClient();
  return (
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth
            providers={["google"]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        ) : (
          <Account session={session} />
        )}
      </div>
  );
}
