import { useEffect, useState } from "react";

function Status({ children }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isVisible ? (
        <button className="fixed left-[50%] top-20 z-[60] translate-x-[-50%] rounded-lg bg-green-500 px-4 py-2 font-semibold text-slate-800 shadow-xl">
          {children}
        </button>
      ) : null}
    </div>
  );
}

export default Status;
