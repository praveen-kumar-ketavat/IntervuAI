"use server";

import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

// export async function createFeedback(params: CreateFeedbackParams) {
//   const { interviewId, userId, transcript, feedbackId } = params;

//   function extractJSON(text: string) {
//     const match = text.match(/\{[\s\S]*\}/);
//     if (!match) throw new Error("No JSON object found");
//     return JSON.parse(match[0]);
//   }

//   try {
//     const formattedTranscript = transcript
//       .map(
//         (sentence: { role: string; content: string }) =>
//           `- ${sentence.role}: ${sentence.content}\n`,
//       )
//       .join("");

//     const result = await generateText({
//       model: google("gemini-2.0-flash-001"),
//       temperature: 0.4,
//       prompt: `
// You are a strict JSON generator.

// Return ONLY valid JSON.
// Do NOT include explanations, markdown, comments, or text outside JSON.
// Do NOT wrap in backticks.

// JSON schema:
// {
//   "totalScore": number (0-100),
//   "categoryScores": [
//     { "name": string, "score": number, "comment": string }
//   ],
//   "strengths": string[],
//   "areasForImprovement": string[],
//   "finalAssessment": string
// }

// Transcript:
// ${formattedTranscript}
// `,
//     });

//     let parsed;
//     try {
//       parsed = extractJSON(result.text);
//     } catch (err) {
//       console.error("Raw AI output:", result.text);
//       throw new Error("AI returned invalid JSON");
//     }

//     const {
//       totalScore,
//       categoryScores,
//       strengths,
//       areasForImprovement,
//       finalAssessment,
//     } = parsed;

//     const feedback = await db.collection("feedback").add({
//       interviewId,
//       userId,
//       totalScore,
//       categoryScores,
//       strengths,
//       areasForImprovement,
//       finalAssessment,
//       createdAt: new Date().toISOString(),
//     });

//     return { success: true, feedbackId: feedback.id };
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     throw error;
//   }
// }

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  function extractJSON(text: string) {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No JSON object found");
    return JSON.parse(match[0]);
  }

  try {
    //Format transcript cleanly
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `${sentence.role.toUpperCase()}: ${sentence.content}`,
      )
      .join("\n");

    const result = await generateText({
      model: google("gemini-2.0-flash-001"),
      temperature: 0.3,
      prompt: `
You are a professional interview evaluator.

STRICT RULES:
- Return ONLY valid JSON
- Scores MUST be integers
- Use 0–100 scale ONLY
- Do NOT use decimals
- Total score MUST be calculated from category scores

Scoring logic:
- Communication: clarity, articulation, confidence
- Technical Knowledge: correctness, depth
- Problem Solving: reasoning, structure
- Professionalism: attitude, behavior
give zeroes if you see no conversation.

Calculate:
totalScore = average of all category scores (rounded)

JSON schema:
{
  "totalScore": number,
  "categoryScores": [
    { "name": string, "score": number, "comment": string }
  ],
  "strengths": string[],
  "areasForImprovement": string[],
  "finalAssessment": string
}

Transcript:
${formattedTranscript}
      `,
    });

    let parsed;
    try {
      parsed = extractJSON(result.text);
    } catch {
      console.error("Raw AI output:", result.text);
      throw new Error("AI returned invalid JSON");
    }

    let {
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
    } = parsed;

    //Normalize bad scores
    if (totalScore <= 10) totalScore = Math.round(totalScore * 10);

    categoryScores = categoryScores.map((c: any) => ({
      ...c,
      score: c.score <= 10 ? Math.round(c.score * 10) : Math.round(c.score),
    }));

    //DELETE existing feedback for retake
    const existing = await db
      .collection("feedback")
      .where("userId", "==", userId)
      .where("interviewId", "==", interviewId)
      .get();

    const batch = db.batch();
    existing.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    //Save new feedback
    const feedbackRef = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    throw error;
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams,
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const feedback = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (feedback.empty) return null;

  const feedbackDoc = feedback.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams,
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string,
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}
