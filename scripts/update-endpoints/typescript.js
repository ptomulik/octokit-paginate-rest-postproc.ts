/**
 * We do not want to have `@octokit/openapi` as a production dependency due to
 * its huge size. We are only interested in the REST API endpoint paths that
 * trigger notifications. So instead we automatically generate a file that
 * only contains these paths when @octokit/openapi has a new release.
 */
const { writeFileSync } = require("fs");

const prettier = require("prettier");

const ENDPOINTS = require("./generated/descriptions.json");
const endpoints = [];

for (const endpoint of ENDPOINTS) {
  const parsed = parsePaginatingEndpoint(endpoint);
  if (parsed) {
    const { schema, url } = parsed;
    const resultsKey = schema.type === "array" ? null : findResultsKey(schema)
    endpoints.push({
      url,
      resultsKey: resultsKey,
      documentationUrl: endpoint.documentationUrl,
      items: resultsKey === null ? schema.items : schema.properties[resultsKey].items,
    });
  }
}

function findResultsKey(schema) {
  for (const [key, value] of Object.entries(schema.properties)) {
    if (key === "schemas") {
      // e.g. https://docs.github.com/en/free-pro-team@latest/rest/reference/enterprise-admin#list-scim-provisioned-identities-for-an-enterprise
      continue;
    }
    if (value.type === "array") {
      return key;
    }
  }
}

function parsePaginatingEndpoint(endpoint) {
  // All paginating endpoints have an operation ID starting with "list",
  // with the exception of search endpoints
  if (!/^list\b/.test(endpoint.id) && endpoint.scope !== "search") {
    return false;
  }

  if (endpoint.renamed) {
    return false;
  }

  const successResponses = endpoint.responses.filter(
    (response) => response.code < 300
  );

  if (successResponses.length === 0) {
    return false;
  }

  if (!successResponses[0].schema) {
    return false;
  }

  const schemaObj = JSON.parse(successResponses[0].schema);
  const schema = schemaObj.anyOf ? schemaObj.anyOf[0] : schemaObj;
  const url = endpoint.url;

  if (!schema.type || (schema.type === "object" && !schema.properties)) {
    return false;
  }

  return { schema, url };
}

function sortEndpoints(endpoints) {
  return endpoints.sort((a, b) => {
    return a.url > b.url ? 1 : -1;
  });
}

function endpointToSchema(endpoint) {
  const key = endpointToKey(endpoint);
  return `
  /**
   * @see ${endpoint.documentationUrl}
   */
  ${key}: ${JSON.stringify(endpoint.items, null, 2)}
  `;
}

function endpointToSchemaType(endpoint) {
  const key = endpointToKey(endpoint);
  return `
  /**
   * @see ${endpoint.documentationUrl}
   */
  ${key}
  `;
}

function endpointToKey(endpoint) {
  return `"GET ${endpoint.url}"`;
}

////function stringifyValue(value) {
////  if (typeof value === "object") {
////    if (value instanceof Array) {
////      return stringifyArray(value);
////    } else {
////      return stringifyRecord(value);
////    }
////  } else {
////    return JSON.stringify(value);
////  }
////}
////
////function stringifyRecord(record) {
////  const properties = [];
////  for (const [key, value] of Object.entries(record)) {
////    properties.push(`${key}: ${stringifyValue(value)}`)
////  }
////  return `{ ${properties.join(", ")} }`;
////}
////
////function stringifyArray(array) {
////  const items = [];
////  for (const item in array) {
////    items.push(stringifyValue(item));
////  }
////  return `[ ${items.join(", ")} ]`;
////}

writeFileSync(
  "./src/generated/paginating-endpoints.ts",
  prettier.format(
    `
    export type PaginatingEndpointTypes = "";
    export type PaginatingEndpointsSchemas = {
      ${sortEndpoints(endpoints).map(endpointToSchemaType).join(";\n")}
    };

    export const paginatingEndpointSchemas: Record<string, unknown> = {
      ${sortEndpoints(endpoints).map(endpointToSchema).join(",\n")}
    }
    `,
   {
      parser: "typescript",
    }
  )
);
