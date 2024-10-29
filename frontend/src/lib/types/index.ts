export interface User {
  id: number
  name: string
  username: string
  hashedpassword: string
  reviews?: number[]
  favorites?: number[]
}

export interface InputUser {
  id: string
  name: string
  username: string
  hashedpassword: string
  reviews?: number[]
  favorites?: number[]
}

export interface Review {
  id: number
  title: string
  author: number
  rating: number
  user: User
}

export interface Destination {
  id: string
  title: string
  titleQuestion?: string
  description: string
  longDescription?: string
  categories: string[]
  country: string
  region?: string
  image: string
  alt: string
  rating: number
}

export interface DestinationInput {
  title: string
  titleQuestion?: string
  description: string
  longDescription: string
  categories: string[]
  country: string
  region?: string
  image: string
  alt: string
  rating: number
}
