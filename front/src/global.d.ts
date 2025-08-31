export {};

declare global {
  interface Window {
    __addTask?: (task: Task) => void;
  }
}
