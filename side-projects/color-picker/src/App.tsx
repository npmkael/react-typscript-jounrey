import { useState } from 'react'

function App() {
  const [color, setColor] = useState("#000000");

  function handleSetColor(colorCode: string) {
    setColor(colorCode);
  }

  const hexToRgb = (hexCode: string) => {
    const result = [];

    for (let i = 1; i < hexCode.length; i += 2) {
      result.push(hexCode.slice(i, i + 2));
    }

    const rgb = [];

    for (let x = 0; x < result.length; x++) {
      const letter = result[x];
      let left;
      let right;
      for (let j = 0; j < result[x].length; j++) {
        if (j === 0) {
          left = letter[j];
        } else {
          right = letter[j];
        }
      }

      const leftCalculation = parseInt(left as string, 16) * 16;
      const rightCalculation = parseInt(right as string, 16) * 1;

      const totalCalc = leftCalculation + rightCalculation;

      rgb.push(totalCalc);
    }

    return rgb;
  };

  const rgb = hexToRgb(color);

  function rgbToHsl (r: number, g: number, b: number): HSL {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    // Lightness (L)
    let l = (max + min) / 2;

    // Saturation (S)
    let s;
    if (max === min) {
      s = 0;
    } else {
      s = l > 0.5 ? (max - min) / (2.0 - max - min) : (max - min) / (max + min);
    }

    // Hue (H)
    let h;
    if (max === min) {
      h = 0;
    } else {
      if (max === r) {
        h = (g - b) / (max - min);
      } else if (max === g) {
        h = 2.0 + (b - r) / (max - min);
      } else {
        h = 4.0 + (r - g) / (max - min);
      }

      h *= 60;
      if (h < 0) h += 360;
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return {
      h: Math.round(h),
      s: s,
      l: l,
    };
  };

  const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

  return (
    <>
      <Title>React Color Picker</Title>
      <ColorPicker color={color} onHandleSetColor={handleSetColor} />
      <ColorDatas hex={color} rgb={rgb} hsl={hsl} />
      <Footer hex={color} rgb={rgb} />
    </>
  );
}

type TitleProps = {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <div className="title">
      <h1>{children}</h1>
    </div>
  );
};

type ColorPickerProps = {
  color: string;
  onHandleSetColor: (colorCode: string) => void;
}

const ColorPicker = ({ color, onHandleSetColor }: ColorPickerProps) => {
  return (
    <div className="main-container">
      <div className="input-color-container">
        <input
          type="color"
          value={color}
          id="color-picker"
          onChange={(e) => onHandleSetColor(e.target.value)}
        />
      </div>
    </div>
  );
};

type HSL = {
  h: number;
  s: number;
  l: number;
}

type ColorDatas = {
  hex: string;
  rgb: number[];
  hsl: HSL;
}

const ColorDatas = ({ hex, rgb, hsl }: ColorDatas) => {
  return (
    <div className="color-datas">
      <div>
        <h2>Color Datas 🎨</h2>
      </div>
      <div>
        <p>Hex: {hex}</p>
        <p>
          RGB: {rgb[0]}, {rgb[1]}, {rgb[2]}
        </p>
        <p>
          HSL: {hsl.h}, {hsl.s}%, {hsl.l}%
        </p>
      </div>
    </div>
  );
};

type TFooter = Omit<ColorDatas, "hsl">;

const Footer = ({ hex, rgb }: TFooter) => {
  return (
    <footer style={{ backgroundColor: hex }}>
      <span
        style={{
          color: "white",
          filter: `invert(${Math.round((rgb[0] + rgb[1] + rgb[2] / 3) / 3)}%)`,
        }}
      >
        {hex}
      </span>
    </footer>
  );
};

export default App
