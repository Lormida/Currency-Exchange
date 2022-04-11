<script setup lang="ts"></script>

<template>
  <div class="title-symbol title-symbol__wrapper">
    <span class="title-symbol__title-name">
      <slot name="name"></slot>
    </span>

    <span class="title-symbol__title-symbol">
      <slot name="symbol"></slot>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.title-symbol {
  // .title-symbol__wrapper

  &__wrapper {
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: fit-content;
    justify-content: space-between;
    align-items: center;
    background-color: $white8;
    padding: 10px;
    margin: 0px;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    &:hover {
      color: $white8;
      background-color: $darkGrey;
    }
  }

  // .title-symbol__title-name

  &__title-name {
    font-weight: bold;
    @include adaptive-value('margin-right', 30, 10);
  }

  // .title-symbol__title-symbol

  &__title-symbol {
    color: $currencySymbol;
  }
}
</style>
