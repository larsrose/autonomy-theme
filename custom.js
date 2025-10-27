// Safe Logseq custom script bootstrap
const main = async () => {


// Remove leading '#' from rendered tags
(async () => {
  const stripHash = el => {
    if (el && el.textContent && el.textContent.startsWith('#')) {
      el.textContent = el.textContent.slice(1);
    }
  };

  const scan = () => document.querySelectorAll('a.tag').forEach(stripHash);

  // Initial pass
  scan();

  // Watch for new tags being added dynamically
  const mo = new MutationObserver(muts => {
    for (const m of muts) {
      m.addedNodes && m.addedNodes.forEach(n => {
        if (!(n instanceof HTMLElement)) return;
        if (n.matches && n.matches('a.tag')) stripHash(n);
        n.querySelectorAll && n.querySelectorAll('a.tag').forEach(stripHash);
      });
    }
  });

  mo.observe(document.body, { childList: true, subtree: true });
})();

};

if (typeof logseq !== "undefined") {
  logseq.ready(main).catch(console.error);
} else {
  document.addEventListener("logseq:ready", main);
}