import { storyblokEditable, SbBlokData } from '@storyblok/react/rsc';
// Types
import { FeatureProps } from '@/types/blokTypes';

export default function Feature({ blok }: FeatureProps) {
  return (
    <div className="feature" {...storyblokEditable(blok as SbBlokData)}>
      <span>{blok.name}</span>
    </div>
  );
}
