import hyRequest from "@/service";


export function getCategoryListApi(params?: any) {
  return hyRequest.get({
    url: "/category",
    params,
  });
}

export function newCategoryApi(data: any) {
  return hyRequest.post({
    url: "/category",
    data,
  });
}


export function editCategoryApi(id: number, data: any) {
  return hyRequest.patch({
    url: `/category/${id}`,
    data,
  });
}


export function deleteCategoryApi(id: number) {
  return hyRequest.delete({
    url: `/category/${id}`,
  });
}


export function getArticleListApi(data: any) {
  return hyRequest.post({
    url: `/article/list`,
    data,
  });
}

export function newArticleApi(data: any) {
  return hyRequest.post({
    url: "/article",
    data,
  });
}


export function editArticleApi(id: number, data: any) {
  return hyRequest.patch({
    url: `/article/${id}`,
    data,
  });
}


export function deleteArticleApi(id: number) {
  return hyRequest.delete({
    url: `/article/${id}`,
  });
}

export function getArticleDetailApi(id: number) {
  return hyRequest.get({
    url: `/article/${id}`,
  });
}

