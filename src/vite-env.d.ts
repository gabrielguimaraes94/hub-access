
/// <reference types="vite/client" />

// Add declaration for ActiveXObject for IE compatibility
interface Window {
  ActiveXObject?: new (progID: string) => any;
}

declare var ActiveXObject: {
  new (progID: string): any;
  prototype: any;
} | undefined;

