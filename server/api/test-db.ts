import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 测试数据库连接
    await prisma.$connect()
    
    // 尝试执行一个简单的查询
    const result = await prisma.$queryRaw`SELECT 1 as connected;`
    
    return {
      success: true,
      message: '数据库连接成功',
      details: {
        databaseUrl: process.env.DATABASE_URL?.slice(0, 30) + '...', // 只显示部分URL
        result
      }
    }
  } catch (error: any) {
    console.error('数据库连接测试失败:', error)
    
    return {
      success: false,
      message: '数据库连接失败',
      error: {
        message: error.message,
        code: error.code,
        meta: error.meta
      }
    }
  } finally {
    await prisma.$disconnect()
  }
}) 