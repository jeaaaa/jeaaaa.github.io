import { useEffect, useState } from "react";

const Toc = ({ data }) => {
  const [maxDepth, setMaxDepth] = useState(6);
  const [slugPositionMap, setSlugPositionMap] = useState({});

  useEffect(() => {
    findMaxDepth();
    getPositionForEachSlug();

    const interval = setInterval(() => {
      getPositionForEachSlug();
    }, 1000 / 24);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const findMaxDepth = () => {
    if (data.length === 0) {
      return false;
    }

    let maxDepthValue = 6;
    data.forEach((el) => {
      if (el.depth < maxDepthValue) {
        maxDepthValue = el.depth;
      }
    });

    setMaxDepth(maxDepthValue);
  };

  const goBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToSlug = (slug) => {
    const dom = document.getElementById(slug);
    if (dom) {
      window.scroll({
        top: dom.offsetTop + 10,
        behavior: "smooth",
      });
    }
  };

  const getPositionForEachSlug = () => {
    const windowScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    const updatedSlugPositionMap = {};
    data.forEach((el, index) => {
      const slug = el.slug;
      try {
        const dom = document.getElementById(slug);
        const top = dom.offsetTop;
        let nextHeadingTop;
        if (data[index + 1]) {
          nextHeadingTop = document.getElementById(
            data[index + 1].slug
          ).offsetTop;
        } else {
          nextHeadingTop =
            document.querySelector(".page-content").offsetHeight + 156;
        }

        const range = [top - windowScrollTop, nextHeadingTop - windowScrollTop];
        const isInView = range[0] < windowHeight && range[1] > 0;
        updatedSlugPositionMap[slug] = {
          isInView,
        };
      } catch (e) {}
    });

    setSlugPositionMap(updatedSlugPositionMap);
  };

  return (
    <div className="lg:block hidden mt-8 relative left-[-.5rem]">
      <button
        aria-label="返回顶部"
        className="px-2 py-1 rounded-xl hover:bg-black/15 dark:hover:bg-white/15 transition-all w-8 h-8 flex justify-center items-center mb-1 cursor-pointer opacity-70 hover:opacity-100"
        onClick={goBackToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-navigation-top"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M16.54 19.977a.34 .34 0 0 0 .357 -.07a.33 .33 0 0 0 .084 -.35l-4.981 -10.557l-4.982 10.557a.33 .33 0 0 0 .084 .35a.34 .34 0 0 0 .357 .07l4.541 -1.477l4.54 1.477z" />
          <path d="M12 3v2" />
        </svg>
      </button>
      {data.map((heading, index) => (
        <button
          key={heading.slug}
          onClick={() => scrollToSlug(heading.slug)}
          title={heading.text}
          className={`text-xs max-w-full cursor-pointer hover:bg-black/15 dark:hover:bg-white/15 px-2 transition-all duration-500 block w-full text-left ${
            !data[index - 1] ||
            (data[index - 1] &&
              !slugPositionMap[data[index - 1].slug]?.isInView)
              ? "rounded-t-xl hover:rounded-b-0 pt-[.3rem]"
              : ""
          } ${
            !data[index + 1] ||
            (data[index + 1] &&
              !slugPositionMap[data[index + 1].slug]?.isInView)
              ? "rounded-b-xl hover:rounded-t-0 pb-[.25rem]"
              : ""
          } ${
            slugPositionMap[heading.slug]?.isInView
              ? "text-black dark:text-white opacity-1 bg-black/10 dark:bg-white/10"
              : "opacity-70 hover:rounded-xl pt-[.15rem] pb-[.11rem]"
          }`}
          style={{
            paddingLeft: (heading.depth - maxDepth + 1) * 0.5 + "rem",
          }}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap py-[.2rem] block">
            - {heading.text}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Toc;
