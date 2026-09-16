import { AboutShell } from "@/components/about";
import { ApplicationPortalNotice } from "@/components/scholarships";
import { Button } from "@/components/ui/button";

const volunteerFields = [
  ["fullName", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"], ["location", "Location", "text"], ["areasOfInterest", "Areas of interest", "textarea"], ["skills", "Skills", "textarea"], ["experience", "Experience", "textarea"], ["availability", "Availability", "textarea"], ["motivation", "Motivation", "textarea"], ["additionalInformation", "Additional information", "textarea"],
] as const;
const mentorFields = [
  ["fullName", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"], ["profession", "Profession", "text"], ["skills", "Skills", "textarea"], ["experience", "Experience", "textarea"], ["areasOfMentorship", "Areas of mentorship", "textarea"], ["availability", "Availability", "textarea"], ["bio", "Bio", "textarea"], ["motivation", "Motivation", "textarea"],
] as const;

export function PeopleApplicationForm({ kind }: { kind: "volunteer" | "mentor" }) {
  const isVolunteer = kind === "volunteer";
  const fields = isVolunteer ? volunteerFields : mentorFields;
  return <AboutShell><section className="bg-[var(--paper)] py-16 lg:py-24"><div className="section-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="eyebrow">{isVolunteer ? "Volunteer" : "Mentorship"}</p><h1 className="display-text mt-5 text-5xl text-[var(--forest-950)] sm:text-6xl">{isVolunteer ? "Bring your time to the work." : "Share what you know."}</h1><p className="mt-6 text-base leading-8 text-[var(--muted)]">Tell us about yourself and how you would like to contribute to AAN Legacy Foundation.</p></div><div className="space-y-6"><ApplicationPortalNotice title="Secure submissions are not configured yet" /><form className="space-y-5"><fieldset disabled className="space-y-5 opacity-70">{fields.map(([name, label, type]) => <label key={name} htmlFor={name} className="block text-sm font-bold text-[var(--forest-950)]">{label}{type === "textarea" ? <textarea id={name} name={name} className="form-control mt-2" rows={4} /> : <input id={name} name={name} type={type} className="form-control mt-2" />}</label>)}<Button type="submit">Submit {isVolunteer ? "volunteer application" : "mentor registration"}</Button></fieldset></form><ApplicationPortalNotice title="Form disabled until authentication and database services are connected" /></div></div></section></AboutShell>;
}

export function PeopleConfirmation({ kind, reference }: { kind: "volunteer" | "mentor"; reference?: string }) {
  return <AboutShell><section className="section-shell flex min-h-[70vh] items-center py-20"><div className="max-w-2xl"><p className="eyebrow">Submission received</p><h1 className="display-text mt-5 text-5xl text-[var(--forest-950)] sm:text-6xl">Thank you for your interest.</h1><p className="mt-6 text-base leading-8 text-[var(--muted)]">Your {kind === "volunteer" ? "volunteer application" : "mentor registration"} will receive a private reference number after secure submission is enabled.</p>{reference ? <p className="mt-6 font-bold text-[var(--forest-950)]">Reference: {reference}</p> : <div className="mt-8"><ApplicationPortalNotice title="Confirmation is pending service configuration" /></div>}</div></section></AboutShell>;
}

export function PeopleAdminShell({ kind }: { kind: "volunteer" | "mentor" }) {
  const label = kind === "volunteer" ? "Volunteer applications" : "Mentor registrations";
  return <AboutShell><section className="section-shell py-16 lg:py-24"><p className="eyebrow">Admin workspace</p><h1 className="display-text mt-5 text-5xl text-[var(--forest-950)] sm:text-6xl">{label}.</h1><p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)]">Search, filter, review, add internal notes, and manage approval status from a protected workspace.</p><div className="mt-10"><ApplicationPortalNotice title="Admin authentication and runtime database are not configured" /></div><div className="mt-10 grid gap-4 md:grid-cols-[1fr_auto]" role="search"><input aria-label={`Search ${label.toLowerCase()}`} placeholder="Search by name or reference" className="form-control" disabled /><select aria-label="Filter by status" className="form-control md:w-56" disabled><option>All statuses</option><option>Submitted</option><option>Under review</option><option>Approved</option><option>Rejected</option></select></div><div className="mt-6 border border-dashed border-[var(--line-strong)] bg-[var(--paper)] p-10 text-center text-sm text-[var(--muted)]">Records will appear here after secure admin services are enabled.</div></section></AboutShell>;
}
