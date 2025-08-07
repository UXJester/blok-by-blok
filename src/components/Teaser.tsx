import { TeaserProps } from '@/types/blokTypes';

export default function Teaser({ blok }: TeaserProps) {
  return (
    <div className="teaser">
      <h2>{blok.headline}</h2>
    </div>
  );
}
