import * as React from 'react';

// Props are defined as before.
interface EmailTemplateProps {
  linkUrl: string; // Renamed for clarity.
}

export const EmailTemplate = ({ linkUrl }: Readonly<EmailTemplateProps>) => (
  <div>
    <h1>Hacked</h1>
    <p>You are hacked bro you dead bro i have your password bro give me your beau orteils vite .</p>
    <a href={linkUrl}>Click Here</a>
  </div>
);