import React from 'react';

function PrivacyPolicy() {
    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#333] p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold  mb-6">Privacy Policy</h1>

                <div className="prose prose-indigo prose-lg">
                    <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                    <p>
                        We may collect various types of information when you use our website, including personal information
                        such as your name, email address, and contact details.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide and improve our services, communicate with you,
                        and send you updates and promotional materials.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">3. Information Sharing</h2>
                    <p>
                        We do not share your personal information with third parties except as necessary to provide
                        our services or as required by law.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">4. Security</h2>
                    <p>
                        We take reasonable measures to protect your information, but no method of transmission over the
                        internet or electronic storage is 100% secure.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">5. Your Choices</h2>
                    <p>
                        You can update your personal information and communication preferences by contacting us at{' '}
                        <a href="mailto:privacy@gmail.com" className="text-blue-500">privacy@ordinals.com</a>.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">6. Changes to this Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page,
                        and the revised policy will apply to information collected after the date of the change.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
