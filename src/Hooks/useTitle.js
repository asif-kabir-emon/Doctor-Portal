import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Doctors Portal - ${title}`;
  }, [title]);
};

export default useTitle;
