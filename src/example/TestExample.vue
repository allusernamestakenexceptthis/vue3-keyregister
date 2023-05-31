<script setup default lang="ts">
    import { Ref, ref } from "vue";
    import { useKeyRegister } from "../components/index";

    const test2: Ref<string> = ref("");
    const { options } = useKeyRegister();

    //can set global timeout for all key sequences
    options.timeout = 1000;

    //can set once: true to unregister after first key sequence
    useKeyRegister().registerKeySequence({keyIdentity:"a+a|mykeys", once: true, callback:(presedKey: string) => {
            test2.value = presedKey + "zz";
    }});

    useKeyRegister().registerKeySequence({keyIdentity:"a+b|mykeys", callback:(presedKey: string) => {
            test2.value = presedKey ;
    }});
</script>

<template>
  <div>
    {{  test2 }} test
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
