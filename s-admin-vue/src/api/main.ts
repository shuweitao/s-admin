import hyRequest from '@/service'

export function getEntireRoles() {
  return hyRequest.get({
    url: '/role'
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}
