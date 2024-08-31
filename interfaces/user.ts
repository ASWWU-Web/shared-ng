export type Status = 'Student' | 'Faculty' | 'Staff' | 'Administrator' | 'Content Moderator' | string;
export interface User {
  full_name: string;
  photo: string;
  roles: string;
  status: string;
  username: string;
  wwuid: string;
}
