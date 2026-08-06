import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { site, phoneHref } from "@/lib/site";
import { brand, fonts, badges, emailAssetUrl } from "./theme";

export type InquiryAutoresponderProps = {
  firstName?: string;
  cityState?: string;
  weddingDate?: string;
  interestedIn?: string;
  /** Omitted when link signing is unavailable — the email still sends. */
  pricingUrl?: string;
  calendlyUrl: string;
};

const eyebrow = {
  fontFamily: fonts.sans,
  fontSize: "11px",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: brand.taupeDeep,
  margin: "0",
};

const body = {
  fontFamily: fonts.sans,
  fontSize: "15px",
  lineHeight: "1.7",
  color: brand.cocoa,
  margin: "0 0 16px",
};

const rule = { borderColor: brand.hairline, borderStyle: "solid", margin: "32px 0" };

export function InquiryAutoresponder({
  firstName,
  cityState,
  weddingDate,
  interestedIn,
  pricingUrl,
  calendlyUrl,
}: InquiryAutoresponderProps) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const details = [
    ["Wedding date", weddingDate],
    ["Location", cityState],
    ["Interested in", interestedIn],
  ].filter(([, value]) => Boolean(value)) as [string, string][];

  return (
    <Html lang="en">
      <Head>
        {/* Gmail and Outlook auto-invert light emails; this warm palette
            inverts into muddy brown-grey, so opt out of dark mode. */}
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </Head>
      <Body style={{ backgroundColor: brand.ivory, margin: 0, padding: "24px 0" }}>
        <Preview>Your collections, à la carte pricing, and a link to book a call.</Preview>

        <Container
          style={{
            backgroundColor: brand.porcelain,
            border: `1px solid ${brand.hairline}`,
            borderStyle: "solid",
            padding: "40px",
          }}
        >
          <Text
            style={{
              ...eyebrow,
              textAlign: "center",
              fontSize: "13px",
              letterSpacing: "0.35em",
              color: brand.espresso,
            }}
          >
            MAUREEN ELLA
          </Text>

          <Hr style={rule} />

          <Text style={{ ...eyebrow, color: brand.rose }}>01 — Your inquiry</Text>
          <Heading
            as="h1"
            style={{
              fontFamily: fonts.serif,
              fontSize: "32px",
              lineHeight: "1.15",
              color: brand.espresso,
              margin: "12px 0 20px",
              fontWeight: 500,
            }}
          >
            {greeting}
          </Heading>

          <Text style={body}>
            Thank you for reaching out about your wedding. I&apos;ve received your
            details and I&apos;m reviewing your date, service count, and timeline now.
          </Text>

          {details.length > 0 && (
            <Section
              style={{
                borderTop: `1px solid ${brand.hairline}`,
                borderBottom: `1px solid ${brand.hairline}`,
                borderLeft: "none",
                borderRight: "none",
                borderStyle: "solid",
                padding: "18px 0",
                margin: "0 0 24px",
              }}
            >
              {details.map(([label, value]) => (
                <Row key={label}>
                  <Column style={{ width: "45%", verticalAlign: "top" }}>
                    <Text style={{ ...eyebrow, margin: "4px 0" }}>{label}</Text>
                  </Column>
                  <Column>
                    <Text
                      style={{
                        ...body,
                        margin: "4px 0",
                        fontFamily: fonts.serif,
                        fontSize: "16px",
                        color: brand.espresso,
                      }}
                    >
                      {value}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          )}

          {pricingUrl && (
            <>
              <Button
                href={pricingUrl}
                style={{
                  backgroundColor: brand.espresso,
                  color: brand.porcelain,
                  fontFamily: fonts.sans,
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "16px 28px",
                  display: "block",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                View Your Pricing Guide
              </Button>
              <Text
                style={{
                  ...body,
                  fontSize: "13px",
                  color: brand.taupeDeep,
                  margin: "12px 0 24px",
                  textAlign: "center",
                }}
              >
                This link is just for you and stays active for 90 days.
              </Text>
            </>
          )}

          <Button
            href={calendlyUrl}
            style={{
              border: `1px solid ${brand.espresso}`,
              borderStyle: "solid",
              color: brand.espresso,
              fontFamily: fonts.sans,
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "15px 28px",
              display: "block",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            Book a 30-Minute Call
          </Button>

          <Hr style={rule} />

          <Text style={{ ...body, fontSize: "14px" }}>
            One quick note: your inquiry doesn&apos;t reserve your date yet. A signed
            agreement and retainer do that, and I&apos;ll send both over if we&apos;re
            a good fit.
          </Text>

          <Text style={{ ...body, fontSize: "14px" }}>
            In the meantime, have a look at the{" "}
            <Link href={`${site.baseUrl}/bridal/portfolio`} style={{ color: brand.rose }}>
              portfolio
            </Link>{" "}
            and the{" "}
            <Link href={`${site.baseUrl}/bridal/prep-guides`} style={{ color: brand.rose }}>
              bridal prep guides
            </Link>
            .
          </Text>

          <Text style={{ ...body, marginTop: "28px", marginBottom: "4px" }}>Warmly,</Text>
          <Text
            style={{
              fontFamily: fonts.serif,
              fontSize: "22px",
              color: brand.espresso,
              margin: "0 0 8px",
            }}
          >
            Maureen
          </Text>
          <Text style={{ ...body, fontSize: "13px", color: brand.taupeDeep }}>
            <Link href={`mailto:${site.contact.email.value}`} style={{ color: brand.taupeDeep }}>
              {site.contact.email.value}
            </Link>
            {" · "}
            <Link href={phoneHref} style={{ color: brand.taupeDeep }}>
              {site.contact.phone.value}
            </Link>
          </Text>

          <Hr style={rule} />

          <Text style={{ ...eyebrow, textAlign: "center", marginBottom: "16px" }}>
            Recognition
          </Text>
          <Row>
            {badges.map((badge) => (
              <Column key={badge.src} style={{ width: "20%", textAlign: "center" }}>
                <Img
                  src={emailAssetUrl(badge.src)}
                  alt={badge.alt}
                  width="96"
                  style={{ maxWidth: "96px", width: "100%", height: "auto", margin: "0 auto" }}
                />
              </Column>
            ))}
          </Row>

          <Text
            style={{
              ...body,
              fontSize: "11px",
              color: brand.taupeDeep,
              textAlign: "center",
              margin: "28px 0 0",
            }}
          >
            {site.brandLong} · {site.contact.address.value}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

InquiryAutoresponder.PreviewProps = {
  firstName: "Sarah",
  cityState: "St. Augustine, FL",
  weddingDate: "2027-04-17",
  interestedIn: "Bridal hair and makeup",
  pricingUrl: "https://maureenella.com/pricing/preview-token",
  calendlyUrl: "https://calendly.com/maureenella/30min",
} satisfies InquiryAutoresponderProps;

export default InquiryAutoresponder;
