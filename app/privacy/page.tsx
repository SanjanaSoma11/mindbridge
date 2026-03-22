import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — MindBridge",
  description:
    "How MindBridge collects, uses, and protects your information.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8 pb-8">
      <header className="page-header max-w-3xl">
        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-subtitle">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </header>

      <div className="prose-calm max-w-3xl space-y-8 text-left">
        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            1. Overview
          </h2>
          <p className="mt-2">
            MindBridge (“we,” “us”) provides a student wellbeing check-in
            experience. This policy explains what information we process, why,
            and your choices. MindBridge is designed to be private and
            student-controlled, but{" "}
            <strong className="text-brand-600">
              it is not a medical device, clinical service, or emergency
              service
            </strong>
            . If you are in immediate danger, call your local emergency number
            (e.g. 911) or a crisis line such as 988 in the U.S.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            2. Who this applies to
          </h2>
          <p className="mt-2">
            This policy applies to visitors and registered users of the MindBridge
            website and related services (including optional Canvas or calendar
            integrations where enabled by your deployment).
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            3. Information we collect
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>Account data:</strong> If your deployment uses
              authentication (e.g. Supabase), we may process your email address,
              name (if provided), and credentials needed to operate your account.
            </li>
            <li>
              <strong>Check-in content:</strong> Text you enter in check-ins,
              and associated metadata such as timestamps and derived signals
              (e.g. sentiment scores, tags, crisis flags) produced by the
              system to support your experience and safety.
            </li>
            <li>
              <strong>Technical data:</strong> Standard server and application
              logs may include IP address, device/browser type, and diagnostic
              information to operate and secure the service.
            </li>
            <li>
              <strong>Integration data (optional):</strong> If your school or
              you connect Canvas or a calendar demo, we may process assignment
              or calendar due-date information you or your administrator
              chooses to send, to generate workload context for the check-in.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            4. AI processing
          </h2>
          <p className="mt-2">
            MindBridge may send your check-in messages and related context to an
            AI provider (for example Groq or Anthropic, depending on
            configuration) to generate responses and structured summaries. Your
            organization’s deployment should configure data processing and
            contracts with those providers. Do not include highly sensitive
            information you do not want processed by AI systems.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            5. How we use information
          </h2>
          <p className="mt-2">
            We use information to provide the service (authentication, storing
            check-ins, summaries, and optional workload context), to improve
            reliability and security, and to detect or respond to serious safety
            concerns (e.g. crisis indicators) as described in the product.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            6. Legal bases (including where GDPR applies)
          </h2>
          <p className="mt-2">
            Depending on your region, we may rely on{" "}
            <strong className="text-brand-600">contract</strong> (providing the
            service you requested),{" "}
            <strong className="text-brand-600">legitimate interests</strong>{" "}
            (security, product improvement), and{" "}
            <strong className="text-brand-600">consent</strong> where required
            (for example optional cookies or marketing, if ever offered). You
            may withdraw consent where processing is consent-based, subject to
            legal exceptions.
          </p>
        </section>

        <section id="cookies">
          <h2 className="font-display text-lg font-semibold text-brand-600">
            7. Cookies &amp; local storage
          </h2>
          <p className="mt-2">
            We use cookies and similar technologies (including{" "}
            <strong className="text-brand-600">local storage</strong> and{" "}
            <strong className="text-brand-600">session storage</strong>) that are
            necessary for sign-in, security, and basic app functionality. These
            are typically considered “strictly necessary” and do not require
            marketing consent in many jurisdictions. If we add non-essential
            analytics or advertising cookies, we will update this policy and
            request consent where required.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            8. Sharing
          </h2>
          <p className="mt-2">
            We use infrastructure providers (for example hosting and database
            services such as Supabase) and AI providers as configured for your
            deployment. We do not sell your personal information. We may share
            information when required by law or to protect rights and safety.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            9. Retention &amp; deletion
          </h2>
          <p className="mt-2">
            Retention depends on your deployment settings. Where the product
            offers a “delete my data” or account deletion feature, you
            control removal of your data subject to backup and legal retention
            limits.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            10. Your rights
          </h2>
          <p className="mt-2">
            Depending on your location, you may have rights to access, correct,
            delete, or export your personal data, or to object to certain
            processing. Contact your organization or the operator of your
            MindBridge deployment to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            11. Children
          </h2>
          <p className="mt-2">
            MindBridge is intended for higher-education contexts. If you are a
            parent or guardian and believe a child has provided information
            improperly, contact us through your school or deployment operator.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            12. International transfers
          </h2>
          <p className="mt-2">
            Your data may be processed in countries where your providers
            operate. Use appropriate safeguards as required by applicable law
            (your deployment administrator is responsible for vendor agreements).
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            13. Changes
          </h2>
          <p className="mt-2">
            We may update this policy. We will post the new date at the top and,
            where appropriate, provide additional notice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-brand-600">
            14. Contact
          </h2>
          <p className="mt-2">
            For privacy questions, contact the administrator of your MindBridge
            deployment (for example your school wellbeing team or IT). If you
            operate this deployment yourself, you are responsible for providing
            a contact point to users.
          </p>
        </section>

        <section className="rounded-xl border border-brand-600/15 bg-brand-200/35 px-4 py-3 text-sm text-brand-600/85">
          <p>
            <strong className="text-brand-600">Disclaimer:</strong> This text is
            for informational purposes and is not legal advice. Requirements
            vary by country, state, and institutional rules (including FERPA and
            HIPAA where applicable). Consult qualified counsel for your
            situation.
          </p>
        </section>

        <p className="text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-accent underline underline-offset-2"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
