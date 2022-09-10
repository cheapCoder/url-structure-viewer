<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { readStrFromCopyBoard, urlReg } from "./utils";

const input = ref<HTMLInputElement | null>(null);
const state = reactive({
  inputVal: "",
});

const effectAttr = [
  "hash",
  "host",
  "hostname",
  "href",
  "origin",
  "pathname",
  "port",
  "protocol",
  "search",
  "searchParams",
  "username",
] as const;

const showProps = computed(() => {
  return state.inputVal.match(urlReg) ? new URL(state.inputVal) : null;
});

const setTextWhenVisible = () => {
  readStrFromCopyBoard().then((text) => {
    if (text.match(urlReg)) {
      state.inputVal = text;
    }
  });
};

onMounted(() => {
  input.value?.focus();

  setTextWhenVisible();
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      setTextWhenVisible();
    }
  });
});
</script>

<template>
  <aside class="flex-1 px-5 py-5">
    <input
      class="w-full h-10 rounded-full px-5 py-2"
      ref="input"
      v-model="state.inputVal"
      type="text"
    />
  </aside>
  <main class="flex-1">
    <header class="flex gap-4 flex-wrap">
      <div v-for="key in effectAttr" :key="key">
        <input :id="key" type="checkbox" class="mr-2" />
        <label class="inline-block cursor-pointer" :for="key">{{ key }}</label>
      </div>
    </header>

    <div v-if="showProps" class="px-5 py-5">
      <div v-for="key in effectAttr" v-show="showProps?.[key]" :key="key">
        <span class="font-semibold mr-2">{{ key }}: </span>
        <span> {{ showProps?.[key] }}</span>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
