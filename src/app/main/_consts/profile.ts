import { PrimeIcons  } from "primeng/api"
import { UserDropdownType } from "../_models";

export const UserDropdowns = [
  {
    label: 'Thông tin cá nhân',
    icon: PrimeIcons.USER,
    type: UserDropdownType.INFO
  },
  {
    label: 'Giao diện',
    icon: PrimeIcons.PALETTE,
    type: UserDropdownType.THEME
  },
  {
    label: 'Cài đặt',
    icon: PrimeIcons.COG,
    type: UserDropdownType.SETTING
  }
];
