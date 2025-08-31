import { LandingImages } from "src/constants/Landing";
import Labels from "src/molecules/labels";
import Landing from "src/molecules/landing";
import Testimonials from "src/molecules/Testimonials";

const page = () => {
  return (
    <div>
      {LandingImages.map((item) => (
        <div className="hidden" key={item.id}>
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover block aspect-[1/2] md:aspect-[1520/646]"
          />
          <img
            src={item.src_mobile}
            alt={item.alt}
            className="w-full h-full object-cover block aspect-[1/2] md:aspect-[1520/646]"
          />
        </div>
      ))}
      <Landing />
      <Labels />
      {/* <Testimonials /> */}
    </div>
  );
};

export default page;
