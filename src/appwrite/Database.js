import { Client, Databases, ID , Query} from "appwrite";
import Config from "../config/Config";

export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(Config.appWriteUrl) // Your API Endpoint
      .setProject(Config.appWriteProjectID);
    this.databases = new Databases(this.client);
  }

  // create post =====================

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        Config.appWriteDatabaseID,
        Config.appWriteCollectionID,
        slug,
        {
          Title: title,  // Use 'Title' with capital 'T'
          Content: content,  // Use 'Content' with capital 'C'
          FeaturedImage: featuredImage,  // Match schema field name exactly
          Status: status,  // Match the capitalization of the 'Status' field
          UserId: userId,  // Use the same capitalization for 'UserId'
        }
      );
    } catch (error) {
      console.log("appwrite:: database :: createpost :: error :: ", error.message);
      return false;
    }
  }

  //  update post ==================
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Config.appWriteDatabaseID,
        Config.appWriteCollectionID,
        slug,
        {
          Title: title,  // Capital 'T'
          Content: content,  // Capital 'C'
          FeaturedImage: featuredImage,  // Match the schema
          Status: status, 
        }
      );
    } catch (error) {
      console.log("appwrite:: database :: updatepost :: error :: ", error);
      return false;
    }
  }
//   delete post ========================

async deletePost(slug){
try {
   await this.databases.deleteDocument(
Config.appWriteDatabaseID,
Config.appWriteCollectionID,
slug
    )
    return true
    
} catch (error) {
    console.log("appwrite:: database :: deletepost :: error :: ", error)
    return false
}
}
//  get one post =======================
async getPost(slug){
try {
    return await this.databases.getDocument(
        Config.appWriteDatabaseID,
        Config.appWriteCollectionID,
        slug
    )
} catch (error) {
    console.log("appwrite:: database :: getpost :: error :: ", error);
    return false;
}
}

//  get all posts that is active ==============
async getPosts(queries = [Query.equal("Status", "active")]){
    try {
        
        return await this.databases.listDocuments(
            Config.appWriteDatabaseID,
            Config.appWriteCollectionID,
            queries,

        )
    } catch (error) {
        console.log("appwrite:: database :: getposts :: error :: ", error);
    return false;
    }
}

}
const databaseService = new DatabaseService();
export default databaseService;
