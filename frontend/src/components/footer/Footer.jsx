export function Footer() {
  return (
    <footer className="mt-12 bg-[#0e172b] text-slate-300">
      <div className="mx-auto grid w-[calc(100%-40px)] max-w-[1280px] gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-lg font-black text-white">
            Lynk<span className="text-indigo-400">•</span>
          </div>
          <p className="mt-4 max-w-xs text-xs leading-5 text-slate-500">
            The premier marketplace connecting exceptional talent with visionary
            companies worldwide.
          </p>
        </div>

        {[
          [
            "FOR CLIENTS",
            ["Find Talent", "Post Project", "Enterprise Solutions"],
          ],
          ["FOR FREELANCERS", ["Find Work", "Create Profile", "Resources"]],
          ["COMPANY", ["About Us", "Contact", "Privacy Policy"]],
        ].map(([title, links]) => (
          <div key={title}>
            <h3 className="text-[9px] font-black text-white">{title}</h3>
            <div className="mt-4 space-y-2">
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-[10px] text-slate-500 transition hover:text-white"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-white/5 py-6 text-center text-[10px] text-slate-500">
        © 2024 Lynk Inc. All rights reserved.
      </div>
    </footer>
  );
}
