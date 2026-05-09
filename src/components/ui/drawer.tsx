import type { ReactElement, ReactNode } from "react";
import RcDrawer, { type DrawerProps as RcDrawerProps } from "rc-drawer";

import { cn } from "@/lib/cn";

import { XIcon } from "@/components/icons/x";

export type DrawerWidth = string | number;

type DrawerOwnProps = {
  open: boolean;
  onClose: () => void;
  width?: DrawerWidth;
  children: ReactNode;
  headerSlot?: ReactNode;
  bodyClassName?: string;
  showCloseButton?: boolean;
  contentClassName?: string;
  placement?: RcDrawerProps["placement"];
};

const drawerContentClassName =
  "flex h-full w-full flex-col bg-estapar-surface text-estapar-body";

const drawerCloseButtonClassName =
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-estapar-muted transition-colors hover:bg-estapar-muted-surface-alt hover:text-estapar-body focus:outline-none cursor-pointer";

export const Drawer = ({
  open,
  onClose,
  children,
  headerSlot,
  width = 1024,
  bodyClassName,
  contentClassName,
  placement = "right",
  showCloseButton = true,
}: DrawerOwnProps): ReactElement => (
  <RcDrawer
    open={open}
    width={width}
    onClose={onClose}
    placement={placement}
    destroyOnClose
    classNames={{
      wrapper: "shadow-xl max-lg:w-full!",
      mask: "bg-estapar-overlay",
      content: cn(drawerContentClassName, contentClassName),
    }}
  >
    {showCloseButton ? (
      <div
        className={cn(
          "flex items-center justify-end px-6 pt-4 ",
          !!headerSlot && "justify-between",
        )}
      >
        {headerSlot}
        <button
          type="button"
          onClick={onClose}
          className={drawerCloseButtonClassName}
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
    ) : null}

    <div className={cn("flex-1 overflow-y-auto px-6 pb-6", bodyClassName)}>
      {children}
    </div>
  </RcDrawer>
);
