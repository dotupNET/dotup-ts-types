// tslint:disable
interface String {
  format(...args: any[]): string;
}

(<any>String.prototype).format =
  function (...args: any) {
    let str = this.toString();
    if (args.length) {
      var t = typeof args[0];
      var key;
      var args = ("string" === t || "number" === t) ?
        Array.prototype.slice.call(args)
        : args[0];

      for (key in args) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
      }
    }

    return str;
  };

export {}