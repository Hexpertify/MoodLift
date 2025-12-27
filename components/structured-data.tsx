import React from 'react';
import Script from 'next/script';

interface Props {
  id?: string;
  script: object;
}

function stableHash(input: string) {
  // Simple, stable, non-crypto hash for generating deterministic ids
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}

export function StructuredData({ id, script }: Props) {
  const json = JSON.stringify(script);
  const resolvedId = id || `jsonld-${stableHash(json)}`;
  return (
    <Script
      id={resolvedId}
      type="application/ld+json"
      // Use 'afterInteractive' for broad compatibility; still injected into <head>.
      strategy="afterInteractive"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default StructuredData;
