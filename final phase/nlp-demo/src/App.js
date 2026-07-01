import { useState, useRef } from "react";

const FAKE_SIGNALS = [
  "انفجار","كارثة","مؤامرة","خيانة","سقط","مات","اغتيل","هرب","فجأة","سري",
  "تسريب","خطير","عاجل","مجهول","مزيف","مؤكد","يكشف","يفضح","صدمة","غريب"
];
const REAL_SIGNALS = [
  "اعلن","اجتمع","قرر","وافق","تم","شارك","افتتح","انطلق","قدم","ناقش",
  "اتفق","اصدر","وقع","ابدى","رحب","التقى","دعا","نفذ","اوضح","كشف"
];

const EXAMPLE_TWEETS = [
  { text: "اجتمع الرئيس مع رئيس الوزراء لمناقشة الموازنة الجديدة والخطط الاقتصادية للعام القادم", label: "real" },
  { text: "عاجل: تسريب خطير يكشف مؤامرة سرية لاغتيال مسؤول كبير في ظروف غامضة جداً", label: "fake" },
  { text: "وافق البرلمان على قانون تنظيم وسائل التواصل الاجتماعي بأغلبية الأصوات", label: "real" },
  { text: "صدمة: هرب رجل أعمال شهير بمليارات من البنوك المصرية في سرية تامة الليلة", label: "fake" },
  { text: "افتتح وزير الصحة مستشفى جديداً بطاقة 500 سرير في محافظة الجيزة", label: "real" },
  { text: "كارثة مؤكدة: سقط النظام وهرب كل المسؤولين من البلاد فجأة الليلة", label: "fake" },
];

function analyzeText(text) {
  if (!text.trim()) return null;
  const words = text.split(/\s+/);
  let fakeScore = 0, realScore = 0;
  const matchedFake = [], matchedReal = [];
  words.forEach(w => {
    const clean = w.replace(/[^\u0600-\u06FF]/g, "");
    if (FAKE_SIGNALS.includes(clean)) { fakeScore += 15; matchedFake.push(clean); }
    if (REAL_SIGNALS.includes(clean)) { realScore += 12; matchedReal.push(clean); }
  });
  fakeScore += Math.random() * 8;
  realScore += Math.random() * 8;
  const total = fakeScore + realScore + 20;
  const fakePct = Math.min(95, Math.max(5, Math.round((fakeScore + 10) / total * 100)));
  const realPct = 100 - fakePct;
  const label = fakePct > 55 ? "fake" : fakePct < 45 ? "real" : "uncertain";
  const confidence = Math.max(fakePct, realPct);
  return { label, fakePct, realPct, confidence, matchedFake: [...new Set(matchedFake)], matchedReal: [...new Set(matchedReal)] };
}

