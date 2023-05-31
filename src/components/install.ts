import { reactive } from 'vue';
//import KeyRegister from "@/components/KeyRegister";
import { KeyRegisterSymbol } from "@/components/symbols";
import { KeyRegisterOptions, KeyRegisterPlugin } from "@/components/types";
import { defaultOpts } from './defaults';

const Keyregister: KeyRegisterPlugin = {
  install: (app, options: KeyRegisterOptions = {}) => {
    console.log('KeyRegisterPlugin: install');
    //app.config.globalProperties.$KeyRegister = KeyRegister;
    app.provide(KeyRegisterSymbol,  reactive<KeyRegisterOptions>({
        ...defaultOpts,
        ...options,
    }));
  }
};

export default Keyregister;
