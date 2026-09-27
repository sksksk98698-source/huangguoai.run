<script setup lang="ts">
import { ref } from 'vue'

const copied = ref(false)
const copyCode = () => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText('keqgvT5Y')
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="hero-showcase-container">
    <div class="hero-showcase-card">
      <!-- 顶部状态指示栏 -->
      <div class="hsc-header">
        <div class="hsc-status">
          <span class="hsc-pulse-dot"></span>
          <span class="hsc-status-text">双核创作控制台 · 专线直连</span>
        </div>
        <div class="hsc-tag">🔥 2026 官方推荐</div>
      </div>

      <!-- 核心 1：黄果短剧 AI 官网 -->
      <div class="hsc-module huangguo">
        <div class="hsc-module-top">
          <div class="hsc-module-icon">🍊</div>
          <div class="hsc-module-info">
            <div class="hsc-module-title">
              <span>黄果短剧 AI 官网</span>
              <span class="hsc-badge-teal">官方正版</span>
            </div>
            <div class="hsc-module-desc">自动分镜 · 角色锁脸不变脸 · 免显卡云渲染</div>
          </div>
        </div>
        <a 
          href="https://huangguoju.co/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hsc-btn teal"
        >
          <span>访问官网 huangguoju.co</span>
          <svg class="hsc-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
        </a>
      </div>

      <!-- 中间协同桥接标识 -->
      <div class="hsc-bridge">
        <div class="hsc-bridge-line"></div>
        <div class="hsc-bridge-pill">⚡ 协同搭档：出海与大模型高速专线</div>
        <div class="hsc-bridge-line"></div>
      </div>

      <!-- 核心 2：光速云 创作者出海专线 -->
      <div class="hsc-module gsy">
        <div class="hsc-module-top">
          <div class="hsc-module-icon">🚀</div>
          <div class="hsc-module-info">
            <div class="hsc-module-title">
              <span>光速云 · 创作高速专线</span>
              <span class="hsc-badge-gold">出海网络</span>
            </div>
            <div class="hsc-module-desc">
              Sora/Runway/TikTok低延迟 · 特权码:
              <span class="hsc-code-badge" @click="copyCode" :title="copied ? '已复制特权码！' : '点击复制特权码'">
                <code>keqgvT5Y</code>
                <span class="hsc-copy-tip">{{ copied ? '✓' : '📋' }}</span>
              </span>
            </div>
          </div>
        </div>
        <a 
          href="https://sahude.gsyvipaff.com/#/?code=keqgvT5Y" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hsc-btn gold"
        >
          <span>注册光速云 (享特权专线)</span>
          <svg class="hsc-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
        </a>
      </div>

      <!-- 底部安全与合规标签 -->
      <div class="hsc-footer">
        <span>🛡️ 官方正版防伪入口</span>
        <span class="hsc-dot">•</span>
        <span>⚡ 影视级出海网络保障</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-showcase-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.hero-showcase-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1.5px solid rgba(245, 158, 11, 0.38);
  border-radius: 18px;
  padding: 22px 22px 18px;
  box-shadow: 0 16px 36px -10px rgba(245, 158, 11, 0.16),
              0 6px 16px -4px rgba(20, 184, 166, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.6) inset;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

:global(.dark) .hero-showcase-card {
  background: rgba(22, 22, 30, 0.92);
  border-color: rgba(245, 158, 11, 0.35);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6),
              0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

.hero-showcase-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -12px rgba(245, 158, 11, 0.25),
              0 10px 20px -6px rgba(20, 184, 166, 0.15);
  border-color: rgba(245, 158, 11, 0.6);
}

/* Header */
.hsc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--vp-c-border);
}

.hsc-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

@keyframes hsc-pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.hsc-pulse-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: hsc-pulse 2s infinite;
}

.hsc-status-text {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.hsc-tag {
  font-size: 0.76rem;
  font-weight: 700;
  color: #d97706;
  background: #fef3c7;
  padding: 2px 10px;
  border-radius: 9999px;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

:global(.dark) .hsc-tag {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

/* Modules */
.hsc-module {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 14px;
  transition: all 0.2s ease;
}

:global(.dark) .hsc-module {
  background: var(--vp-c-bg-soft);
}

.hsc-module.huangguo:hover {
  border-color: var(--vp-c-brand-1);
}

.hsc-module.gsy:hover {
  border-color: #f59e0b;
}

.hsc-module-top {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.hsc-module-icon {
  font-size: 1.5rem;
  line-height: 1;
  padding: 8px;
  background: var(--vp-c-bg-soft);
  border-radius: 10px;
  border: 1px solid var(--vp-c-border);
}

.hsc-module-info {
  flex: 1;
}

.hsc-module-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.96rem;
  font-weight: 800;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.hsc-badge-teal {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-soft);
  padding: 1px 6px;
  border-radius: 4px;
}

.hsc-badge-gold {
  font-size: 0.72rem;
  font-weight: 700;
  color: #d97706;
  background: rgba(245, 158, 11, 0.15);
  padding: 1px 6px;
  border-radius: 4px;
}

:global(.dark) .hsc-badge-gold {
  color: #fbbf24;
}

.hsc-module-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.45;
}

.hsc-code-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: rgba(245, 158, 11, 0.12);
  border: 1px dashed rgba(245, 158, 11, 0.6);
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 2px;
  transition: all 0.2s ease;
}

.hsc-code-badge:hover {
  background: rgba(245, 158, 11, 0.25);
}

.hsc-code-badge code {
  font-family: var(--vp-font-family-mono);
  font-weight: 800;
  color: #d97706;
  font-size: 0.82rem;
}

:global(.dark) .hsc-code-badge code {
  color: #fbbf24;
}

.hsc-copy-tip {
  font-size: 0.72rem;
  color: #d97706;
}

:global(.dark) .hsc-copy-tip {
  color: #fbbf24;
}

/* Action Buttons */
.hsc-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 0.86rem;
  font-weight: 700;
  text-decoration: none !important;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.hsc-btn.teal {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, var(--vp-c-brand-2) 100%);
  color: #ffffff !important;
  box-shadow: 0 4px 10px rgba(20, 184, 166, 0.25);
}

.hsc-btn.teal:hover {
  box-shadow: 0 6px 14px rgba(20, 184, 166, 0.38);
  transform: translateY(-1px);
}

.hsc-btn.gold {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #ffffff !important;
  box-shadow: 0 4px 10px rgba(245, 158, 11, 0.25);
}

.hsc-btn.gold:hover {
  box-shadow: 0 6px 14px rgba(245, 158, 11, 0.4);
  transform: translateY(-1px);
}

.hsc-arrow {
  transition: transform 0.2s ease;
}

.hsc-btn:hover .hsc-arrow {
  transform: translate(2px, -2px);
}

/* Bridge */
.hsc-bridge {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;
}

.hsc-bridge-line {
  flex: 1;
  height: 1px;
  background: var(--vp-c-border);
}

.hsc-bridge-pill {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  padding: 2px 10px;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-border);
  white-space: nowrap;
}

/* Footer */
.hsc-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.74rem;
  color: var(--vp-c-text-3);
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-border);
}

.hsc-dot {
  font-size: 0.7rem;
  opacity: 0.5;
}
</style>
