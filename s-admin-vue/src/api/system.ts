import hyRequest from "@/service";

export function postPageListData(pageName: string, data: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data,
  });
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`,
  });
}

export function newPageData(pageName: string, userInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: userInfo,
  });
}

export function editPageData(pageName: string, id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: userInfo,
  });
}

export function getRoleListApi(params?: any) {
  return hyRequest.get({
    url: "/role",
    params,
  });
}

export function newRoleApi(data: any) {
  return hyRequest.post({
    url: "/role",
    data,
  });
}

export function editRoleApi(id: number, data: any) {
  return hyRequest.patch({
    url: `/role/${id}`,
    data,
  });
}

export function deleteRoleApi(id: number) {
  return hyRequest.delete({
    url: `/role/${id}`,
  });
}

export function getMenuListApi(params?: any) {
  return hyRequest.get({
    url: "/menu",
    params,
  });
}


export function newMenuApi(data: any) {
  return hyRequest.post({
    url: "/menu",
    data,
  });
}


export function editMenuApi(id: number, data: any) {
  return hyRequest.patch({
    url: `/menu/${id}`,
    data,
  });
}


export function deleteMenuApi(id: number) {
  return hyRequest.delete({
    url: `/menu/${id}`,
  });
}

