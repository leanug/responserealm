import Link from "next/link"

export default function Page() {
  return (
    <section className="max-w-3xl mx-auto px-2.5 md:px-0 mt-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Privacy Policy for FeedbackRealm.com</h1>

      <p className="text-lg text-gray-700 mb-6">
        At <strong>FeedbackRealm.com</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we value your privacy and are committed to
        protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the
        data you provide when using our platform, located at <strong>FeedbackRealm.com</strong> (the &quot;Website&quot;).
      </p>
      <p className="text-lg text-gray-700 mb-6">
        By accessing or using the Website, you agree to the terms set forth in this Privacy Policy. If you do not agree with
        the practices described below, please do not use our Website.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

      <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Personal Data</h3>
      <p className="text-lg text-gray-700 mb-6">
        We may collect certain personal information from you when you interact with our Website, including but not limited to:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
        <li><strong>Name:</strong> To personalize your experience and identify you across the platform.</li>
        <li><strong>Email Address:</strong> For account registration, communication, and support-related inquiries.</li>
        <li><strong>Other Optional Information:</strong> Any additional information you provide (e.g., profile information) when using our services.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">
        We prioritize your privacy and <strong>do not</strong> share your personal data with any third parties for marketing or any other purposes unless explicitly required to operate our services (e.g., third-party service providers).
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 Non-Personal Data</h3>
      <p className="text-lg text-gray-700 mb-6">
        We may collect non-personal information automatically when you use our Website. This includes:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
        <li><strong>IP Address</strong></li>
        <li><strong>Browser Information</strong></li>
        <li><strong>Device Information</strong></li>
        <li><strong>Cookies and Usage Data</strong></li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">
        This information helps us analyze trends, manage the site, improve our services, and enhance your experience.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Purpose of Data Collection</h2>
      <p className="text-lg text-gray-700 mb-6">
        We collect and use personal data solely for:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
        <li><strong>Account creation and management</strong></li>
        <li><strong>Improving customer experience</strong></li>
        <li><strong>Providing support and responding to inquiries</strong></li>
        <li><strong>Improving our services based on your feedback</strong></li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">
        We do <strong>not</strong> use your data for any purposes beyond what is necessary to provide our services.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Sharing</h2>
      <p className="text-lg text-gray-700 mb-6">
        At <strong>FeedbackRealm.com</strong>, we do not sell, trade, or rent your personal information to any third party.
        We also do not share your personal data except in the following cases:
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
        <li>When it&#39;s necessary to deliver services (e.g., third-party hosting providers).</li>
        <li>To comply with legal obligations or enforce our policies.</li>
      </ul>
      <p className="text-lg text-gray-700 mb-6">
        Any service providers we engage are bound by strict data privacy agreements to ensure your data is handled securely.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Children&#39;s Privacy</h2>
      <p className="text-lg text-gray-700 mb-6">
        <strong>FeedbackRealm.com</strong> is not intended for use by children under the age of 13. We do not knowingly collect personal data from children. If we discover that a child has provided us with personal information, we will promptly delete such information from our systems.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Updates to This Privacy Policy</h2>
      <p className="text-lg text-gray-700 mb-6">
        We may update this Privacy Policy periodically to reflect any changes in our practices or legal obligations. Changes will be posted on this page, and we encourage you to review it regularly.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Information</h2>
      <p className="text-lg text-gray-700 mb-6">
        If you have any questions or concerns about our Privacy Policy, please contact us at:
      </p>
      <p className="text-lg text-gray-700 mb-6">
        <strong>Email:</strong> [Your Contact Email]  
        For more information, please visit our <Link href="/contact" className="btn btn-link p-0">Contact Us</Link> page.
      </p>

      <p className="text-lg text-gray-700 mb-6">
        By using <strong>FeedbackRealm.com</strong>, you consent to the terms outlined in this Privacy Policy.
      </p>
    </section>
  )
}
