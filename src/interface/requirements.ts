export interface PublicRequirements {
  avatar: string;
  organizationName: string;
  reward: number;
  projectTag: string;
  createTime: string;
  needsName: string;
  description: string;
  projectId: string;
}

export interface PublicNeedRequest {
  reward: number;
  crypto: string;
  avatar: string;
  organizationName: string;
  needsName: string;
  walletAddress: string | null;
  description: string;
  projectTag: string;
  createTime: string;
  lastModifyTime: string;
  projectStatus: string;
  projectId: string;
}


export interface OwnedApplication {
  avatar: string;
  organizationName: string;
  messageList: Array<any>;
  // remark: string;
  // reply?: string;
  createTime: string;
  status: string;
  walletAddress: string;
  cooperationCompleted?: boolean;
  projectId: string;
}

export interface OwnedProps {
  needsTag: string;
  time: string;
  status: string;
  reward: string;
  crypto: string;
  needsName: string;
  description: string;
  cooperationAvatars: string[];
  applications: OwnedApplication[];
  projectId?: string;

}

interface MessageDto {
    name: string;
    message: string;
    createTime: number;
}

export interface Application {
    applicationUserName: string;
    applicationUserAvatar: string;
    applicationId: string;
    applicationStatus: number;
    createTime: number;
    messageDtoList: MessageDto[];
}
