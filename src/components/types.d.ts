import { AllowedComponentProps, Plugin, App } from 'vue'

export interface KeyRegisterOptions {
    timeout?: number,
    blockingDelay?: number,
}

export interface KeyRegisterPlugin extends Plugin {
    install: (app: App, options?: KeyRegisterOptions) => void;
}


export const KeyRegister: new () => {
    $props: AllowedComponentProps
}