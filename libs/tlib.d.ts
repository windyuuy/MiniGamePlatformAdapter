declare namespace ThirdLib {
    var Base64: {
        VERSION: string;
        atob: (a: any) => any;
        btoa: (b: any) => any;
        fromBase64: (a: any) => any;
        toBase64: (u: any, urisafe: any) => any;
        utob: (u: any) => any;
        encode: (u: any, urisafe: any) => any;
        encodeURI: (u: any) => any;
        btou: (b: any) => any;
        decode: (a: any) => any;
        noConflict: () => any;
    };
}
declare namespace ThirdLib {
}
declare var tlib: typeof ThirdLib;
declare namespace ThirdLib {
    var MD5: {
        hex: (s: any) => string;
        b64: (s: any) => string;
        any: (s: any, e: any) => string;
        hex_hmac: (k: any, d: any) => string;
        b64_hmac: (k: any, d: any) => string;
        any_hmac: (k: any, d: any, e: any) => string;
    };
}
declare namespace ThirdLib {
    let xxtea: {
        utf8Encode: (str: string) => string;
        utf8Decode: (str: string) => string;
        encrypt: (str: string, key: string) => number[];
        encryptToBase64: (str: string, key: string) => string;
        decrypt: (str: number[], key: string) => string;
        decryptFromBase64: (str: string, key: string) => string;
        encryptToBase64Ex1: (str: string, key: string) => string;
        decryptFromBase64Ex1: (str: string, key: string) => string;
    };
}
