"use client";

import { useEffect, useRef } from "react";

interface AnimatedCanvasImageProps {
src: string;
alt?: string;
width: number;
height: number;
shadowOpacity?: number; // 0..1
className?: string;
fitToParent?: boolean;
}

export default function AnimatedCanvasImage({
src,
alt,
width,
height,
shadowOpacity = 0.25,
className,
fitToParent = true
}: AnimatedCanvasImageProps) {
const canvasRef = useRef<HTMLCanvasElement | null>(null);
const imageRef = useRef<HTMLImageElement | null>(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;

const ctx = canvas.getContext("2d");
if (!ctx) return;

let currentW = width;
let currentH = height;

const setupSize = (w: number, h: number) => {
const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
canvas.width = Math.floor(w * dpr);
canvas.height = Math.floor(h * dpr);
canvas.style.width = `${w}px`;
canvas.style.height = `${h}px`;
ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.scale(dpr, dpr);
currentW = w;
currentH = h;
};

if (fitToParent && canvas.parentElement) {
const { clientWidth, clientHeight } = canvas.parentElement;
setupSize(clientWidth || width, clientHeight || height);
const ro = new ResizeObserver(entries => {
for (const entry of entries) {
const cr = entry.contentRect;
setupSize(Math.max(50, cr.width), Math.max(50, cr.height));
drawImage();
}
});
ro.observe(canvas.parentElement);
(canvas as any)._ro = ro;
} else {
setupSize(width, height);
}

const img = new Image();
imageRef.current = img;
img.src = src;
img.decoding = "async";

const drawImage = () => {
if (!img.complete) return;

ctx.clearRect(0, 0, currentW, currentH);

// Static shadow
const shadowY = currentH * 0.78;
const shadowWidth = Math.min(currentW * 0.65, currentW - 20);
const shadowHeight = Math.max(8, currentH * 0.06);
const shadowX = (currentW - shadowWidth) / 2;
ctx.save();
ctx.fillStyle = `rgba(0,0,0,${shadowOpacity})`;
ctx.filter = "blur(6px)";
ctx.beginPath();
ctx.ellipse(
shadowX + shadowWidth / 2,
shadowY,
shadowWidth / 2,
shadowHeight / 2,
0,
0,
Math.PI * 2
);
ctx.fill();
ctx.restore();

// Draw image centered, preserving aspect ratio
const iw = img.width;
const ih = img.height;
const containerW = currentW;
const containerH = currentH * 0.7; // leave room for shadow
const scale = Math.min(containerW / iw, containerH / ih);
const drawW = iw * scale;
const drawH = ih * scale;
const dx = (currentW - drawW) / 2;
const dy = (currentH - drawH) / 2 - 6; // slight lift, no movement
ctx.imageSmoothingQuality = "high";
ctx.drawImage(img, dx, dy, drawW, drawH);
};

img.onload = drawImage;

return () => {
const ro = (canvas as any)._ro as ResizeObserver | undefined;
if (ro) ro.disconnect();
};
}, [src, width, height, shadowOpacity, fitToParent]);

return (
<canvas
ref={canvasRef}
role="img"
aria-label={alt}
className={className}
/>
);
}
