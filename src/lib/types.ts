export type JobItem = {
  id: string;
  badgeLetters: string;
  title: string;
  company: string;
  date: string;
  relevanceScore: number;
  daysAgo: string;
};

export type JobItemExpanded = JobItem & {
  description: string;
  qualifications: string[];
  reviews: string[];
  duration: string;
  location: string;
  salary: string;
  coverImgURL: string;
  companyUrl: string;
};
