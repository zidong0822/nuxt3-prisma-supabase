import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const method = event.method
    
    if (method === 'GET') {
      const posts = await prisma.post.findMany()
      return posts
    }
    
    if (method === 'POST') {
      const body = await readBody(event)
      
      // 添加输入验证
      if (!body.title) {
        throw createError({
          statusCode: 400,
          message: '标题不能为空'
        })
      }
      
      const post = await prisma.post.create({
        data: {
          title: body.title,
          content: body.content || ''
        }
      })
      return post
    }
  } catch (error) {
    console.error('API Error:', error)
    throw createError({
      statusCode: 500,
      message: '服务器错误',
      cause: error
    })
  }
}) 