import Link from "next/link"
import Image from "next/image"
import HomePostList from "@/containers/home/posts/post-list"
import FeedbackPost from "@/containers/home/posts/post-item"

export default async function Home() {  
  return (
    <>
      <section className="w-full py-12 md:py-24 relative">
        <Image
          src="/bg1-5-min.png"
          alt="Background gradient image"
          width={256}
          height={73}
          placeholder="empty" // use 'empty' for a blank placeholder
          loading="eager" 
          priority={true}
          className="
            absolute top-1/2 left-1/2 transform -translate-x-1/2 
            -translate-y-1/2 w-full -z-10"
        />
        <div className="mx-auto container px-2.5">
        <div className="
          flex flex-col md:flex-row items-center justify-center h-full 
          space-y-8 md:space-y-0 md:space-x-8
        ">
        <div className="flex-1 text-left">
              <div className="space-y-3">
                <h1 className="
                  text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl 
                  lg:text-6xl
                ">
                  Build the Product Your Users Need
                </h1>
                <p className="max-w-[700px] md:text-xl dark:text-gray-400">
                  Collect and prioritize feedback from your users. 
                  Deliver features that make a difference and enhance 
                  user satisfaction.
                </p>
              </div>
              <div className="mt-6">
                <Link 
                  className="btn btn-neutral btn-wide btn-lg" 
                  href="/auth/login"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0 w-full">
              <div className="
                w-full rounded-lg shadow-lg bg-white flex 
                items-center justify-center
              ">
                {/* Replace with your actual component */}
                <HomePostList />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 relative">
        <Image
          src="/bg2-3-min.png"
          alt="Logo"
          width={256}
          height={73}
          placeholder="empty" // use 'empty' for a blank placeholder
          loading="eager"
          priority={true}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full -z-10"
        />
        <div className="mx-auto container px-2.5 h-full">
          <div className="flex flex-col md:flex-row items-center h-full space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1 w-full">
              <div className="
                w-full rounded-lg shadow-lg bg-white flex flex-col items-center 
                justify-center text-xl p-2.5 md:p-6
              ">
                <h1 className="font-bold text-2xl text-left w-full mb-4">
                  🗂️ Boards
                </h1>
                <p className="text-lg mb-5">
                  👉 Explore ideas on improving user experience and adding features 
                  that truly matter to users and clients.
                </p>
                <ul className="flex flex-wrap mx-auto gap-1.5 justify-center w-full">
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left hover:cursor-default
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Feature Vault</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left hover:cursor-default
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Bug Bash</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left hover:cursor-default
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Growth Roadmap</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left hover:cursor-default
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">UX Refinement Zone</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left hover:cursor-default
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Personal Site Feedback</h2>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-1 text-left">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Create and Manage Your Boards
                </h1>
                <p>
                  ⚙️ Build a space to gather valuable feedback for each of your projects.
                </p>
                <p>
                  Set Up Your Boards: Each board represents a project where you can collect suggestions directly from your users. Whether it’s a startup, indie project, or personal website, your board will help you stay in touch with the needs and ideas of your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 relative">
        <Image
          src="/bg3-1-min.png"
          alt="Section background"
          width={256}
          height={73}
          placeholder="empty" // use 'empty' for a blank placeholder
          loading="eager"
          priority={true}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full -z-10"
        />
        <div className="mx-auto container px-2.5 h-full">
          <div className="flex flex-col md:flex-row items-center justify-center h-full space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1 text-left">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Engage with Comments
                </h2>
                <p>
                  Users can easily submit suggestions on your boards, offering ideas to enhance your project or solve problems. These suggestions can be categorized, prioritized, and managed in one central place.
                </p>
                <p>
                  Every suggestion can receive comments, allowing users to discuss and refine ideas. This open communication leads to more polished features and improvements that resonate with your user base.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="shadow-md rounded-lg bg-white">
                <FeedbackPost
                  title="Dark Mode Request"
                  status="Underway"
                  description={`I'd like this app to have a dark mode toggle. It would be great to have a dark theme for more comfortable browsing during the night or in low-light environments. It would improve readability and make the interface easier on the eyes.`}
                  timestamp="6 days ago"
                  likes={23}
                  commentCount={14}
                  isLiked={true}
                />
              </div>
              <div className="
                w-full rounded-lg shadow-lg bg-white flex items-center 
                justify-center text-xl font-semibold p-2.5 md:p-6 mt-3
              ">
                <ul className="flex flex-col gap-6">
                  <li className="w-full">
                    <div className="card">
                      <div className="flex items-start">
                        <Image
                          src="/joey-real-min.png"
                          alt={"Joey Pardella User Avatar"}
                          width={40}
                          height={40}
                          placeholder="empty"
                          priority={false}
                          className="rounded-full mr-4 mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-sm">
                                Joey Pardella
                              </p>
                              <p className="text-sm">
                                2 days ago
                              </p>
                            </div>
                            {/* Conditionally show the delete button */}
                          </div>
                          <p className="mt-2 text-sm font-normal">
                            I completely agree! A dark mode would be fantastic. I often find myself using the app late at night, and a dark theme would definitely reduce eye strain. Plus, it looks really sleek!
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="card">
                      <div className="flex items-start">
                        <Image
                          src="/kate-real-min.png"
                          alt={"Kate Libby User Avatar"}
                          width={40}
                          height={40}
                          placeholder="empty"
                          priority={false}
                          className="rounded-full mr-4 mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold text-sm">
                                Kate Libby
                              </p>
                              <p className="text-sm">
                                2 days ago
                              </p>
                            </div>
                            {/* Conditionally show the delete button */}
                          </div>
                          <p className="mt-2 text-sm font-normal">
                            Great idea! Implementing a dark mode could also help with battery life on OLED screens. If it’s possible, I’d love to see some customization options for the dark theme as well. Thanks for considering this!
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
          <div className="container mx-auto px-2.5">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Ready to Get Started?
                </h3>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of businesses already improving their customer experience.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  
                </form>
                <Link className="btn btn-lg btn-wide btn-neutral" href="/auth/login">
                  ✅ Get started 
                </Link>
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
