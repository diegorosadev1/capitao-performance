import React, { useEffect, useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'ativo' | 'em_atendimento' | 'folga' | 'inativo';
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name,
  size = 'md',
  status,
}) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [src]);

  const getInitials = (n: string) => {
    return n
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const statusDotClasses = {
    ativo: 'bg-emerald-400',
    em_atendimento: 'bg-neutral-200 animate-pulse',
    folga: 'bg-neutral-500',
    inativo: 'bg-neutral-600',
  };

  const showImage = src && !imageError;

  return (
    <div className="relative inline-block shrink-0">
      {showImage ? (
        <img
          src={src}
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover border border-neutral-700 bg-neutral-900`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-display text-neutral-200`}
        >
          {getInitials(name)}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ring-2 ring-neutral-950 ${statusDotClasses[status]}`}
        />
      )}
    </div>
  );
};