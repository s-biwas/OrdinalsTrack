import React from 'react';

function TermsAndConditions() {
    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-[#333] p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-extrabold  mb-6">Terms and Conditions</h1>

                <div className="prose prose-indigo prose-lg">
                    <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using this website, you agree to be bound by these Terms and Conditions.
                        If you do not agree to these terms, please do not use this website.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">2. Use of the Website</h2>
                    <p>
                        You may use this website for lawful purposes and in compliance with these terms.
                        You agree not to use this website for any unlawful or prohibited purpose.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">3. Privacy Policy</h2>
                    <p>
                        Your use of this website is also governed by our Privacy Policy. Please review our Privacy
                        Policy to understand how we collect and use your personal information.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">4. Changes to Terms</h2>
                    <p>
                        We reserve the right to change these Terms and Conditions at any time. Your continued use
                        of this website after such changes will constitute your acceptance of the new terms.
                    </p>

                    <h2 className="text-xl font-semibold mt-4">5. Contact Information</h2>
                    <p>
                        If you have any questions or concerns about these Terms and Conditions, please contact us
                        at <a href="malito:infordinals@gmail.com" className="text-blue-500">info@ordinals.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TermsAndConditions;
