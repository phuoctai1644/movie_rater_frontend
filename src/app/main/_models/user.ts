export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export enum UserDropdownType {
  INFO = 'INFO',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  THEME = 'THEME',
  SETTING = 'SETTING'
}
