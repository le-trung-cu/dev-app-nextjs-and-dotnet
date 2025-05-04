import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const markers = Array.from({ length: 83 }, (_, i) => i);

type RulerProps = {
  paddingLeft: number;
  paddingRight: number;
  onChange?: ({
    paddingLeft,
    paddingRight,
  }: {
    paddingLeft: number;
    paddingRight: number;
  }) => void;
};

export const Ruler = ({ paddingLeft, paddingRight, onChange }: RulerProps) => {
  const rulerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative z-10 h-6 border-b select-none print:hidden">
      <div ref={rulerRef} className="relative mx-auto flex h-full w-[816px]">
        {markers.map((marker) => {
          if (marker % 10 === 0) {
            return (
              <span
                key={marker}
                className="absolute h-full flex-col items-center justify-start"
                style={{ left: `${(marker * 816) / 82}px` }}
              >
                <span className="absolute left-0 -translate-x-1/2 text-[10px]">
                  {marker / 10}
                </span>
                <span className="absolute bottom-0 block h-[10px] border-l-1 border-gray-900/60"></span>
              </span>
            );
          }
          if (marker % 5 === 0) {
            return (
              <span
                key={marker}
                className="absolute bottom-0 block h-[9px] border-l border-gray-900/50"
                style={{ left: `${(marker * 816) / 82}px` }}
              ></span>
            );
          }

          return (
            <span
              key={marker}
              className="absolute bottom-0 block h-[5px] border-l border-gray-900/50"
              style={{ left: `${(marker * 816) / 82}px` }}
            ></span>
          );
        })}
        <Marker
          position="left"
          offset={paddingLeft}
          onChange={(e) => {
            const rect = rulerRef.current!.getBoundingClientRect();
            let paddingLeft = Math.max(0, e.clientX - rect.left);
            paddingLeft = Math.min(
              paddingLeft,
              rect.width - paddingRight - 100,
            );
            onChange?.({ paddingLeft, paddingRight });
          }}
        />
        <Marker
          position="right"
          offset={paddingRight}
          onChange={(e) => {
            const rect = rulerRef.current!.getBoundingClientRect();
            let paddingRight = Math.max(0, rect.right - e.clientX);
            paddingRight = Math.min(
              paddingRight,
              rect.width - paddingLeft - 100,
            );
            onChange?.({ paddingLeft, paddingRight });
          }}
        />
      </div>
    </div>
  );
};

type MarkerProps = {
  position: "left" | "right";
  offset: number;
  onChange?: (e: MouseEvent) => void;
};

const Marker = ({ position, offset, onChange }: MarkerProps) => {
  const [isDraging, setIsDraging] = useState(false);

  const handleMouseDown = () => {
    setIsDraging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp, { once: true });

    function handleMouseMove(e: MouseEvent) {
      onChange?.(e);
    }

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      setIsDraging(false);
    }
  };

  return (
    <div
      className={cn(
        "absolute -bottom-[1px] -translate-x-1/2 cursor-ew-resize text-blue-500 select-all",
        position === "right" && "translate-x-1/2",
      )}
      style={{
        [position]: `${offset}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <AiFillCaretDown />
      <div
        className={cn(
          "absolute left-1/2 z-10 h-screen border-l border-black/40",
          position === "right" && "left-[calc(50%-1px)]",
          !isDraging && "hidden",
        )}
      ></div>
    </div>
  );
};
