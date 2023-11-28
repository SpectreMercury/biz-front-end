export interface UserProfile {
    userName: string | null;
    userWallet?: string | null;
    avatar: string;
    userEmail: string | null;
    socialLinkList?: string[] | null;
    noticeNum?: number | null;
    desc?: string;
}

export interface FormDataInterface {
    logo: string;
    userName: string;
    description: string;
    website: string;
    twitter: string;
    other: string;
    personFlag: boolean;
    useEmail: string;
    userWallet: string | null;
    checkbox: boolean;
}