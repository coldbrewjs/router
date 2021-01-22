export default abstract class Store {
    abstract getData(...args: any): any;
    abstract setData(...args: any): void;
}
