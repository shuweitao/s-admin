import { IAccount } from "@/types";
import hyRequest from "@/service";

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/user/${id}`
  })
}


export function getUserMenuByRoleId(ids: number[]) {
  return hyRequest.post({
    url: `/role/menu`,
    data: ids
  })
}
