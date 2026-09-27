<script setup>
import DefaultTheme from 'vitepress/theme'
import HeroShowcaseCard from './components/HeroShowcaseCard.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <HeroShowcaseCard />
    </template>
  </Layout>
</template>
