export interface GetUserDto {
  account?: string;
  username?: string;
  status?: number;
  page: number;
  pageSize?: number;
  roles?: number;
  created_at?: string[];
}
