import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex flex-col items-center gap-y-3 text-slate-300 sm:flex-row sm:justify-between">
      <p className=" text-center text-sm text-white">
        {new Date().getFullYear()} &copy; Copyright ORDINALS_TRACK.
        <br className="sm:hidden" /> All Rights Reserved
      </p>
      <div className="flex items-center gap-x-4  text-sm">
        <Link to="/">Terms of service</Link>
        <Link to="/">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default Footer;
