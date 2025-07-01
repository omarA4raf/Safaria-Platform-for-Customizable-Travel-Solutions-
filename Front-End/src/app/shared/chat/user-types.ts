// shared/chat/user-types.ts
export enum UserType {
  TOURIST = 'tourist',
  GUIDE = 'guide',
  COMPANY = 'company',
  ADMIN = 'admin'
}

// Optional: Also export as type
export type UserTypeEnum = keyof typeof UserType;