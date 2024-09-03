export interface ProfileFull {
  wwuid: string;
  username: string;
  full_name: string;
  photo: string;
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
  privacy: string;
  department: string;
  office: string;
  office_hours: string;
}
// For the name search endpoint
export type Names = Pick<ProfileFull, "username" | "full_name">;

// Some of our endpoints only return a subset of the profile fields
export type PartialProfile = Pick<
  ProfileFull,
  "username" | "full_name" | "photo" | "email"
>;

export type ProfileUpdate = Partial<
  Omit<ProfileFull, "wwuid" | "username" | "views">
>;
