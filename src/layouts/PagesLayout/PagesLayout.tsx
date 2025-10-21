import { Outlet } from "react-router";

import RectangleIcon from "@/assets/svgr/Rectangle 15.svg?react";
import SubstractIcon from "@/assets/svgr/Subtract.svg?react";
import { PreviewComponent } from "@/components/PreviewComponent";
import { Navbar } from "@/components/ui/nav/Navbar";

import pagesLayoutClasses from "./PagesLayout.module.scss";

export const PagesLayout = () => {
  return (
    <div className={pagesLayoutClasses["page-layout"]}>
      <Navbar />
      <div className={pagesLayoutClasses["main"]}>
        <aside
          className={pagesLayoutClasses["preview-section"]}
          aria-label="Preview content"
        >
          <div className={pagesLayoutClasses["preview-section__display"]}>
            <RectangleIcon
              className={pagesLayoutClasses["preview-section__display--static"]}
            />
            <SubstractIcon
              className={
                pagesLayoutClasses["preview-section__display--absolute"]
              }
            />
            <PreviewComponent />
          </div>
        </aside>
        <main className={pagesLayoutClasses["page-section"]}>
          <div className={pagesLayoutClasses["page-section__elements"]}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
