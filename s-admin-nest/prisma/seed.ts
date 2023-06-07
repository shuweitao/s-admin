import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';
import _ from 'lodash';
import { Random } from 'mockjs';

const prisma = new PrismaClient();
const account = 'admin';
const username = '尼克';
async function run() {
  // await prisma.user.create({
  //   data: {
  //     account,
  //     password: await hash('123456'),
  //     username,
  //   },
  // });

  // for (let i = 1; i <= 5; i++) {
  //   await prisma.category.create({
  //     data: {
  //       title: Random.ctitle(3, 6),
  //     },
  //   });
  // }

  // for (let i = 0; i < 50; i++) {
  //   await prisma.article.create({
  //     data: {
  //       title: Random.ctitle(10, 30),
  //       content: Random.cparagraph(30, 50),
  //       category_id: _.random(1, 5),
  //     },
  //   });
  // }

  const role = await prisma.role.create({
    data: {
      name: '管理员',
      description: '管理员',
      permissions: {
        create: [
          // {
          //   name: '首页',
          //   description: '首页',
          //   type: 'C',
          //   path: '/home',
          //   icon: '',
          //   hidden: false,
          //   status: 1,
          //   sort: 0,
          //   pid: 0,
          // },
          {
            name: '系统管理',
            description: '系统管理',
            type: 'M',
            path: '/main/system',
            icon: 'Setting',
            hidden: false,
            status: 1,
            sort: 0,
            pid: 0,
          },
          {
            name: '用户管理',
            description: '用户管理',
            type: 'C',
            path: '/main/system/user',
            icon: '',
            hidden: false,
            status: 1,
            sort: 0,
            pid: 1,
          },
          {
            name: '菜单管理',
            description: '菜单管理',
            type: 'C',
            path: '/main/system/menu',
            icon: '',
            hidden: false,
            status: 1,
            sort: 0,
            pid: 1,
          },
          {
            name: '角色管理',
            description: '角色管理',
            type: 'C',
            path: '/main/system/role',
            icon: '',
            hidden: false,
            status: 1,
            sort: 0,
            pid: 1,
          },
          {
            name: '文章资讯',
            description: '文章资讯',
            type: 'M',
            path: '/main/article',
            icon: 'ChatLineSquare',
            hidden: false,
            status: 1,
            sort: 0,
            pid: 0,
          },
          {
            name: '文章管理',
            description: '文章管理',
            type: 'C',
            path: '/main/article/list',
            icon: '',
            hidden: false,
            status: 1,
            sort: 0,
            pid: 5,
          },
          {
            name: '文章栏目',
            description: '文章栏目',
            type: 'C',
            path: '/main/article/category',
            icon: '',
            hidden: false,
            status: 1,
            sort: 0,
            pid: 5,
          },
          {
            name: '文章新增/修改',
            description: '文章新增/修改',
            type: 'C',
            path: '/main/article/list/edit',
            icon: '',
            hidden: true,
            status: 1,
            sort: 0,
            pid: 5,
          },
        ],
      },
    },
  });

  // const permission = await prisma.permission.create({
  //   data: {
  //     roles: {
  //       connect: {
  //         id: role.id,
  //       },
  //     },
  //   },
  // });

  const user = await prisma.user.create({
    data: {
      account,
      password: await hash('123456'),
      username,
      roles: {
        connect: {
          name: '管理员',
        },
      },
    },
  });
}

run();
