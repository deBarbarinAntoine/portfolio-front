export interface StringElem {
    id?: string | number;
    value: string;
}

export interface Themes {
    light: string;
    dark: string;
}

export enum LanguageLevels {
    A1 = 'A1 - Beginner',
    A2 = 'A2 - Elementary',
    B1 = 'B1 - Intermediate',
    B2 = 'B2 - Upper-Intermediate',
    C1 = 'C1 - Advanced',
    C2 = 'C2 - Proficient',
}