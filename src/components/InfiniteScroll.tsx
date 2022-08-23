import { ReactNode, useEffect, useRef, useState } from "react";
import { IMessage } from "../types";

function InfiniteScroll({
  children,
  className,
  next,
  hasMore,
  loading,
}: {
  children: ReactNode;
  className: string;
  next: () => void;
  hasMore: Boolean;
  loading: Boolean;
}) {
  const [prevY, setPrevY] = useState(0);
  let loadingRef = useRef<any>(null);
  let prevYRef = useRef<any>({});
  prevYRef.current = prevY;

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    observer.observe(loadingRef.current);
  }, []);

  const handleObserver = (entities: any, observer: any) => {
    const y = entities[0].boundingClientRect.y;

    if (!hasMore) {
      return;
    }
    if (prevYRef.current < y) {
      next();
    } else {
    }
    setPrevY(y);
  };

  return (
    <div className={className}>
      {children}
      <div className="h-5 m-2" ref={loadingRef}>
        <span style={{ display: loading ? "block" : "none" }}>Loading...</span>
      </div>
    </div>
  );
}

export default InfiniteScroll;
