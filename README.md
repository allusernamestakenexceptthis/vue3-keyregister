# Vue 3 Key Register

Vue 3 plugin to register and unregister key sequences. rather than pressing keys at the same time, you can execute a callback after pressing keys in certain sequence.  such as h then e then l then l then o.

## installation

```bash
npm install @adariari/vue3-keyregister
```

then in main.ts/main.js, add:

```javascript
import KeyRegister from '@adariari/vue3-keyregister'
...
.use(KeyRegister)

```

Full example of main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import KeyRegister from '@adariari/vue3-keyregister'


createApp(App)
    .use(KeyRegister)
    .mount('#app')

```

## Example of use

```vue
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

## Methods

### RegisterKeySequence

```yml
useKeyRegister().registerKeySequence (
    RegisteryProps: object
)
```

RegistryProps can accept following options:

```javascript
/*
     @key string keyIdentity unique identity of key sequence such as 'hello' or 'bye', maybe used as key|identity
     @key string key sequence of keys such as 'ctrl+shift+alt+key' or m+m or c+a
     @key boolean once if true, callback will be executed only once
     @key function callback (targetKey : string, lastEvent : KeyboardEvent) => void
     @key function|null validateTargetCallback callback to validate target
*/
```

key Or keyIdentity required
callback also required

keyIdentity can be used as identity only, or to specifiy key e.g.

```yml
keyIdentity: "c+c|my cc key"
```

this both sets key as c+c and use keyIdentity c+c|my cc key

or you can set them separately:

```yml
key: "c+c",
keyIdentity: "my cc key"
```

you can also just set the key, but cautious that when you remove the key in this case, it will remove all mentions of it from any component

### unregisterKeySequence

This can unregister the sequence by keyIdentity, it will remove any registered key matching the identity

```javascript
useKeyRegister().unregisterKeySequence("c+c|my cc key");
```

### registerSequenceListener

Register a listener for sequences, to customize action and process. return true if there is match or false if none

```yml
useKeyRegister().registerSequenceListener (
    ListenProps: object
)
```

ListenProps can accept following options:

```javascript
/*
    @key options ListenerProps consists of 
            listener a callback that should take 
            (sequence : array<string> containing sequence of keys, lastEvent : KeyboardEvent) => boolean
            Boolean value should be returned to indicate if the sequence is matched
    @key Once if true, listener will be executed only once
*/
```

### unregisterSequenceListener

Unregister listener

```javascript
/*
@param listener to be unregistered
*/
You should pass same function you passed to register listener


## Options

You can set options globally either in main or in any component using composable

Available options:

```yml
// Timeout in milliseconds to wait for the next keypress
timeout: 500,
// Timeout in milliseconds to block key events after a key sequence is matched
blockingDelay: 10,
```

### composable

```javascript
const { options } = useKeyRegister();

//can set global timeout for all key sequences
options.timeout = 1000;
```

### main

```javascript
const app = createApp(App);
app.use(KeyRegister,{
    // Timeout in milliseconds to wait for the next keypress
    timeout: 500,
    // Timeout in milliseconds to block key events after a key sequence is matched
    blockingDelay: 10,
});
app.mount('#app');
```
