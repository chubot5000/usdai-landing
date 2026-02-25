import React from "react";

/**
 * Schema component for injecting JSON-LD structured data
 * Cleaner alternative to inline dangerouslySetInnerHTML
 *
 * Usage:
 * <Schema data={generateWebsiteSchema()} />
 */

interface SchemaProps {
  data: object | object[];
}

export function Schema({ data }: SchemaProps) {
  // Support both single schema and array of schemas
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
