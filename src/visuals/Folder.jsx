import { useState } from 'react';
import './Folder.css';

const darkenColor = (hex, percent) => {
  let c = hex.startsWith('#') ? hex.slice(1) : hex;
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

export default function Folder({ color = '#5227FF', size = 1, items = [], className = '', onNavigate }) {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) papers.push(null);

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleClick = () => {
    if (!open) {
      setOpen(true);
      // Navigate after animation starts
      setTimeout(() => {
        if (onNavigate) {
          onNavigate();
        }
      }, 300);
    } else {
      setOpen(false);
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const magnet = (e, i) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
    setPaperOffsets(prev => {
      const copy = [...prev];
      copy[i] = { x: offsetX, y: offsetY };
      return copy;
    });
  };

  const reset = (_e, i) => {
    setPaperOffsets(prev => {
      const copy = [...prev];
      copy[i] = { x: 0, y: 0 };
      return copy;
    });
  };

  const style = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  };

  return (
    <div style={{ transform: `scale(${size})` }} className={className}>
      <div className={`folder ${open ? 'open' : ''}`} style={style} onClick={handleClick}>
        <div className="folder__back">
          {papers.map((item, i) => (
            <div
              key={i}
              className={`paper paper-${i + 1}`}
              onMouseMove={e => magnet(e, i)}
              onMouseLeave={e => reset(e, i)}
              style={open ? { '--magnet-x': `${paperOffsets[i]?.x || 0}px`, '--magnet-y': `${paperOffsets[i]?.y || 0}px` } : {}}
            >
              {item}
            </div>
          ))}
          <div className="folder__front"></div>
          <div className="folder__front right"></div>
        </div>
      </div>
    </div>
  );
}
