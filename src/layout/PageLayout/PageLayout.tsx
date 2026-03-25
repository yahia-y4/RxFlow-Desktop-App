import type { ReactNode  } from "react";
import "./PageLayout.css";
import PageControlButsLayout from "../PageControlButsLayout/PageControlButsLayout";

type Props = {
  children?: ReactNode ;
  controlButs?: ReactNode;
};
export default function PageLayout({ children, controlButs }: Props) {
  return (
    <div className="PageLayout">
     {controlButs && ( <PageControlButsLayout>{<>{controlButs}</>}</PageControlButsLayout>)}
    
      <div className="PageLayout-content">{children}</div>
    </div>
  );
}
