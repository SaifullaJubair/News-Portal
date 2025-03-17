import { useEffect } from "react";
import Archive from "../../../components/frontend/home/Archive/Archive";

const ArchivePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return <Archive />;
};

export default ArchivePage;
