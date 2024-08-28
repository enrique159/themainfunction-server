import { UUID } from "./Id.js"

export interface IUser {
  id?: UUID
  username: string
  fullName: string
  email: string
  password: string
  bio?: string
  location?: string
  company?: string
  country?: string
  githubLink?: string
  website?: string
  createdAt?: Date
  updatedAt?: Date
}