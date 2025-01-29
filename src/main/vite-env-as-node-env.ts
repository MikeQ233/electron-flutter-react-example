// @ts-nocheck
if (process.env.NODE_ENV === 'development') {
  process.env.FLUTTER_PORT = import.meta.env.VITE_FLUTTER_PORT;
}

if (process.env.NODE_ENV === 'production') {
}
