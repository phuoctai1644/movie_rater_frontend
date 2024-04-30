export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export enum UserDropdownType {
  INFO = 'INFO',
  THEME = 'THEME',
  SETTING = 'SETTING'
}
