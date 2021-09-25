import { Icon } from '@visurel/iconify-angular';

export interface MenuHome {
    name: string;
    icon?: Icon;
    router?: string;
    children?: MenuHome[];
}