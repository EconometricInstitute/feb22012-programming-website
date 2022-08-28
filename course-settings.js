const courseSettings = {
  language: "en",
  name: "Programming",
  siteUrl: "https://econometricinstitute.github.io/feb22012-programming-website/",
  subtitle: "A course on Object Oriented Programming in Java",
  slug: "feb22012",
  tmcCourse: "feb22012",
  quizzesId: "bcd8173f-4f0f-47f4-9aa5-a8e40e79eaf3",
  tmcOrganization: "mooc",
  bannerPath: "banner.svg",
  sidebarEntries: [
    {
      title: "About the course",
      path: "/",
    },
    {
      title: "Sessions and Support",
      path: "/sessions-and-support",
    },
    // {
    //   title: "Grading and exams",
    //   path: "/grading-and-exams",
    // },
    {
      title: "Style guide",
      path: "/style-guide",
    },
    { separator: true, title: "Programming" },
  ],
  sidebarFuturePages: [
  ],
  splitCourses: false,
  useNewPointsVisualization: false
}

module.exports = {
  default: courseSettings,
}
