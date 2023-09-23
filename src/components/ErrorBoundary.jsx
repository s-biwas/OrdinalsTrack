import { Link, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <section className="mt-20 grid h-screen place-items-start justify-center text-center">
      <div>
        <h1>Something is not fine !!!</h1>
        <small>{error?.message}</small>
        <Link to="/" className="cursor-pointer text-blue-500 hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorBoundary;
