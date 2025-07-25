export function isIOS() {
  console.log("User-Agent:", navigator.userAgent);
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}
