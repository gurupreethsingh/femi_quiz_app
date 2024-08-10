import React from "react";
import { FaArrowRight } from "react-icons/fa";

const features = [
  {
    name: "McDonald Trivan International School",
    description:
      "A leading institution focused on academic excellence and holistic development for global citizens.",
    link: "/mcdonald-trican",
    icon: <FaArrowRight className="text-indigo-600" />,
  },
  {
    name: "Greenwood High School",
    description:
      "A progressive school offering a blend of modern teaching methods and strong community values.",
    link: "/greenwood-high",
    icon: <FaArrowRight className="text-indigo-600" />,
  },
  {
    name: "Harmony Academy",
    description:
      "Where innovation meets tradition, providing a balanced education that prepares students for the future.",
    link: "/harmony-academy",
    icon: <FaArrowRight className="text-indigo-600" />,
  },
  {
    name: "Sunrise International School",
    description:
      "Fostering a love for learning with a curriculum that emphasizes creativity, collaboration, and critical thinking.",
    link: "/sunrise-international",
    icon: <FaArrowRight className="text-indigo-600" />,
  },
  {
    name: "Crescent Public School",
    description:
      "A community-driven school that prioritizes character development and academic achievement.",
    link: "/crescent-public",
    icon: <FaArrowRight className="text-indigo-600" />,
  },
  {
    name: "Blue Ridge Academy",
    description:
      "Providing a nurturing environment where students are encouraged to explore and excel in their interests.",
    link: "/blue-ridge-academy",
    icon: <FaArrowRight className="text-indigo-600" />,
  },
];

export default function Homepage() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-12 sm:px-6 sm:py-24 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mcdonald Trivan International School
          </h2>
          <p className="mt-4 text-gray-500">
            McDonald Trican International School is a beacon of educational
            excellence, where academic rigor meets holistic development in a
            nurturing and dynamic environment. Committed to fostering
            intellectual curiosity and global citizenship, the school offers a
            diverse and inclusive curriculum that balances traditional values
            with innovative teaching methods. Students are encouraged to explore
            their passions and talents through a broad range of extracurricular
            activities, all while developing critical thinking skills and a deep
            understanding of the world around them. With a focus on character
            building and community engagement, McDonald Trican International
            School prepares students not just for academic success, but for life
            as responsible, compassionate, and empowered individuals.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-300 pt-4">
                <dt className="font-medium text-gray-800 flex justify-between items-center">
                  <span className="bg-indigo-500 text-white rounded transition-colors duration-200 ease-in-out hover:text-gray-800 btn btn-sm">
                    {feature.name}
                  </span>
                  {feature.icon}
                </dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-1 lg:gap-1 mt-0">
          <img
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Side of walnut card tray with card groove and recessed card area."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
