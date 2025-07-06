// src/app/models/user-profile.model.ts

export interface UserProfileModel {
    phoneNumber: string | null | undefined;
    githubUrl: string | null | undefined;
    portfolioUrl: string | null | undefined;
    id: number;
    userName?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    googleId?: string;
    createdAt: string;      // ISO date string
    dateOfBirth?: string;   // ISO date string
    profession?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    address?: string;
    country?: string;
    hobbies?: string;
    gender?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    imageUrl?: string;
    designation?: string;
    company?: string;
    about?: string;
    skills?: string;
    headline?: string;
    roles: string[];
  }
  
  export interface UpdateUserProfileModel {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;   // ISO date string
    profession?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    address?: string;
    country?: string;
    hobbies?: string;
    gender?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    imageUrl?: string;
    designation?: string;
    company?: string;
    about?: string;
    skills?: string;
    headline?: string;
    email?: string;
  }
  