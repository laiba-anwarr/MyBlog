import { Client, Account, ID } from "appwrite";
import Config from "../config/Config";
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(Config.appWriteUrl)
      .setProject(Config.appWriteProjectID);
    this.account = new Account(this.client);
  }
// signup ============================

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //automatically login

        return this.login({email , password});
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

//   login ============================
async login({email , password}){
 try {
  return  await this.account.createEmailPasswordSession(email , password)

 } catch (error) {
    throw error
 }
}

//  getCurrentUSer  ========================
async getCurrentUser() {
  try {
    return await this.account.get();
  } catch (error) {
    console.error("Error in getCurrentUser:", error.message || error);
  }
  return null;
}
//    logout ==============

async logOut(){
    try {
        // maybe there will be return
        localStorage.removeItem("userData");
        await this.account.deleteSessions();
    } catch (error) {
     throw error   
    }
}
}
const authService = new AuthService();
export default authService;
