import React from "react";
import { Blog, FooterBanner, Author, HeroBanner, Home } from "../components";
// import Author from '../components/Author';
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-sa-east-1.hygraph.com/v2/clchq1ysr1i3i01t856vrejv5/master"
);

const QUERY = gql`
  {
    posts {
      title
      slug
      updatedAt
      id
      datePublished
      createdAt
      coverPhoto {
        url
      }
      content {
        html
      }
    }
  }
`;

const index = () => {
  return (
    <div className=" container-xxl">
      <HeroBanner />
      <Home />
    </div>
  );
};


export default index;
