import { createAvatar } from '@dicebear/core';
import { dylan } from '@dicebear/collection';

export function Avatar({ seed, size }) {
  const avatar = createAvatar(dylan, {
    seed: seed,
    size: size,
    radius: 50,
  }).toDataUri();

  return <img src={avatar} alt={`Avatar for ${seed}`} />;
}
