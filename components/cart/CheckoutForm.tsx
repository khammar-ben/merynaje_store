"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { ChevronDown, HandCoins } from "lucide-react";
import { settings } from "@/data/settings";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";
import { normalizeMoroccanPhone } from "@/lib/phone";
import { readStorage, writeStorage } from "@/lib/storage";
import { buildOrderMessage, LAST_ORDER_KEY, waLink } from "@/lib/whatsapp";
import type { TranslationKey } from "@/data/translations";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const CUSTOMER_KEY = "mn-customer";
const OTHER = "__other__";

type Fields = { name: string; phone: string; city: string; cityOther: string; address: string; note: string };
type FieldName = keyof Fields;
type Errors = Partial<Record<FieldName, TranslationKey>>;

const EMPTY: Fields = { name: "", phone: "", city: "", cityOther: "", address: "", note: "" };

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 3) errors.name = "checkout.error.name";
  if (!normalizeMoroccanPhone(f.phone)) errors.phone = "checkout.error.phone";
  if (!f.city) errors.city = "checkout.error.city";
  if (f.city === OTHER && f.cityOther.trim().length < 2) errors.cityOther = "checkout.error.cityOther";
  if (f.address.trim().length < 5) errors.address = "checkout.error.address";
  return errors;
}

/** Rendered only on the client (after the cart is loaded), so saved details can be read on mount. */
export function CheckoutForm() {
  const { t, l } = useI18n();
  const cart = useCart();
  const router = useRouter();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<Fields>(() => ({ ...EMPTY, ...readStorage<Partial<Fields>>(CUSTOMER_KEY, {}), note: "" }));
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);

  const set = (name: FieldName) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [name]: e.target.value };
    setFields(next);
    if (tried) setErrors(validate(next));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const city = fields.city === OTHER ? fields.cityOther.trim() : fields.city;
    const customer = {
      name: fields.name.trim(),
      phone: normalizeMoroccanPhone(fields.phone)!,
      city,
      address: fields.address.trim(),
      note: fields.note.trim() || undefined,
    };
    const url = waLink(buildOrderMessage(cart.items, customer));

    // Remember the details for next time, and the order link in case WhatsApp didn't open.
    const { name, phone, city: savedCity, cityOther, address } = fields;
    writeStorage(CUSTOMER_KEY, { name, phone, city: savedCity, cityOther, address });
    writeStorage(LAST_ORDER_KEY, url, "session");

    const win = window.open(url, "_blank");
    cart.clear();
    if (win) {
      win.opener = null;
      router.push("/merci/");
    } else {
      window.location.href = url; // Pop-up blocked: open WhatsApp in this tab.
    }
  };

  const errorId = (name: FieldName) => `${uid}-${name}-error`;
  const fieldProps = (name: FieldName) => ({
    id: `${uid}-${name}`,
    name,
    value: fields[name],
    onChange: set(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? errorId(name) : undefined,
    className: "field",
  });
  const label = (name: FieldName, text: string, required = true) => (
    <label htmlFor={`${uid}-${name}`} className="mb-1.5 block text-sm font-medium">
      {text}
      {required && (
        <span aria-hidden="true" className="ms-0.5 text-gold-deep">
          *
        </span>
      )}
    </label>
  );
  const error = (name: FieldName) =>
    errors[name] && (
      <p id={errorId(name)} className="mt-1.5 text-sm text-danger">
        {t(errors[name]!)}
      </p>
    );
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        {label("name", t("checkout.name"))}
        <input {...fieldProps("name")} type="text" autoComplete="name" required />
        {error("name")}
      </div>

      <div>
        {label("phone", t("checkout.phone"))}
        <input
          {...fieldProps("phone")}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          placeholder="06 12 34 56 78"
          required
          aria-describedby={errors.phone ? errorId("phone") : `${uid}-phone-hint`}
          className={cn("field", "rtl:text-end")}
        />
        {errors.phone ? (
          error("phone")
        ) : (
          <p id={`${uid}-phone-hint`} className="mt-1.5 text-xs text-muted">
            {t("checkout.phoneHint")}
          </p>
        )}
      </div>

      <div>
        {label("city", t("checkout.city"))}
        <div className="relative">
          <select {...fieldProps("city")} autoComplete="address-level2" required className="field appearance-none pe-10">
            <option value="" disabled>
              {t("checkout.cityPlaceholder")}
            </option>
            {settings.cities.map((c) => (
              <option key={c.fr} value={c.fr}>
                {l(c)}
              </option>
            ))}
            <option value={OTHER}>{t("checkout.cityOther")}</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>
        {error("city")}
      </div>

      {fields.city === OTHER && (
        <div className="animate-fade-up">
          {label("cityOther", t("checkout.cityOtherLabel"))}
          <input {...fieldProps("cityOther")} type="text" autoComplete="address-level2" required />
          {error("cityOther")}
        </div>
      )}

      <div>
        {label("address", t("checkout.address"))}
        <input
          {...fieldProps("address")}
          type="text"
          autoComplete="street-address"
          placeholder={t("checkout.addressPlaceholder")}
          required
        />
        {error("address")}
      </div>

      <div>
        {label("note", t("checkout.note"), false)}
        <textarea {...fieldProps("note")} rows={2} placeholder={t("checkout.notePlaceholder")} className="field resize-none" />
      </div>

      <p className="flex items-center gap-2 rounded-xl bg-olive/10 px-4 py-3 text-sm text-ink">
        <HandCoins className="h-4 w-4 shrink-0 text-olive" strokeWidth={1.7} aria-hidden="true" />
        {t("checkout.cod")} · {l(settings.deliveryDelayLabel)}
      </p>

      {hasErrors && (
        <p role="alert" className="text-sm font-medium text-danger">
          {t("checkout.error.summary")}
        </p>
      )}

      <button type="submit" className="btn btn-whatsapp w-full text-base">
        <WhatsAppIcon className="h-5 w-5" /> {t("checkout.submit")}
      </button>
      <p className="text-center text-xs text-muted">{t("checkout.submitHint")}</p>
    </form>
  );
}
