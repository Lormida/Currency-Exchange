<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  ariaLabel: string
  ariaDirection: string
}>()
const linkRef = ref<Element | null>(null)

onMounted(() => {
  if (props.ariaDirection === 'left') {
    linkRef.value?.classList.add('pagination__button--left')
  } else {
    linkRef.value?.classList.add('pagination__button--right')
  }
})
</script>

<template>
  <li class="pagination-button">
    <a class="pagination-button__link" ref="linkRef" href="#" :aria-label="ariaLabel"> </a>
  </li>
</template>

<style lang="scss" scoped>
.pagination-button {
  // .pagination-button__link

  &__link {
    height: 54px;
    width: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(22, 22, 22, 0.5);
    mask-size: contain;
    transition: all 0.3s ease;

    text-decoration: none;
    box-shadow: none;
    &:hover {
      transform: scale(1.2);
      background-color: rgba(22, 22, 22, 1);
    }
  }
}
.pagination__button--left {
  mask-image: url(@/assets/svg/CaretBack.svg);
}
.pagination__button--right {
  mask-image: url(@/assets/svg/CaretForward.svg);
}
</style>
