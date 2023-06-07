import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const success = (message: string, data: any = {}, code = 0) => {
  return {message, data, code};
};

export const paginate = (data: {
  page: number;
  total: number;
  row: number;
  data: any[];
}) => {
  return {
    meta: {
      current_page: data.page,
      row: data.row,
      total: data.total,
      page_row: Math.ceil(data.total / data.row),
    },
    data: data.data,
  };
};

export const url = (url: string) => {
  return process.env.URL + '/' + url;
};

/**
 *  一维数组转树形结构
 * */
export const transTree = (data) => {
  let result = [];
  let map = {};
  if (!Array.isArray(data)) {
    //验证data是不是数组类型
    return [];
  }
  data.forEach((item) => {
    //建立每个数组元素id和该对象的关系
    map[item.id] = item; //这里可以理解为浅拷贝，共享引用
  });
  data.forEach((item) => {
    let parent = map[item.pid]; //找到data中每一项item的爸爸
    if (parent) {
      //说明元素有爸爸，把元素放在爸爸的children下面
      (parent.children || (parent.children = [])).push(item);
    } else {
      //说明元素没有爸爸，是根节点，把节点push到最终结果中
      item.children = []
      result.push(item); //item是对象的引用
    }
  });
  return result; //数组里的对象和data是共享的
};

/**
 * 两个数组求差集
 * const list = [1, 2, 3, 4, 5]
 * const list2 = [1, 2, 3, 5]
 * console.log(getArrDifference(list,list2)); //[4]
 */
export const getArrDifference = (arr1: any, arr2: any) => {
  return arr1.concat(arr2).filter((v, i, arr) => {
    return arr.indexOf(v) === arr.lastIndexOf(v);
  });
};

export function formatUTC(
  utcString: string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format);
  return resultTime;
}
