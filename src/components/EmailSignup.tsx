import { useState } from "react";

const BUTTONDOWN_USERNAME = "hotkeylookup";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const body = new FormData();
      body.set("email", email);
      const res = await fetch(`https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`, {
        method: "POST",
        body,
        mode: "no-cors",
      });
      // no-cors returns opaque; assume ok unless it threw
      void res;
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  };

  if (status === "ok") {
    return <span className="foot-email-ok">✓ subscribed</span>;
  }

  return (
    <form onSubmit={submit} className="foot-email" aria-label="Get product updates">
      <input
        type="email"
        required
        placeholder="email for product updates"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="email"
      />
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "…" : "→"}
      </button>
    </form>
  );
}
