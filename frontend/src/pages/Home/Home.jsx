import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Category/Categories";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Footer from "../../components/Footer/Footer";

import { motion } from "framer-motion";


function Home() {

  const animation = {
    hidden:{
      opacity:0,
      y:80
    },
    show:{
      opacity:1,
      y:0,
      transition:{
        duration:0.8,
        ease:"easeOut"
      }
    }
  };


  return (
    <>

      <Navbar />

      <motion.div
        variants={animation}
        initial="hidden"
        whileInView="show"
        viewport={{once:true, amount:0.2}}
      >
        <Hero />
      </motion.div>


      <motion.div
        variants={animation}
        initial="hidden"
        whileInView="show"
        viewport={{once:true, amount:0.2}}
      >
        <Categories />
      </motion.div>


      <motion.div
        variants={animation}
        initial="hidden"
        whileInView="show"
        viewport={{once:true, amount:0.2}}
      >
        <HowItWorks />
      </motion.div>


      <motion.div
        variants={animation}
        initial="hidden"
        whileInView="show"
        viewport={{once:true, amount:0.2}}
      >
        <WhyChoose />
      </motion.div>


      <Footer />


    </>
  );
}

export default Home;