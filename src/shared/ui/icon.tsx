import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import type { IconPrefix } from "@fortawesome/fontawesome-svg-core";

import type { DynagraphIcon } from "~/shared/misc/icons";

export type IconProps = Omit<FontAwesomeIconProps, "icon"> & {
  icon: DynagraphIcon | [IconPrefix, DynagraphIcon];
};

export const Icon: FCC<IconProps> = ({ className, ...props }) => {
  return <FontAwesomeIcon className={className} {...props} />;
};
