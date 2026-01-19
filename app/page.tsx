import ExploreBtn from "@/components/ExploreBtn";

const Page = async () => {
  return (
    <section className="w-full">
      <h1 className="block text-center bg-amber-100 px-6 py-4 w-full">
        The Hub for Every Dev <br /> Event You Can&lsquo;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />
    </section>
  );
};

export default Page;
