import image1 from "../../assets/images/slider-image1.jpg";
import image2 from "../../assets/images/slider-image2.jpg";
import image3 from "../../assets/images/slider-image3.jpg";
import image4 from "../../assets/images/slider-image4.jpg";
const date = new Date().toDateString();
const author = "wali ullah";
const category = "web design";

const sampleBlogList = [
  {
    id: "1",
    date: date,
    author: author,
    category: category,
    imageSrc: image1,
    title: "This is a demo title 1",
    description: `It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
  {
    id: "2",
    date: date,
    author: author,
    category: category,
    imageSrc: image2,
    title: "This is a demo title 2",
    description: `It is a long established fact that a It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
  {
    id: "3",
    date: date,
    author: author,
    category: category,
    imageSrc: image3,
    title: "This is a demo title 3",
    description: `It is a long established fact that a reader It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout.  will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
  {
    id: "4",
    date: date,
    author: author,
    category: category,
    imageSrc: image4,
    title: "This is a demo title 4",
    description: `It is a long established fact that a reader It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout. will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, `,
  },
];
export default sampleBlogList;
