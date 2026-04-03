type WorkBtn = {
  btnName?: string;
  url?: string;
};

type WorkInput = {
  title?: string;
  year?: string;
  tags?: string[];
  description?: string;
  projectImageUrl?: string;
  videoLoc?: string;
  detailedDesc?: string;
  techStackImageUrl?: string;
  techStackExps?: string[];
  contributionImageUrl?: string;
  contributionExps?: string[];
  btns?: WorkBtn[];
  screenImageUrl?: string[];
  modalMsg?: string;
  modalCtaUrl?: string;
};

export const validateWorkInput = (body: WorkInput): string | null => {
  if (!body.title?.trim()) return "Title is required";
  if (!body.year?.trim()) return "Year is required";
  if (!body.description?.trim()) return "Description is required";
  if (!body.projectImageUrl?.trim()) return "Project image URL is required";
  if (!body.videoLoc?.trim()) return "Video location is required";
  if (!body.detailedDesc?.trim()) return "Detailed description is required";
  if (!body.techStackImageUrl?.trim()) return "Tech stack image URL is required";
  if (!body.contributionImageUrl?.trim()) return "Contribution image URL is required";
  if (!body.modalMsg?.trim()) return "Modal message is required";
  if (!body.modalCtaUrl?.trim()) return "Modal CTA URL is required";

  if (!Array.isArray(body.tags) || body.tags.length === 0) {
    return "At least one tag is required";
  }

  if (!Array.isArray(body.techStackExps) || body.techStackExps.length === 0) {
    return "At least one tech stack explanation is required";
  }

  if (
    !Array.isArray(body.contributionExps) ||
    body.contributionExps.length === 0
  ) {
    return "At least one contribution explanation is required";
  }

  if (
    !Array.isArray(body.screenImageUrl) ||
    body.screenImageUrl.length === 0
  ) {
    return "At least one screen image URL is required";
  }

  if (!Array.isArray(body.btns) || body.btns.length === 0) {
    return "At least one button is required";
  }

  for (const btn of body.btns) {
    if (!btn.btnName?.trim()) return "Each button must have btnName";
    if (!btn.url?.trim()) return "Each button must have url";
  }

  return null;
};