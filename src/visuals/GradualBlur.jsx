// Component added by Ansh - github.com/ansh-dhanani (credit retained)
import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as math from 'mathjs';
import './GradualBlur.css';

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS = {
  bottom: { position: 'bottom', height: '6rem' },
  top: { position: 'top', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' }
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});
const getGradientDirection = pos => ({ top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' }[pos] || 'to bottom');

export default function GradualBlur(props) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const preset = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, preset, props);
  }, [props]);

  const divs = useMemo(() => {
    const arr = [];
    const increment = 100 / config.divCount;
    const curve = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;
    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curve(progress);
      const currentStrength = isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;
      const blurValue = config.exponential ? math.pow(2, progress * 4) * 0.0625 * currentStrength : 0.0625 * (progress * config.divCount + 1) * currentStrength;
      const p1 = math.round((increment * i - increment) * 10) / 10;
      const p2 = math.round(increment * i * 10) / 10;
      const p3 = math.round((increment * i + increment) * 10) / 10;
      const p4 = math.round((increment * i + increment * 2) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      const dir = getGradientDirection(config.position);
      const style = {
        position: 'absolute',
        inset: 0,
        maskImage: `linear-gradient(${dir}, ${gradient})`,
        WebkitMaskImage: `linear-gradient(${dir}, ${gradient})`,
        backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
        opacity: config.opacity
      };
      arr.push(<div key={i} style={style} />);
    }
    return arr;
  }, [config, isHovered]);

  const baseStyle = useMemo(() => {
    const isV = ['top', 'bottom'].includes(config.position);
    const isH = ['left', 'right'].includes(config.position);
    const s = {
      position: config.target === 'page' ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      zIndex: config.target === 'page' ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };
    if (isV) {
      s.height = config.height; s.width = '100%'; s[config.position] = 0; s.left = 0; s.right = 0;
    } else if (isH) {
      s.width = config.width || config.height; s.height = '100%'; s[config.position] = 0; s.top = 0; s.bottom = 0;
    }
    return s;
  }, [config]);

  return (
    <div
      ref={containerRef}
      className={`gradual-blur ${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} ${config.className || ''}`}
      style={baseStyle}
      onMouseEnter={config.hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={config.hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner">{divs}</div>
    </div>
  );
}
