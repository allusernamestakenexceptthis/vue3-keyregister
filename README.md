# Vue 3 Key Register

Vue 3 plugin to register and unregister key sequences. rather than pressing keys at the same time, you can execute a callback after pressing keys in certain sequence.  such as h then e then l then l then o.

### installation

```
npm install @adariari/vue3-keyregister
```

then in main.ts/main.js, add:
```
import KeyRegister from '@adariari/vue3-keyregister'
...
.use(KeyRegister)

```

Full example of main.js

```
import { createApp } from 'vue'
import App from './App.vue'
import KeyRegister from '@adariari/vue3-keyregister'


createApp(App)
    .use(KeyRegister)
    .mount('#app')

```

### Example of use

```
<script setup>
    import { ref } from 'vue'
    // import composable useKeyRegister to register keys and change options
    import { useKeyRegister } from '@adariari/vue3-keyregister'

    const keyPressed = ref('');

    //register sequence hello,  and execute callback
    useKeyRegister().registerKeySequence({
        keyIdentity: 'h+e+l+l+o',
        callback: (key) => {
            console.log(key);
            keyPressed.value = key;
        }
    })

    //register sequence bye
    useKeyRegister().registerKeySequence({
        keyIdentity: 'b+y+e',
        callback: (key) => {
            console.log(key);
            keyPressed.value = key;
        }
    })
</script>


<template>
  key pressed : {{ keyPressed }}
</template>

```

# Methods

## RegisterKeySequence

```
useKeyRegister().registerKeySequence (
    RegisteryProps: object
)
```

RegistryProps can accept following options:
```
     @key string keyIdentity unique identity of key sequence such as 'hello' or 'bye', maybe used as key|identity
     @key string key sequence of keys such as 'ctrl+shift+alt+key' or m+m or c+a
     @key boolean once if true, callback will be executed only once
     @key function callback (targetKey : string, lastEvent : KeyboardEvent) => void
     @key function|null validateTargetCallback callback to validate target
```

key Or keyIdentity required
callback also required

keyIdentity can be used as identity only, or to specifiy key e.g.
```
keyIdentity: "c+c|my cc key"
```

this both sets key as c+c and use keyIdentity c+c|my cc key

or you can set them separately:
```
key: "c+c",
keyIdentity: "my cc key"
```

you can also just set the key, but cautious that when you remove the key in this case, it will remove all mentions of it from any component

## unregisterKeySequence

This can unregister the sequence by keyIdentity, it will remove any registered key matching the identity


```
useKeyRegister().unregisterKeySequence("c+c|my cc key");
```

# Options

You can set options globally either in main or in any component using composable

Available options:
```
// Timeout in milliseconds to wait for the next keypress
timeout: 500,
// Timeout in milliseconds to block key events after a key sequence is matched
blockingDelay: 10,
```

## composable

```
const { options } = useKeyRegister();

//can set global timeout for all key sequences
options.timeout = 1000;
```

## main

```
const app = createApp(App);
app.use(KeyRegister,{
    // Timeout in milliseconds to wait for the next keypress
    timeout: 500,
    // Timeout in milliseconds to block key events after a key sequence is matched
    blockingDelay: 10,
});
app.mount('#app');
```


