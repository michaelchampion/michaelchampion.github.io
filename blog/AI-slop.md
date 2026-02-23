
### Threat model: how standards-process dynamics can hurt adoption

#### Assets / goals worth protecting
1. **Interop**: one API shape across browsers, predictable semantics.
2. **Time-to-utility**: developers can rely on it before enthusiasm shifts elsewhere.
3. **Trust**: credible security/privacy posture so it doesn’t get branded a “skeleton key.”
4. **Ecosystem coherence**: avoids a forked mess of near-identical “WebMCPs.”

#### Threat actors (not “bad guys,” but sources of risk)
- **Standards process incentives**: perfectionism, consensus-seeking, procedural rigor.
- **Vendor politics**: competitive positioning, “not invented here,” strategic delay.
- **Individual incentives**: credit-seeking, thought-leadership, agenda pushing.
- **Adjacent communities**: privacy/security/a11y reviewers with legitimate concerns that can still stall if engaged too late.

---

## 1) “Death by incubation”: never leaves draft / endless iteration

**Attack path**
- Requirements balloon, every edge case must be solved up-front, decisions are deferred to “future work,” and the spec never reaches a stable milestone that implementers can ship broadly.

**Impact**
- Developers stick with backend MCP, extensions, or UI automation; WebMCP becomes “a cool draft.”

**Early warning signals**
- Explainer expands faster than the test suite.
- No agreed milestone like “MVP = register tool + call tool + permissions.”
- Endless bikeshedding on naming, annotations, schema formats, etc.

**Mitigations**
- **Define a hard MVP**: smallest interoperable core:
  - tool registration
  - invocation
  - user-interaction gating primitive
  - permission / origin model (even if conservative)
- **Timebox decisions** (e.g., “2 meetings then editor call”).
- **Ship an implementation report + conformance tests early**; standards bodies tend to converge when there’s runnable interop evidence.

---

## 2) Scope creep into “agent platform”: spec tries to solve everything agents need

**Attack path**
- Pressure to include auth flows, payments, browsing automation, memory, prompt routing, “agent identity,” policy engines, etc.

**Impact**
- Complexity scares browser vendors and web developers; security reviewers see an enormous attack surface; adoption slows.

**Mitigations**
- Aggressively enforce **non-goals** in the spec (the current draft already frames WebMCP as tool exposure, not a full agent runtime; keep that discipline).
- **Modularize**: separate documents/extensions for:
  - permissions & prompting UX
  - auth patterns
  - rich result types / streaming
  - enterprise policy hooks  
  Let the core stay small and shippable.

---

## 3) Fragmentation via parallel specs / rebrands / competing “standards”

**Attack path**
- Multiple groups publish “similar but different” APIs (different namespaces, schemas, transports, result formats). Everyone claims they’re “the real standard.”

**Impact**
- Web developers won’t implement multiple variants; AI platform vendors pick one; interop collapses.

