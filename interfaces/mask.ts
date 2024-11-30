// An interface for the full profile returned by the backend
// This is used to construct the ProfileModel class
// This should be updated if the profile model in the backend changes.
export interface ProfileFull {
  wwuid: string;
  username: string;
  full_name: string;
  photo: string | null;
  blurhash: string | null;
  gender: string;
  birthday: string;
  email: string;
  phone: string;
  website: string;
  majors: string;
  minors: string;
  graduate: string;
  preprofessional: string;
  class_standing: string;
  high_school: string;
  class_of: string;
  relationship_status: string;
  attached_to: string;
  quote: string;
  quote_author: string;
  hobbies: string;
  career_goals: string;
  favorite_books: string;
  favorite_movies: string;
  favorite_music: string;
  favorite_food: string;
  pet_peeves: string;
  personality: string;
  views: string;
  // while we do classify as a boolean, the backend returns a string "1" or "0"
  // profile.model.ts will convert it to a boolean for us
  privacy: boolean | string;
  department: string;
  office: string;
  office_hours: string;
}

// Type helpers based off of the profile model

// For the name search endpoint
export type Names = Pick<ProfileFull, "username" | "full_name">;

// Some of our endpoints only return a subset of the profile fields
export type PartialProfile = Pick<
  ProfileFull,
  "username" | "full_name" | "photo" | "email" | "blurhash"
>;

export type ProfileUpdate = Partial<
  Omit<ProfileFull, "wwuid" | "username" | "views">
>;
