<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import RecursiveShow from "./components/recursiveShow.vue";
import { effectAttr, getAttrRecursive, reqPermission, urlReg } from "./utils";

const input = ref<HTMLInputElement | null>(null);
const state = reactive({
  inputVal: "",
  checkbox: new Set<string>(...[effectAttr.slice(0, 4)]),
});

const showProps = computed(() => {
  const res = getAttrRecursive(state.inputVal, [...state.checkbox]);
  console.log(res);
  return res;
});

const setTextWhenVisible = () => {
  input.value?.focus();
  navigator.clipboard?.readText().then((text) => {
    if (text.match(urlReg)) {
      state.inputVal = text;
    }
  });
};

const changeConfig = (key: string) => {
  state.checkbox[state.checkbox.has(key) ? "delete" : "add"](key);
};

onMounted(async () => {
  await reqPermission();
  setTextWhenVisible();
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      setTextWhenVisible();
    }
  });
});
</script>

<template>
  <aside>
    <input
      class="w-full h-10 rounded-full px-5 py-2 mb-4"
      ref="input"
      v-model="state.inputVal"
      type="text"
    />
  </aside>
  <hr />
  <main>
    <header class="flex gap-4 flex-wrap py-2">
      <div v-for="key in effectAttr" :key="key">
        <input
          :id="key"
          type="checkbox"
          class="mr-1"
          name="config"
          @click="changeConfig(key)"
          :checked="state.checkbox.has(key)"
        />
        <label class="inline-block cursor-pointer" :for="key">{{ key }}</label>
      </div>
    </header>
    <hr />

    <div v-if="showProps" class="py-5">
      <RecursiveShow :level="0" :values="showProps" keyname="Link" />
    </div>
  </main>
</template>

<style scoped></style>
