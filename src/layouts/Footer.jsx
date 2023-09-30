import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-5 flex flex-col-reverse items-center gap-y-3 pt-5 text-slate-300 sm:flex-row sm:justify-between max-w-screen-xl mx-auto my-10">
      <p className=" text-center text-sm text-white">
        {new Date().getFullYear()} &copy; Copyright Ordinals_Track ||
        <br className="sm:hidden" /> All Rights Reserved
      </p>
      <div className="flex items-center gap-x-4  text-sm">
        <Link to="/terms">Terms of service</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}

export default Footer;