**Mitigations**
- **Compatibility-first**: maintain a documented mapping to MCP and keep the object model close to what already works in practice.
- **One canonical registry of concepts**: tool schema, result format, error model, permission model. Even if optional, define negotiation/versioning so variants don’t silently diverge.
- Provide an **official polyfill** that becomes the de facto compatibility layer (the ecosystem already leans this direction with MCP-B-style tooling; see examples like [WebMCP-org/examples](https://github.com/WebMCP-org/examples)).

---

## 4) Optionality explosion: “everything is optional” → interop failures

**Attack path**
- To satisfy all stakeholders, the spec allows many equivalent ways to do the same thing (multiple schema types, multiple return formats, multiple invocation modes).

**Impact**
- Two browsers “support WebMCP” but apps break across them; developers lose confidence.

**Mitigations**
- Define **one required happy path** (“if you implement WebMCP, you MUST support X”).
- Optional features must come with:
  - clear feature detection
  - conformance tests
  - “don’t use this unless you really need it” guidance

---

## 5) Politics-driven stalling (“strategic delay”)

**Attack path**
- A vendor that doesn’t want a competitor to get first-mover advantage participates just enough to slow decisions, re-litigate settled points, or demand incompatible changes.

**Impact**
- Slow standardization; “ships in one engine only” for a long time; web devs won’t bet on it.

**Mitigations**
- **Implementation-led standardization**:
  - prioritize demonstrating multi-implementation interop (even if one is a polyfill/extension)
  - publish “exit criteria” for moving forward: e.g., “2 independent implementations + test pass rate”
- Keep governance visibly balanced:
  - rotate editors/chairs
  - transparent issue triage
  - publish meeting notes and rationales

---

## 6) “Self-promotion” / hype backlash → credibility collapse

**Attack path**
- People market it as a universal skeleton key, or as “agents can do anything on any site,” before a permission model and user-consent story are credible and simple.

**Impact**
- Privacy/security communities mobilize against it; browser teams become risk-averse; adoption freezes.

**Mitigations**
- Publish a **security & privacy model** early and keep it legible:
  - default-deny posture
  - clear consent UX expectations
  - origin-bound capabilities
  - auditable tool calls
- Provide **recommended copy** for websites (“what you are exposing,” “to whom,” “when”) to reduce sensational framing.
- Treat “skeleton key” narratives as a product risk: proactively rebut with technical constraints and UX safeguards.

---

## 7) Security/privacy process bottlenecks: either paralysis or overcorrection

**Two failure modes**
1. **Paralysis**: legitimate concerns arrive late, force redesign.
2. **Overcorrection**: security demands make the API unusable (too many prompts, too little capability).

**Mitigations**
- Do formal threat modeling as part of the spec (not just code):
  - prompt injection considerations
  - confused-deputy problems (tool calls acting with user authority)
  - data exfiltration via tool outputs
- Build in **capability discipline**:
  - least-privilege tool registration
  - explicit “readOnly” vs mutating tools (the draft mentions `readOnlyHint`—ensure it has teeth or clear UX implications)
  - user-interaction gating (the spec includes `requestUserInteraction`; ensure it’s central, not an afterthought) ([spec](https://webmachinelearning.github.io/webmcp/))

---

## 8) Patent/IP / licensing anxiety (even if unfounded) slows enterprise adoption

**Attack path**
- Enterprises worry “standards = patents” or unclear licensing around reference implementations.

**Mitigations**
- Keep key artifacts under clear, permissive licenses and document it prominently.
- If the standard advances, align with W3C’s patent policy expectations and make the status explicit (the spec already states it’s not yet on the standards track; keep that clarity) ([spec status section](https://webmachinelearning.github.io/webmcp/)).

---

## 9) “Process mismatch” between W3C and de facto web standardization (WHATWG reality)

**Attack path**
- The web platform often moves via implementation + tests + web-compat reality; heavy committee process can lag the engineering cadence.

**Impact**
- Implementers ship something “real,” spec lags, and later tries to “standardize” a different shape → churn.

**Mitigations**
- Track actual behavior with **web platform tests**-style discipline:
  - tests define reality
  - spec describes it
- If necessary, run a **dual-track**:
  - “living” implementation notes + tests evolve quickly
  - spec snapshots stabilize at milestones

---

### What developers (of WebMCP) can do: a practical mitigation plan

#### 1) Make an MVP that’s hard to misinterpret
- One blessed registration API, one invocation model, one minimal result format.
- A crisp permission story: “who can call tools, when, and with what user consent.”

#### 2) Win via interop evidence, not meetings
- Publish:
  - conformance tests
  - implementation report
  - demo apps that break if semantics change (forcing stability)

#### 3) Provide a universal fallback so web devs can adopt now
- Progressive enhancement:
  - If `navigator.modelContext` exists, register tools.
  - Else fall back to backend MCP / extension / existing integrations.  
This reduces the “bet” a site must make and makes adoption resilient to standard delays.

#### 4) Treat comms as part of security
- Maintain an “anti-hype” FAQ:
  - what it can’t do
  - how user consent works
  - how sites can *choose not to expose tools*
- This directly reduces the reputational risk that politics can amplify.

#### 5) Governance hygiene to reduce politics
- Transparent triage, published decision logs, rotating leadership, clear milestones.
- Avoid naming wars by locking the developer-facing surface early and versioning anything experimental.

---

### If you want, I can tailor the threat model to your angle
Are you thinking about WebMCP adoption risk as:
1) a **browser vendor** deciding whether to implement,  
2) a **web app** deciding whether to expose tools, or  
3) an **AI platform** deciding whether to integrate?

Each has a different “most likely” failure mode and a different best mitigation strategy.
