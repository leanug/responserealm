import Link from "next/link"
import { ClockIcon } from '@heroicons/react/24/outline'
import Image from "next/image"
import {auth} from '@/auth'

export default async function Home() {
  const session = await auth()
  
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-28 relative">
        <div className="absolute top-0 right-0 w-full -z-10">
          <Image
            src="/bg1-2-min.png"
            alt="Logo"
            width={256}
            height={73}
            placeholder="empty" // use 'empty' for a blank placeholder
            loading="eager" 
            priority={true}
            className="w-full"
          />
        </div>
        <div className="mx-auto container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center h-full space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex-1 text-left">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Build the Product Your Users Need
                </h1>
                <p className="max-w-[700px] md:text-xl dark:text-gray-400">
                  Collect and prioritize feedback from your users. 
                  Deliver features that make a difference and enhance 
                  user satisfaction.
                </p>
              </div>
              <div className="mt-6">
                {session ? (
                  <Link 
                    className="btn btn-neutral btn-wide" 
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link 
                    className="btn btn-neutral btn-wide" 
                    href="/auth/login"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0 w-full">
              <div className="w-full rounded-lg shadow-lg bg-white flex items-center justify-center">
                {/* Replace with your actual component */}
                <ul className="flex flex-col w-full">
                  <li>
                    <div className="p-2.5 md:p-6 border-b">
                      <div className="flex flex-row gap-10 justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        Enhanced Search Functionality
                      </h2>
                      <div className="flex flex-row gap-1.5 items-center uppercase text-sm">
                        <span className="flex flex-row items-center gap-0.5 text-green-400">
                          <span className="loading loading-dots loading-sm"></span>
                          <span>Underway</span>
                        </span>
                      </div>
                      </div>
                      <p className="mt-2 text-sm">
                        Adding more advanced search options like filters and sorting by date or relevance would significantly improve usability. This would make finding specific feedback or suggestions much easier.
                      </p>
                      <div className="flex flex-row gap-6 justify-between items-center mt-3">
                        <div className="flex flex-row gap-2 w-1/2 justify-start items-center">
                        <div className="flex flex-row gap-1.5 items-center text-sm justify-start">
                          <span className="bg-base-200 p-2 rounded-lg flex flex-row items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            13 days ago
                          </span> 
                        </div>
                        </div>
                        <div className="flex flex-row justify-end w-1/2 items-center gap-2">
                          <button className="btn">13 likes</button>
                          <button className="btn">like</button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="p-2.5 md:p-6 border-b">
                      <div className="flex flex-row gap-10 justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        Responsive Design Enhancements
                      </h2>
                      <div className="flex flex-row gap-1.5 items-center uppercase text-sm">
                        <span className="flex flex-row items-center gap-0.5 text-green-400">
                          <span className="loading loading-dots loading-sm"></span>
                          <span>Underway</span>
                        </span>
                      </div>
                      </div>
                      <p className="mt-2 text-sm">
                        It would be great to have additional responsive design options to ensure the app looks and works perfectly across all devices. Fine-tuning breakpoints and layout adjustments would enhance user experience.                      </p>
                      <div className="flex flex-row gap-6 justify-between items-center mt-3">
                        <div className="flex flex-row gap-2 w-1/2 justify-start items-center">
                        <div className="flex flex-row gap-1.5 items-center text-sm justify-start">
                          <span className="bg-base-200 p-2 rounded-lg flex flex-row items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            2 weeks ago
                          </span> 
                        </div>
                        </div>
                        <div className="flex flex-row justify-end w-1/2 items-center gap-2">
                          <button className="btn">like</button>
                          <button className="btn">like</button>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="p-2.5 md:p-6">
                      <div className="flex flex-row gap-10 justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        Custom Colors and Fonts
                      </h2>
                      </div>
                      <p className="mt-2 text-sm">
                        I’d love the option to use my own colors and fonts for a more personalized look and feel. Being able to customize the design elements would help align the app with my branding and preferences.
                      </p>
                      <div className="flex flex-row gap-6 justify-between items-center mt-3">
                        <div className="flex flex-row gap-2 w-1/2 justify-start items-center">
                        <div className="flex flex-row gap-1.5 items-center text-sm justify-start">
                          <span className="bg-base-200 p-2 rounded-lg flex flex-row items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            2 weeks ago
                          </span> 
                        </div>
                        </div>
                        <div className="flex flex-row justify-end w-1/2 items-center gap-2">
                          <button className="btn">like</button>
                          <button className="btn">like</button>
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

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
              <h3 className="text-xl font-bold">Collect Feedback</h3>
              <p className="text-gray-500 dark:text-gray-400">Gather insights from your customers through various channels.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
              <h3 className="text-xl font-bold">Analyze Data</h3>
              <p className="text-gray-500 dark:text-gray-400">Our AI-powered system analyzes feedback for actionable insights.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
              <h3 className="text-xl font-bold">Improve & Grow</h3>
              <p className="text-gray-500 dark:text-gray-400">Act on insights to enhance your products and services.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
        <Image
          src="/bg1-min.png"
          alt="Logo"
          width={256}
          height={73}
          placeholder="empty" // use 'empty' for a blank placeholder
          loading="eager"
          priority={true}
          className="absolute top-0 right-0 w-full -z-10"
        />
        <div className="mx-auto container px-4 md:px-6 h-full">
          <div className="flex flex-col md:flex-row items-center h-full space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1 w-full">
              <div className="
                w-full rounded-lg shadow-lg bg-white flex flex-col items-center 
                justify-center text-xl font-semibold p-2.5 md:p-6
              ">
                <h1 className="font-bold text-2xl text-left w-full mb-4">
                  🗂️ Boards
                </h1>
                <p className="text-lg mb-4">
                  👉 Explore ideas on improving user experience and adding features 
                  that truly matter to users and clients.
                </p>
                <ul className="flex flex-wrap mx-auto gap-1.5 justify-center w-full">
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Feature Vault</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Bug Bash</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Growth Roadmap</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">UX Refinement Zone</h2>
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="
                      py-3 px-4 transition-all w-full text-left
                      bg-base-100 border rounded-lg hover:shadow-sm
                    ">
                      <h2 className="text-md font-semibold">Personal Site Feedback</h2>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-1 text-left">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Create and Manage Your Boards
                </h1>
                <p className="max-w-[700px] md:text-xl dark:text-gray-400">
                  ⚙️ Build a space to gather valuable feedback for each of your projects.
                </p>
                <p className="max-w-[700px] md:text-xl dark:text-gray-400">
                  Set Up Your Boards: Each board represents a project where you can collect suggestions directly from your users. Whether it’s a startup, indie project, or personal website, your board will help you stay in touch with the needs and ideas of your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
        <Image
          src="/bg1-min.png"
          alt="Logo"
          width={256}
          height={73}
          placeholder="empty" // use 'empty' for a blank placeholder
          loading="eager"
          priority={true}
          className="absolute top-0 right-0 w-full -z-10"
        />
        <div className="mx-auto container px-4 md:px-6 h-full">
          <div className="flex flex-col md:flex-row items-center justify-center h-full space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1 text-left">
              <div className="space-y-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Engage with Comments
                </h1>
                <p>
                  Users can easily submit suggestions on your boards, offering ideas to enhance your project or solve problems. These suggestions can be categorized, prioritized, and managed in one central place.
                </p>
                <p>
                  Every suggestion can receive comments, allowing users to discuss and refine ideas. This open communication leads to more polished features and improvements that resonate with your user base.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="p-2.5 md:p-6 bg-white rounded-lg mb-4">
                <div className="flex flex-row gap-10 justify-between items-center">
                  <h2 className="text-lg font-semibold">
                      Dark Mode Request
                  </h2>
                  <div className="flex flex-row gap-1.5 items-center uppercase text-sm">
                    <span className="flex flex-row items-center gap-0.5 text-green-400">
                      <span className="loading loading-dots loading-sm"></span>
                      <span>Underway</span>
                    </span>
                  </div>
                  </div>
                  <p className="mt-2 text-sm">
                    I'd like this app to have a dark mode toggle. It would be great to have a dark theme for more comfortable browsing during the night or in low-light environments. It would improve readability and make the interface easier on the eyes.                  </p>
                  <div className="flex flex-row gap-6 justify-between items-center mt-3">
                    <div className="flex flex-row gap-2 w-1/2 justify-start items-center">
                    <div className="flex flex-row gap-1.5 items-center text-sm justify-start">
                      <span className="bg-base-200 p-2 rounded-lg flex flex-row items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        4 days ago
                      </span> 
                    </div>
                    </div>
                    <div className="flex flex-row justify-end w-1/2 items-center gap-2">
                      <button className="btn">like</button>
                      <button className="btn">like</button>
                    </div>
                  </div>
                </div>
              <div className="
                w-full rounded-lg shadow-lg bg-white flex items-center 
                justify-center text-xl font-semibold p-2.5 md:p-6
              ">
                <ul className="flex flex-col gap-6">
                  <li className="w-full">
                    <div className="card">
                      <div className="flex items-start">
                        <Image
                          src="/Logo.png"
                          alt={"User Avatar"}
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
                                Marco Crasso
                              </p>
                              <p className="text-sm">
                                2 days ago
                              </p>
                            </div>
                            {/* Conditionally show the delete button */}
                          </div>
                          <p className="mt-2 text-sm">
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
                          src="/Logo.png"
                          alt={"User Avatar"}
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
                                Marco Crasso
                              </p>
                              <p className="text-sm">
                                2 days ago
                              </p>
                            </div>
                            {/* Conditionally show the delete button */}
                          </div>
                          <p className="mt-2 text-sm">
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

      <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
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
