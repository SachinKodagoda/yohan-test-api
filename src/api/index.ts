import { VercelRequest, VercelResponse } from "@vercel/node";
import createApp from "../server";

// Create Express app
const app = createApp();

// Handler for Vercel serverless function
export default async (req: VercelRequest, res: VercelResponse) => {
  // This creates a proxy to forward the request to our Express app
  return new Promise((resolve, reject) => {
    const expressReq = app._router.handle(req, res, (err: Error) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(undefined);
    });
  });
};

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8081;
  app
    .listen(PORT, () => {
      const now = new Date().toLocaleString();
      console.log(`[${now}] Server is up and running on port number: ${PORT}`);
    })
    .on("error", (error) => {
      console.error(`Error occurred: ${error.message}`);
    });
}
