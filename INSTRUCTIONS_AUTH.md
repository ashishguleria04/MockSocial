# Authentication Setup Instructions

To complete the Google Authentication setup, you need to configure your Google Cloud Credentials.

1.  **Go to Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2.  **Create a Project**: If you haven't already, create a new project.
3.  **Configure OAuth Consent Screen**:
    *   Navigate to **APIs & Services** > **OAuth consent screen**.
    *   Select **External** (or Internal for Workspace).
    *   Fill in the App Name ("MockSocial"), User Support Email, and Developer Contact Email.
    *   Save and Continue.
4.  **Create Credentials**:
    *   Navigate to **Credentials**.
    *   Click **Create Credentials** > **OAuth client ID**.
    *   Application type: **Web application**.
    *   Name: "MockSocial Web Client".
    *   **Authorized JavaScript origins**: `http://localhost:3000`
    *   **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
    *   Click **Create**.
5.  **Get ID and Secret**:
    *   Copy the **Client ID** and **Client Secret**.
6.  **Update Environment Variables**:
    *   Open `.env.local` (create it if it doesn't exist, use `.env.local.example` as a template).
    *   Add your credentials:
        ```env
        AUTH_SECRET="your-generated-secret" # Run `npx auth secret` to generate a secure secret
        AUTH_GOOGLE_ID="paste-your-client-id-here"
        AUTH_GOOGLE_SECRET="paste-your-client-secret-here"
        ```

Once configured, restart your dev server (`npm run dev`) and you should be able to sign in with Google!