function ResultCard({ result }) {
  if (!result) return null;
  const isReal = result.label === "real";
  const isUncertain = result.label === "uncertain";
  const labelColor = isUncertain ? "#92400e" : isReal ? "#065f46" : "#7f1d1d";
  const labelBg = isUncertain ? "#fef3c7" : isReal ? "#d1fae5" : "#fee2e2";
  const labelText = isUncertain ? "غير محدد" : isReal ? "حقيقي" : "مزيف";
  const icon = isUncertain ? "ti-question-mark" : isReal ? "ti-check" : "ti-x";

  return (
    <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1.25rem", marginTop: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
        <div style={{ background: labelBg, color: labelColor, borderRadius: "var(--border-radius-md)", padding: "6px 14px", fontWeight: 500, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
          <i className={`ti ${icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
          {labelText}
        </div>
        <span style={{ color: "var(--color-text-secondary)", fontSize: 13 }}>
          Confidence: <strong style={{ color: "var(--color-text-primary)" }}>{result.confidence}%</strong>
        </span>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: "#065f46" }}>Real {result.realPct}%</span>
          <span style={{ fontSize: 12, color: "#7f1d1d" }}>Fake {result.fakePct}%</span>
        </div>
        <div style={{ height: 10, borderRadius: 999, background: "#fee2e2", overflow: "hidden" }}>
          <div style={{ width: `${result.realPct}%`, height: "100%", background: "#059669", borderRadius: 999, transition: "width 0.5s" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.75rem" }}>
          <p style={{ fontSize: 12, color: "#065f46", margin: "0 0 6px", fontWeight: 500 }}>
            <i className="ti ti-check" style={{ fontSize: 14, marginRight: 4 }} aria-hidden="true" />Real signals
          </p>
          {result.matchedReal.length > 0
            ? result.matchedReal.map(w => <span key={w} style={{ display: "inline-block", background: "#d1fae5", color: "#065f46", borderRadius: 4, padding: "2px 8px", fontSize: 12, margin: "2px", direction: "rtl" }}>{w}</span>)
            : <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>None detected</span>}
        </div>
        <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.75rem" }}>
          <p style={{ fontSize: 12, color: "#7f1d1d", margin: "0 0 6px", fontWeight: 500 }}>
            <i className="ti ti-alert-triangle" style={{ fontSize: 14, marginRight: 4 }} aria-hidden="true" />Fake signals
          </p>
          {result.matchedFake.length > 0
            ? result.matchedFake.map(w => <span key={w} style={{ display: "inline-block", background: "#fee2e2", color: "#7f1d1d", borderRadius: 4, padding: "2px 8px", fontSize: 12, margin: "2px", direction: "rtl" }}>{w}</span>)
            : <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>None detected</span>}
        </div>
      </div>

      <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginTop: "0.75rem", marginBottom: 0 }}>
        <i className="ti ti-info-circle" style={{ fontSize: 13, marginRight: 4 }} aria-hidden="true" />
        Demo uses a rule-based keyword scorer. Production uses XGBoost (91.24%), AraBERT, and BiLSTM models.
      </p>
    </div>
  );
}

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("demo");
  const textareaRef = useRef(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const r = analyzeText(text);
      setResult(r);
      setHistory(h => [{ text: text.substring(0, 60) + (text.length > 60 ? "..." : ""), result: r }, ...h.slice(0, 4)]);
      setLoading(false);
    }, 800);
  };

  const handleExample = (ex) => {
    setText(ex.text);
    setResult(null);
    setActiveTab("demo");
    textareaRef.current?.focus();
  };

  const models = [
    { name: "XGBoost + TF-IDF", acc: 91.24, f1: 0.910, rank: 1, color: "#0f766e", tag: "Best" },
    { name: "BiLSTM + Word2Vec", acc: 90.22, f1: null, rank: 2, color: "#7c3aed", tag: "Deep" },
    { name: "AraBERT", acc: 90.01, f1: 0.899, rank: 3, color: "#1d4ed8", tag: "BERT" },
  ];

  const tabStyle = (active) => ({
    padding: "8px 16px", borderRadius: "var(--border-radius-md)", cursor: "pointer",
    fontSize: 14, fontWeight: active ? 500 : 400,
    color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
    background: active ? "var(--color-background-primary)" : "transparent",
    border: active ? "0.5px solid var(--color-border-tertiary)" : "none",
    transition: "all 0.15s"
  });

  return (
    <div style={{ padding: "1.5rem 1rem" }}>
      <h2 className="sr-only">Arabic Fake News Detector — Interactive Demo</h2>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.25rem" }}>
        <div style={{ width: 36, height: 36, borderRadius: "var(--border-radius-md)", background: "#0f766e", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="ti ti-shield-check" style={{ fontSize: 20, color: "#fff" }} aria-hidden="true" />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 500 }}>Arabic Fake News Detector</h2>
          <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>Egyptian Arabic · NLP Project Demo</p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: 4, width: "fit-content" }}>
        {[["demo", "Detector", "ti-search"], ["models", "Models", "ti-chart-bar"], ["examples", "Examples", "ti-list"]].map(([id, label, icon]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={tabStyle(activeTab === id)}>
            <i className={`ti ${icon}`} style={{ fontSize: 14, marginRight: 5 }} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === "demo" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 12, marginBottom: "1rem" }}>
            {[{ label: "Best Accuracy", val: "91.24%", icon: "ti-trophy", color: "#0f766e" },
              { label: "Models Trained", val: "3", icon: "ti-brain", color: "#7c3aed" },
              { label: "Embedding Texts", val: "2.5M", icon: "ti-database", color: "#1d4ed8" },
              { label: "Dataset", val: "EG Arabic", icon: "ti-file-text", color: "#b45309" }
            ].map(m => (
              <div key={m.label} style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.75rem 1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <i className={`ti ${m.icon}`} style={{ fontSize: 16, color: m.color }} aria-hidden="true" />
                  <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{m.label}</span>
                </div>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>{m.val}</p>
              </div>
            ))}
          </div>

          <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }}>
            Enter Egyptian Arabic tweet
          </label>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => { setText(e.target.value); setResult(null); }}
            placeholder="اكتب نص التغريدة هنا... (Write an Egyptian Arabic tweet)"
            dir="rtl"
            rows={4}
            style={{ width: "100%", resize: "vertical", fontFamily: "inherit", fontSize: 15, boxSizing: "border-box", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-secondary)", padding: "0.75rem", background: "var(--color-background-primary)", color: "var(--color-text-primary)", lineHeight: 1.7 }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{text.length} characters</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setText(""); setResult(null); }} style={{ fontSize: 13 }} disabled={!text}>
                <i className="ti ti-trash" style={{ fontSize: 14, marginRight: 4 }} aria-hidden="true" />Clear
              </button>
              <button onClick={handleAnalyze} disabled={!text.trim() || loading}
                style={{ background: text.trim() && !loading ? "#0f766e" : "var(--color-background-secondary)", color: text.trim() && !loading ? "#fff" : "var(--color-text-secondary)", border: "none", borderRadius: "var(--border-radius-md)", padding: "8px 18px", cursor: text.trim() ? "pointer" : "not-allowed", fontWeight: 500, fontSize: 14 }}>
                {loading
                  ? <><i className="ti ti-loader" style={{ fontSize: 14, marginRight: 4 }} />Analyzing…</>
                  : <><i className="ti ti-search" style={{ fontSize: 14, marginRight: 4 }} />Analyze</>}
              </button>
            </div>
          </div>

          <ResultCard result={result} />

          {history.length > 0 && (
            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 8 }}>Recent analyses</p>
              {history.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: h.result.label === "real" ? "#059669" : h.result.label === "fake" ? "#dc2626" : "#d97706", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, direction: "rtl", flex: 1, color: "var(--color-text-secondary)" }}>{h.text}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: h.result.label === "real" ? "#059669" : h.result.label === "fake" ? "#dc2626" : "#d97706" }}>
                    {h.result.label === "real" ? "Real" : h.result.label === "fake" ? "Fake" : "Uncertain"} {h.result.confidence}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "models" && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 0 }}>
            Three models were trained and benchmarked on Egyptian Arabic tweets.
          </p>
          {models.map((m, i) => (
            <div key={m.name} style={{ background: "var(--color-background-primary)", border: i === 0 ? `2px solid ${m.color}` : "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    {i === 0 && <span style={{ background: m.color, color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 500 }}>Best</span>}
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{m.name}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>Rank #{m.rank}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontSize: 24, fontWeight: 500, color: m.color }}>{m.acc}%</p>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>accuracy{m.f1 ? ` · F1 ${m.f1}` : ""}</p>
                </div>
              </div>
              <div style={{ marginTop: 10, height: 6, borderRadius: 999, background: "var(--color-background-secondary)", overflow: "hidden" }}>
                <div style={{ width: `${(m.acc - 89) / 3 * 100}%`, height: "100%", background: m.color, borderRadius: 999 }} />
              </div>
            </div>
          ))}

          <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.75rem 1rem", marginTop: 4 }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>Preprocessing pipeline</p>
            {["Remove URLs & mentions", "Normalize Arabic letters (alef, ta marbuta, ya)", "Remove tashkeel (diacritics)", "Arabic stopword filtering", "TF-IDF vectorization / tokenization"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
                <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#0f766e", color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 13 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "examples" && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginTop: 0 }}>
            Click an example to load it into the detector.
          </p>
          {EXAMPLE_TWEETS.map((ex, i) => (
            <div key={i}
              onClick={() => handleExample(ex)}
              style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "0.875rem 1rem", marginBottom: 10, cursor: "pointer", transition: "border-color 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--color-border-secondary)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border-tertiary)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ padding: "3px 10px", borderRadius: 4, fontSize: 12, fontWeight: 500,
                  background: ex.label === "real" ? "#d1fae5" : "#fee2e2",
                  color: ex.label === "real" ? "#065f46" : "#7f1d1d" }}>
                  {ex.label === "real" ? "Real ✓" : "Fake ✗"}
                </span>
                <span style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
                  <i className="ti ti-arrow-right" style={{ fontSize: 13 }} aria-hidden="true" /> Try this
                </span>
              </div>
              <p style={{ margin: 0, fontSize: 14, direction: "rtl", lineHeight: 1.7 }}>{ex.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
