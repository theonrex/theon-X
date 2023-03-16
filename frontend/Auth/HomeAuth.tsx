import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "./Account";
const HomeAuth = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="rowx auth_page">
      <div className="container-xxl ">
        {!session ? (
          <section className="col50 ">
            <section className="auth_page_card">
              <header> Theon-X</header>{" "}
              <p>
                Welcome to Theon-X, your go-to source for all things Blockchain.
              </p>
            </section>
          </section>
        ) : null}
        <section className={!session ? "col50" : "col100"}>
          {!session ? (
            <Auth
              providers={["google"]}
              supabaseClient={supabase}
              appearance={{
                className: {
                  anchor: "my-awesome-anchor",
                  button: "auth_button",
                  label: "auth_label",
                  input: "auth_input",
                },
              }}
              view="sign_up"
            />
          ) : (
            <Account session={session} />
          )}
        </section>
      </div>
    </div>
  );
};

export default HomeAuth;
