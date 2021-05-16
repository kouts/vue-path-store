export const dataOf = (wrapper) => {
  const plainText = wrapper.html().replace(/<[^>]+>/g, '')
  let res
  try {
    res = JSON.parse(plainText)
  } catch (e) {
    res = plainText
  }
  return res
}

export const waitNT = (ctx) => new Promise((resolve) => ctx.$nextTick(resolve))
export const waitRAF = () => new Promise((resolve) => requestAnimationFrame(resolve))
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
