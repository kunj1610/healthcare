// Import axios for making HTTP requests
import axios from "axios";

// Import all API request options/configurations
import {
  getUsersOptions,
  getUserOptions,
  createUserOptions,
  deleteUserOptions,
  generateUserAccessOptions,
  listObjectsOptions,
  uploadIdentityOptions,
  uploadRecordOptions,
  downloadObjectOptions,
  downloadObjectsOptions,
  updateObjectOptions,
  deleteObjectOptions,

  deleteObjectSOptions,
  shareObjectOptions,
  shareObjectsOptions,
  revokeAccessGrantOptions
} from "./options";

// StorjAPI class for interacting with Storj decentralized storage
export default class StorjAPI {
  // Get all users
  async getUsers() {
    return await axios(getUsersOptions);
  }

  // Get a specific user by ID
  async getUser(id) {
    const options = getUserOptions(id);
    return await axios(options)
  }

  // Create a new user with Ethereum address
  async createUser(ethereumAddress) {
    const options = createUserOptions(ethereumAddress);
    return await axios(options)
  }

  // Delete a user by ID
  async deleteUser(id) {
    const options = deleteUserOptions(id);

    return await axios(options);
  }

  // Generate access credentials for a user
  async generateUserAccess(userPassPhrase, id) {
    const options = generateUserAccessOptions(userPassPhrase, id);
    return await axios(options);
  }

  // List objects/files for a user
  async listObjects(reqData, id) {
    const options = listObjectsOptions(reqData, id);
    return await axios(options);
  }

  // Upload identity verification documents
  async uploadIdentity(reqData, id) {
    const options = uploadIdentityOptions(reqData, id);
    return await axios(options);
  }

  // Upload medical records
  async uploadRecord(reqData, id) {
    const options = uploadRecordOptions(reqData, id);
    return await axios(options);
  }

  // Download a single object/file
  async downloadObject(reqData, id) {
    const options = downloadObjectOptions(reqData, id);
    return await axios(options);
  }

  // Download multiple objects/files
  async downloadObjects(reqData, id) {
    const options = downloadObjectsOptions(reqData, id);
    return await axios(options);
  }

  // Update an existing object/file
  async updateObject(reqData, id) {
    const options = updateObjectOptions(reqData, id);
    return await axios(options);
  }

  // Delete a single object/file
  async deleteObject(reqData, id) {
    const options = deleteObjectOptions(reqData, id);
    return axios(options);
  }

  // Delete multiple objects/files
  async deleteObjects(reqData, id) {
    const options = deleteObjectsOptions(reqData, id);
    return axios(options);
  }

  // Share a single object/file with another user
  async shareObject(reqData, id) {
    const options = shareObjectOptions(reqData, id);
    return axios(options);
  }

  // Share multiple objects/files with another user
  async shareObjects(reqData, id) {
    const options = shareObjectsOptions(reqData, id);
    return axios(options);
  }

  // Revoke previously granted access to objects
  async revokeAccessGrant(reqData, id) {
    const options = revokeAccessGrantOptions(reqData, id);
    return axios(options);
  }
}
