/**
 * One-time script: npx ts-node scripts/createGoogleForm.ts
 * Requires OAuth user creds (env) and a refresh token with the scopes below.
 */
import { google, forms_v1 } from "googleapis";
import { OAuth2Client } from "google-auth-library";

function getOAuthClient(): OAuth2Client {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET!;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI!;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN!;

  const oauth2 = new OAuth2Client(clientId, clientSecret, redirectUri);
  oauth2.setCredentials({ refresh_token: refreshToken });
  return oauth2;
}

async function run(): Promise<void> {
  const auth = getOAuthClient();

  // Forms API client (typed)
  const forms = google.forms({ version: "v1", auth });

  // 1) Create form
  const createRes = await forms.forms.create({
    requestBody: { info: { title: "Personality Assessment (Mirror)" } },
  });
  const form = createRes.data;
  if (!form.formId) throw new Error("Form creation returned no formId.");

  // 2) Build batchUpdate requests (typed)
  const sectionA: string[] = [
    "When faced with conflicting priorities...",
    "During a project crisis with tight deadlines:",
    "When a team member consistently misses deadlines:",
    "How do you handle receiving critical feedback about your work?",
    "When leading a diverse team with different working styles:",
  ];

  const sectionB: string[] = [
    "Describe a time you had to adapt your communication style...",
    "What frustrates you most when working in teams...",
    "When you're under significant stress, what are your tell-tale signs...",
    "Describe a situation where you had to make an unpopular decision...",
    "What personal achievement are you most proud of, and why...",
  ];

  const sectionC: string[] = [
    `“Under pressure, I become more...”`,
    `“When others disagree, I typically...”`,
    `“My greatest strength is...”`,
    `“I struggle most with...”`,
    `“Success means...”`,
  ];

const requests: forms_v1.Schema$Request[] = [
  ...sectionA.map((title, index): forms_v1.Schema$Request => ({
    updateItem: {
      item: {
        title,
        questionItem: {
          question: {
            required: true,
            choiceQuestion: {
              type: "RADIO",
              options: ["A", "B", "C", "D"].map((v) => ({ value: v })),
              shuffle: false,
            },
          },
        },
      },
      location: { index },
      // ✅ updateMask goes here, inside updateItem
      updateMask: "item.title,item.questionItem.question",
    },
  })),

  ...sectionB.map((title, i): forms_v1.Schema$Request => ({
    updateItem: {
      item: {
        title,
        questionItem: {
          question: { required: true, textQuestion: { paragraph: true } },
        },
      },
      location: { index: 5 + i },
      updateMask: "item.title,item.questionItem.question",
    },
  })),

  ...sectionC.map((title, i): forms_v1.Schema$Request => ({
    updateItem: {
      item: {
        title,
        questionItem: { question: { required: true, textQuestion: {} } },
      },
      location: { index: 10 + i },
      updateMask: "item.title,item.questionItem.question",
    },
  })),
];

  await forms.forms.batchUpdate({
    formId: form.formId,
    requestBody: { requests },
  });

  // (Optional) Create a watch here if you want notifications (expires in 7 days).

  // eslint-disable-next-line no-console
  console.log("Created Form:", `https://docs.google.com/forms/d/${form.formId}/edit`);
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
