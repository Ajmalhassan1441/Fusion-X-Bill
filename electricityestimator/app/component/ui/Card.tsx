'use client'
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`glass rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all ${className}`}>
      {children}
    </div>
  );
}