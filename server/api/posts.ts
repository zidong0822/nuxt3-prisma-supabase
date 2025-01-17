import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const method = event.method
  
  // GET 请求获取所有文章
  if (method === 'GET') {
    const posts = await prisma.post.findMany()
    return posts
  }
  
  // POST 请求创建新文章
  if (method === 'POST') {
    const body = await readBody(event)
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content
      }
    })
    return post
  }
}) 