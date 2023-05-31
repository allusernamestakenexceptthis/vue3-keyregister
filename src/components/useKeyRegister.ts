import { inject } from "vue";
import { KeyRegisterSymbol } from "./symbols";
import { KeyRegister } from ".";



var KeyRegisterInstance: KeyRegister|null = null;

export default function useKeyRegister() {
    const keyRegisterOptions = inject(KeyRegisterSymbol);
    if (!keyRegisterOptions) {
        throw new Error('useKeyRegister() must be used after KeyRegister is installed.');
    }

    if (KeyRegisterInstance === null) {
        KeyRegisterInstance = new KeyRegister();
    }

    KeyRegisterInstance.setOptions(keyRegisterOptions);

    const registerKeySequence = KeyRegisterInstance.registerKeySequence.bind(KeyRegisterInstance);
    const unregisterKeySequence = KeyRegisterInstance.unregisterKeySequence.bind(KeyRegisterInstance);

    return {
        registerKeySequence,
        unregisterKeySequence,
        options: keyRegisterOptions
    }
}