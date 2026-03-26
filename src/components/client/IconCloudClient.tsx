"use client";

import IconCloud from "@/components/magicui/icon-cloud";

type Props = {
  iconSlugs: string[];
};

export default function IconCloudClient({ iconSlugs }: Props) {
  return <IconCloud iconSlugs={iconSlugs} />;
}