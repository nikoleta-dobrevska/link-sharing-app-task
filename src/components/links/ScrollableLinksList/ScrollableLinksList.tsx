import { useEffect, useRef } from "react";
import { useDragDropManager } from "react-dnd";

import { useAutoScrolling } from "@/hooks/useAutoScrolling";

import scrollableLinksListClasses from "./ScrollableLinksList.module.scss";

type ScrollableLinksListProps = {
  children: React.ReactNode;
};

export const ScrollableLinksList = ({ children }: ScrollableLinksListProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { updatePosition } = useAutoScrolling(ref);
  const dragDropManager = useDragDropManager();
  const monitor = dragDropManager.getMonitor();

  useEffect(() => {
    const unsubscribe = monitor.subscribeToOffsetChange(() => {
      const offset = monitor.getSourceClientOffset()?.y as number;
      updatePosition({ position: offset, isScrollAllowed: true });
    });

    return unsubscribe;
  }, [monitor, updatePosition]);

  return (
    <div
      className={scrollableLinksListClasses["links-list--scrollable"]}
      ref={ref}
    >
      {children}
    </div>
  );
};
