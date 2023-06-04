<script setup default lang="ts">
    import { Ref, ref, reactive, onUnmounted } from "vue";
    import { useKeyRegister } from "../components/index";

    const test2: Ref<string> = ref("");

    const listenerString: {data: Array<string>} = reactive({data: Array('')});

    const { options } = useKeyRegister();

    //can set global timeout for all key sequences
    options.timeout = 1000;

    //can set once: true to unregister after first key sequence
    useKeyRegister().registerKeySequence({keyIdentity:"a+a|mykeys", once: true, callback:(presedKey: string) => {
            test2.value = presedKey;
    }});

    useKeyRegister().registerKeySequence({keyIdentity:"a+b|mykeys", callback:(presedKey: string) => {
            test2.value = presedKey ;
    }});

    //test listeners
    const listenerFunc = (pressedKey: Array<string>) => {
        listenerString.data = [];
        listenerString.data = Object.assign(listenerString.data, pressedKey);
        console.log("listenerString.data", pressedKey);
        if (pressedKey.join("") == "listen") {
            listenerString.data.push("matched");
            return true;
        } else {
            return false;
        }
    };

    useKeyRegister().registerSequenceListener({listener: listenerFunc});

    onUnmounted(() => {
        useKeyRegister().unregisterKeySequence("a+a|mykeys");
        useKeyRegister().unregisterKeySequence("a+b|mykeys");
        useKeyRegister().unregisterSequenceListener(listenerFunc);
    });
</script>

<template>
  <div>
    {{ test2 }} test
    <br/>
    {{  listenerString.data }}
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
