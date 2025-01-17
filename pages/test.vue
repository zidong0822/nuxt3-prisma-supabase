<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl mb-4">数据库连接测试</h1>
    
    <div v-if="loading" class="text-gray-600">
      正在测试数据库连接...
    </div>
    
    <div v-else>
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <h3 class="font-bold">连接失败</h3>
        <pre class="mt-2 text-sm">{{ error }}</pre>
      </div>
      
      <div v-if="result" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <h3 class="font-bold">{{ result.message }}</h3>
        <pre class="mt-2 text-sm">{{ JSON.stringify(result.details, null, 2) }}</pre>
      </div>
      
      <button 
        @click="testConnection" 
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        重新测试连接
      </button>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)
const error = ref(null)
const result = ref(null)

const testConnection = async () => {
  loading.value = true
  error.value = null
  result.value = null
  
  try {
    const response = await $fetch('/api/test-db')
    result.value = response
    if (!response.success) {
      error.value = response.error
    }
  } catch (err) {
    console.error('测试请求失败:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

// 页面加载时自动测试连接
onMounted(() => {
  testConnection()
})
</script> 