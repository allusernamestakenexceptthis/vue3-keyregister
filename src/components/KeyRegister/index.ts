

import { onMounted, onUnmounted } from 'vue';
import { KeyRegisterOptions } from '../types';

interface RegistryProps {
    keyIdentity: string,
    key: string,
    callback: Function,
    validateTargetCallback: Function | null,
    once: boolean,
}


class KeyRegister {

    /*** Public properties ****/

    // Timeout in milliseconds to clear key history
    public timeout: number = 500;

    // Timeout in milliseconds to block key events after a key sequence is matched
    public blockingDelay: number = 10;

    /*** Private properties ****/
    // Registry of key sequences
    private keyRegistry: Array<RegistryProps> = [];

    // History of keys pressed
    private keyHistory: Array<string> = [];

    // Timeout id to clear key history
    private timeoutId: NodeJS.Timeout | null = null;

    // Timeout id to block key events after a key sequence is matched
    private blockingTimeoutId: NodeJS.Timeout | null = null;

    constructor(options: KeyRegisterOptions = {}) {
        this.keyRegistry = [];

        this.setOptions(options);

        onMounted(() => {
            window.removeEventListener('keydown', (this, this.keyHandler));
            window.addEventListener('keydown', (this, this.keyHandler));
        })
        onUnmounted(() => window.removeEventListener('keydown', (this, this.keyHandler)))
    }

    /**
     * Set options
     * 
     * @param options 
     */
    public setOptions(options: KeyRegisterOptions):void {
        this.timeout = options.timeout || this.timeout;
        this.blockingDelay = options.blockingDelay || this.blockingDelay;
    }
    
    /**
     * Register key sequences
     * 
     * @param RegistryProps options consists of
     *      @key string keyIdentity unique identity of key sequence such as 'hello' or 'bye', maybe used as key|identity
     *      @key string key sequence of keys such as 'ctrl+shift+alt+key' or mm or ca
     *      @key boolean once if true, callback will be executed only once
     *      @key function|null callback (targetKey : string, lastEvent : KeyboardEvent) => void
     *      @key function|null validateTargetCallback callback to validate target
     */
    registerKeySequence(options: RegistryProps|any) {
        if (!options.keyIdentity && options.key) {
            options.keyIdentity = options.key;
        } else if (!options.key && options.keyIdentity) {
            options.key = options.keyIdentity.toLowerCase().split('|')[0];
        } else if (!options.key && !options.keyIdentity) {
            throw new Error('Key or keyIdentity is required');
        }
        if (!options.callback) {
            throw new Error('Callback is required');
        }
        this.keyRegistry.push(options);
    }

    /**
     * Unregister key sequences
     * 
     * @param string keyIdentity sequence of keys such as 'ctrl+shift+alt+key' or mm or ca
     */
    unregisterKeySequence(keyIdentity: string) {
        this.keyRegistry = this.keyRegistry.filter((item) => item.keyIdentity !== keyIdentity);
    }

    /**
     * Get key from event
     * 
     * @param event 
     * @returns string key
     */
    private getKey(event: KeyboardEvent) {
        let key = '';

        if (event.metaKey || event.ctrlKey) {
            key += 'ctrl';
        }

        if (event.shiftKey) {
            key += 'shift';
        }

        if (event.altKey) {
            key += 'alt';
        }

        const keyPressed = (event.key)?event.key.toLowerCase():"";
        
        //to avoid adding modifier keys to key sequence twice
        if (keyPressed !== 'control' && keyPressed !== 'shift' && keyPressed !== 'alt') {
            if (key) {
                key += '+';
            }
            key += keyPressed;
        }

        return key;
    }

    /**
     * This is the main handler for key events
     * 
     * @param event 
     * @returns void
     */
    private keyHandler = (event: KeyboardEvent): void => {
        const key = this.getKey(event);
        const target = event.target as HTMLElement;
        if (target === null) {
            return;
        }
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.keyHistory.push(key);
        /*TODO: add setting to optional limit key history
        if (this.keyHistory.length > 3) {
            this.keyHistory.shift();
        }*/

        this.timeoutId = setTimeout(() => {
            this.keyHistory = [];
        }, this.timeout);

        const targetKey = this.keyHistory.join('+');
        let actionPerformed = false;
        if (this.blockingTimeoutId) {
            return;
        }
        this.keyRegistry.forEach((item) => {
            if (targetKey.indexOf(item.key) !==-1) {
                if (item.validateTargetCallback !== undefined) {
                    if (item.validateTargetCallback !== null && !item.validateTargetCallback(event)){
                        return;
                    } 
                } else if ((target.tagName === "TEXTAREA" || target.tagName === "INPUT")) {
                    return;
                }
                item.callback(item.keyIdentity, event);
                actionPerformed = true;
                if (item.once) {
                    this.unregisterKeySequence(item.keyIdentity);
                }
                this.blockingTimeoutId = setTimeout(() => {
                    this.blockingTimeoutId = null;
                }, this.blockingDelay);
            }
        });

        if (actionPerformed) {
            event.preventDefault();
            this.keyHistory = [];
        }            
    }
}

export default KeyRegister;
export { KeyRegister };