
export class LLOG {
   private static TAG = "LLOG"
    static d(...args: any[]) {
        let message = '';
        args.forEach(item => {
            message += ("; " + String(item))
        });
        console.log(this.TAG, message)
    }
    static e(...args: any[]) {
        let message = '';
        args.forEach(item => {
            message += ("; " + String(item))
        });
        console.error(this.TAG, message)
    }
}
