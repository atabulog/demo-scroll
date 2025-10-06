type Subscriber<T> = (value: T) => void;

export class BehaviorSubject<T> {
    private value: T; // Current value of the BehaviorSubject
    private subscribers: Set<Subscriber<T>> = new Set(); // Set of subscribers

    /**
     * Creates a new BehaviorSubject with the given initial value
     * @param initialValue - The initial value of the BehaviorSubject
     */
    constructor(initialValue: T) {
        this.value = initialValue;
    }

    /**
     * Update the value and notify all subscribers
     * @param value - The new value to emit to subscribers
     */
    next(value: T) {
        this.value = value;
        this.subscribers.forEach(subscriber => subscriber(value));
    }

    /**
     * Subscribe to value changes
     * @param subscriber - The function to call when the value changes
     * @returns unsubscribe function to remove the subscriber
     */
    subscribe(subscriber: Subscriber<T>): () => void {
        subscriber(this.value);
        this.subscribers.add(subscriber);
        return () => this.subscribers.delete(subscriber);
    };

    /**
     * Get the current value of the BehaviorSubject without subscribing
     * @returns The current value of the BehaviorSubject
     */
    getValue(): T {
        return this.value;
    }
}

