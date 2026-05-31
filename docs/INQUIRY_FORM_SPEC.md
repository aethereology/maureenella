# Wedding Inquiry Form Spec

## Form goal

Capture enough information to qualify a wedding inquiry without requiring back-and-forth for basics.

## Form title

Request Availability

## Intro copy

Share a few details about your wedding day so we can check availability, service fit, artist needs, and next steps.

## Fields

### Contact

- Bride/client first name - required
- Bride/client last name - required
- Email - required
- Phone - required
- Instagram handle - optional

### Wedding details

- Wedding date - required
- Wedding venue - required if known
- Getting-ready location - optional but recommended
- City/state - required
- Ceremony time - optional
- Desired ready-by time - required if known
- Planner name/email - optional
- Photographer name/email - optional

### Services

- Interested in: hair, makeup, both, not sure - required
- Bride hair service needed - yes/no/not sure
- Bride makeup service needed - yes/no/not sure
- Estimated number of hair services - required
- Estimated number of makeup services - required
- Interested in bridal preview - yes/no/not sure
- Using clip-in extensions - yes/no/not sure
- Using veil or hair accessories - yes/no/not sure

### Vision

- Describe your bridal beauty vision - optional
- Upload inspiration or paste links - optional depending on implementation
- Any allergies/sensitivities - optional
- Any timeline/location notes - optional

### Attribution

- How did you find Maureen Ella? - required
  - Google
  - Instagram
  - Referral
  - Venue
  - Photographer/planner
  - Zola/Wedding directory
  - Other

### Consent

- Checkbox: I understand this inquiry does not reserve my date.
- Checkbox: I agree to be contacted about my inquiry.

## Validation

- Email format.
- Phone required.
- Wedding date required.
- Service counts must be numeric or selectable.
- Ready-by time can be optional but should be encouraged.

## Success message

Thank you for your inquiry. Your details have been received, and we will review your date, service count, location, and timeline needs before sending next steps.

## Internal routing

Submission should create:

- Email to Maureen/team.
- Optional CRM lead.
- Analytics event.
- Optional autoresponder to client.

## Analytics events

- inquiry_form_start
- inquiry_form_submit
- inquiry_form_error
- request_availability_click
