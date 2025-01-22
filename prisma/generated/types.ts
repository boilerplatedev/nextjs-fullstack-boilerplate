import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Session = {
    id: string;
    token: string;
    ipAddress: string | null;
    userAgent: string | null;
    activeOrganizationId: string | null;
    userId: string;
    expiresAt: Timestamp;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type User = {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    emailVerified: boolean;
};
export type UserAccount = {
    id: string;
    accountId: string;
    providerId: string;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Timestamp | null;
    refreshTokenExpiresAt: Timestamp | null;
    scope: string | null;
    password: string | null;
    userId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type UserVerification = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Timestamp;
    createdAt: Generated<Timestamp | null>;
    updatedAt: Timestamp | null;
};
export type DB = {
    sessions: Session;
    userAccounts: UserAccount;
    userVerifications: UserVerification;
    users: User;
};
