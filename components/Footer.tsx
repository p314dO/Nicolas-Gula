type Props = {
  noPadding?: boolean;
};

const Footer: React.FC<Props> = ({ noPadding = false }) => {
  return (
    <footer
      className={`${noPadding ? "pb-4" : "pb-24"} md:pb-4 text-center mt-auto`}
    >
      <div className="flex justify-center space-x-12 mb-4">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.link}
            title={social.title}
            className="transform scale-150 md:scale-125 link-outline"
          >
            {social.svg}
          </a>
        ))}
      </div>
      <div>
        Coded with <span className="sr-only">love</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mx-1 inline-block mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>{" "}
        by Sat Naing
      </div>
    </footer>
  );
};

const socialLinks = [
  {
    id: 1,
    title: "ngbonzini's Github Profile",
    link: "https://github.com/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className="dark:fill-bglight hover:fill-marrsgreen dark:hover:fill-carrigreen"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "ngbonzini's LinkedIn Profile",
    link: "https://www.linkedin.com/in/nicolasgula/",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="dark:fill-bglight hover:fill-marrsgreen dark:hover:fill-carrigreen"
      >
        <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"></path>
      </svg>
    ),
  },
  {
    id: 3,
    title: "Check ngbonzini on Twitter",
    link: "https://twitter.com/ngbonzini",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className="dark:fill-bglight hover:fill-marrsgreen dark:hover:fill-carrigreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 2H1l8.26 11.015L1.45 22H4.1l6.388-7.349L16 22h7l-8.608-11.478L21.8 2h-2.65l-5.986 6.886zm9 18L5 4h2l12 16z"/></svg>
      </svg>
    ),
  },
  {
    id: 4,
    title: "nGbonzini's Profile on Medium",
    link: "https://medium.com/@ngbonzini",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="dark:fill-bglight hover:fill-marrsgreen dark:hover:fill-carrigreen"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M8 6a6 6 0 1 1 0 12A6 6 0 0 1 8 6m9 1c1.5 0 2.5 2.239 2.5 5s-1 5-2.5 5s-2.5-2.239-2.5-5s1-5 2.5-5m4 .5c.38 0 .712.827.88 2.246l.047.443l.019.235l.03.494l.01.259l.012.541L22 12l-.002.282l-.012.541l-.01.26l-.03.493l-.02.235l-.045.443c-.169 1.42-.5 2.246-.881 2.246c-.38 0-.712-.827-.88-2.246l-.047-.443a16.683 16.683 0 0 1-.019-.235l-.03-.494a20.863 20.863 0 0 1-.01-.259l-.012-.541v-.564l.012-.541l.01-.26l.03-.493l.02-.235l.045-.443c.169-1.42.5-2.246.881-2.246"/></g></svg>
    ),
  },
];

export default Footer;
