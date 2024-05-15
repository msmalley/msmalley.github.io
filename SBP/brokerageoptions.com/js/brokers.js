var toastTrigger = document.getElementById('btn-toast-example')
var toastLiveExample = document.getElementById('toast-example')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

function parseHSL(str) {
  var hsl, h, s, l
  hsl = str.replace(/[^\d,]/g, '').split(',')   // strip non digits ('%')  
  h = Number(hsl[0])                            // convert to number
  s = Number(hsl[1])
  l = Number(hsl[2])
  return [h, s, l]                              // return parts
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

var rp = 'hsl(188, 48%, 50%)';

function harmonize(color, start, end, interval) {

    const [h, s, l] = parseHSL(color);
    
    const h2 = (h) % 360;
    const c2 = `hsl(${h2}, ${s}%, ${l}%)`;
    
    const colors = [hslToHex(h2, s, l)];

    for(let i = start; i <= end; i += interval) {
        const h1 = (h + i) % 360;
        const c1 = `hsl(${h1}, ${s}%, ${l}%)`;
        colors.push(hslToHex(h1, s, l))
    }

    return colors
}

var triad = harmonize(rp, 120, 240, 120);
console.log('triad', triad)
