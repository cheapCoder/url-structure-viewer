<script setup lang="ts" name="recursiveShow">
import { computed } from "vue";

const props = defineProps<{
  level: number;
  keyname: string;
  values: any;
}>();

const write = (text: string) => {
  navigator.clipboard.writeText(text);
};

const show = computed(() =>
  // @ts-ignore
  Array.isArray(props.values) ? props.values["__source"] : props.values
);
</script>

<template>
  <template v-if="props.keyname">
    <div
      @click="write(show)"
      :style="{ marginLeft: level * 20 + 'px' }"
      class="px-1 py-1 hover:border-gray-700 border-transparent border-2 box-border"
    >
      <span class="font-semibold mr-2">{{ props.keyname }}: </span>
      <span> {{ show }}</span>
    </div>
  </template>

  <div v-if="Array.isArray(props.values)">
    <!-- :style="{
      border:
        '2px solid ' +
        // @ts-ignore
        (props.values['__type'] === 'url' ? '#ccc' : 'transparent'),
    }" -->
    <div v-for="[key, val] in values" :key="key">
      <recursive-show :level="props.level + 1" :values="val" :keyname="key" />
    </div>
  </div>
</template>
