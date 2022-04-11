<script setup lang="ts"></script>

<template>
  <div class="title-button">
    <span class="title-button__name">
      <slot name="default"></slot>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.title-button {
  display: flex;
  font-size: 30px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  background-color: $green8;
  &:hover {
    cursor: pointer;
    color: $green8;
    background-color: $darkGrey;
  }
  // .title-button__name

  &__name {
    text-align: center;
  }
}
</style>
