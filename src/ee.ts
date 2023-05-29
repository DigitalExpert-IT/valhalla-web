import EventEmitter from "eventemitter3";

(() => {
  if (!(global as any).ee) {
    (global as any).ee = new EventEmitter();
  }
})();

export default (global as any).ee as EventEmitter;
