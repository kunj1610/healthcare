// Import AWS S3 SDK client
import S3 from "aws-sdk/clients/s3";

// Initialize S3 client with configuration
const s3 = new S3({
  accessKeyId: "accessKeyId", // AWS access key ID for authentication
  secretAccessKey: "secretAccessKey", // AWS secret access key for authentication
  endpoint: "endpoint", // Custom endpoint URL for S3-compatible storage
  s3ForcePathStyle: true, // Force path-style addressing
  signatureVersion: "v4", // Use AWS Signature Version 4 for requests
  connectTimeout: 0, // No timeout limit for connections
  httpOptions: { timeout: 0 }, // No timeout limit for HTTP requests for perform
});
