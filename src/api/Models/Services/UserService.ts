import { Request, Response, Router } from "express";
import { User } from "../Entities/user";
import { UserRepository } from "../Repositories/UserRepository";
 
 
export class UserService {
  private userRepository: UserRepository;
  
  private static _user: any;

  constructor() {
    this.userRepository = new UserRepository();
  }

   

  /** CRUD  */

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(userId: string) {
    return await this.userRepository.findOne(userId);
  }
  async create(user: User) {
    return await this.userRepository.create(user);
  }

  async update(user: User, id: string) {
    return await this.userRepository.update(user, id);
  }
  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
