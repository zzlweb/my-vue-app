const hexToHSV = (hex: string): [number, number, number] => {  
  // 确保hex以#开头  
  if (hex.startsWith('#')) hex = hex.slice(1);  
  
  // 检查长度，确保是6位的十六进制  
  if (hex.length !== 6) {  
    throw new Error('Invalid hex color code (must be #RRGGBB)');  
  }  
  
  // 转换为RGB  
  const r = parseInt(hex.slice(0, 2), 16) / 255;  
  const g = parseInt(hex.slice(2, 4), 16) / 255;  
  const b = parseInt(hex.slice(4, 6), 16) / 255;  
  
  // RGB to HSV conversion  
  let max = Math.max(r, g, b), min = Math.min(r, g, b);  
  let h: number, s: number, v = max;  
  
  let d = max - min;  
  s = max === 0 ? 0 : d / max;  
  
  if (max === min) {  
    h = 0; // 0 degrees if max == min (no chroma)  
  } else if (max === r) {  
    h = ((g - b) / d) + (g < b ? 6 : 0);  
  } else if (max === g) {  
    h = ((b - r) / d) + 2;  
  } else if (max === b) {  
    h = ((r - g) / d) + 4;  
  }  
  
  h /= 6;  
  
  return [h, s, v];  
}

const clipboard = (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch((err) => {
      throw err !== undefined
        ? err
        : new DOMException('The request is not allowed', 'NotAllowedError');
    });
  }

  const span = document.createElement('span');
  span.textContent = text;

  span.style.whiteSpace = 'pre';

  document.body.appendChild(span);

  const selection = window.getSelection();
  const range = window.document.createRange();
  selection?.removeAllRanges();
  range.selectNode(span);
  selection?.addRange(range);

  let success = false;
  try {
    success = window.document.execCommand('copy');
  } catch (err) {
    // eslint-disable-next-line
    console.log('error', err);
  }

  selection?.removeAllRanges();
  window.document.body.removeChild(span);

  return success
    ? Promise.resolve()
    : Promise.reject(
      new DOMException('The request is not allowed', 'NotAllowedError')
    );
}


export {hexToHSV , clipboard}