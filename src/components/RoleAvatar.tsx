import type { Role } from '../data/types';
import { roleMeta } from '../lib/roles';

interface Props {
  role: Role;
  size?: 'xs' | 'sm' | 'md';
}

const sizeClass: Record<'xs' | 'sm' | 'md', string> = {
  xs: 'h-5 w-5',
  sm: 'h-7 w-7',
  md: 'h-10 w-10',
};

export default function RoleAvatar({ role, size = 'sm' }: Props) {
  const meta = roleMeta[role];
  return (
    <img
      src={meta.img}
      alt={meta.name}
      className={`${sizeClass[size]} shrink-0 rounded-full border-2 border-ink bg-paper object-cover object-top`}
    />
  );
}
