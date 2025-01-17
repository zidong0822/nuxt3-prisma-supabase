<template>
  <div>
    <h1>文章列表</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>

    <form @submit.prevent="createPost">
      <input v-model="newPost.title" placeholder="标题" />
      <textarea v-model="newPost.content" placeholder="内容"></textarea>
      <button type="submit">创建文章</button>
    </form>
  </div>
</template>

<script setup>
const posts = ref([])
const newPost = ref({
  title: '',
  content: ''
})

// 获取文章列表
const fetchPosts = async () => {
  try {
    posts.value = await $fetch('/api/posts')
  } catch (error) {
    console.error('获取文章列表失败:', error)
    posts.value = []
  }
}

// 创建新文章
const createPost = async () => {
  try {
    await $fetch('/api/posts', {
      method: 'POST',
      body: newPost.value
    })
    await fetchPosts()
    newPost.value = { title: '', content: '' }
  } catch (error) {
    console.error('创建文章失败:', error)
    alert('创建文章失败，请重试')
  }
}

// 页面加载时获取文章列表
onMounted(() => {
  fetchPosts()
})
</script>
