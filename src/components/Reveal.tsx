interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export default function Reveal({ children, className = "", width = "100%" }: RevealProps) {
  return (
    <div className={className} style={{ width }}>
      {children}
    </div>
  );
}
