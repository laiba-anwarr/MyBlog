import { Client, Storage, ID } from "appwrite";
import Config from "../config/Config";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(Config.appWriteUrl)
      .setProject(Config.appWriteProjectID);
    this.storage = new Storage(this.client);
  }

  //  file upload =====================
  async fileUpload(file) {
    try {
      return await this.storage.createFile(
        Config.appWriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(
        "appwrite::storage :: uploadfiles:: error :: ",
        error.message
      );
      return null;
    }
  }
  //  delete file ====================
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(Config.appWriteBucketID, fileId);
      return true;
    } catch (error) {
      console.log("appwrite::storage :: deletefiles:: error :: ", error);
      return false;
    }
  }
  //  file preview
  getFilePreview(fileId) {
    return this.storage.getFilePreview(Config.appWriteBucketID, fileId);
  }
}
const storageService = new StorageService();
export default storageService;
