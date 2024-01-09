import dayjs from "dayjs";
const cvinfo = {
  cvid: 1,
  worker_id:"",
  title: "New Cv",
  intro: "sdasdasd",
  skills: [
    { id: 0, name: "html", skillExperienc: 2 },
    { id: 1, name: "html", skillExperienc: 2 },
    { id: 2, name: "aaaaaaaaaaaaaaaaaa", skillExperienc: 2 },
    { id: 3, name: "html", skillExperienc: 2 },
  ],
  certificates: [
    {
      id: 0,
      name: "IELTS",
      organize: "British Council",
      startDate: dayjs("2022-04-17"),
      endDate: null,
      detail: "dasdasdasd",
      link: "dadadadadadasd",
    },
    {
      id: 1,
      name: "IELTS",
      organize: "British Council",
      startDate: dayjs("2022-04-17"),
      endDate: null,
      detail: "dasdasdasd",
      link: "dadadadadadasd",
    }
  ],
  experience: "dasdad",
  createTime: dayjs("2022-04-17"),
};

// export const certificateList = [
//   { name: "IELTS" },
//   { name: "TOEIC" },
//   { name: "python" },
//   { name: "javaScript" },
// ];
export const steps = ["Cv Infor", "Yout Experience", "Yout Certificate"];
export default cvinfo;
