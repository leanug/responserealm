import Link from "next/link"

import {auth} from '@/auth'

export default async function Home() {
  const session = await auth()
  
  return (
    <>
      <section className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
        
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Build the Product Your Users Need
            </h1>
            <p className="py-6">
              Collect and prioritize feedback from your users. 
              Deliver features that make a difference and enhance 
              user satisfaction.
            </p>
            {session ? (
              <Link 
                className="btn btn-primary btn-wide" 
                href="/dashboard"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                className="btn btn-primary btn-wide" 
                href="/auth/login"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 bg-base-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User Feedback Collection</h3>
              <p className="text-lg">
                Gather insightful feedback from your users with customizable forms and widgets.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-6 bg-base-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Analytics and Insights</h3>
              <p className="text-lg">
                Gain valuable insights into user sentiment and behavior with built-in analytics tools.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-6 bg-base-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Easy Integration</h3>
              <p className="text-lg">
                Seamlessly integrate Feedback Source Pro into your website with our simple setup process.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
