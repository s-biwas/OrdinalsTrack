import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";
// import ShowOrdinals from "../components/ShowOrdinals";
import { DevTool } from "@hookform/devtools";
import { ErrorMessage } from "@hookform/error-message";
import validate from "bitcoin-address-validation";
// import { useDispatch } from "react-redux";
// import { updateInputAddress } from "../services/exploreSlice";
import Ordinals from "../components/Dashboard/Ordinals";
import { useState } from "react";
import UserProfile from "../components/Dashboard/UserProfile";
import Exploreslide from "./Exploreslide";
import TaxOrdinals from "../components/TaxOrdinals";

function Explore() {
  // const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [address, setAddress] = useState(null);

  function onSubmit(data) {
    // dispatch(updateInputAddress(data.address));
    setAddress(data.address);
    setSubmitted(true);
    removeEventListener;
    reset();
  }

  return (
    <>
      <section className="mx-auto flex max-w-screen-xl flex-col gap-y-10">
        <form
          className="flex flex-col items-center gap-y-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1
            htmlFor=""
            className="text-center font-paytone text-2xl underline"
          >
            Explore Ordinals Collections
          </h1>
          <section className="flex w-full max-w-screen-md items-center gap-x-4">
            <div className="relative h-10 w-full rounded-full bg-slate-100">
              <input
                type="text"
                {...register("address", {
                  required: "Please Fill up the field.",
                  validate: {
                    notBtc: (fieldValue) => {
                      return validate(fieldValue) || "Not a valid BTC address";
                    },
                  },
                })}
                placeholder="Search for Ordinal Collections or inscriptions"
                className="inline-block h-full w-full rounded-full bg-transparent px-4 text-stone-800 outline-none focus:ring-2 focus:ring-green-400"
              />
              <ErrorMessage
                errors={errors}
                name="address"
                render={({ message }) => (
                  <small className="text-sm text-red-400"> {message}</small>
                )}
              />

              <button
                onClick={() => reset()}
                className="absolute right-2 top-[50%] translate-y-[-50%] text-xl text-slate-700"
              >
                <GiCancel />
              </button>
            </div>

            <button className="rounded-full bg-green-600 px-6 py-2 font-semibold text-white shadow-xl ring-2 ring-white hover:rounded-xl hover:bg-green-500">
              Search
            </button>
          </section>
          <DevTool control={control} />
        </form>
        <UserProfile address={address} accountStatus="BTC Account of:" />
        {submitted && <Ordinals key={address} address={address} />}
        <TaxOrdinals />
      </section>
    </>
  );
}

export default Explore;
