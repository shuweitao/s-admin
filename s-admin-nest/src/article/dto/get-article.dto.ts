export interface GetArticleDto {
  title?: string;
  cid?: number;
  status?: number;
  page: number;
  pageSize?: number;
  created_at?: string[];
}
