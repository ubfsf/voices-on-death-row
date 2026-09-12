export interface ArchiveHeaderProps {
  label: string;
  word: string;
}

export default function ArchiveHeader({ label, word }: ArchiveHeaderProps) {
  return (
    <div className="border-b border-stone-200 pb-12">
      <p className="text-stone-400 font-mono text-[10px] uppercase tracking-[1em] mb-4">{label}</p>
      <h1 className="text-6xl md:text-[8vw] font-black italic uppercase tracking-tighter leading-none text-stone-300">
        The <span className="text-black font-black">{word}</span>
      </h1>
    </div>
  );
}
