import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const method = event.method

    // 添加数据库连接测试
    await prisma.$connect()

    if (method === 'GET') {
      const posts = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
      return { success: true, data: posts }
    }
    
    if (method === 'POST') {
      const body = await readBody(event)
      
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
      return { success: true, data: post }
    }

  } catch (error: any) {
    console.error('API Error:', error)
    
    // 更详细的错误信息
    const statusCode = error.statusCode || 500
    const message = error.message || '服务器错误'
    
    throw createError({
      statusCode,
      message,
      cause: error
    })
  } finally {
    // 确保断开连接
    await prisma.$disconnect()
  }
}) 