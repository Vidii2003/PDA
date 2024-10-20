import React from 'react';
import Row from '../components/Row';
import { ia1, ia2 ,ia3,ia4,ro1,ro2,ro3,ro4,ro5,wd1,wd2,wd3,wd4} from '../assets';
import "./Gallery.css"

const GalleryPage = () => {
  const rows = [
    {
      title: 'Intern Awareness Session',
      description:"The Personality Development Association is delighted to announce the successful completion of our Internship Awareness Program, which saw enthusiastic participation from over 100 students. The event featured insightful presentations from more than 10 speakers, all of whom are final-year students, generously sharing their invaluable experiences with on-campus internships and Pre-Placement Offers (PPOs). This initiative marks a significant stride in our ongoing efforts to elevate MIT's placement statistics.",
      cards: [
        { image: ia1 },
        { image: ia2},
        { image: ia3},
        { image: ia4},
        
      ],
    },
    {
      title: 'Recruits Orientation Session',
      description:"PDA is delighted to have successfully orchestrated a gathering on 05/09/2023, bringing together new recruits for a memorable session. 🎉 Boasting the enthusiastic participation of 60+ volunteers, the event was designed to foster team coordination through engaging games and quizzes. PDA firmly believes in the mantra, 'Leaders build more leaders, not followers,' and is actively committed to nurturing the leaders of the future.",
      cards: [
        { image: ro1},
        { image: ro2},
        { image: ro3},
        { image: ro4},
        { image: ro5},
        // Add more cards as needed
      ],
    },
    {
      title: 'Web Development Session',
      description:"Embark on a journey through the ABC's of web development with PDA, where beginners will be guided through live demonstrations to acquire essential HTML, CSS, and JavaScript coding skills. This engaging session not only caters to those without prior experience but also introduces the fascinating world of no-code website builder tools. Join us with your curiosity and enthusiasm, and together, let's transform your web dreams into reality. Don't miss our event gallery, showcasing captivating pictures that capture the essence of the session!",
      cards: [
        { image: wd1},
        { image: wd2},
        { image: wd3},
        { image: wd4}
        // Add more cards as needed
      ],
    },
  ];

  return (
    <div>
      <section className="relative w-full h-[500px] mx-auto" style={{
    backgroundImage: 'url("https://e0.pxfuel.com/wallpapers/557/907/desktop-wallpaper-ocean-laptop-background-ocean-high-quality.jpg")',
    backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover', // Adjust the sizing as needed
  backgroundPosition: 'center',
  paddingTop:'100px' // Adjust the positioning as needed
    }} >

  <div className='h-[300px] w-[700px] ml-[370px]' style={{background: "linear-gradient(to right, #ff416c, #ff4b2b)",opacity:"50%"}}>
    <h1 className='text-[60px] text-center py-[100px] font-bold text-black h1'>PDA GALLERY</h1></div></section>
    <div className="block mx-auto p-8 bg-white w-full">
      {rows.map((row, index) => (
        <Row key={index} {...row} />
      ))}
    </div>
    </div>
  );
};

export default GalleryPage;
