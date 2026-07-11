import type { Role } from '../data/types';
import { roleMeta } from '../lib/roles';
import RoleAvatar from './RoleAvatar';

const ORDER: Role[] = ['S', 'V', 'O', 'C', 'HELP', 'MOD'];

export default function SvocLegend({ only }: { only?: Role[] }) {
  const roles = only ?? ORDER;
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {ORDER.filter((r) => roles.includes(r)).map((r) => {
        const meta = roleMeta[r];
        return (
          <span
            key={r}
            className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink py-0.5 pl-0.5 pr-2 text-xs font-bold ${meta.box} text-paper`}
          >
            <RoleAvatar role={r} size="xs" />
            <span>{meta.short}</span>
            <span className="font-normal">{meta.label}</span>
          </span>
        );
      })}
    </div>
  );
}
