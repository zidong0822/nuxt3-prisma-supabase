<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl mb-4">文章列表</h1>
    
    <!-- 错误提示 -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- 文章列表 -->
    <div class="space-y-4">
      <div v-for="post in posts" :key="post.id" class="border p-4 rounded">
        <h2 class="text-xl font-bold">{{ post.title }}</h2>
        <p class="mt-2">{{ post.content }}</p>
      </div>
    </div>

    <!-- 创建文章表单 -->
    <form @submit.prevent="createPost" class="mt-8 space-y-4">
      <div>
        <input 
          v-model="newPost.title" 
          placeholder="标题" 
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <textarea 
          v-model="newPost.content" 
          placeholder="内容"
          class="w-full p-2 border rounded"
          rows="4"
        ></textarea>
      </div>
      <button 
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="isLoading"
      >
        {{ isLoading ? '创建中...' : '创建文章' }}
      </button>
    </form>
  </div>
</template>

<script setup>
const posts = ref([])
const newPost = ref({
  title: '',
  content: ''
})
const error = ref('')
const isLoading = ref(false)

// 获取文章列表
const fetchPosts = async () => {
  try {
    error.value = ''
    const response = await $fetch('/api/posts')
    if (response.success) {
      posts.value = response.data
    }
  } catch (err) {
    console.error('获取文章列表失败:', err)
    error.value = '获取文章列表失败，请刷新页面重试'
    posts.value = []
  }
}

// 创建新文章
const createPost = async () => {
  if (!newPost.value.title.trim()) {
    error.value = '标题不能为空'
    return
  }

  try {
    isLoading.value = true
    error.value = ''
    
    const response = await $fetch('/api/posts', {
      method: 'POST',
      body: newPost.value
    })
    
    if (response.success) {
      await fetchPosts()
      newPost.value = { title: '', content: '' }
    }
  } catch (err) {
    console.error('创建文章失败:', err)
    error.value = '创建文章失败，请重试'
  } finally {
    isLoading.value = false
  }
}

// 页面加载时获取文章列表
onMounted(() => {
  fetchPosts()
})
</script>
