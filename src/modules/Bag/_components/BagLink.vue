<script setup lang="ts"></script>

<template>
  <a href="#" class="bag-link">
    <img class="bag-link__image" src="@/assets/svg/bag-fill.svg" alt="bag" />
  </a>
</template>

<style lang="scss" scoped>
.bag-link {
  height: 50%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1) rotateZ(15deg);
  }

  // .bag-link__image
  &__image {
    height: 100%;
    width: auto;
    object-fit: contain;
  }
}
</style>
