export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 pt-20 pb-10 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Mission */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">Our Mission</h3>
          <p className="text-sm text-stone-600 leading-relaxed max-w-sm italic font-serif">
            "Rebuilding the Community from within the Community." Supporting education and driving systemic change to perpetuate dignity for all.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">Project</h3>
          <ul className="space-y-4">
            <li><a href="/about" className="text-xs hover:text-stone-900 transition-colors">About Team</a></li>
            <li><a href="/resources" className="text-xs hover:text-stone-900 transition-colors">Educational Resources</a></li>
            <li><a href="/contact" className="text-xs hover:text-stone-900 transition-colors">Participation</a></li>
          </ul>
        </div>

        {/* Column 3: UBFSF Info */}
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">Contact</h3>
          <address className="not-italic text-xs text-stone-600 space-y-2">
            <p>UBFSF — P.O. BOX 862</p>
            <p>Bristow, OK 74010</p>
            <p className="pt-2">news@ubfsf.org</p>
          </address>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-stone-200 mt-20 pt-8 flex justify-between items-center opacity-40 text-[9px] uppercase tracking-widest">
        <p>© 2026 United Black Family Scholarship Foundation</p>
        <p>Franco-American Storytelling Platform</p>
      </div>
    </footer>
  );
}
