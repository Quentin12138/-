// 一
// 数据中的每一项都有一个id 并且都有一个pid
// pid代表parentid 当前项的pid如果和其他某一项的id相同
// 说明当前项是这一项的子集
// 可以根据这个对应关系进行数据的结构转换 将数据转换成带有层级结构的数据
// 数据中的层级结构用children

// 二
// 封装工具函数
// 工具类函数都有固定的结构
// 参数
// 逻辑
// 返回值

// 找儿子的方法
// 1、在全量的数组中找
// 2、还需要知道父亲的id
// 3、使用数组中的forEach方法 将当前项放在我们的结果中
// 4、将结果return出去

function findSon(arr, id) {
  const resultArr = []
  // 逻辑
  arr.forEach(item => {
    console.log(item)
    if (item.pid === id) {
      resultArr.push(item)
      const children = findSon(arr, item.id)
      if (children.length) {
        item.children = children
      }
    }
  })
  return resultArr
}

export default findSon
