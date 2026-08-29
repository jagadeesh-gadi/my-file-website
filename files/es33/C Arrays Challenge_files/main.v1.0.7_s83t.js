/* challenge_engine.js (generic) */
(function(){
  "use strict";

  var HOST_ID = window.CHALLENGE_HOST_ID || "challenges";
  var DATA_URL = window.CHALLENGE_DATA_URL;
  var BREAKPOINT = window.CHALLENGE_LAYOUT_BREAKPOINT || 1200;
  var PRISM_LANG = window.CHALLENGE_PRISM_LANGUAGE || window.CHALLENGE_LANGUAGE || "java";
  var deferredHL = null; // stores {code, okLineMap, hl} when deferHighlight is active

  function isBlank(code){ return code.trim().length === 0; }
  function normSpaces(code){ return code.replace(/\s+/g," ").trim(); }

  function setSummary(box, type, html){
    box.style.display = "block";
    if (type === "ok") box.className = "w3-panel w3-pale-green ch-summary";
    else if (type === "warn") box.className = "w3-panel w3-pale-yellow ch-summary";
    else box.className = "w3-panel w3-pale-red ch-summary";
    box.innerHTML = html;
  }

  function renderChecklist(listEl, reqs, results){
    listEl.innerHTML = "";
    listEl.className = "ch-checklist w3-white";
    reqs.forEach(function(r){
      var pass = results[r.id] === true;
      var li = document.createElement("li");
      li.innerHTML =
        "<div class='chk-badge " + (pass ? "ok" : "no") + "' role='img' aria-label='" + (pass ? "Passed" : "Failed") + "'>" + (pass ? "&#10003;" : "&#10007;") + "</div>" +
        "<div>" + r.label + "</div>";
      listEl.appendChild(li);
    });
  }

  function findMatchingLines(code, regex){
    var lines = code.split("\n");
    var hits = [];
    for (var i=0; i<lines.length; i++){
      if (regex.test(lines[i])) hits.push(i);
    }
    return hits;
  }

  function findScopedLines(code, lineRe, scopePattern){
    var lines = code.split("\n");
    var scopeRe = new RegExp(scopePattern, "i");
    var hits = [];
    for (var s = 0; s < lines.length; s++){
      if (!scopeRe.test(lines[s])) continue;
      var depth = 0;
      var blockStart = s;
      var blockEnd = -1;
      for (var k = s; k < lines.length; k++){
        if (lines[k].indexOf("{") !== -1) depth++;
        if (lines[k].indexOf("}") !== -1){ depth--; if (depth <= 0){ blockEnd = k; break; } }
      }
      if (blockEnd === -1) blockEnd = lines.length - 1;
      for (var k = blockStart; k <= blockEnd; k++){
        if (lineRe.test(lines[k]) || /^\s*\}\s*$/.test(lines[k])) hits.push(k);
      }
      break;
    }
    return hits;
  }

  function scrollChallengeIntoView(card){
    var r = card.getBoundingClientRect();
    var padTop = 12;
    var padBottom = 12;
    if (r.top < padTop){
      window.scrollBy({ top: r.top - padTop, behavior: "smooth" });
      return;
    }
    if (r.bottom > window.innerHeight - padBottom){
      window.scrollBy({ top: r.bottom - (window.innerHeight - padBottom), behavior: "smooth" });
    }
  }

  /* Prism-based highlighting per line with ok-line marking */
  function highlightCode(code, okLineMap){
    function esc(s){
      return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    }
    var usePrism = (typeof window !== 'undefined' && window.Prism && Prism.languages);
    var grammar = usePrism ? (Prism.languages[PRISM_LANG] || Prism.languages.clike || null) : null;
    
    // Highlight entire code at once so Prism can detect embedded languages (e.g. CSS in <style>)
    var fullHighlighted = grammar ? Prism.highlight(code, grammar, PRISM_LANG) : esc(code);
    
    // Split highlighted HTML into lines, preserving span tags across line breaks
    var highlightedLines = splitHighlightedLines(fullHighlighted);
    
    var html = "";
    for (var i=0; i<highlightedLines.length; i++){
      var lineHtml = highlightedLines[i];
      if (!lineHtml || lineHtml.trim() === "") lineHtml = "&nbsp;";
      var cls = (okLineMap && okLineMap[i]) ? "line-ok" : "";
      html += "<div class='" + cls + "'>" + lineHtml + "</div>";
    }
    return html;
  }
  
  /* Split highlighted HTML into lines while preserving open span tags */
  function splitHighlightedLines(html){
    var lines = html.split("\n");
    var result = [];
    var openTags = []; // Stack of currently open span tags
    
    for (var i = 0; i < lines.length; i++){
      var line = lines[i];
      
      // Prepend any open tags from previous lines
      var prefix = openTags.join("");
      
      // Track span opens and closes in this line
      var spanOpenRegex = /<span[^>]*>/g;
      var spanCloseRegex = /<\/span>/g;
      
      var opens = (line.match(spanOpenRegex) || []);
      var closes = (line.match(spanCloseRegex) || []);
      
      // Update open tags stack: add opens, remove closes
      for (var j = 0; j < opens.length; j++){
        openTags.push(opens[j]);
      }
      for (var j = 0; j < closes.length; j++){
        openTags.pop();
      }
      
      // Close any still-open tags at end of this line
      var suffix = "";
      for (var j = 0; j < openTags.length; j++){
        suffix += "</span>";
      }
      
      // If line has no visible text (only tags or empty), add a space to prevent collapse
      var textOnly = line.replace(/<[^>]*>/g, "");
      var finalLine = prefix + line + suffix;
      if (textOnly.trim() === "") {
        finalLine = prefix + "&nbsp;" + line + suffix;
      }
      
      result.push(finalLine);
    }
    
    return result;
  }

  function copyText(text){
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      return;
    }
    var tmp = document.createElement("textarea");
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
  }
  function showToast(toastEl, text){
    toastEl.innerHTML = text;
    toastEl.classList.add("show");
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function(){ toastEl.classList.remove("show"); }, 1600);
  }

  // Track per-challenge evaluation state for external integrations
  var challengeStates = {}; // { [challengeId]: { requirements: [], results: {} } }
  var completionHooks = []; // { id, cb, lastResult }

  function updateChallengeState(ch, results){
    try{
      if (!ch || !ch.id) return;
      challengeStates[ch.id] = {
        requirements: ch.requirements || [],
        results: results || {}
      };
    } catch(_err){}
  }

  function getGlobalCompletionStatus(){
    var details = [];
    var allOk = true;
    var hasAny = false;

    Object.keys(challengeStates).forEach(function(chId){
      var st = challengeStates[chId];
      if (!st || !st.requirements) return;
      st.requirements.forEach(function(r){
        if (!r || !r.id) return;
        hasAny = true;
        var ok = !!(st.results && st.results[r.id]);
        details.push({
          challengeId: chId,
          requirementId: r.id,
          label: r.label || "",
          ok: ok
        });
        if (!ok) allOk = false;
      });
    });

    if (!hasAny) allOk = false;

    return {
      result: allOk,
      details: details
    };
  }

  function runCompletionHooks(){
    try{
      if (!completionHooks.length) return;
      var status = getGlobalCompletionStatus();
      for (var i = 0; i < completionHooks.length; i++){
        var h = completionHooks[i];
        if (!h) continue;
        if (status.result && !h.lastResult){
          try{
            h.cb({
              id: h.id,
              status: status
            });
          } catch(_err){}
        }
        h.lastResult = status.result;
      }
    } catch(_err){}
  }

  function setSolutionBtnLabel(btn, isOpen){
    var longEl = btn.querySelector(".ch-sol-label-long");
    var shortEl = btn.querySelector(".ch-sol-label-short");
    if (isOpen){
      if (longEl) longEl.textContent = "Hide solution";
      if (shortEl) shortEl.textContent = "Solution";
    } else {
      if (longEl) longEl.textContent = "Show solution";
      if (shortEl) shortEl.textContent = "Solution";
    }
  }

  function openSolution(solBox, btn, card){
    scrollChallengeIntoView(card);
    solBox.hidden = false;
    solBox.style.maxHeight = solBox.scrollHeight + "px";
    solBox.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    setSolutionBtnLabel(btn, true);
  }
  function closeSolution(solBox, btn){
    solBox.style.maxHeight = solBox.scrollHeight + "px";
    requestAnimationFrame(function(){
      solBox.style.maxHeight = "0px";
      solBox.classList.remove("is-open");
    });
    btn.setAttribute("aria-expanded", "false");
    setSolutionBtnLabel(btn, false);
    setTimeout(function(){ solBox.hidden = true; }, 230);
  }

  function canUseLayoutToggle(){
    return window.matchMedia && window.matchMedia("(min-width: " + (BREAKPOINT + 1) + "px)").matches;
  }
  function setLayoutForcedStack(isStacked){
    document.body.classList.toggle("ch-force-stack", isStacked);
    var btns = document.querySelectorAll("[data-action='toggleLayout']");
    for (var i=0; i<btns.length; i++){
      btns[i].setAttribute("aria-pressed", isStacked ? "true" : "false");
      btns[i].title = isStacked ? "Use side-by-side layout" : "Use stacked layout";
    }
  }
  function applyLayoutFromStorage(){
    if (!canUseLayoutToggle()){
      document.body.classList.remove("ch-force-stack");
      return;
    }
    var stacked = localStorage.getItem("ch_force_stack") === "1";
    setLayoutForcedStack(stacked);
  }
  function wireLayoutToggleButtons(){
    var btns = document.querySelectorAll("[data-action='toggleLayout']");
    for (var i=0; i<btns.length; i++){
      (function(btn){
        btn.addEventListener("click", function(){
          if (!canUseLayoutToggle()) return;
          var isStacked = !document.body.classList.contains("ch-force-stack");
          localStorage.setItem("ch_force_stack", isStacked ? "1" : "0");
          setLayoutForcedStack(isStacked);
        });
      })(btns[i]);
    }
  }

  function makeRegex(pat, flags){ return new RegExp(pat, flags || ""); }

  // For non-markup/non-CSS languages, insert \b before bare identifier tokens
  // in regex patterns so "print\(" won't match "xprint(" via greedy prefixes.
  // Scans the pattern tracking char-class and escape context to avoid breaking
  // character classes like [^#\n] or escape sequences like \s, \w, etc.
  function addWordBoundaries(pat){
    var out = "";
    var i = 0;
    var inClass = false;  // inside [...]
    // Stack tracks whether each open-group was preceded by a word char.
    // Inside a "word-continuation" group (e.g. the (?:ln) in print(?:ln)?),
    // we skip \b so the group content is treated as part of the same word.
    var groupStack = [];
    var inWordGroup = false; // true when inside a word-continuation group
    while (i < pat.length){
      var ch = pat[i];
      // Handle backslash escapes — copy two chars verbatim
      if (ch === "\\"){
        out += pat[i] + (pat[i + 1] || "");
        i += 2;
        continue;
      }
      // Track character class boundaries
      if (ch === "[" && !inClass){ inClass = true; out += ch; i++; continue; }
      if (ch === "]" && inClass){ inClass = false; out += ch; i++; continue; }
      // Inside a character class, copy verbatim
      if (inClass){ out += ch; i++; continue; }
      // Track groups: push on (, pop on )
      if (ch === "("){
        var precededByWord = out.length > 0 && /[a-zA-Z0-9_]$/.test(out);
        groupStack.push(precededByWord);
        inWordGroup = precededByWord;
        out += ch; i++; continue;
      }
      if (ch === ")"){
        groupStack.pop();
        inWordGroup = groupStack.length > 0 && groupStack[groupStack.length - 1];
        out += ch; i++; continue;
      }
      // Check if this is the start of a bare identifier (a-z, A-Z, _)
      if (/[a-zA-Z_]/.test(ch)){
        // Check what precedes this position in the output
        var prevIsWord = out.length > 0 && /[a-zA-Z0-9_]$/.test(out);
        var prevIsBoundary = out.length >= 2 && out.slice(-2) === "\\b";
        // Inside a word-continuation group, skip \b (e.g. print(?:ln)?)
        var skipForGroup = inWordGroup && /[(?:|]$/.test(out);
        if (!prevIsWord && !prevIsBoundary && !skipForGroup){
          out += "\\b";
        }
        // Copy the whole identifier token
        while (i < pat.length && /[a-zA-Z0-9_]/.test(pat[i])){
          out += pat[i];
          i++;
        }
        continue;
      }
      out += ch;
      i++;
    }
    return out;
  }

  function compileRequirement(req){
    if (!req || !req.type) return null;
    if (req.type === "regex"){
      return { id:req.id, label:req.label, type:"regex", pattern:req.pattern, flags:req.flags || "", linePattern:req.linePattern || null, lineFlags:req.lineFlags || "", lineScope:req.lineScope || null, noInline:!!req.noInline };
    }
    if (req.type === "endsWithBrace"){
      return { id:req.id, label:req.label, type:"endsWithBrace" };
    }
    return null;
  }
  function compileMistake(m){
    if (!m || !m.pattern) return null;
    return { pattern:m.pattern, flags:m.flags || "", msg:m.msg || "" };
  }
  function compileChallenges(data){
    var list = Array.isArray(data) ? data : (data && data.challenges ? data.challenges : []);
    var out = [];
    for (var i=0; i<list.length; i++){
      var ch = list[i] || {};
      out.push({
        id: ch.id || ("ch_" + i),
        section: ch.section || "",
        sectionIntro: ch.sectionIntro || "",
        intro: ch.intro || "",
        starter: ch.starter || "",
        solution: ch.solution || "",
        requirements: (ch.requirements || []).map(compileRequirement).filter(Boolean),
        commonMistakes: (ch.commonMistakes || []).map(compileMistake).filter(Boolean)
      });
    }
    return out;
  }
  /* ── Specificity-aware requirement evaluation ── */

  // Extract property:value regex fragment from a CSS-block pattern
  // e.g. "div\\s*\\{[^}]*width\\s*:\\s*200px" → "width\\s*:\\s*200px"
  // Returns null if the fragment contains multiple properties (another [^}]*)
  function extractPropValPattern(pattern){
    // Skip patterns wrapped in HTML context (e.g. <style>...) — not pure CSS-block patterns
    if (/<style/i.test(pattern)) return null;
    var m = pattern.match(/\[\^\}\]\*(.+)$/);
    if (!m) return null;
    var frag = m[1];
    // If the fragment still contains [^}]*, it spans multiple properties — skip
    if (/\[\^\}\]\*/.test(frag)) return null;
    // Strip trailing [;}] anchors — findWinningValue returns bare values without ; or }
    frag = frag.replace(/(\\s[*+]?)?\[;\}?\]\s*$/, "");
    return frag;
  }

  // Extract the selector regex fragment from a CSS-block pattern
  // e.g. "div\\.fixed\\s*\\{[^}]*width..." → "div\\.fixed"
  function extractSelectorPattern(pattern){
    var m = pattern.match(/^(.+?)\\s\*\\\{/);
    return m ? m[1] : null;
  }

  // Convert a selector regex fragment to a plain selector string
  // e.g. "div\\.fixed" → "div.fixed",  "ul" → "ul",  "a\\[target\\]" → "a[target]"
  function selectorPatternToPlain(selPat){
    if (!selPat) return null;
    return selPat.replace(/\\\./, ".").replace(/\\#/, "#").replace(/\\\[/g, "[").replace(/\\\]/g, "]").replace(/\\s\+/g, " ").replace(/\\s\*/g, "").trim();
  }

  // Extract the target element from a plain selector (the last element in the chain)
  // e.g. "div.fixed" → "div", "ul" → "ul", "a:focus" → "a", ".myclass" → null (class-only)
  function getTargetElement(plainSel){
    if (!plainSel) return null;
    // Get the last simple selector in the chain (after space, >, +, ~)
    var parts = plainSel.split(/[\s>+~]+/);
    var last = parts[parts.length - 1].trim();
    // Extract the element name (before any . # : [)
    var m = last.match(/^([a-z][a-z0-9]*)/i);
    return m ? m[1].toLowerCase() : null;
  }

  // Extract classes from the last simple selector, e.g. "p.dashed" → ["dashed"]
  function extractClasses(simpleSel){
    var m = simpleSel.match(/\.([a-z_-][\w-]*)/gi);
    if (!m) return [];
    return m.map(function(c){ return c.substring(1).toLowerCase(); });
  }
  // Extract IDs from the last simple selector, e.g. "div#main" → ["main"]
  function extractIds(simpleSel){
    var m = simpleSel.match(/#([a-z_-][\w-]*)/gi);
    if (!m) return [];
    return m.map(function(c){ return c.substring(1).toLowerCase(); });
  }

  // Extract pseudo-classes from the last simple selector, e.g. "a:hover" → ["hover"], "a:link" → ["link"]
  function extractPseudos(simpleSel){
    var m = simpleSel.match(/:([a-z][\w-]*)/gi);
    if (!m) return [];
    return m.map(function(p){ return p.substring(1).toLowerCase(); });
  }

  // Check if a CSS selector could target the same element as the requirement's selector
  function selectorsCouldOverlap(ruleSelector, reqSelector){
    if (!reqSelector) return true; // can't determine, assume overlap
    // Get the last simple selector of the requirement
    var reqParts = reqSelector.split(/[\s>+~]+/);
    var reqLast = reqParts[reqParts.length - 1].trim();
    var reqElemM = reqLast.match(/^([a-z][a-z0-9]*)/i);
    var reqElement = reqElemM ? reqElemM[1].toLowerCase() : null;
    var reqClasses = extractClasses(reqLast);
    var reqIds = extractIds(reqLast);

    // Split comma-separated selectors
    var parts = ruleSelector.split(",");
    for (var i = 0; i < parts.length; i++){
      var sel = parts[i].trim();
      // Get the last simple selector in this rule
      var chain = sel.split(/[\s>+~]+/);
      var last = chain[chain.length - 1].trim();
      // Extract element name
      var m = last.match(/^([a-z][a-z0-9]*)/i);
      var elem = m ? m[1].toLowerCase() : null;

      // Universal selector or empty — could match anything
      if (last.charAt(0) === "*" || last === "") return true;

      // Element mismatch — can't overlap
      if (reqElement && elem && elem !== reqElement) continue;

      // If rule specifies classes, check against req classes
      // e.g. rule "p.solid" can't overlap with req "p.dashed"
      // Also: rule ".highlight" can't override element-only req "body"
      var ruleClasses = extractClasses(last);
      if (ruleClasses.length > 0){
        if (reqClasses.length === 0){ continue; } // class rule can't override element-only req
        var classConflict = false;
        for (var c = 0; c < ruleClasses.length; c++){
          var found = false;
          for (var r = 0; r < reqClasses.length; r++){
            if (ruleClasses[c] === reqClasses[r]){ found = true; break; }
          }
          if (!found){ classConflict = true; break; }
        }
        if (classConflict) continue;
      }

      // If rule specifies IDs, check against req IDs
      var ruleIds = extractIds(last);
      if (ruleIds.length > 0){
        if (reqIds.length === 0){ continue; } // id rule can't override non-id req
        var idConflict = false;
        for (var d = 0; d < ruleIds.length; d++){
          var foundId = false;
          for (var r2 = 0; r2 < reqIds.length; r2++){
            if (ruleIds[d] === reqIds[r2]){ foundId = true; break; }
          }
          if (!foundId){ idConflict = true; break; }
        }
        if (idConflict) continue;
      }

      // If rule has pseudo-classes, check against req pseudos
      // e.g. button:hover can't override base button — different state
      // e.g. a:hover can't override a:link — different states
      var rulePseudos = extractPseudos(last);
      var reqPseudos = extractPseudos(reqLast);
      if (rulePseudos.length > 0){
        if (reqPseudos.length === 0){ continue; } // pseudo rule can't override non-pseudo req
        var pseudoMatch = false;
        for (var p = 0; p < rulePseudos.length; p++){
          for (var q = 0; q < reqPseudos.length; q++){
            if (rulePseudos[p] === reqPseudos[q]){ pseudoMatch = true; break; }
          }
          if (pseudoMatch) break;
        }
        if (!pseudoMatch) continue;
      }

      // If rule has a longer chain, it targets a descendant — different element
      // e.g. ".gallery-item img" can't override ".gallery-item"
      if (chain.length > reqParts.length) continue;

      // If rule chain has pseudo-classes anywhere but req has none anywhere,
      // the rule targets a conditional state (e.g. ".dropdown:hover .dropdown-content" vs ".dropdown-content")
      if (chain.length > 1){
        var ruleChainPseudos = false;
        var reqChainPseudos = false;
        for (var cp = 0; cp < chain.length; cp++){
          if (extractPseudos(chain[cp].trim()).length > 0){ ruleChainPseudos = true; break; }
        }
        if (ruleChainPseudos){
          for (var rp = 0; rp < reqParts.length; rp++){
            if (extractPseudos(reqParts[rp].trim()).length > 0){ reqChainPseudos = true; break; }
          }
          if (!reqChainPseudos) continue;
        }
      }

      // If both selectors have combinator chains, compare context (prefix before last part)
      // e.g. "div p" vs "h2 + p" — different context elements, can't overlap
      if (chain.length > 1 && reqParts.length > 1){
        var ruleContext = chain.slice(0, -1).join(" ").replace(/\s+/g, " ").trim().toLowerCase();
        var reqContext = reqParts.slice(0, -1).join(" ").replace(/\s+/g, " ").trim().toLowerCase();
        if (ruleContext !== reqContext) continue;
      }

      // No conflicts found — selectors could overlap
      return true;
    }
    return false;
  }

  // Extract a plain property name from a prop:value regex fragment
  // e.g. "width\\s*:\\s*200px" → "width"
  //       "background-color\\s*:..." → "background-color"
  function extractPropName(pvPat){
    var m = pvPat.match(/^([a-z][-a-z]*)/i);
    return m ? m[1].toLowerCase() : null;
  }

  // Simple specificity score for a CSS selector string
  // Returns [important, inline, ids, classes, elements]
  // We flatten to a single number: important*10000 + inline*1000 + ids*100 + classes*10 + elements
  function selectorSpecificity(sel){
    sel = sel.trim();
    var ids = (sel.match(/#[a-z_-]/gi) || []).length;
    var classes = (sel.match(/\.[a-z_-]/gi) || []).length;
    // Pseudo-classes (:hover, :focus, :nth-child etc) count as classes
    classes += (sel.match(/:[a-z]/gi) || []).length;
    // Attribute selectors count as classes
    classes += (sel.match(/\[/g) || []).length;
    // Element count: split by combinators, count non-empty non-class non-id tokens
    var parts = sel.replace(/[>+~]/g, " ").split(/\s+/);
    var elems = 0;
    for (var i = 0; i < parts.length; i++){
      var p = parts[i].replace(/#[a-z_-][\w-]*/gi, "").replace(/\.[a-z_-][\w-]*/gi, "")
                       .replace(/\[[^\]]*\]/g, "").replace(/:[a-z][\w-]*/gi, "").trim();
      if (p && p !== "*") elems++;
    }
    return ids * 100 + classes * 10 + elems;
  }

  // Parse CSS from <style> blocks and collect all declarations for a given property
  // Returns array of { selector, value, important, specificity, order }
  function collectDeclarations(code, propName){
    var decls = [];
    // Extract CSS from <style> tags
    var cssBlocks = [];
    var styleRe = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    var sm;
    while ((sm = styleRe.exec(code)) !== null) cssBlocks.push(sm[1]);
    var css = cssBlocks.join("\n");
    if (!css.trim()) return decls;

    // Strip comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, "");

    // Parse rule blocks: selector { ... }
    // Simple approach: split by } and work backwards to find matching {
    var order = 0;
    var ruleRe = /([^{}]+)\{([^}]*)\}/g;
    var rm;
    while ((rm = ruleRe.exec(css)) !== null){
      var selector = rm[1].trim();
      var body = rm[2];
      if (!selector || /^@/.test(selector)) continue;
      // Skip @keyframes stops (e.g. "0%", "100%", "from", "to")
      if (/^\d+%$/.test(selector) || /^(from|to)$/i.test(selector)) continue;
      // Split body into declarations
      var parts = body.split(";");
      for (var d = 0; d < parts.length; d++){
        var decl = parts[d].trim();
        if (!decl) continue;
        var colonIdx = decl.indexOf(":");
        if (colonIdx === -1) continue;
        var dp = decl.substring(0, colonIdx).trim().toLowerCase();
        var dv = decl.substring(colonIdx + 1).trim();
        if (dp !== propName) continue;
        var imp = /!important/i.test(dv);
        dv = dv.replace(/\s*!important\s*/i, "").trim();
        decls.push({
          selector: selector,
          value: dv,
          important: imp,
          specificity: selectorSpecificity(selector),
          order: order++
        });
      }
    }
    return decls;
  }

  // Collect inline style declarations for a given property
  // reqElement: if provided, only collect from elements matching this tag name
  // Returns array of { value, important, order }
  function collectInlineDeclarations(code, propName, reqElement){
    var decls = [];
    // Capture the tag name before the style attribute
    var re = /<([a-z][a-z0-9]*)\b[^>]*?style\s*=\s*["']([^"']*)["']/gi;
    var m;
    var order = 0;
    while ((m = re.exec(code)) !== null){
      var tag = m[1].toLowerCase();
      // Skip if we know the target element and this tag doesn't match
      if (reqElement && tag !== reqElement) continue;
      var parts = m[2].split(";");
      for (var i = 0; i < parts.length; i++){
        var decl = parts[i].trim();
        if (!decl) continue;
        var colonIdx = decl.indexOf(":");
        if (colonIdx === -1) continue;
        var dp = decl.substring(0, colonIdx).trim().toLowerCase();
        var dv = decl.substring(colonIdx + 1).trim();
        if (dp !== propName) continue;
        var imp = /!important/i.test(dv);
        dv = dv.replace(/\s*!important\s*/i, "").trim();
        decls.push({ value: dv, important: imp, order: order++ });
      }
    }
    return decls;
  }

  // Find the winning value for a property considering all sources
  // Specificity order: !important inline > !important (by specificity) > inline > style (by specificity)
  // reqSelector: full plain selector string (e.g. "p.dashed") for overlap filtering
  // Returns { value, source } or null if property not set
  function findWinningValue(code, propName, reqSelector){
    var allDecls = collectDeclarations(code, propName);
    // Filter to only declarations whose selector could target the same element
    var styleDecls = [];
    for (var f = 0; f < allDecls.length; f++){
      if (selectorsCouldOverlap(allDecls[f].selector, reqSelector)) styleDecls.push(allDecls[f]);
    }
    var reqElement = getTargetElement(reqSelector);
    var inlineDecls = collectInlineDeclarations(code, propName, reqElement);

    var candidates = [];
    // Style block declarations: score = important*10000 + specificity, tiebreak by order
    for (var i = 0; i < styleDecls.length; i++){
      var d = styleDecls[i];
      candidates.push({
        value: d.value,
        score: (d.important ? 10000 : 0) + d.specificity,
        order: d.order,
        source: "style",
        selector: d.selector
      });
    }
    // Inline declarations: specificity 1000 (above any non-important style rule)
    for (var j = 0; j < inlineDecls.length; j++){
      var id = inlineDecls[j];
      candidates.push({
        value: id.value,
        score: (id.important ? 100000 : 1000),
        order: 10000 + id.order,
        source: "inline"
      });
    }
    if (!candidates.length) return null;

    // Sort: highest score wins, then highest order (last declaration wins ties)
    candidates.sort(function(a, b){
      if (b.score !== a.score) return b.score - a.score;
      return b.order - a.order;
    });
    return candidates[0];
  }

  function evalRequirement(req, code){
    if (req.type === "regex"){
      // For non-markup/non-CSS languages, add word boundaries to prevent
      // e.g. "xprint" from matching a "print" requirement
      var pat = req.pattern;
      if (PRISM_LANG !== "markup" && PRISM_LANG !== "css") pat = addWordBoundaries(pat);
      var mainPass = makeRegex(pat, req.flags).test(code);
      // Only attempt specificity checks for markup (HTML) challenges
      if (PRISM_LANG !== "markup" || req.noInline) return mainPass;
      var pvPat = extractPropValPattern(req.pattern);
      if (!pvPat) return mainPass; // not a CSS-block pattern
      var propName = extractPropName(pvPat);
      if (!propName) return mainPass;

      // Build a regex to test if a raw value string matches the requirement
      // Anchor to end so e.g. "padding:\s*0" won't match "padding: 02px"
      var pvRe = makeRegex(pvPat + "\\s*$", req.flags);

      if (!mainPass){
        // Main regex failed — check if inline styles satisfy the requirement
        var selPat2 = extractSelectorPattern(req.pattern);
        var plainSel2 = selectorPatternToPlain(selPat2);
        var reqElem2 = getTargetElement(plainSel2);
        var inlineDecls = collectInlineDeclarations(code, propName, reqElem2);
        for (var i = 0; i < inlineDecls.length; i++){
          if (pvRe.test(propName + ": " + inlineDecls[i].value)) return true;
        }
        return false;
      }

      // Main regex passed — check if a higher-specificity rule overrides it
      // Determine the target selector from the requirement's pattern
      var selPat = extractSelectorPattern(req.pattern);
      var plainSel = selectorPatternToPlain(selPat);
      var winner = findWinningValue(code, propName, plainSel);
      if (!winner) return true; // no declarations found (shouldn't happen)
      // Test if the winning value matches the requirement
      if (pvRe.test(propName + ": " + winner.value)) return true;
      // If the winning declaration comes from the requirement's own selector,
      // the pattern is likely partial (e.g. rgba\() — trust mainPass
      if (winner.selector && plainSel && winner.selector.trim().toLowerCase() === plainSel.toLowerCase()) return true;
      // Winning value doesn't match — the correct value is overridden
      return false;
    }
    if (req.type === "endsWithBrace"){
      var lines = code.replace(/\r/g, "").split("\n");
      for (var i = lines.length - 1; i >= 0; i--){
        var line = lines[i].trim();
        if (line === "") continue;
        return line === "}";
      }
      return false;
    }
    return false;
  }
  function getLineRegex(req){
    if (req.type === "regex" && req.linePattern) return makeRegex(req.linePattern, req.lineFlags || "");
    if (req.type === "regex") return makeRegex(req.pattern, req.flags || "");
    if (req.type === "endsWithBrace") return /^\s*\}\s*$/m;
    return null;
  }
  function evalMistake(m, code){ return makeRegex(m.pattern, m.flags).test(code); }

  /* ── CSS syntax validation (runs for css / markup challenges) ── */
  var CSS_PROPS = {};
  (function(){
    var list = (
      "align-content,align-items,align-self,all,animation,animation-delay," +
      "animation-direction,animation-duration,animation-fill-mode," +
      "animation-iteration-count,animation-name,animation-play-state," +
      "animation-timing-function,aspect-ratio,backface-visibility," +
      "background,background-attachment,background-clip,background-color," +
      "background-image,background-origin,background-position," +
      "background-repeat,background-size,border,border-bottom," +
      "border-bottom-color,border-bottom-left-radius," +
      "border-bottom-right-radius,border-bottom-style,border-bottom-width," +
      "border-collapse,border-color,border-image,border-image-outset," +
      "border-image-repeat,border-image-slice,border-image-source," +
      "border-image-width,border-left,border-left-color,border-left-style," +
      "border-left-width,border-radius,border-right,border-right-color," +
      "border-right-style,border-right-width,border-spacing,border-style," +
      "border-top,border-top-color,border-top-left-radius," +
      "border-top-right-radius,border-top-style,border-top-width," +
      "border-width,bottom,box-shadow,box-sizing,caption-side,caret-color," +
      "clear,clip,clip-path,color,column-count,column-fill,column-gap," +
      "column-rule,column-rule-color,column-rule-style,column-rule-width," +
      "column-span,column-width,columns,content,counter-increment," +
      "counter-reset,cursor,direction,display,empty-cells,filter,flex," +
      "flex-basis,flex-direction,flex-flow,flex-grow,flex-shrink,flex-wrap," +
      "float,font,font-display,font-family,font-feature-settings," +
      "font-kerning,font-size,font-size-adjust,font-stretch,font-style," +
      "font-variant,font-variant-caps,font-weight,gap,grid,grid-area," +
      "grid-auto-columns,grid-auto-flow,grid-auto-rows,grid-column," +
      "grid-column-end,grid-column-gap,grid-column-start,grid-gap," +
      "grid-row,grid-row-end,grid-row-gap,grid-row-start,grid-template," +
      "grid-template-areas,grid-template-columns,grid-template-rows," +
      "height,hyphens,isolation,justify-content,justify-items," +
      "justify-self,left,letter-spacing,line-height,list-style," +
      "list-style-image,list-style-position,list-style-type,margin," +
      "margin-bottom,margin-left,margin-right,margin-top,mask-image," +
      "max-height,max-width,min-height,min-width,object-fit," +
      "object-position,opacity,order,orphans,outline,outline-color," +
      "outline-offset,outline-style,outline-width,overflow,overflow-wrap," +
      "overflow-x,overflow-y,padding,padding-bottom,padding-left," +
      "padding-right,padding-top,page-break-after,page-break-before," +
      "page-break-inside,perspective,perspective-origin,place-content," +
      "place-items,place-self,pointer-events,position,quotes,resize,right," +
      "row-gap,scroll-behavior,src,tab-size,table-layout,text-align," +
      "text-align-last,text-decoration,text-decoration-color," +
      "text-decoration-line,text-decoration-style,text-indent," +
      "text-justify,text-overflow,text-shadow,text-transform,top," +
      "transform,transform-origin,transform-style,transition," +
      "transition-delay,transition-duration,transition-property," +
      "transition-timing-function,unicode-bidi,user-select," +
      "vertical-align,visibility,white-space,widows,width,word-break," +
      "word-spacing,word-wrap,writing-mode,z-index"
    ).split(",");
    for (var i = 0; i < list.length; i++) CSS_PROPS[list[i]] = 1;
  })();

  function isKnownProp(p){
    p = p.toLowerCase();
    // Custom properties (--*) are always valid
    if (p.indexOf("--") === 0) return true;
    // Vendor prefixes (-webkit-, -moz-, -ms-, -o-)
    p = p.replace(/^-(webkit|moz|ms|o)-/, "");
    return CSS_PROPS[p] === 1;
  }

  // Check if a string contains a known property buried inside extra chars
  function findBuriedProp(p){
    var lp = p.toLowerCase();
    for (var k in CSS_PROPS){
      if (lp.length > k.length && lp.indexOf(k) !== -1) return k;
    }
    return null;
  }

  function extractCSS(code){
    var blocks = [];
    var re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    var m;
    while ((m = re.exec(code)) !== null) blocks.push(m[1]);
    return blocks.length ? blocks.join("\n") : "";
  }

  function validateBraces(code){
    if (PRISM_LANG === "markup" || PRISM_LANG === "css") return null;
    // Strip string literals and comments to avoid counting braces inside them
    var stripped = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "").replace(/"(?:[^"\\]|\\.)*"/g, "").replace(/'(?:[^'\\]|\\.)*'/g, "");
    var opens = (stripped.match(/\{/g) || []).length;
    var closes = (stripped.match(/\}/g) || []).length;
    if (opens !== closes){
      return "Unbalanced curly braces: " + opens + " opening <code class='w3-codespan'>{</code> vs " + closes + " closing <code class='w3-codespan'>}</code>.";
    }
    return null;
  }

  function validateHTML(code){
    if (PRISM_LANG !== "markup" && PRISM_LANG !== "css") return null;
    // Only check the HTML portion — strip <style> and <script> block contents
    var html = code;
    html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "<style></style>");
    html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "<script></script>");
    // Strip HTML comments
    html = html.replace(/<!--[\s\S]*?-->/g, "");

    var opens = (html.match(/</g) || []).length;
    var closes = (html.match(/>/g) || []).length;
    if (opens !== closes){
      return "Unbalanced angle brackets: " + opens + " opening <code class='w3-codespan'>&lt;</code> vs " + closes + " closing <code class='w3-codespan'>&gt;</code>. Check for missing or extra <code class='w3-codespan'>&lt;</code> or <code class='w3-codespan'>&gt;</code>.";
    }
    return null;
  }

  function validateCSS(code){
    var css = (PRISM_LANG === "css") ? code : extractCSS(code);
    if (!css.trim()) return null;

    // Strip comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, "");

    // 1) Balanced braces
    var opens = (css.match(/\{/g) || []).length;
    var closes = (css.match(/\}/g) || []).length;
    if (opens !== closes){
      return "Unbalanced curly braces: " + opens + " opening <code class='w3-codespan'>{</code> vs " + closes + " closing <code class='w3-codespan'>}</code>.";
    }

    // 2) & 3) Check lines inside rule blocks
    var lines = css.split("\n");
    var inBlock = 0;
    for (var i = 0; i < lines.length; i++){
      var line = lines[i].trim();
      if (!line) continue;

      var lineOpens = (line.match(/\{/g) || []).length;
      var lineCloses = (line.match(/\}/g) || []).length;

      if (line.indexOf("{") !== -1){ inBlock += lineOpens - lineCloses; continue; }
      if (line === "}" || /^\}/.test(line)){ inBlock += lineOpens - lineCloses; continue; }
      if (/^@/.test(line)) continue;

      if (inBlock <= 0) continue;
      if (/^\/\//.test(line) || /^\/\*/.test(line)) continue;

      var declMatch = line.match(/^([^:]+?)\s*:\s*(.+)$/);
      if (!declMatch) continue;

      var prop = declMatch[1].trim();
      var val = declMatch[2].trim();

      // 3a) Property name: must be valid format
      if (!/^-?-?[a-z][a-z0-9-]*$/i.test(prop)){
        return "Invalid property name: <code class='w3-codespan'>" + prop.replace(/</g,"&lt;") + "</code>. Check for extra characters.";
      }

      // 3b) Property name: must be a known CSS property
      if (!isKnownProp(prop)){
        var buried = findBuriedProp(prop);
        if (buried){
          return "Unknown property <code class='w3-codespan'>" + prop.replace(/</g,"&lt;") + "</code>. Did you mean <code class='w3-codespan'>" + buried + "</code>?";
        }
      }

      // 2) Semicolon check: value must end with ; unless last declaration before }
      var valClean = val.replace(/\s*!important\s*/, "");
      if (!valClean.endsWith(";")){
        var nextLine = "";
        for (var j = i + 1; j < lines.length; j++){
          if (lines[j].trim()){ nextLine = lines[j].trim(); break; }
        }
        if (nextLine !== "}" && nextLine !== ""){
          return "Missing semicolon after <code class='w3-codespan'>" + prop.replace(/</g,"&lt;") + "</code> value. Every CSS declaration needs a <code class='w3-codespan'>;</code> at the end.";
        }
      }

      // 3c) Value junk: number+unit with trailing letters (e.g. 200pxsss)
      // Skip values containing url() — URLs can have strings that falsely match (e.g. "w3schools" → 3s+chools)
      var valNoSemicolon = val.replace(/;$/, "").trim();
      if (!/url\s*\(/i.test(valNoSemicolon)){
        var unitMatch = valNoSemicolon.match(/(\d+)(px|em|rem|vh|vw|vmin|vmax|pt|cm|mm|in|pc|ex|ch|s|ms|deg|rad|turn|fr)([a-z]+)/i);
        if (unitMatch){
          return "Extra characters after value: <code class='w3-codespan'>" + unitMatch[0].replace(/</g,"&lt;") + "</code>. Did you mean <code class='w3-codespan'>" + unitMatch[1] + unitMatch[2] + "</code>?";
        }
      }
    }
    return null;
  }

  function buildChallenges(challenges){
    var host = document.getElementById(HOST_ID);
    if (!host) return;
    host.innerHTML = "";

    var currentSection = null;

    challenges.forEach(function(ch){
      if (ch.section && ch.section !== currentSection){
        currentSection = ch.section;
        var h2 = document.createElement("h2");
        h2.className = "ch-section-title";
        h2.textContent = currentSection;
        host.appendChild(h2);
        if (ch.sectionIntro){
          var p = document.createElement("p");
          p.className = "ch-section-intro";
          p.innerHTML = ch.sectionIntro;
          host.appendChild(p);
        }
      }

      var card = document.createElement("div");
      card.className = "ch-card w3-white";
      card.innerHTML =
        "<div class='ch-split'>" +
          "<div class='ch-instructions'>" +
            "<div class='ch-instr-head'>" +
              "<h4>Instructions</h4>" +
              "<button class='ch-layoutbtn' type='button' data-action='toggleLayout' aria-pressed='false' title='Use stacked layout'>" +
                "<span class='ch-layoutico' aria-hidden='true'></span>" +
              "</button>" +
            "</div>" +
            "<div class='ch-meta'>" + (ch.intro || "") + "</div>" +
          "</div>" +
          "<div class='ch-workarea'>" +
            "<div class='ch-editorpanel'>" +
              "<div class='ch-toolbar'>" +
                "<div class='ch-toolbar-left'>" +
                  "<span class='ch-toolbar-title'>Editor</span>" +
                "</div>" +
                "<div class='ch-toolbar-actions'>" +
                  "<button class='ch-btn ch-btn-primary' data-action='check' title='Check your code'>" +
                    "<span class='ch-check-label-long'>Check code</span>" +
                    "<span class='ch-check-label-short'>Check</span>" +
                  "</button>" +
                  "<button class='ch-btn' data-action='toggleSolution' aria-expanded='false' aria-controls='sol_" + ch.id + "' title='Show or hide the solution'>" +
                    "<span class='ch-ico' aria-hidden='true'><svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><line x1='9' y1='18' x2='15' y2='18'/><line x1='10' y1='22' x2='14' y2='22'/><path d='M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14'/></svg></span>" +
                    "<span class='ch-sol-label-long'>Show solution</span>" +
                    "<span class='ch-sol-label-short'>Solution</span>" +
                    "<span class='ch-chev' aria-hidden='true'></span>" +
                  "</button>" +
                  "<button class='ch-btn ch-btn-ghost' data-action='reset' title='Reset to the starter code'>" +
                    "<span class='ch-ico' aria-hidden='true'><svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='1 4 1 10 7 10'/><path d='M3.51 15a9 9 0 1 0 2.13-9.36L1 10'/></svg></span>" +
                    "<span>Reset</span>" +
                  "</button>" +
                "</div>" +
              "</div>" +
              "<div class='c-editor-wrap w3-black'>" +
                "<pre class='c-editor-highlight language-" + PRISM_LANG + "' id='hl_" + ch.id + "'></pre>" +
                "<textarea class='c-editor-input' id='ta_" + ch.id + "' spellcheck='false' autocomplete='off'></textarea>" +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
        "<div class='ch-solutionbox' id='sol_" + ch.id + "' hidden>" +
          "<div class='ch-solution-head'>" +
            "<div>" +
              "<div class='ch-solution-title'>Solution</div>" +
              "<div class='ch-solution-sub'>Copy it or load it into the editor.</div>" +
            "</div>" +
            "<div class='ch-solution-actions'>" +
              "<span class='ch-soltoast' id='soltoast_" + ch.id + "'></span>" +
              "<button class='ch-btn' data-action='copySolution'>Copy</button>" +
              "<button class='ch-btn' data-action='useSolution'>Use</button>" +
            "</div>" +
          "</div>" +
          "<div class='ch-solution-codewrap'>" +
            "<div class='c-editor-wrap w3-black'>" +
              "<pre class='c-editor-highlight language-" + PRISM_LANG + "' id='solhl_" + ch.id + "'></pre>" +
              "<textarea class='c-editor-input' id='solplain_" + ch.id + "' readonly spellcheck='false'></textarea>" +
            "</div>" +
          "</div>" +
        "</div>" +
        "<div id='sum_" + ch.id + "' class='ch-summary'></div>" +
        "<div id='checkwrap_" + ch.id + "' class='ch-checkwrap'>" +
          "<h4>Checklist</h4>" +
          "<ul id='list_" + ch.id + "'></ul>" +
        "</div>";

      host.appendChild(card);

      var ta = document.getElementById("ta_" + ch.id);
      var hl = document.getElementById("hl_" + ch.id);
      var sum = document.getElementById("sum_" + ch.id);
      var solBox = document.getElementById("sol_" + ch.id);
      var solPlain = document.getElementById("solplain_" + ch.id);
      var solToast = document.getElementById("soltoast_" + ch.id);
      var list = document.getElementById("list_" + ch.id);
      var checkWrap = document.getElementById("checkwrap_" + ch.id);
      var toggleBtn = card.querySelector("[data-action='toggleSolution']");

      ta.value = ch.starter || "";
      ta.defaultValue = ch.starter || "";
      // store starter for BFCache restore handling
      ta.setAttribute("data-starter", ch.starter || "");
      ta.setAttribute("data-hl-id", "hl_" + ch.id);
      hl.innerHTML = highlightCode(ta.value, null);
      var solHl = document.getElementById("solhl_" + ch.id);
      solPlain.value = ch.solution || "";
      solHl.innerHTML = highlightCode(ch.solution || "", null);

      solPlain.addEventListener("scroll", function(){
        solHl.scrollTop = solPlain.scrollTop;
        solHl.scrollLeft = solPlain.scrollLeft;
      });

      // Set initial/minimum height of code textarea to match solution height
      // so toggling between code and solution doesn't cause layout jumping
      (function syncMinHeight(){
        // Use rAF so the browser has painted the DOM before we measure
        requestAnimationFrame(function(){
          // Temporarily unhide the solution box off-screen so we can measure
          var hadHidden = solBox.hasAttribute("hidden");
          if (hadHidden){
            solBox.removeAttribute("hidden");
            solBox.style.cssText = "visibility:hidden!important;position:absolute!important;left:-9999px!important;display:block!important;max-height:none!important;opacity:1!important;";
          }
          // Force reflow so the browser computes layout
          void solBox.offsetHeight;
          var solHeight = solHl.scrollHeight;
          if (hadHidden){
            solBox.style.cssText = "";
            solBox.setAttribute("hidden", "");
          }
          if (solHeight > 0){
            var editorWrap = ta.closest(".c-editor-wrap");
            if (editorWrap) editorWrap.style.minHeight = solHeight + "px";
          }
        });
      })();

      setSolutionBtnLabel(toggleBtn, false);

      ta.addEventListener("scroll", function(){
        hl.scrollTop = ta.scrollTop;
        hl.scrollLeft = ta.scrollLeft;
      });
      // When the code area is resized (e.g. user drags resize handle), fix the sidemenu
      if (typeof ResizeObserver !== "undefined"){
        var editorWrapObs = ta.closest(".c-editor-wrap");
        if (editorWrapObs){
          new ResizeObserver(function(){ if (typeof fix_sidemenu === "function") fix_sidemenu(); }).observe(editorWrapObs);
        }
      }
      function syncHighlight(){
        hl.innerHTML = highlightCode(ta.value, null);
      }
      ta.addEventListener("input", function(){
        syncHighlight();
        if (!window.ChallengeEngine || !window.ChallengeEngine.persistChecklist){
          sum.style.display = "none";
          checkWrap.style.display = "none";
        }
      });

      card.querySelector("[data-action='reset']").addEventListener("click", function(){
        ta.value = ch.starter || "";
        hl.innerHTML = highlightCode(ta.value, null);
        sum.style.display = "none";
        checkWrap.style.display = "none";
        solBox.classList.remove("is-open");
        solBox.style.maxHeight = "0px";
        solBox.hidden = true;
        toggleBtn.setAttribute("aria-expanded", "false");
        setSolutionBtnLabel(toggleBtn, false);
      });

      toggleBtn.addEventListener("click", function(){
        var isOpen = !solBox.hidden;
        if (isOpen) closeSolution(solBox, toggleBtn);
        else openSolution(solBox, toggleBtn, card);
      });

      card.querySelector("[data-action='copySolution']").addEventListener("click", function(){
        copyText(ch.solution || "");
        showToast(solToast, "Copied to clipboard");
      });
      card.querySelector("[data-action='useSolution']").addEventListener("click", function(){
        ta.value = ch.solution || "";
        hl.innerHTML = highlightCode(ta.value, null);
        sum.style.display = "none";
        checkWrap.style.display = "none";
        showToast(solToast, "Loaded into editor");
        closeSolution(solBox, toggleBtn);
        ta.focus();
      });


      card.querySelector("[data-action='check']").addEventListener("click", function(){
        var code = ta.value;
        scrollChallengeIntoView(card);
        if (!solBox.hidden){ closeSolution(solBox, toggleBtn); }
        if (isBlank(code)){
          setSummary(sum, "err", "The editor is empty. Add the required parts and check again.");
          checkWrap.style.display = "none";
          hl.innerHTML = highlightCode(code, null);
          return;
        }
        if (ch.starter && normSpaces(code) === normSpaces(ch.starter)){
          setSummary(sum, "warn", "The editor has not been used yet. Replace the comment with real code.");
          checkWrap.style.display = "none";
          hl.innerHTML = highlightCode(code, null);
          return;
        }
        var reqs = ch.requirements || [];
        var results = {};
        var passed = 0;
        reqs.forEach(function(r){
          var ok = evalRequirement(r, code);
          results[r.id] = ok;
          if (ok) passed++;
        });

        // update global state for external challenge completion queries
        updateChallengeState(ch, results);

        var okLineMap = {};
        reqs.forEach(function(r){
          if (results[r.id]){
            var lineRe = getLineRegex(r);
            if (lineRe){
              var indices = r.lineScope ? findScopedLines(code, lineRe, r.lineScope) : findMatchingLines(code, lineRe);
              indices.forEach(function(i){ okLineMap[i] = true; });
            }
          }
        });
        var mistakeMsg = "";
        var mistakes = ch.commonMistakes || [];
        for (var m=0; m<mistakes.length; m++){
          if (evalMistake(mistakes[m], code)){ mistakeMsg = mistakes[m].msg; break; }
        }
        var extraMsg = "";
        var extraSeverity = "";
        if (typeof window.CHALLENGE_EXTRA_CHECK === "function"){
          try{
            var extra = window.CHALLENGE_EXTRA_CHECK({ code: code, lang: PRISM_LANG, requirements: reqs, results: results });
            if (extra && Array.isArray(extra.okLineIndices)){
              extra.okLineIndices.forEach(function(i){ okLineMap[i] = true; });
            }
            if (extra && extra.message){ extraMsg = extra.message; }
            if (extra && extra.severity){ extraSeverity = extra.severity; }
          } catch(_e){}
        }

        // Syntax validation
        var htmlError = "";
        var cssError = "";
        var braceError = "";
        if (PRISM_LANG === "css" || PRISM_LANG === "markup"){
          try{ htmlError = validateHTML(code) || ""; } catch(_e){}
          try{ cssError = validateCSS(code) || ""; } catch(_e){}
        } else {
          try{ braceError = validateBraces(code) || ""; } catch(_e){}
        }
        var syntaxError = htmlError || cssError || braceError;

        var extraHint = extraMsg ? ("<br><strong>Note:</strong> " + extraMsg) : "";
        if (passed === reqs.length && syntaxError){
          setSummary(sum, "err", "<strong>Syntax error:</strong> " + syntaxError + extraHint);
        } else if (passed === reqs.length){
          setSummary(sum, "ok", "&#127881; Great job! You nailed it!" + extraHint);
        } else if (passed >= Math.max(1, reqs.length - 2)){
          var hint = mistakeMsg ? ("<br><strong>Hint:</strong> " + mistakeMsg) : "";
          setSummary(sum, "warn", "Almost there! Fix the missing checklist items." + hint + extraHint);
        } else {
          var hint2 = mistakeMsg ? ("<br><strong>Hint:</strong> " + mistakeMsg) : "";
          setSummary(sum, "err", "Nice start - keep going. Use the checklist below." + hint2 + extraHint);
        }
        renderChecklist(list, reqs, results);
        if (htmlError){
          var htmlLi = document.createElement("li");
          htmlLi.innerHTML = "<div class='chk-badge no' role='img' aria-label='Failed'>&#10007;</div><div>" + htmlError + "</div>";
          list.appendChild(htmlLi);
        }
        if (cssError){
          var cssLi = document.createElement("li");
          cssLi.innerHTML = "<div class='chk-badge no' role='img' aria-label='Failed'>&#10007;</div><div>" + cssError + "</div>";
          list.appendChild(cssLi);
        }
        if (braceError){
          var braceLi = document.createElement("li");
          braceLi.innerHTML = "<div class='chk-badge no' role='img' aria-label='Failed'>&#10007;</div><div>" + braceError + "</div>";
          list.appendChild(braceLi);
        }
        checkWrap.style.display = "block";

        // For languages with async runtime checks (Python, C, Java etc.),
        // defer green-line highlighting until the runtime result arrives
        if (window.ChallengeEngine && window.ChallengeEngine.deferHighlight){
          deferredHL = { code: code, okLineMap: okLineMap, hl: hl };
          hl.innerHTML = highlightCode(code, null); // render without green lines
        } else {
          hl.innerHTML = highlightCode(code, okLineMap);
        }

        // invoke any registered completion hooks when overall completion turns true
        runCompletionHooks();

        // Fix side menu after layout change (summary + checklist now visible)
        if (typeof fix_sidemenu === "function") fix_sidemenu();
      });
    });

    wireLayoutToggleButtons();
    applyLayoutFromStorage();
  }

  function loadScript(url){
    return new Promise(function(resolve, reject){
      var s = document.createElement("script");
      s.src = url;
      s.async = true;
      s.onload = resolve;
      s.onerror = function(){ reject(new Error("Failed to load script: " + url)); };
      document.head.appendChild(s);
    });
  }

  function startWithData(data){
    var compiled = compileChallenges(data);
    buildChallenges(compiled);
  }

  function boot(){
    if (window.CHALLENGE_DATA){ startWithData(window.CHALLENGE_DATA); return; }
    if (!DATA_URL){
      console.error("Missing CHALLENGE_DATA_URL (or CHALLENGE_DATA)");
      var host = document.getElementById(HOST_ID);
      if (host){ host.innerHTML = "<div class='w3-panel w3-pale-red'>Missing challenges data.</div>"; }
      return;
    }
    loadScript(DATA_URL).then(function(){
      if (!window.CHALLENGE_DATA){ throw new Error("CHALLENGE_DATA was not set by " + DATA_URL); }
      startWithData(window.CHALLENGE_DATA);
    }).catch(function(err){
      console.error(err);
      var host = document.getElementById(HOST_ID);
      if (host){ host.innerHTML = "<div class='w3-panel w3-pale-red'>Could not load challenges.</div>"; }
    });
  }

  window.addEventListener("resize", function(){ applyLayoutFromStorage(); });
  // Reset editors on page show (reload or BFCache restore)
  window.addEventListener("pageshow", function(e){
    try{
      var host = document.getElementById(HOST_ID);
      if (!host) return;
      var tas = host.querySelectorAll("textarea.c-editor-input[data-starter][data-hl-id]");
      for (var i=0; i<tas.length; i++){
        var t = tas[i];
        var starter = t.getAttribute("data-starter") || "";
        var hlId = t.getAttribute("data-hl-id");
        var hl = document.getElementById(hlId);
        t.value = starter;
        t.defaultValue = starter;
        if (hl) hl.innerHTML = highlightCode(starter, null);
      }
    } catch(_err){}
  });
  boot();

  // Public API for external consumers
  window.ChallengeEngine = window.ChallengeEngine || {};
  window.ChallengeEngine.isChallengeCompleted = function(){
    return getGlobalCompletionStatus();
  };
  window.ChallengeEngine.onChallengeCompleted = function(hookId, hookCallback){
    if (typeof hookCallback !== "function") return;
    completionHooks.push({
      id: hookId,
      cb: hookCallback,
      lastResult: false
    });
  };
  window.ChallengeEngine.highlightCode = highlightCode;
  window.ChallengeEngine.persistChecklist = window.ChallengeEngine.persistChecklist || false;
  window.ChallengeEngine.deferHighlight = window.ChallengeEngine.deferHighlight || false;
  // Disable or re-enable the code textarea (e.g. while code is running)
  window.ChallengeEngine.setEditorDisabled = function(disabled){
    var host = document.getElementById(HOST_ID);
    if (!host) return;
    var tas = host.querySelectorAll("textarea.c-editor-input[id^='ta_']");
    for (var i = 0; i < tas.length; i++){
      if (disabled){
        tas[i].setAttribute("readonly", "");
        tas[i].classList.add("ch-editor-busy");
      } else {
        tas[i].removeAttribute("readonly");
        tas[i].classList.remove("ch-editor-busy");
      }
    }
  };
  // Apply deferred green-line highlighting; optionally pass errorLines (array of
  // 0-indexed line numbers) to suppress green on those lines.
  window.ChallengeEngine.applyDeferredHighlight = function(errorLines){
    if (!deferredHL) return;
    var d = deferredHL;
    deferredHL = null;
    if (errorLines && errorLines.length){
      for (var i = 0; i < errorLines.length; i++) delete d.okLineMap[errorLines[i]];
    }
    d.hl.innerHTML = highlightCode(d.code, d.okLineMap);
  };
})();
