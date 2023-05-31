<script setup lang="ts">
    import { Ref, ref } from "vue";
    import { useKeyRegister } from "@/components/index";
    import TestExample from "@/example/TestExample.vue";
    //import { KeyRegister } from "@/components/index";

    const buttonPressed: Ref<string> = ref("");
    useKeyRegister().registerKeySequence({key:"a+a", callback:(keysPressed: string) => {
            buttonPressed.value = keysPressed;
    }});
    
</script>

<template>
  <div>
    {{  buttonPressed }}
    <TestExample/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
