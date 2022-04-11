<script setup lang="ts">
const props = defineProps<{
  titles: Array<string>
  classes?: Array<string>
}>()

const getCurrentStyle = (index: number) => props.classes && props.classes[index]
</script>

<template>
  <thead>
    <tr>
      <slot name="first-column"> </slot>
      <th v-for="index of titles.length" class="lead text-start align-middle" :class="getCurrentStyle(index - 1)" scope="col">
        {{ titles[index - 1] }}
      </th>
    </tr>
  </thead>
</template>

<style lang="scss" scoped>

th {
  @include adaptive-value('font-size', 18, 9);
}
</style>
