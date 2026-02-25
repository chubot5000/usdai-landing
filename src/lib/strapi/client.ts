import { GraphQLClient } from "graphql-request";

// Remove /api suffix if present, then add /graphql
const getGraphQLUrl = () => {
  const url = process.env.STRAPI_API_URL;
  if (!url) return "";
  const baseUrl = url.replace(/\/api\/?$/, "");
  return `${baseUrl}/graphql`;
};

export class StrapiClient extends GraphQLClient {
  constructor(tag?: string) {
    super(getGraphQLUrl(), {
      headers: { authorization: `Bearer ${process.env.STRAPI_API_KEY}` },
      next: tag ? { tags: [tag] } : undefined,
    });
  }
}
