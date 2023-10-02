"use client"

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points: Point[] = [];
    const pointCount = 100;
    const maxConnectionDistance = 150;

    // 创建随机点
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 2,  // X方向的速度
        dy: (Math.random() - 0.5) * 2   // Y方向的速度
      });
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);

      // 移动并绘制点
      points.forEach(point => {
        point.x += point.dx;
        point.y += point.dy;

        if (point.x < 0 || point.x > canvas.width) point.dx = -point.dx;
        if (point.y < 0 || point.y > canvas.height) point.dy = -point.dy;

        ctx?.beginPath();
        ctx?.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx?.fill();
      });

      // 绘制连接线
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxConnectionDistance) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = `rgba(150, 150, 150, ${(maxConnectionDistance - distance) / maxConnectionDistance})`;  // 淡化远离的线
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className='absolute top-0 right-0 bottom-0 left-0 -z-10'></canvas>
  );
}
